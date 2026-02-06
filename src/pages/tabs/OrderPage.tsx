import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для создания заказов необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" />
              Создание заказа
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Заполните форму для оформления нового заказа
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6 space-y-6">
            {/* Product URL */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                Ссылка на товар
              </Label>
              <Input
                placeholder="https://..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <p className="text-xs text-gray-500">
                Вставьте ссылку на товар с маркетплейса
              </p>
            </div>

            {/* City Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Город доставки
              </Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="moscow" className="text-white">Москва</SelectItem>
                  <SelectItem value="spb" className="text-white">Санкт-Петербург</SelectItem>
                  <SelectItem value="novosibirsk" className="text-white">Новосибирск</SelectItem>
                  <SelectItem value="ekb" className="text-white">Екатеринбург</SelectItem>
                  <SelectItem value="kazan" className="text-white">Казань</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-green-400" />
                Аккаунт для заказа
              </Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Выберите аккаунт" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="acc1" className="text-white">Аккаунт #1 (50K лимит)</SelectItem>
                  <SelectItem value="acc2" className="text-white">Аккаунт #2 (75K лимит)</SelectItem>
                  <SelectItem value="acc3" className="text-white">Аккаунт #3 (100K лимит)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-900/20 border border-yellow-700">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-medium">Важно</p>
                <p className="text-yellow-200/70 text-sm">
                  Убедитесь, что город аккаунта совпадает с городом доставки
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Создать заказ
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
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
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">{order.id}</p>
                      <p className="text-sm text-gray-400">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{order.city}</p>
                    <p className={`text-xs ${
                      order.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};