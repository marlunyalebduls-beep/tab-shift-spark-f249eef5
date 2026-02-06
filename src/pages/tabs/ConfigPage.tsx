import React, { useState } from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export const ConfigPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [autoStart, setAutoStart] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [parallelTasks, setParallelTasks] = useState([3]);
  const [warmupSpeed, setWarmupSpeed] = useState([50]);

  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
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
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">⚙️ Общие настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-start" className="text-foreground">Автозапуск при старте</Label>
              <p className="text-sm text-muted-foreground">Автоматически запускать прогрев при входе</p>
            </div>
            <Switch
              id="auto-start"
              checked={autoStart}
              onCheckedChange={setAutoStart}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-foreground">Уведомления</Label>
              <p className="text-sm text-muted-foreground">Получать уведомления о статусе задач</p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🚀 Производительность</CardTitle>
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
              className="w-full"
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
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Чем выше скорость, тем быстрее прогрев, но выше риск блокировки
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🌐 Прокси</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Прокси сервер</Label>
              <Input 
                placeholder="proxy.example.com:8080" 
                className="bg-secondary/50 border-foreground/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Логин</Label>
              <Input 
                placeholder="username" 
                className="bg-secondary/50 border-foreground/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Пароль</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-secondary/50 border-foreground/10"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full border-foreground/10">
                Проверить подключение
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gradient-primary text-primary-foreground px-8">
          💾 Сохранить настройки
        </Button>
      </div>
    </div>
  );
};
