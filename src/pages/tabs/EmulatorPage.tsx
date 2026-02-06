import React from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Play, 
  Power, 
  RefreshCw, 
  Plus,
  Wifi,
  WifiOff,
  Settings,
  Eye
} from 'lucide-react';

interface Device {
  id: number;
  name: string;
  status: 'online' | 'offline';
  ip: string;
  uptime: string;
}

const devices: Device[] = [
  { id: 1, name: 'Device-001', status: 'online', ip: '192.168.1.101', uptime: '12h 34m' },
  { id: 2, name: 'Device-002', status: 'online', ip: '192.168.1.102', uptime: '8h 15m' },
  { id: 3, name: 'Device-003', status: 'offline', ip: '192.168.1.103', uptime: '—' },
  { id: 4, name: 'Device-004', status: 'online', ip: '192.168.1.104', uptime: '2h 45m' },
];

export const EmulatorPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для доступа к эмулятору необходимо авторизоваться
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
              <Monitor className="w-6 h-6 text-primary" />
              Эмулятор управления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Удалённое управление виртуальными устройствами
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Play className="w-4 h-4 mr-2" />
          Запустить все
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Power className="w-4 h-4 mr-2" />
          Остановить все
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <RefreshCw className="w-4 h-4 mr-2" />
          Перезапуск
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Plus className="w-4 h-4 mr-2" />
          Добавить устройство
        </Button>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    {device.status === 'online' ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    {device.name}
                  </CardTitle>
                  <Badge className={device.status === 'online' 
                    ? 'bg-green-600/20 text-green-400 border-green-700' 
                    : 'bg-red-600/20 text-red-400 border-red-700'
                  }>
                    {device.status === 'online' ? 'В сети' : 'Офлайн'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">IP адрес</p>
                    <p className="text-white font-mono">{device.ip}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Uptime</p>
                    <p className="text-white">{device.uptime}</p>
                  </div>
                </div>
                
                <div className="aspect-video bg-gray-900/50 rounded-lg border border-gray-700 flex items-center justify-center">
                  {device.status === 'online' ? (
                    <div className="text-center">
                      <Monitor className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Экран устройства</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Устройство офлайн</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-gray-600 text-gray-300"
                    disabled={device.status === 'offline'}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Просмотр
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-gray-600 text-gray-300"
                    disabled={device.status === 'offline'}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Настройки
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-600 text-gray-300"
                  >
                    {device.status === 'online' ? <Power className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};