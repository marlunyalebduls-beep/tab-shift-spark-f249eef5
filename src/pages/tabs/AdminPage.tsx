import React from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Users, 
  Package, 
  BarChart3, 
  CreditCard,
  Settings,
  AlertTriangle,
  TrendingUp,
  Server,
  Database,
  Wifi,
  Monitor
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useLayoutContext();

  const stats = [
    { label: 'Всего пользователей', value: '1,234', icon: Users, color: 'text-blue-400', change: '+12%' },
    { label: 'Активные аккаунты', value: '5,678', icon: Package, color: 'text-green-400', change: '+8%' },
    { label: 'Заказы сегодня', value: '89', icon: BarChart3, color: 'text-yellow-400', change: '+15%' },
    { label: 'Выручка (день)', value: '₽125,000', icon: CreditCard, color: 'text-purple-400', change: '+23%' },
  ];

  const recentUsers = [
    { id: 1, name: 'Иван П.', joined: '5 мин назад', balance: 5000 },
    { id: 2, name: 'Мария С.', joined: '15 мин назад', balance: 2500 },
    { id: 3, name: 'Алексей К.', joined: '1 час назад', balance: 10000 },
    { id: 4, name: 'Елена В.', joined: '2 часа назад', balance: 1000 },
  ];

  const systemStatus = [
    { name: 'API сервер', status: 'ok', icon: Server },
    { name: 'База данных', status: 'ok', icon: Database },
    { name: 'Прокси пул', status: 'warning', icon: Wifi },
    { name: 'Эмуляторы', status: 'ok', icon: Monitor },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-red-900/30 to-red-950/20 border border-red-800/50">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <Crown className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Добро пожаловать, {user?.first_name || 'Админ'}!
                </h2>
                <p className="text-muted-foreground">Панель администратора ZAKAZSPLIT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
          >
            <Card className="bg-black/30 border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="bg-black/30 border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" className="border-white/20">
                <Users className="w-4 h-4 mr-2" />
                Пользователи
              </Button>
              <Button variant="outline" className="border-white/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Статистика
              </Button>
              <Button variant="outline" className="border-white/20">
                <Package className="w-4 h-4 mr-2" />
                Заказы
              </Button>
              <Button variant="outline" className="border-white/20">
                <CreditCard className="w-4 h-4 mr-2" />
                Платежи
              </Button>
              <Button variant="outline" className="border-white/20">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
              <Button variant="outline" className="border-red-700 text-red-400 hover:bg-red-900/20">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Логи ошибок
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card className="bg-black/30 border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Новые пользователи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((u, index) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full avatar-gradient flex items-center justify-center text-white font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.joined}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">₽{u.balance.toLocaleString('ru-RU')}</p>
                    <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto">
                      Подробнее →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <Card className="bg-black/30 border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              Состояние системы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemStatus.map((system, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  <system.icon className={`w-5 h-5 ${
                    system.status === 'ok' ? 'text-green-400' : 
                    system.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`} />
                  <div>
                    <p className="text-sm text-foreground">{system.name}</p>
                    <Badge className={
                      system.status === 'ok' ? 'bg-green-600/20 text-green-400 border-green-700' : 
                      system.status === 'warning' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-700' : 
                      'bg-red-600/20 text-red-400 border-red-700'
                    }>
                      {system.status === 'ok' ? 'OK' : system.status === 'warning' ? 'Внимание' : 'Ошибка'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
