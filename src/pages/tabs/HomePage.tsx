import React from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Package, 
  Flame, 
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  const stats = [
    { 
      label: 'Активные аккаунты', 
      value: user ? '12' : '—', 
      icon: Users, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    { 
      label: 'Заказы в работе', 
      value: user ? '3' : '—', 
      icon: Package, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    { 
      label: 'На прогреве', 
      value: user ? '5' : '—', 
      icon: Flame, 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    { 
      label: 'Баланс', 
      value: user ? `₽${Math.floor(user.balance)}` : '—', 
      icon: Wallet, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
  ];

  const recentActivity = [
    { time: '10:45', action: 'Аккаунт acc_001 начал прогрев', status: 'success', icon: Flame },
    { time: '09:30', action: 'Заказ #1234 выполнен', status: 'success', icon: CheckCircle },
    { time: '08:15', action: 'Добавлен новый аккаунт', status: 'info', icon: Users },
    { time: 'Вчера', action: 'Пополнение баланса +1000₽', status: 'success', icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-2xl">👋</span>
                  Добро пожаловать, {user.first_name}!
                </>
              ) : (
                <>
                  <span className="text-2xl">👋</span>
                  Добро пожаловать в ZAKAZSPLIT
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-4">
                <p className="text-gray-400">
                  Ваш личный кабинет для управления аккаунтами и заказами
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-gray-400">Баланс:</span>
                    <span className="ml-2 text-lg font-semibold text-primary">
                      ₽{Math.floor(user.balance).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <Badge 
                    className={user.role === 'admin' 
                      ? 'bg-red-900/50 text-red-400 border-red-700' 
                      : 'bg-blue-900/50 text-blue-400 border-blue-700'
                    }
                  >
                    {user.role === 'admin' ? '👑 Администратор' : '👤 Пользователь'}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400">
                  Вы находитесь в гостевом режиме. Для доступа ко всем функциям войдите через Telegram.
                </p>
                <Button onClick={onOpenAuth} className="gradient-telegram text-white">
                  🔐 Войти через Telegram
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      Купить аккаунты
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-yellow-400" />
                      Создать заказ
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-green-400" />
                      Пополнить баланс
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Войдите для доступа к действиям</p>
                  <Button onClick={onOpenAuth} className="gradient-telegram text-white">
                    Войти
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Последняя активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className={`p-2 rounded-lg ${
                        item.status === 'success' ? 'bg-green-500/10' : 'bg-blue-500/10'
                      }`}>
                        <item.icon className={`w-4 h-4 ${
                          item.status === 'success' ? 'text-green-400' : 'text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${
                        item.status === 'success' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Войдите для просмотра активности</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
