import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Wallet, 
  CreditCard, 
  Bitcoin,
  Banknote,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const paymentMethods = [
  { id: 'card', name: 'Банковская карта', icon: CreditCard, description: 'Visa, MasterCard, МИР' },
  { id: 'crypto', name: 'Криптовалюта', icon: Bitcoin, description: 'BTC, ETH, USDT' },
  { id: 'sbp', name: 'СБП', icon: Banknote, description: 'Система быстрых платежей' },
];

const amounts = [500, 1000, 2000, 5000, 10000, 25000];

export const PaymentPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');

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
        {/* Header with Balance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Текущий баланс</p>
                  <p className="text-3xl font-bold text-foreground">
                    ₽{user ? Math.floor(user.balance).toLocaleString('ru-RU') : '—'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card className="bg-black/30 border border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Сумма пополнения</CardTitle>
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
                        : 'border-white/20 hover:bg-white/10'
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
                    className="bg-black/30 border-white/20"
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
          >
            <Card className="bg-black/30 border border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedMethod === method.id ? 'bg-primary/30' : 'bg-white/5'
                      }`}>
                        <method.icon className={`w-5 h-5 ${
                          selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
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
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">К оплате</p>
                  <p className="text-2xl font-bold text-foreground">₽{amount.toLocaleString('ru-RU')}</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 px-8">
                  Оплатить
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
