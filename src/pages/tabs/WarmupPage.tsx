import React from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Flame, 
  Play, 
  Pause, 
  Clock,
  Activity,
  MapPin,
  Zap,
  CheckCircle
} from 'lucide-react';

interface WarmupAccount {
  id: string;
  name: string;
  city: string;
  progress: number;
  status: 'active' | 'paused' | 'completed';
  timeLeft: string;
}

const mockWarmupAccounts: WarmupAccount[] = [
  { id: '1', name: 'Аккаунт #4', city: 'Москва', progress: 75, status: 'active', timeLeft: '2 часа' },
  { id: '2', name: 'Аккаунт #5', city: 'Санкт-Петербург', progress: 45, status: 'active', timeLeft: '5 часов' },
  { id: '3', name: 'Аккаунт #6', city: 'Казань', progress: 90, status: 'active', timeLeft: '30 мин' },
  { id: '4', name: 'Аккаунт #7', city: 'Новосибирск', progress: 100, status: 'completed', timeLeft: 'Завершён' },
  { id: '5', name: 'Аккаунт #8', city: 'Екатеринбург', progress: 30, status: 'paused', timeLeft: 'Пауза' },
];

export const WarmupPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для управления прогревом необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    { label: 'Активных', value: mockWarmupAccounts.filter(a => a.status === 'active').length, icon: Activity, color: 'text-green-400' },
    { label: 'На паузе', value: mockWarmupAccounts.filter(a => a.status === 'paused').length, icon: Pause, color: 'text-yellow-400' },
    { label: 'Завершено', value: mockWarmupAccounts.filter(a => a.status === 'completed').length, icon: CheckCircle, color: 'text-blue-400' },
    { label: 'Всего', value: mockWarmupAccounts.length, icon: Zap, color: 'text-primary' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-400 border-green-700';
      case 'paused': return 'bg-yellow-600/20 text-yellow-400 border-yellow-700';
      case 'completed': return 'bg-blue-600/20 text-blue-400 border-blue-700';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'paused': return 'Пауза';
      case 'completed': return 'Завершён';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              Прогрев аккаунтов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Управление процессом прогрева ваших аккаунтов
            </p>
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Warmup Accounts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Аккаунты на прогреве
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockWarmupAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 rounded-lg bg-gray-700/30 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Flame className={`w-5 h-5 ${
                        account.status === 'active' ? 'text-orange-400' : 
                        account.status === 'completed' ? 'text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{account.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {account.city}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(account.status)}>
                      {getStatusLabel(account.status)}
                    </Badge>
                    {account.status === 'active' && (
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    {account.status === 'paused' && (
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Прогресс</span>
                    <span className="text-white font-medium">{account.progress}%</span>
                  </div>
                  <Progress 
                    value={account.progress} 
                    className="h-2 bg-gray-700"
                  />
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {account.timeLeft}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};