import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Flame, 
  Play, 
  Pause, 
  Clock,
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Zap,
  FileText,
  X,
  Terminal
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

const mockLogs = [
  { time: '12:45:32', account: 'Аккаунт #4', action: 'Авторизация успешна', type: 'success' },
  { time: '12:45:35', account: 'Аккаунт #4', action: 'Переход на главную страницу', type: 'info' },
  { time: '12:45:40', account: 'Аккаунт #4', action: 'Скроллинг ленты - 15 секунд', type: 'info' },
  { time: '12:45:55', account: 'Аккаунт #5', action: 'Лайк поста #4521', type: 'success' },
  { time: '12:46:10', account: 'Аккаунт #4', action: 'Комментарий отправлен', type: 'success' },
  { time: '12:46:25', account: 'Аккаунт #6', action: 'Просмотр сторис @user_123', type: 'info' },
  { time: '12:46:40', account: 'Аккаунт #4', action: 'Подписка на @shop_official', type: 'success' },
  { time: '12:47:00', account: 'Аккаунт #5', action: 'Ожидание перед действием...', type: 'warning' },
];

export const WarmupPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [showLogs, setShowLogs] = useState(false);
  
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 62,
    gpu: 38,
    ssd: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(20, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.min(100, Math.max(40, prev.ram + (Math.random() - 0.5) * 8)),
        gpu: Math.min(100, Math.max(10, prev.gpu + (Math.random() - 0.5) * 12)),
        ssd: Math.min(100, Math.max(5, prev.ssd + (Math.random() - 0.5) * 5))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const getMetricColor = (value: number) => {
    if (value < 50) return 'text-green-400';
    if (value < 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="relative min-h-full">
      {!user && <GuestOverlay onOpenAuth={onOpenAuth} />}

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* System Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Загруженность системы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'CPU', value: metrics.cpu, icon: Cpu },
                  { label: 'RAM', value: metrics.ram, icon: MemoryStick },
                  { label: 'GPU', value: metrics.gpu, icon: Zap },
                  { label: 'SSD', value: metrics.ssd, icon: HardDrive },
                ].map((metric, index) => (
                  <motion.div 
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="p-4 rounded-lg bg-black/20 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <metric.icon className={`w-4 h-4 ${getMetricColor(metric.value)}`} />
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                      <span className={`text-lg font-bold ${getMetricColor(metric.value)}`}>
                        {Math.round(metric.value)}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2 bg-black/30" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Запустить все
          </Button>
          <Button variant="outline" className="border-white/20">
            <Pause className="w-4 h-4 mr-2" />
            Приостановить
          </Button>
          <Button 
            variant="outline" 
            className="border-white/20"
            onClick={() => setShowLogs(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Просмотр логов
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Активных', value: mockWarmupAccounts.filter(a => a.status === 'active').length, color: 'text-green-400' },
            { label: 'На паузе', value: mockWarmupAccounts.filter(a => a.status === 'paused').length, color: 'text-yellow-400' },
            { label: 'Завершено', value: mockWarmupAccounts.filter(a => a.status === 'completed').length, color: 'text-blue-400' },
            { label: 'Всего', value: mockWarmupAccounts.length, color: 'text-primary' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-black/30 border border-white/20">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Warmup Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-black/30 border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                Аккаунты на прогреве
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockWarmupAccounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="p-4 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        account.status === 'active' ? 'bg-orange-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Flame className={`w-5 h-5 ${
                          account.status === 'active' ? 'text-orange-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(account.status)}>
                        {getStatusLabel(account.status)}
                      </Badge>
                      {account.status === 'active' && (
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {account.status === 'paused' && (
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="text-foreground font-medium">{account.progress}%</span>
                    </div>
                    <Progress value={account.progress} className="h-2 bg-black/30" />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {account.timeLeft}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Logs Modal */}
      <AnimatePresence>
        {showLogs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowLogs(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-3xl max-h-[80vh] bg-gray-900 border border-white/20 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-medium">Логи прогрева</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowLogs(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh] font-mono text-sm">
                {mockLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`py-2 px-3 rounded mb-1 ${
                      log.type === 'success' ? 'bg-green-500/10 text-green-400' :
                      log.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    <span className="text-muted-foreground">[{log.time}]</span>{' '}
                    <span className="text-foreground">{log.account}:</span>{' '}
                    {log.action}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
