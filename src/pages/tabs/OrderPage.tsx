import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GuestOverlay } from '@/components/GuestOverlay';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  Link as LinkIcon, 
  MapPin, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  ShoppingCart,
  Loader2,
  Image as ImageIcon,
  Calculator
} from 'lucide-react';

interface ParsedProduct {
  title: string;
  price: number | null;
  image: string | null;
  quarterPrice: number | null;
}

export const OrderPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [productUrl, setProductUrl] = useState('');
  const [city, setCity] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedProduct, setParsedProduct] = useState<ParsedProduct | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseYandexMarket = async () => {
    if (!productUrl.includes('market.yandex')) {
      setParseError('Вставьте ссылку с Яндекс Маркета');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setParsedProduct(null);

    try {
      const { data, error } = await supabase.functions.invoke('parse-yandex-market', {
        body: { url: productUrl },
      });

      if (error) {
        console.error('Edge function error:', error);
        setParseError('Ошибка при парсинге. Попробуйте снова.');
        return;
      }

      if (!data.success) {
        setParseError(data.error || 'Ошибка при парсинге');
        return;
      }

      setParsedProduct({
        title: data.product.title,
        price: data.product.price,
        image: data.product.image,
        quarterPrice: data.product.quarterPrice,
      });

    } catch (error) {
      console.error('Parse error:', error);
      setParseError('Ошибка при парсинге. Попробуйте снова.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductUrl(e.target.value);
    setParsedProduct(null);
    setParseError(null);
  };

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {user === null && <GuestOverlay onOpenAuth={onOpenAuth} />}
      </AnimatePresence>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Order Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Оформление заказа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product URL with Parser */}
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  Ссылка на товар (Яндекс Маркет)
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://market.yandex.ru/product--..."
                    value={productUrl}
                    onChange={handleUrlChange}
                    className="bg-black/30 border-white/20 text-foreground placeholder-muted-foreground flex-1"
                  />
                  <Button 
                    onClick={parseYandexMarket}
                    disabled={!productUrl || isParsing}
                    className="bg-primary hover:bg-primary/90 px-6"
                  >
                    {isParsing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Получить цену'
                    )}
                  </Button>
                </div>
                {parseError && (
                  <p className="text-xs text-red-400">{parseError}</p>
                )}
              </div>

              {/* Parsed Product Info */}
              {parsedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-green-900/20 to-black/30 border border-green-700/50"
                >
                  <div className="flex gap-4">
                    {parsedProduct.image ? (
                      <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                        <img 
                          src={parsedProduct.image} 
                          alt={parsedProduct.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium mb-2 truncate">{parsedProduct.title}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Полная цена</p>
                          <p className="text-xl font-bold text-foreground">
                            ₽{parsedProduct.price.toLocaleString('ru-RU')}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                          <p className="text-xs text-primary mb-1 flex items-center gap-1">
                            <Calculator className="w-3 h-3" />
                            1/4 от цены (ваш взнос)
                          </p>
                          <p className="text-xl font-bold text-primary">
                            ₽{parsedProduct.quarterPrice.toLocaleString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* City Selection */}
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Город доставки
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-black/30 border-white/20">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="moscow">Москва</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="novosibirsk">Новосибирск</SelectItem>
                    <SelectItem value="ekb">Екатеринбург</SelectItem>
                    <SelectItem value="kazan">Казань</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account Selection */}
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-400" />
                  Аккаунт для заказа
                </Label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="bg-black/30 border-white/20">
                    <SelectValue placeholder="Выберите аккаунт" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="acc1">Аккаунт #1 (50K лимит)</SelectItem>
                    <SelectItem value="acc2">Аккаунт #2 (75K лимит)</SelectItem>
                    <SelectItem value="acc3">Аккаунт #3 (100K лимит)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-medium">Важно</p>
                  <p className="text-yellow-400/70 text-sm">
                    Убедитесь, что город аккаунта совпадает с городом доставки
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                disabled={!parsedProduct || !city || !selectedAccount}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Создать заказ
                {parsedProduct && (
                  <span className="ml-2 opacity-80">
                    — ₽{parsedProduct.quarterPrice.toLocaleString('ru-RU')}
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Последние заказы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '#1234', product: 'iPhone 15 Pro', status: 'completed', city: 'Москва', price: 32497 },
                  { id: '#1233', product: 'MacBook Air M3', status: 'processing', city: 'Санкт-Петербург', price: 39997 },
                  { id: '#1232', product: 'AirPods Pro 2', status: 'completed', city: 'Казань', price: 6247 },
                ].map((order, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div>
                        <p className="text-foreground font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-medium">₽{order.price.toLocaleString('ru-RU')}</p>
                      <p className={`text-xs ${
                        order.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
