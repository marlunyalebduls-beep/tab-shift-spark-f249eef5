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
      initial={{ left: -260, opacity: 0 }}
      animate={{ 
        left: isVisible ? 0 : -260, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex flex-col w-[260px] h-full z-10 relative"
      style={{
        background: 'linear-gradient(to bottom right, rgba(58, 177, 228, 0.06) 0%, rgba(0, 0, 0, 0) 49.9%, rgba(0, 0, 0, 0) 50.1%, rgba(59, 130, 246, 0.05) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(4px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Header with Logo */}
      <motion.div 
        className="px-5 pt-6 pb-4 border-b border-foreground/[0.08]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <a 
          href="https://zakazsplit.tech/" 
          className="flex items-center gap-3 group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            className="w-[44px] h-[44px] flex items-center justify-center"
            whileHover={{ rotate: -15, scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full object-contain opacity-95 group-hover:opacity-75 transition-opacity duration-400"
            />
          </motion.div>
          <div className="w-[130px] h-[40px] flex items-center justify-center">
            <img
              src={logoTextImg}
              alt="ZAKAZSPLIT"
              className="w-full h-full object-contain opacity-90 group-hover:opacity-75 transition-opacity duration-400"
            />
          </div>
        </a>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 py-5 overflow-y-auto custom-scrollbar">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.h3 
            className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-5 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            ОСНОВНОЕ
          </motion.h3>
          <div className="space-y-0.5">
            {mainNavItems.map((item, index) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => navigate(item.path)}
                delay={0.4 + index * 0.05}
                isVisible={isVisible}
              />
            ))}
            {isAdmin && (
              <NavButton
                item={{ id: 'admin', path: '/admin', label: 'Управление', icon: <AdminIcon className="w-5 h-5" />, badge: 'admin' }}
                isActive={activeTab === 'admin'}
                onClick={() => navigate('/admin')}
                delay={0.4 + mainNavItems.length * 0.05}
                isVisible={isVisible}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.h3 
            className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-5 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            НАСТРОЙКИ
          </motion.h3>
          <div className="space-y-0.5">
            {settingsNavItems.map((item, index) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => navigate(item.path)}
                delay={0.5 + index * 0.05}
                isVisible={isVisible}
              />
            ))}
          </div>
        </motion.div>
      </nav>

      {/* User Profile / Guest Mode */}
      <motion.div 
        className="px-4 pb-5 pt-2.5 border-t border-foreground/[0.08]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {user ? (
          <motion.button
            onClick={onOpenProfile}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 5 }}
            transition={{ delay: 0.5, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full flex items-center p-3 rounded-[10px] bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300 min-h-[60px]"
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
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 5 }}
            transition={{ delay: 0.5, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full flex items-center p-3 rounded-[10px] bg-secondary/40 border border-foreground/10 hover:bg-secondary/60 hover:translate-x-1 transition-all duration-300 min-h-[60px]"
          >
            <div className="w-5 h-5 mr-2.5 text-muted-foreground/60">
              <UserIcon className="w-full h-full" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-foreground/90">
                Гостевой режим
              </div>
              <div className="text-xs text-muted-foreground/50">
                Нажмите для входа
              </div>
            </div>
            <span className="text-muted-foreground/40 text-sm">
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
  isVisible: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, onClick, delay = 0, isVisible }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 12 }}
      transition={{ delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className={`w-[calc(100%-32px)] mx-4 flex items-center px-3 py-3 rounded-lg transition-all duration-300 relative border ${
        isActive
          ? 'gradient-active-nav text-primary border-primary/30'
          : 'text-sidebar-foreground border-transparent hover:bg-foreground/[0.03] hover:text-foreground/90 hover:translate-x-2'
      }`}
    >
      <span
        className={`w-5 h-5 mr-3 transition-all duration-300 ${
          isActive ? 'text-primary scale-110' : 'text-muted-foreground'
        }`}
      >
        {item.icon}
      </span>
      <span
        className={`text-sm transition-all duration-300 ${
          isActive ? 'font-medium text-primary translate-x-0.5' : 'font-normal'
        }`}
      >
        {item.label}
      </span>
      {item.badge === 'new' && <span className="badge-new ml-auto">Новое</span>}
      {item.badge === 'admin' && <span className="badge-admin ml-auto">permis</span>}
      {isActive && (
        <motion.span 
          className="absolute right-3 text-primary text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          &gt;
        </motion.span>
      )}
    </motion.button>
  );
};
