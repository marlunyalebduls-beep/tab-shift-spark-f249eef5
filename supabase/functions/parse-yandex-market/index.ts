import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate Yandex Market URL
    if (!url.includes('market.yandex')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Только ссылки с Яндекс Маркета поддерживаются' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl не настроен' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Yandex Market URL:', url);

    // Scrape the page with Firecrawl
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        waitFor: 3000, // Wait for dynamic content to load
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || 'Ошибка при парсинге страницы' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const content = data.data || data;
    const markdown = content.markdown || '';
    const html = content.html || '';
    const metadata = content.metadata || {};

    console.log('Scraped content length:', markdown.length);

    // Extract product information from the scraped content
    let title = metadata.title || '';
    let price: number | null = null;
    let image: string | null = null;

    // Clean up title - remove "— купить в интернет-магазине OZON" or similar suffixes
    title = title
      .replace(/\s*—\s*купить.*$/i, '')
      .replace(/\s*\|\s*Яндекс.*$/i, '')
      .replace(/\s*-\s*Яндекс.*$/i, '')
      .trim();

    // Try to extract price from markdown content
    // Look for patterns like "1 234 ₽", "1234₽", "1 234 руб"
    const pricePatterns = [
      /(\d[\d\s]*)\s*₽/g,
      /(\d[\d\s]*)\s*руб/gi,
      /цена[:\s]*(\d[\d\s]*)/gi,
      /(\d{1,3}(?:\s?\d{3})*)\s*(?:₽|руб)/g,
    ];

    for (const pattern of pricePatterns) {
      const matches = [...markdown.matchAll(pattern)];
      if (matches.length > 0) {
        // Get the first reasonable price (usually the main product price)
        for (const match of matches) {
          const priceStr = match[1].replace(/\s/g, '');
          const parsedPrice = parseInt(priceStr, 10);
          // Filter out unreasonable prices (too small or too large)
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
      // Try to find image in HTML
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

    console.log('Parsed product:', result.product);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error parsing Yandex Market:', error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
