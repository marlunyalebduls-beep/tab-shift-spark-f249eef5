import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Wallet, 
  CreditCard, 
  Bitcoin,
  Banknote,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  TrendingUp,
  Gift,
  Shield
} from 'lucide-react';

const paymentMethods = [
  { id: 'sbp', name: 'СБП', icon: Zap, description: 'Мгновенное зачисление', badge: 'Рекомендуем', color: 'text-green-400' },
  { id: 'card', name: 'Банковская карта', icon: CreditCard, description: 'Visa, MasterCard, МИР', badge: null, color: 'text-blue-400' },
  { id: 'crypto', name: 'Криптовалюта', icon: Bitcoin, description: 'BTC, ETH, USDT, TON', badge: 'Анонимно', color: 'text-yellow-400' },
];

const amounts = [
  { value: 500, bonus: null },
  { value: 1000, bonus: null },
  { value: 2000, bonus: '+5%' },
  { value: 5000, bonus: '+10%' },
  { value: 10000, bonus: '+15%' },
  { value: 25000, bonus: '+20%' },
];

export const PaymentPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [selectedMethod, setSelectedMethod] = useState('sbp');
  const [amount, setAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState('');

  const selectedAmountData = amounts.find(a => a.value === amount);
  const bonusPercent = selectedAmountData?.bonus ? parseInt(selectedAmountData.bonus.replace(/[^0-9]/g, '')) : 0;
  const bonusAmount = Math.floor(amount * bonusPercent / 100);
  const totalAmount = amount + bonusAmount;

  return (
    <div className="relative min-h-full">
      {!user && <GuestOverlay onOpenAuth={onOpenAuth} />}

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Balance Card with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-primary/20 via-black/30 to-black/30 border border-primary/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 rounded-2xl bg-primary/20 border border-primary/30"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Wallet className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ваш баланс</p>
                    <p className="text-4xl font-bold text-foreground">
                      ₽{user ? Math.floor(user.balance).toLocaleString('ru-RU') : '0'}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Badge className="bg-green-600/20 text-green-400 border-green-700 py-1.5 px-3">
                    <Shield className="w-3 h-3 mr-1" />
                    Защищено
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Gift className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">Бонус до +20% к пополнению!</p>
                  <p className="text-sm text-muted-foreground">Чем больше сумма — тем выше бонус</p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Amount Selection - Bigger */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="bg-black/30 border border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Выберите сумму
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amounts.map((a) => (
                    <motion.button
                      key={a.value}
                      onClick={() => {
                        setAmount(a.value);
                        setCustomAmount('');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl text-center transition-all ${
                        amount === a.value 
                          ? 'bg-primary/20 border-2 border-primary ring-2 ring-primary/30' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {a.bonus && (
                        <Badge className="absolute -top-2 -right-2 bg-green-600 text-white border-0 text-xs px-2">
                          {a.bonus}
                        </Badge>
                      )}
                      <p className={`text-xl font-bold ${amount === a.value ? 'text-primary' : 'text-foreground'}`}>
                        ₽{a.value.toLocaleString('ru-RU')}
                      </p>
                    </motion.button>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Input
                    type="number"
                    placeholder="Или введите свою сумму..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) {
                        setAmount(parseInt(e.target.value) || 0);
                      }
                    }}
                    className="bg-black/30 border-white/20 h-12 text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/30 border border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ x: 4 }}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'bg-primary/20 border-2 border-primary'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${
                        selectedMethod === method.id ? 'bg-primary/30' : 'bg-white/5'
                      }`}>
                        <method.icon className={`w-5 h-5 ${method.color}`} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.badge && (
                        <Badge className="bg-primary/20 text-primary border-primary/50 text-xs">
                          {method.badge}
                        </Badge>
                      )}
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Summary & Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-green-900/20 to-black/30 border border-green-700/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <div className="flex items-center gap-6 justify-center md:justify-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Сумма</p>
                      <p className="text-2xl font-bold text-foreground">₽{amount.toLocaleString('ru-RU')}</p>
                    </div>
                    {bonusAmount > 0 && (
                      <>
                        <div className="text-2xl text-muted-foreground">+</div>
                        <div>
                          <p className="text-sm text-green-400">Бонус</p>
                          <p className="text-2xl font-bold text-green-400">₽{bonusAmount.toLocaleString('ru-RU')}</p>
                        </div>
                        <div className="text-2xl text-muted-foreground">=</div>
                        <div>
                          <p className="text-sm text-primary">Итого</p>
                          <p className="text-2xl font-bold text-primary">₽{totalAmount.toLocaleString('ru-RU')}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 px-10 py-6 text-lg w-full md:w-auto">
                  Пополнить
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
