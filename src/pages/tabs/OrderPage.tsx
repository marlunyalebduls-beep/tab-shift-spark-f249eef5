import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Package, 
  Link as LinkIcon, 
  MapPin, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  ShoppingCart
} from 'lucide-react';

export const OrderPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [productUrl, setProductUrl] = useState('');
  const [city, setCity] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  return (
    <div className="relative min-h-full">
      {!user && <GuestOverlay onOpenAuth={onOpenAuth} />}

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
              {/* Product URL */}
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  Ссылка на товар
                </Label>
                <Input
                  placeholder="https://..."
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  className="bg-black/30 border-white/20 text-foreground placeholder-muted-foreground"
                />
                <p className="text-xs text-muted-foreground/60">
                  Вставьте ссылку на товар с маркетплейса
                </p>
              </div>

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
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Создать заказ
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
                  { id: '#1234', product: 'iPhone 15 Pro', status: 'completed', city: 'Москва' },
                  { id: '#1233', product: 'MacBook Air M3', status: 'processing', city: 'Санкт-Петербург' },
                  { id: '#1232', product: 'AirPods Pro 2', status: 'completed', city: 'Казань' },
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
                      <p className="text-xs text-muted-foreground">{order.city}</p>
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
