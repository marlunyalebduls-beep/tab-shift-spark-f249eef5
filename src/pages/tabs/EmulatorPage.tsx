import React from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Smartphone,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';

const mockPhoneSpecs = [
  { label: 'Модель', value: 'Samsung Galaxy S23' },
  { label: 'Android', value: '14.0' },
  { label: 'CPU', value: 'Snapdragon 8 Gen 2' },
  { label: 'RAM', value: '8 GB' },
  { label: 'Хранилище', value: '256 GB' },
  { label: 'IMEI', value: '35x-xxx-xxx-xxx-xx3' },
  { label: 'IP', value: '192.168.1.xxx' },
  { label: 'Статус', value: 'В разработке' },
];

export const EmulatorPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();

  return (
    <div className="relative min-h-full">
      {!user && <GuestOverlay onOpenAuth={onOpenAuth} />}

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phone Mockup - Center */}
          <motion.div 
            className="lg:col-span-2 flex items-center justify-center min-h-[500px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              {/* Phone Frame */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                {/* Phone body */}
                <div className="w-[280px] h-[560px] bg-black rounded-[40px] border-4 border-gray-800 shadow-2xl overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
                  
                  {/* Screen */}
                  <div className="absolute inset-2 bg-black rounded-[32px] flex flex-col items-center justify-center">
                    {/* Floating animation for content */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Smartphone className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Эмулятор</h3>
                      <p className="text-primary text-lg">в разработке</p>
                    </motion.div>
                    
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                  </div>
                  
                  {/* Home button indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-primary rounded-full scale-75" />
              </motion.div>

              {/* Status text below phone */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6 text-muted-foreground"
              >
                Удалённое управление эмулятором Android
              </motion.p>
            </div>
          </motion.div>

          {/* Specs Table - Right */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-black/30 border border-white/20 backdrop-blur-sm w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  Характеристики устройства
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockPhoneSpecs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                      className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-xs text-muted-foreground">{spec.label}</span>
                      <span className="text-xs text-foreground font-mono">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Status indicators */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-muted-foreground">Подключение стабильно</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">Функция в разработке</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="bg-primary/10 border border-primary/30">
            <CardContent className="p-4">
              <p className="text-sm text-primary">
                🚀 Эмулятор Android позволит удалённо управлять виртуальными устройствами для прогрева аккаунтов. Функционал находится в активной разработке.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
