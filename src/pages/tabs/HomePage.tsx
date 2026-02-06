import React from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HomePage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            {user ? `👋 Добро пожаловать, ${user.first_name}!` : '👋 Добро пожаловать в ZAKAZSPLIT'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Ваш личный кабинет для управления аккаунтами и заказами
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm text-muted-foreground">Баланс:</span>
                  <span className="ml-2 text-lg font-semibold text-primary">
                    ₽{Math.floor(user.balance)}
                  </span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-secondary border border-foreground/5">
                  <span className="text-sm text-muted-foreground">Роль:</span>
                  <span className={`ml-2 font-medium ${user.role === 'admin' ? 'text-[#ff6b6b]' : 'text-primary'}`}>
                    {user.role === 'admin' ? '👑 Администратор' : '👤 Пользователь'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Вы находитесь в гостевом режиме. Для доступа ко всем функциям войдите через Telegram.
              </p>
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 rounded-lg gradient-telegram text-white font-medium hover:opacity-90 transition-opacity"
              >
                🔐 Войти через Telegram
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активные аккаунты</p>
                <p className="text-2xl font-bold text-foreground">{user ? '12' : '—'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Заказы в работе</p>
                <p className="text-2xl font-bold text-foreground">{user ? '3' : '—'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Прогрев аккаунтов</p>
                <p className="text-2xl font-bold text-foreground">{user ? '5' : '—'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">📊 Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-3">
              {[
                { time: '10:45', action: 'Аккаунт acc_001 начал прогрев', status: 'success' },
                { time: '09:30', action: 'Заказ #1234 выполнен', status: 'success' },
                { time: '08:15', action: 'Добавлен новый аккаунт', status: 'info' },
                { time: 'Вчера', action: 'Пополнение баланса +1000₽', status: 'success' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <span className="text-xs text-muted-foreground min-w-[50px]">{item.time}</span>
                  <span className="text-sm text-foreground">{item.action}</span>
                  <span className={`ml-auto w-2 h-2 rounded-full ${
                    item.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Войдите для просмотра активности
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
