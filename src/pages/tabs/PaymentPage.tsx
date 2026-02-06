import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  Bitcoin,
  Banknote,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const paymentMethods = [
  { id: 'card', name: 'Банковская карта', icon: CreditCard, description: 'Visa, MasterCard, МИР', badge: 'Мгновенно' },
  { id: 'crypto', name: 'Криптовалюта', icon: Bitcoin, description: 'BTC, ETH, USDT', badge: null },
  { id: 'sbp', name: 'СБП', icon: Banknote, description: 'Система быстрых платежей', badge: 'Популярно' },
];

const amounts = [500, 1000, 2000, 5000, 10000, 25000];

export const PaymentPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для пополнения баланса необходимо авторизоваться
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
      {/* Header with Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Текущий баланс</p>
                  <p className="text-3xl font-bold text-white">
                    ₽{Math.floor(user.balance).toLocaleString('ru-RU')}
                  </p>
                </div>
              </div>
              <Badge className="bg-green-600/20 text-green-400 border-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                Новое
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Amount Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-white">Сумма пополнения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {amounts.map((a) => (
                  <Button
                    key={a}
                    variant={amount === a ? 'default' : 'outline'}
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount('');
                    }}
                    className={amount === a 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }
                  >
                    ₽{a.toLocaleString('ru-RU')}
                  </Button>
                ))}
              </div>
              
              <div className="pt-2">
                <Input
                  type="number"
                  placeholder="Своя сумма..."
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) {
                      setAmount(parseInt(e.target.value) || 0);
                    }
                  }}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-white">Способ оплаты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-gray-700/30 border border-gray-700 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedMethod === method.id ? 'bg-primary/30' : 'bg-gray-700'
                    }`}>
                      <method.icon className={`w-5 h-5 ${
                        selectedMethod === method.id ? 'text-primary' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{method.name}</p>
                      <p className="text-sm text-gray-400">{method.description}</p>
                    </div>
                  </div>
                  {method.badge && (
                    <Badge className="bg-primary/20 text-primary border-primary/50">
                      {method.badge}
                    </Badge>
                  )}
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">К оплате</p>
                <p className="text-2xl font-bold text-white">₽{amount.toLocaleString('ru-RU')}</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                Оплатить
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              История пополнений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'Сегодня, 14:30', amount: 5000, method: 'СБП', status: 'success' },
                { date: 'Вчера, 10:15', amount: 2000, method: 'Карта', status: 'success' },
                { date: '01.02.2025', amount: 10000, method: 'Крипто', status: 'success' },
              ].map((tx, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-white">+₽{tx.amount.toLocaleString('ru-RU')}</p>
                      <p className="text-xs text-gray-400">{tx.method}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};