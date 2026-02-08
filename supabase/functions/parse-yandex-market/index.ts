import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Allowed Yandex Market hostnames
const ALLOWED_HOSTNAMES = [
  'market.yandex.ru',
  'market.yandex.com',
  'pokupki.market.yandex.ru',
  'm.market.yandex.ru',
];

/**
 * Validates that the URL is a proper Yandex Market URL
 * Prevents SSRF attacks by strictly validating hostname
 */
function validateYandexMarketUrl(urlString: string): { valid: boolean; error?: string; url?: URL } {
  // Check if it's a string
  if (typeof urlString !== 'string' || urlString.trim().length === 0) {
    return { valid: false, error: 'URL обязателен' };
  }

  // Try to parse the URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(urlString.trim());
  } catch {
    return { valid: false, error: 'Неверный формат URL' };
  }

  // Only allow HTTPS
  if (parsedUrl.protocol !== 'https:') {
    return { valid: false, error: 'Разрешены только HTTPS ссылки' };
  }

  // Validate hostname against whitelist
  const hostname = parsedUrl.hostname.toLowerCase();
  const isAllowed = ALLOWED_HOSTNAMES.some(allowed => 
    hostname === allowed || hostname.endsWith('.' + allowed)
  );

  if (!isAllowed) {
    return { valid: false, error: 'Только ссылки с Яндекс Маркета поддерживаются' };
  }

  return { valid: true, url: parsedUrl };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { url } = body;

    // Validate URL input
    const validation = validateYandexMarketUrl(url);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('[INTERNAL] Scraper API key not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Сервис временно недоступен' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[INFO] Processing URL:', validation.url?.hostname);

    // Scrape the page with Firecrawl
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: validation.url?.href,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[INTERNAL] Scraper error:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Не удалось загрузить страницу. Попробуйте позже.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const content = data.data || data;
    const markdown = content.markdown || '';
    const html = content.html || '';
    const metadata = content.metadata || {};

    console.log('[INFO] Content received, length:', markdown.length);

    // Extract product information from the scraped content
    let title = metadata.title || '';
    let price: number | null = null;
    let image: string | null = null;

    // Clean up title - remove common suffixes
    title = title
      .replace(/\s*—\s*купить.*$/i, '')
      .replace(/\s*\|\s*Яндекс.*$/i, '')
      .replace(/\s*-\s*Яндекс.*$/i, '')
      .trim();

    // Try to extract price from markdown content
    const pricePatterns = [
      /(\d[\d\s]*)\s*₽/g,
      /(\d[\d\s]*)\s*руб/gi,
      /цена[:\s]*(\d[\d\s]*)/gi,
      /(\d{1,3}(?:\s?\d{3})*)\s*(?:₽|руб)/g,
    ];

    for (const pattern of pricePatterns) {
      const matches = [...markdown.matchAll(pattern)];
      if (matches.length > 0) {
        for (const match of matches) {
          const priceStr = match[1].replace(/\s/g, '');
          const parsedPrice = parseInt(priceStr, 10);
          if (parsedPrice >= 100 && parsedPrice <= 10000000) {
            price = parsedPrice;
            break;
          }
        }
        if (price) break;
      }
    }

    // Try to extract image from HTML or metadata
    if (metadata.ogImage) {
      image = metadata.ogImage;
    } else if (metadata.image) {
      image = metadata.image;
    } else {
      const imgPatterns = [
        /og:image"?\s+content="([^"]+)"/i,
        /<img[^>]+src="(https:\/\/avatars\.mds\.yandex\.net[^"]+)"/i,
        /<img[^>]+src="(https:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i,
      ];

      for (const pattern of imgPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          image = match[1];
          break;
        }
      }
    }

    // If we still don't have a title, try to extract from markdown
    if (!title) {
      const titleMatch = markdown.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    // Validate that we have at least a title
    if (!title) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Не удалось извлечь информацию о товаре. Попробуйте другую ссылку.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = {
      success: true,
      product: {
        title,
        price,
        image,
        quarterPrice: price ? Math.ceil(price / 4) : null,
      },
    };

    console.log('[INFO] Product parsed successfully');

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[INTERNAL] Unexpected error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Не удалось обработать запрос' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
