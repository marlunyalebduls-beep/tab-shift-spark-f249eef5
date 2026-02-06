import React, { useState } from 'react';
import { User } from '@/types/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AccountsPageProps {
  user: User | null;
  onOpenAuth: () => void;
}

interface Account {
  id: string;
  name: string;
  status: 'active' | 'warming' | 'paused' | 'banned';
  phone: string;
  proxy: string;
  lastActivity: string;
}

const mockAccounts: Account[] = [
  { id: '1', name: 'Аккаунт #1', status: 'active', phone: '+7 (999) ***-**-01', proxy: '185.xx.xx.01', lastActivity: '5 мин назад' },
  { id: '2', name: 'Аккаунт #2', status: 'warming', phone: '+7 (999) ***-**-02', proxy: '185.xx.xx.02', lastActivity: '2 часа назад' },
  { id: '3', name: 'Аккаунт #3', status: 'active', phone: '+7 (999) ***-**-03', proxy: '185.xx.xx.03', lastActivity: '1 час назад' },
  { id: '4', name: 'Аккаунт #4', status: 'paused', phone: '+7 (999) ***-**-04', proxy: '185.xx.xx.04', lastActivity: '1 день назад' },
  { id: '5', name: 'Аккаунт #5', status: 'banned', phone: '+7 (999) ***-**-05', proxy: '185.xx.xx.05', lastActivity: '3 дня назад' },
];

const statusConfig = {
  active: { label: 'Активен', color: 'bg-success text-success-foreground' },
  warming: { label: 'Прогрев', color: 'bg-warning text-warning-foreground' },
  paused: { label: 'Пауза', color: 'bg-muted text-muted-foreground' },
  banned: { label: 'Заблокирован', color: 'bg-destructive text-destructive-foreground' },
};

export const AccountsPage: React.FC<AccountsPageProps> = ({ user, onOpenAuth }) => {
  const [search, setSearch] = useState('');
  
  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
            Для просмотра аккаунтов необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  const filteredAccounts = mockAccounts.filter(acc => 
    acc.name.toLowerCase().includes(search.toLowerCase()) ||
    acc.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ваши аккаунты</h2>
          <p className="text-sm text-muted-foreground">Всего: {mockAccounts.length} аккаунтов</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[250px] bg-secondary/50 border-foreground/10"
          />
          <Button className="gradient-primary text-primary-foreground whitespace-nowrap">
            + Добавить
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = mockAccounts.filter(a => a.status === status).length;
          return (
            <Card key={status} className="bg-card/50 border-foreground/5">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Badge className={config.color}>{config.label}</Badge>
                  <span className="text-xl font-bold text-foreground ml-auto">{count}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Accounts List */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg">📱 Список аккаунтов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/30 border border-foreground/5 gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {account.id}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={statusConfig[account.status].color}>
                    {statusConfig[account.status].label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Proxy: {account.proxy}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {account.lastActivity}
                  </span>
                  <Button variant="outline" size="sm" className="border-foreground/10">
                    Управление
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
