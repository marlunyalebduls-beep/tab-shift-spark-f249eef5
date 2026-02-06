import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  Flame, 
  Wallet,
  Smartphone,
  ShoppingCart,
  User,
  type LucideIcon
} from 'lucide-react';

const mockPurchasedAccounts = [
  { id: 'acc_001', name: 'Аккаунт #1', city: 'Москва', split: 50000, status: 'active' },
  { id: 'acc_002', name: 'Аккаунт #2', city: 'Санкт-Петербург', split: 75000, status: 'warmup' },
  { id: 'acc_003', name: 'Аккаунт #3', city: 'Казань', split: 100000, status: 'active' },
];

// Mobile navigation tiles with icons
const mobileTiles: {
  id: string;
  path: string;
  label: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}[] = [
  { 
    id: 'accounts', 
    path: '/accounts', 
    label: 'Аккаунты', 
    Icon: User,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/15',
    borderColor: 'border-yellow-500/30'
  },
  { 
    id: 'orders', 
    path: '/order', 
    label: 'Заказы', 
    Icon: Package,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/30'
  },
  { 
    id: 'emulator', 
    path: '/emulator', 
    label: 'Эмулятор', 
    Icon: Smartphone,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/15',
    borderColor: 'border-purple-500/30'
  },
  { 
    id: 'order-product', 
    path: '/order', 
    label: 'Заказ товара', 
    Icon: ShoppingCart,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/30'
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

      {/* Mobile Layout - Always visible for guests */}
      <motion.div 
        className="md:hidden flex flex-col gap-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-2"
        >
          <h1 className="text-2xl font-bold text-primary mb-1">zakazsplit.tech</h1>
          <p className="text-muted-foreground text-sm">Добро пожаловать, ознакомьтесь с функциями сайта</p>
        </motion.div>

        {/* Navigation Tiles - Rectangles */}
        <div className="grid grid-cols-2 gap-3">
          {mobileTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(tile.path)}
              className="py-5 px-4 rounded-xl bg-card/70 border border-border/40 backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center gap-2.5 hover:bg-card/90 hover:border-primary/40 active:scale-[0.98] transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${tile.bgColor} border ${tile.borderColor} flex items-center justify-center`}>
                <tile.Icon className={`w-5 h-5 ${tile.iconColor}`} />
              </div>
              <span className="text-foreground font-medium text-sm">{tile.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex gap-3"
        >
          <div className="flex-1 py-4 px-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">{user ? '12' : '—'}</p>
                <p className="text-[11px] text-muted-foreground">Активные</p>
              </div>
            </div>
          </div>
          <div className="flex-1 py-4 px-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">{user ? `₽${Math.floor(user.balance)}` : '—'}</p>
                <p className="text-[11px] text-muted-foreground">Баланс</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="py-4 px-4 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Прогрев аккаунтов</p>
              <p className="text-xs text-muted-foreground mt-0.5">Безопасный прогрев с реальной активностью</p>
            </div>
          </div>
        </motion.div>

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
