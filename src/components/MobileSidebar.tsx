import React from 'react';
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
  CloseIcon,
} from '@/components/icons/NavIcons';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavItem;
  onNavigate: (tab: NavItem) => void;
  user: User | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

interface NavItemData {
  id: NavItem;
  label: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItemData[] = [
  { id: 'home', label: 'Главная', icon: <HomeIcon className="w-[18px] h-[18px]" /> },
  { id: 'accounts', label: 'Аккаунты', icon: <AccountsIcon className="w-[18px] h-[18px]" /> },
  { id: 'order', label: 'Заказ товара', icon: <OrderIcon className="w-[18px] h-[18px]" /> },
  { id: 'warmup', label: 'Прогрев', icon: <WarmupIcon className="w-[18px] h-[18px]" /> },
  { id: 'emulator', label: 'Эмулятор', icon: <EmulatorIcon className="w-[18px] h-[18px]" /> },
  { id: 'faq', label: 'FAQ', icon: <FAQIcon className="w-[18px] h-[18px]" /> },
];

const additionalNavItems: NavItemData[] = [
  { id: 'config', label: 'Конфигурация', icon: <ConfigIcon className="w-4 h-[18px]" /> },
  { id: 'chat', label: 'Чат поддержки', icon: <ChatIcon className="w-4 h-[18px]" /> },
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  user,
  onOpenAuth,
  onOpenProfile,
}) => {
  const isAdmin = user?.role === 'admin';

  const handleNavClick = (tab: NavItem) => {
    onNavigate(tab);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[1400] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 w-[280px] h-screen glass-sidebar border-r border-foreground/10 z-[1500] flex flex-col overflow-y-auto transition-all duration-500 ease-smooth ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* User Profile / Guest Mode */}
        <div className="px-4 pt-6 pb-4">
          {user ? (
            <button
              onClick={() => {
                onClose();
                onOpenProfile();
              }}
              className={`w-full flex items-center p-4 rounded-xl bg-foreground/5 border border-foreground/[0.08] transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
              }`}
              style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}
            >
              <div className="w-12 h-12 rounded-full avatar-gradient flex items-center justify-center text-[22px] font-semibold text-primary-foreground mr-3.5 flex-shrink-0">
                {user.first_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-medium text-foreground/95 mb-1">
                  {user.first_name}
                </div>
                <div className="text-[13px] text-muted-foreground mb-1">
                  ID: {user.telegram_id}
                </div>
                <div className="text-[13px] font-medium text-primary">
                  ₽{Math.floor(user.balance)}
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className={`w-full flex items-center p-4 rounded-xl bg-secondary/40 border border-foreground/10 hover:bg-secondary/50 transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
              }`}
              style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}
            >
              <div className="w-[22px] h-[22px] mr-3.5 text-muted-foreground/60">
                <UserIcon className="w-full h-full" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-medium text-foreground/90 mb-1">
                  Гостевой режим
                </div>
                <div className="text-[13px] text-muted-foreground/50">
                  Нажмите для входа
                </div>
              </div>
              <span className="text-muted-foreground/40 text-xl">›</span>
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 pb-5">
          <h3
            className={`text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-5 mb-3 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'
            }`}
            style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}
          >
            ОСНОВНОЕ
          </h3>
          <div className="space-y-1">
            {mainNavItems.map((item, index) => (
              <MobileNavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => handleNavClick(item.id)}
                isOpen={isOpen}
                delay={0.05 + index * 0.02}
              />
            ))}
            {isAdmin && (
              <MobileNavButton
                item={{ id: 'admin', label: 'Управление', icon: <AdminIcon className="w-[18px] h-[18px]" /> }}
                isActive={activeTab === 'admin'}
                onClick={() => handleNavClick('admin')}
                isOpen={isOpen}
                delay={0.05 + mainNavItems.length * 0.02}
                badge="admin"
              />
            )}
          </div>

          {/* Divider */}
          <div
            className={`h-px bg-foreground/[0.08] mx-5 my-3 transition-all duration-300 ${
              isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
            }`}
            style={{ transitionDelay: isOpen ? '0.15s' : '0s' }}
          />

          <h3
            className={`text-[11px] font-normal text-muted-foreground/60 uppercase tracking-wider px-5 mb-3.5 mt-1.5 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'
            }`}
            style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}
          >
            ДОПОЛНИТЕЛЬНО
          </h3>
          <div className="space-y-0.5">
            {additionalNavItems.map((item, index) => (
              <MobileNavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => handleNavClick(item.id)}
                isOpen={isOpen}
                delay={0.1 + (mainNavItems.length + index) * 0.02}
                small
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

interface MobileNavButtonProps {
  item: NavItemData;
  isActive: boolean;
  onClick: () => void;
  isOpen: boolean;
  delay: number;
  small?: boolean;
  badge?: 'admin';
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({
  item,
  isActive,
  onClick,
  isOpen,
  delay,
  small,
  badge,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[calc(100%-32px)] mx-4 flex items-center rounded-xl transition-all duration-300 relative border ${
        small ? 'px-5 py-2.5 min-h-[42px]' : 'px-[18px] py-[13px]'
      } ${
        isActive
          ? 'gradient-active-nav text-primary border-primary/30'
          : 'text-foreground/70 border-transparent hover:bg-foreground/5 hover:text-foreground/90 hover:translate-x-1'
      } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`}
      style={{ transitionDelay: isOpen ? `${delay}s` : '0s' }}
    >
      <span
        className={`mr-3 transition-all duration-300 ${
          isActive ? 'text-primary' : 'text-muted-foreground/60'
        }`}
      >
        {item.icon}
      </span>
      <span
        className={`transition-all duration-300 ${
          small ? 'text-sm font-light text-foreground/70' : 'text-[15px] font-normal'
        } ${isActive ? (small ? 'font-normal text-primary' : 'font-medium text-primary') : ''}`}
      >
        {item.label}
      </span>
      {badge === 'admin' && <span className="badge-admin ml-auto">permis</span>}
      {isActive && (
        <span className="absolute right-4 text-primary text-2xl leading-none">•</span>
      )}
    </button>
  );
};
