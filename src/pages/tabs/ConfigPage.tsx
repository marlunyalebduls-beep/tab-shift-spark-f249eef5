import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Zap, 
  Globe,
  Save,
  Bell,
  Play
} from 'lucide-react';

export const ConfigPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [autoStart, setAutoStart] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [parallelTasks, setParallelTasks] = useState([3]);
  const [warmupSpeed, setWarmupSpeed] = useState([50]);

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для настройки фермы необходимо авторизоваться
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              Конфигурация фермы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Настройки прогрева, производительности и прокси
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Общие настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Play className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <Label className="text-white">Автозапуск при старте</Label>
                  <p className="text-sm text-gray-400">Автоматически запускать прогрев при входе</p>
                </div>
              </div>
              <Switch
                checked={autoStart}
                onCheckedChange={setAutoStart}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <Label className="text-white">Уведомления</Label>
                  <p className="text-sm text-gray-400">Получать уведомления о статусе задач</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Производительность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Параллельные задачи</Label>
                <span className="text-primary font-medium">{parallelTasks[0]}</span>
              </div>
              <Slider
                value={parallelTasks}
                onValueChange={setParallelTasks}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-400">
                Количество одновременно выполняемых задач прогрева
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Скорость прогрева</Label>
                <span className="text-primary font-medium">{warmupSpeed[0]}%</span>
              </div>
              <Slider
                value={warmupSpeed}
                onValueChange={setWarmupSpeed}
                min={10}
                max={100}
                step={10}
                className="w-full"
              />
              <p className="text-sm text-gray-400">
                Чем выше скорость, тем быстрее прогрев, но выше риск блокировки
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Proxy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Прокси
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Прокси сервер</Label>
                <Input 
                  placeholder="proxy.example.com:8080" 
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Логин</Label>
                <Input 
                  placeholder="username" 
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Пароль</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                  Проверить подключение
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
          <Save className="w-4 h-4 mr-2" />
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
};