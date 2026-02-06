import React, { useState } from 'react';
import { User } from '@/types/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderPageProps {
  user: User | null;
  onOpenAuth: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({ user, onOpenAuth }) => {
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [link, setLink] = useState('');

  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
            Для оформления заказов необходимо авторизоваться
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
      {/* Order Form */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🛒 Новый заказ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Категория товара</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-secondary/50 border-foreground/10">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">📱 Электроника</SelectItem>
                  <SelectItem value="clothing">👕 Одежда</SelectItem>
                  <SelectItem value="home">🏠 Дом и сад</SelectItem>
                  <SelectItem value="beauty">💄 Красота</SelectItem>
                  <SelectItem value="sports">⚽ Спорт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Количество</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-secondary/50 border-foreground/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Ссылка на товар</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-secondary/50 border-foreground/10"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div>
              <p className="text-sm text-muted-foreground">Ваш баланс</p>
              <p className="text-xl font-bold text-primary">₽{Math.floor(user.balance)}</p>
            </div>
            <Button className="gradient-primary text-primary-foreground">
              Оформить заказ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">📋 Ваши заказы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: '#1234', item: 'iPhone 15 Pro Max', status: 'В обработке', date: '06.02.2026', price: '89 990₽' },
              { id: '#1233', item: 'Nike Air Max 90', status: 'Выполнен', date: '05.02.2026', price: '12 500₽' },
              { id: '#1232', item: 'Dyson V15 Detect', status: 'Выполнен', date: '04.02.2026', price: '54 990₽' },
            ].map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/30 border border-foreground/5 gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary font-mono">{order.id}</span>
                  <span className="text-foreground">{order.item}</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Выполнен' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                  <span className="font-semibold text-foreground">{order.price}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
