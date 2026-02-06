import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent } from '@/components/ui/card';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  Users, 
  Package, 
  Flame, 
  Wallet,
  Smartphone,
  ShoppingCart
} from 'lucide-react';

const mockPurchasedAccounts = [
  { id: 'acc_001', name: 'Аккаунт #1', city: 'Москва', split: 50000, status: 'active' },
  { id: 'acc_002', name: 'Аккаунт #2', city: 'Санкт-Петербург', split: 75000, status: 'warmup' },
  { id: 'acc_003', name: 'Аккаунт #3', city: 'Казань', split: 100000, status: 'active' },
];

// Mobile navigation tiles
const mobileTiles = [
  { 
    id: 'accounts', 
    path: '/accounts', 
    label: 'Аккаунты', 
    emoji: '👤',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/40'
  },
  { 
    id: 'orders', 
    path: '/order', 
    label: 'Заказы', 
    emoji: '📦',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/40'
  },
  { 
    id: 'emulator', 
    path: '/emulator', 
    label: 'Эмулятор', 
    emoji: '📱',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/40'
  },
  { 
    id: 'order-product', 
    path: '/order', 
    label: 'Заказ товара', 
    emoji: '🛒',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/40'
  },
];

export const HomePage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const navigate = useNavigate();
  const purchasedAccounts = user ? mockPurchasedAccounts : [];

  const stats = [
    { label: 'Активные аккаунты', value: user ? '12' : '—', icon: Users },
    { label: 'Заказы в работе', value: user ? '3' : '—', icon: Package },
    { label: 'На прогреве', value: user ? '5' : '—', icon: Flame },
    { label: 'Баланс', value: user ? `₽${Math.floor(user.balance)}` : '—', icon: Wallet },
  ];

  return (
    <div className="relative min-h-full">
      {!user && <GuestOverlay onOpenAuth={onOpenAuth} />}

      {/* Mobile Layout - 4 Square Tiles */}
      <motion.div 
        className="md:hidden grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {mobileTiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(tile.path)}
            className={`aspect-square rounded-2xl ${tile.bgColor} ${tile.borderColor} border-2 backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform duration-200`}
          >
            <div className="text-4xl">{tile.emoji}</div>
            <span className="text-foreground font-medium text-sm">{tile.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop Layout - Original Stats + Accounts */}
      <motion.div 
        className="hidden md:block space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Stats Grid - Original Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Purchased Accounts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card className="bg-card/50 border border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Ваши аккаунты</h3>
              
              {purchasedAccounts.length > 0 ? (
                <div className="space-y-3">
                  {purchasedAccounts.map((account, index) => (
                    <motion.div 
                      key={account.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 hover:bg-background/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{account.name}</p>
                          <p className="text-sm text-muted-foreground">{account.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-foreground font-medium">{(account.split / 1000).toFixed(0)}K сплит</p>
                        <p className={`text-xs ${account.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {account.status === 'active' ? 'Активен' : 'Прогрев'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground/50 text-lg">У вас нет аккаунтов</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
