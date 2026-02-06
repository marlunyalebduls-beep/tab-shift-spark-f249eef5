import React from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AdminPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  if (!user || user.role !== 'admin') {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">👑</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ запрещён</h3>
          <p className="text-muted-foreground mb-6">
            Эта страница доступна только администраторам
          </p>
          {!user && (
            <Button onClick={onOpenAuth} className="gradient-telegram">
              Войти через Telegram
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const stats = [
    { label: 'Всего пользователей', value: '1,234', icon: '👥', change: '+12%' },
    { label: 'Активные аккаунты', value: '5,678', icon: '📱', change: '+8%' },
    { label: 'Заказы сегодня', value: '89', icon: '📦', change: '+15%' },
    { label: 'Выручка (день)', value: '₽125,000', icon: '💰', change: '+23%' },
  ];

  const recentUsers = [
    { id: 1, name: 'Иван П.', joined: '5 мин назад', balance: 5000 },
    { id: 2, name: 'Мария С.', joined: '15 мин назад', balance: 2500 },
    { id: 3, name: 'Алексей К.', joined: '1 час назад', balance: 10000 },
    { id: 4, name: 'Елена В.', joined: '2 часа назад', balance: 1000 },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/30">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center text-3xl">
              👑
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Добро пожаловать, {user.first_name}!
              </h2>
              <p className="text-muted-foreground">Панель администратора ZAKAZSPLIT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/50 border-foreground/5">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
                  <span className="text-xs text-success">{stat.change}</span>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">⚡ Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="border-foreground/10">
              👥 Управление пользователями
            </Button>
            <Button variant="outline" className="border-foreground/10">
              📊 Статистика
            </Button>
            <Button variant="outline" className="border-foreground/10">
              📦 Заказы
            </Button>
            <Button variant="outline" className="border-foreground/10">
              💳 Платежи
            </Button>
            <Button variant="outline" className="border-foreground/10">
              ⚙️ Настройки системы
            </Button>
            <Button variant="outline" className="border-destructive/30 text-destructive">
              🚨 Логи ошибок
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">👥 Новые пользователи</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full avatar-gradient flex items-center justify-center text-primary-foreground font-bold">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{u.name}</p>
                    <p className="text-sm text-muted-foreground">{u.joined}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">₽{u.balance}</p>
                  <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto">
                    Подробнее →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🖥️ Состояние системы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'API сервер', status: 'ok' },
              { name: 'База данных', status: 'ok' },
              { name: 'Прокси пул', status: 'warning' },
              { name: 'Эмуляторы', status: 'ok' },
            ].map((system, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/30 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  system.status === 'ok' ? 'bg-success' : 
                  system.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <span className="text-sm text-foreground">{system.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
