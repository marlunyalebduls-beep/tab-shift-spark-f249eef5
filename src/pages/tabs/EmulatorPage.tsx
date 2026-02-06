import React from 'react';
import { User } from '@/types/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmulatorPageProps {
  user: User | null;
  onOpenAuth: () => void;
}

export const EmulatorPage: React.FC<EmulatorPageProps> = ({ user, onOpenAuth }) => {
  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
            Для доступа к эмулятору необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  const devices = [
    { id: 1, name: 'Device-001', status: 'online', ip: '192.168.1.101', uptime: '12h 34m' },
    { id: 2, name: 'Device-002', status: 'online', ip: '192.168.1.102', uptime: '8h 15m' },
    { id: 3, name: 'Device-003', status: 'offline', ip: '192.168.1.103', uptime: '—' },
    { id: 4, name: 'Device-004', status: 'online', ip: '192.168.1.104', uptime: '2h 45m' },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <Button className="gradient-primary text-primary-foreground">
          🚀 Запустить все
        </Button>
        <Button variant="outline" className="border-foreground/10">
          ⏹️ Остановить все
        </Button>
        <Button variant="outline" className="border-foreground/10">
          🔄 Перезапуск
        </Button>
        <Button variant="outline" className="border-foreground/10">
          ➕ Добавить устройство
        </Button>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="bg-card/50 border-foreground/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    device.status === 'online' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  {device.name}
                </CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  device.status === 'online' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {device.status === 'online' ? 'В сети' : 'Офлайн'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">IP адрес</p>
                  <p className="text-foreground font-mono">{device.ip}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="text-foreground">{device.uptime}</p>
                </div>
              </div>
              
              {/* Mini Preview */}
              <div className="aspect-video bg-secondary/50 rounded-lg border border-foreground/5 flex items-center justify-center">
                {device.status === 'online' ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-sm text-muted-foreground">Экран устройства</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Устройство офлайн</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-foreground/10"
                  disabled={device.status === 'offline'}
                >
                  👁️ Просмотр
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-foreground/10"
                  disabled={device.status === 'offline'}
                >
                  ⚙️ Настройки
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-foreground/10"
                >
                  {device.status === 'online' ? '⏹️' : '▶️'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
