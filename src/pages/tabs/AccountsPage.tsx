import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  Zap, 
  MapPin,
  Search,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface Account {
  id: string;
  name: string;
  status: 'active' | 'warming' | 'paused' | 'banned';
  phone: string;
  proxy: string;
  lastActivity: string;
  split: number;
  city: string;
}

const mockAccounts: Account[] = [
  { id: '1', name: 'Аккаунт #1', status: 'active', phone: '+7 (999) ***-**-01', proxy: '185.xx.xx.01', lastActivity: '5 мин назад', split: 50000, city: 'Москва' },
  { id: '2', name: 'Аккаунт #2', status: 'warming', phone: '+7 (999) ***-**-02', proxy: '185.xx.xx.02', lastActivity: '2 часа назад', split: 75000, city: 'Санкт-Петербург' },
  { id: '3', name: 'Аккаунт #3', status: 'active', phone: '+7 (999) ***-**-03', proxy: '185.xx.xx.03', lastActivity: '1 час назад', split: 100000, city: 'Москва' },
  { id: '4', name: 'Аккаунт #4', status: 'paused', phone: '+7 (999) ***-**-04', proxy: '185.xx.xx.04', lastActivity: '1 день назад', split: 120000, city: 'Казань' },
  { id: '5', name: 'Аккаунт #5', status: 'banned', phone: '+7 (999) ***-**-05', proxy: '185.xx.xx.05', lastActivity: '3 дня назад', split: 150000, city: 'Новосибирск' },
];

const statusConfig = {
  active: { label: 'Готов к заказу', color: 'bg-success text-success-foreground' },
  warming: { label: 'Прогрев', color: 'bg-warning text-warning-foreground' },
  paused: { label: 'Пауза', color: 'bg-muted text-muted-foreground' },
  banned: { label: 'Заблокирован', color: 'bg-destructive text-destructive-foreground' },
};

export const AccountsPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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
    acc.phone.includes(search) ||
    acc.city.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Всего аккаунтов', value: mockAccounts.length, icon: Users, color: 'text-primary' },
    { label: 'Готовы к заказу', value: mockAccounts.filter(a => a.status === 'active').length, icon: CheckCircle, color: 'text-success' },
    { label: 'На прогреве', value: mockAccounts.filter(a => a.status === 'warming').length, icon: Zap, color: 'text-warning' },
    { label: 'По городам', value: new Set(mockAccounts.map(a => a.city)).size, icon: MapPin, color: 'text-primary' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-primary/20">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ваши аккаунты</h2>
          <p className="text-sm text-muted-foreground">Всего: {mockAccounts.length} аккаунтов</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/50 border-foreground/10"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            className={`border-foreground/10 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button className="gradient-primary text-primary-foreground whitespace-nowrap">
            + Добавить
          </Button>
        </div>
      </div>

      {/* Accounts List */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Список аккаунтов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/30 border border-foreground/5 gap-3 hover:border-primary/30 transition-all duration-300"
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
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {account.city}
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {(account.split / 1000).toFixed(0)}к лимит
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {account.lastActivity}
                  </span>
                  <Button variant="outline" size="sm" className="border-foreground/10 hover:border-primary/30">
                    Управление
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
