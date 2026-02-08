import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { GuestOverlay } from '@/components/GuestOverlay';
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

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {user === null && <GuestOverlay onOpenAuth={onOpenAuth} />}
      </AnimatePresence>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Общие настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Play className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <Label className="text-foreground">Автозапуск при старте</Label>
                    <p className="text-sm text-muted-foreground">Автоматически запускать прогрев при входе</p>
                  </div>
                </div>
                <Switch checked={autoStart} onCheckedChange={setAutoStart} />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Bell className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <Label className="text-foreground">Уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления о статусе задач</p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Производительность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Параллельные задачи</Label>
                  <span className="text-primary font-medium">{parallelTasks[0]}</span>
                </div>
                <Slider
                  value={parallelTasks}
                  onValueChange={setParallelTasks}
                  min={1}
                  max={10}
                  step={1}
                />
                <p className="text-sm text-muted-foreground">
                  Количество одновременно выполняемых задач прогрева
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Скорость прогрева</Label>
                  <span className="text-primary font-medium">{warmupSpeed[0]}%</span>
                </div>
                <Slider
                  value={warmupSpeed}
                  onValueChange={setWarmupSpeed}
                  min={10}
                  max={100}
                  step={10}
                />
                <p className="text-sm text-muted-foreground">
                  Чем выше скорость, тем быстрее прогрев, но выше риск блокировки
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Proxy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Card className="bg-black/30 border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Прокси
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Прокси сервер</Label>
                  <Input 
                    placeholder="proxy.example.com:8080" 
                    className="bg-black/30 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Логин</Label>
                  <Input 
                    placeholder="username" 
                    className="bg-black/30 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Пароль</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-black/30 border-white/20"
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full border-white/20">
                    Проверить подключение
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="bg-green-600 hover:bg-green-700 px-8">
            <Save className="w-4 h-4 mr-2" />
            Сохранить настройки
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
