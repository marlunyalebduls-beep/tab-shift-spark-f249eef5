import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavItem, User } from '@/types/navigation';
import {
  HomeIcon,
  AccountsIcon,
  OrderIcon,
  WarmupIcon,
  EmulatorIcon,
  FAQIcon,
  ConfigIcon,
  PaymentIcon,
  ChatIcon,
  AdminIcon,
  UserIcon,
} from '@/components/icons/NavIcons';
import logoImg from '@/assets/logo.png';
import logoTextImg from '@/assets/logo-text.png';

interface SidebarProps {
  activeTab: NavItem;
  user: User | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  isVisible: boolean;
}

interface NavItemData {
  id: NavItem;
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: 'new' | 'admin';
}

const mainNavItems: NavItemData[] = [
  { id: 'home', path: '/', label: 'Главная', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'accounts', path: '/accounts', label: 'Аккаунты', icon: <AccountsIcon className="w-5 h-5" /> },
  { id: 'order', path: '/order', label: 'Заказ товара', icon: <OrderIcon className="w-5 h-5" /> },
  { id: 'warmup', path: '/warmup', label: 'Прогрев', icon: <WarmupIcon className="w-5 h-5" /> },
  { id: 'emulator', path: '/emulator', label: 'Эмулятор управления', icon: <EmulatorIcon className="w-5 h-5" /> },
  { id: 'faq', path: '/faq', label: 'FAQ', icon: <FAQIcon className="w-5 h-5" /> },
];

const settingsNavItems: NavItemData[] = [
  { id: 'config', path: '/config', label: 'Конфигурация фермы', icon: <ConfigIcon className="w-5 h-5" /> },
  { id: 'payment', path: '/payment', label: 'Пополнение', icon: <PaymentIcon className="w-5 h-5" />, badge: 'new' },
  { id: 'chat', path: '/chat', label: 'Чат поддержки', icon: <ChatIcon className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  user,
  onOpenAuth,
  onOpenProfile,
  isVisible,
}) => {
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ 
        x: isVisible ? 0 : -280, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex flex-col w-[260px] h-full gradient-sidebar border-r border-sidebar-border z-10"
    >
      {/* Header with Logo */}
      <motion.div 
        className="px-5 pt-6 pb-4 border-b border-sidebar-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <a 
          href="https://zakazsplit.tech/" 
          className="flex items-center gap-3 group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.img
            src={logoImg}
            alt="Logo"
            className="w-[38px] h-[38px] object-contain opacity-90"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          />
          <motion.img
            src={logoTextImg}
            alt="ZAKAZSPLIT"
            className="h-[30px] w-[105px] object-contain opacity-90 brightness-110"
            whileHover={{ opacity: 0.75 }}
          />
        </a>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 py-5 overflow-y-auto custom-scrollbar">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-5 mb-3">
            ОСНОВНОЕ
          </h3>
          <div className="space-y-0.5">
            {mainNavItems.map((item, index) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => navigate(item.path)}
                delay={0.3 + index * 0.05}
              />
            ))}
            {isAdmin && (
              <NavButton
                item={{ id: 'admin', path: '/admin', label: 'Управление', icon: <AdminIcon className="w-5 h-5" />, badge: 'admin' }}
                isActive={activeTab === 'admin'}
                onClick={() => navigate('/admin')}
                delay={0.3 + mainNavItems.length * 0.05}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-5 mb-3">
            НАСТРОЙКИ
          </h3>
          <div className="space-y-0.5">
            {settingsNavItems.map((item, index) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => navigate(item.path)}
                delay={0.5 + index * 0.05}
              />
            ))}
          </div>
        </motion.div>
      </nav>

      {/* User Profile / Guest Mode */}
      <motion.div 
        className="px-4 pb-5 pt-2 border-t border-sidebar-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {user ? (
          <motion.button
            onClick={onOpenProfile}
            className="w-full flex items-center p-3 rounded-lg bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-full avatar-gradient flex items-center justify-center text-base font-semibold text-primary-foreground mr-2.5 flex-shrink-0">
              {user.first_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-foreground/95 truncate">
                {user.first_name}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                ID: {user.telegram_id}
              </div>
              <div className="text-[11px] font-medium text-primary">
                ₽{Math.floor(user.balance)}
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.button
            onClick={onOpenAuth}
            className="w-full flex items-center p-3 rounded-lg bg-secondary/40 border border-foreground/10 hover:bg-secondary/60 transition-all duration-300 group"
            whileHover={{ x: 4 }}
          >
            <div className="w-5 h-5 mr-2.5 text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
              <UserIcon className="w-full h-full" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                Гостевой режим
              </div>
              <div className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                Нажмите для входа
              </div>
            </div>
            <span className="text-muted-foreground/40 text-sm group-hover:text-muted-foreground/60 transition-all">
              ›
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.aside>
  );
};

interface NavButtonProps {
  item: NavItemData;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, onClick, delay = 0 }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: isActive ? 0 : 8 }}
      whileTap={{ scale: 0.98 }}
      className={`w-[calc(100%-32px)] mx-4 flex items-center px-3 py-3 rounded-lg transition-all duration-300 relative border group ${
        isActive
          ? 'gradient-active-nav text-primary border-primary/30'
          : 'text-sidebar-foreground border-transparent hover:bg-foreground/[0.03] hover:text-foreground/90'
      }`}
    >
      <motion.span
        className={`w-5 h-5 mr-3 transition-all duration-300 ${
          isActive ? 'text-primary' : 'text-muted-foreground'
        }`}
        animate={{ scale: isActive ? 1.1 : 1 }}
      >
        {item.icon}
      </motion.span>
      <span
        className={`text-sm transition-all duration-300 ${
          isActive ? 'font-medium text-primary' : 'font-normal'
        }`}
      >
        {item.label}
      </span>
      {item.badge === 'new' && <span className="badge-new ml-auto">Новое</span>}
      {item.badge === 'admin' && <span className="badge-admin ml-auto">permis</span>}
      {isActive && (
        <motion.span 
          className="absolute right-3 text-primary text-sm"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          &gt;
        </motion.span>
      )}
    </motion.button>
  );
};
