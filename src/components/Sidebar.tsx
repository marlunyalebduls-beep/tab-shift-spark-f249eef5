import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    <aside
      className={`hidden md:flex flex-col w-[260px] h-full gradient-sidebar border-r border-sidebar-border z-10 transition-all duration-600 ease-bounce-soft ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      {/* Header with Logo */}
      <div className="px-5 pt-6 pb-4 border-b border-sidebar-border">
        <a 
          href="https://zakazsplit.tech/" 
          className="flex items-center gap-3 group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://zakazsplit.tech/logo1.png"
            alt="Logo"
            className="w-[38px] h-[38px] object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-75"
          />
          <img
            src="https://zakazsplit.tech/text.png"
            alt="ZAKAZSPLIT"
            className="h-[30px] w-[105px] object-contain opacity-90 brightness-110 transition-opacity duration-300 group-hover:opacity-75"
          />
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-5 overflow-y-auto custom-scrollbar">
        <div className="mb-6">
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
                delay={index * 0.03}
              />
            ))}
            {isAdmin && (
              <NavButton
                item={{ id: 'admin', path: '/admin', label: 'Управление', icon: <AdminIcon className="w-5 h-5" />, badge: 'admin' }}
                isActive={activeTab === 'admin'}
                onClick={() => navigate('/admin')}
                delay={mainNavItems.length * 0.03}
              />
            )}
          </div>
        </div>

        <div>
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
                delay={(mainNavItems.length + index) * 0.03}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile / Guest Mode */}
      <div className="px-4 pb-5 pt-2 border-t border-sidebar-border">
        {user ? (
          <button
            onClick={onOpenProfile}
            className="w-full flex items-center p-3 rounded-lg bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300 group"
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
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center p-3 rounded-lg bg-secondary/40 border border-foreground/10 hover:bg-secondary/60 hover:translate-x-1 transition-all duration-300 group"
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
            <span className="text-muted-foreground/40 text-sm group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 transition-all">
              ›
            </span>
          </button>
        )}
      </div>
    </aside>
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
    <button
      onClick={onClick}
      className={`w-[calc(100%-32px)] mx-4 flex items-center px-3 py-3 rounded-lg transition-all duration-300 relative border group ${
        isActive
          ? 'gradient-active-nav text-primary border-primary/30'
          : 'text-sidebar-foreground border-transparent hover:bg-foreground/[0.03] hover:text-foreground/90 hover:translate-x-2'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span
        className={`w-5 h-5 mr-3 transition-all duration-300 ${
          isActive ? 'text-primary scale-110' : 'text-muted-foreground group-hover:scale-110'
        }`}
      >
        {item.icon}
      </span>
      <span
        className={`text-sm transition-all duration-300 ${
          isActive ? 'font-medium text-primary translate-x-0.5' : 'font-normal group-hover:translate-x-0.5'
        }`}
      >
        {item.label}
      </span>
      {item.badge === 'new' && <span className="badge-new ml-auto">Новое</span>}
      {item.badge === 'admin' && <span className="badge-admin ml-auto">permis</span>}
      {isActive && (
        <span className="absolute right-3 text-primary text-sm opacity-100 transition-all duration-300">
          &gt;
        </span>
      )}
    </button>
  );
};
