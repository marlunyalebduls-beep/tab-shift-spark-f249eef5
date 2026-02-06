import React, { useState } from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const paymentMethods = [
  { id: 'card', name: 'Банковская карта', icon: '💳', description: 'Visa, MasterCard, МИР' },
  { id: 'sbp', name: 'СБП', icon: '📱', description: 'Система быстрых платежей' },
  { id: 'crypto', name: 'Криптовалюта', icon: '₿', description: 'BTC, ETH, USDT' },
  { id: 'wallet', name: 'Электронный кошелёк', icon: '👛', description: 'ЮMoney, QIWI' },
];

const amounts = [500, 1000, 2500, 5000, 10000, 25000];

export const PaymentPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [amount, setAmount] = useState('1000');

  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
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
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
        <CardContent className="py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Ваш текущий баланс</p>
              <p className="text-3xl font-bold text-primary">₽{Math.floor(user.balance)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">ID пользователя</p>
              <p className="text-lg font-mono text-foreground">{user.telegram_id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">💵 Сумма пополнения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {amounts.map((amt) => (
              <Button
                key={amt}
                variant={amount === String(amt) ? 'default' : 'outline'}
                className={`${
                  amount === String(amt) 
                    ? 'gradient-primary text-primary-foreground' 
                    : 'border-foreground/10'
                }`}
                onClick={() => setAmount(String(amt))}
              >
                {amt}₽
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Или введите свою сумму</Label>
            <Input
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary/50 border-foreground/10 text-xl font-bold"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">💳 Способ оплаты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedMethod === method.id
                    ? 'bg-primary/10 border-primary/40'
                    : 'bg-secondary/30 border-foreground/5 hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">К оплате:</p>
              <p className="text-2xl font-bold text-foreground">₽{amount || 0}</p>
            </div>
            <Button className="w-full md:w-auto gradient-primary text-primary-foreground px-12 py-6 text-lg">
              Оплатить
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">📜 История пополнений</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '05.02.2026', amount: 5000, method: 'Карта', status: 'success' },
              { date: '01.02.2026', amount: 2500, method: 'СБП', status: 'success' },
              { date: '28.01.2026', amount: 1000, method: 'Карта', status: 'success' },
            ].map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-foreground">+{payment.amount}₽</span>
                  <span className="text-sm text-muted-foreground">{payment.method}</span>
                </div>
                <span className="text-sm text-muted-foreground">{payment.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
