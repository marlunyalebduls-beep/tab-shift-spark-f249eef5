import React from 'react';
import { NavItem } from '@/types/navigation';
import {
  HomeIcon,
  AccountsIcon,
  OrderIcon,
  PaymentIcon,
  FAQIcon,
} from '@/components/icons/NavIcons';

interface BottomNavProps {
  activeTab: NavItem;
  onNavigate: (tab: NavItem) => void;
  isVisible: boolean;
}

interface BottomNavItem {
  id: NavItem;
  label: string;
  icon: React.ReactNode;
}

const bottomNavItems: BottomNavItem[] = [
  { id: 'home', label: 'Главная', icon: <HomeIcon className="w-[22px] h-[22px]" /> },
  { id: 'accounts', label: 'Аккаунты', icon: <AccountsIcon className="w-[22px] h-[22px]" /> },
  { id: 'order', label: 'Заказы', icon: <OrderIcon className="w-[22px] h-[22px]" /> },
  { id: 'payment', label: 'Пополнение', icon: <PaymentIcon className="w-[22px] h-[22px]" /> },
  { id: 'faq', label: 'FAQ', icon: <FAQIcon className="w-[22px] h-[22px]" /> },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  isVisible,
}) => {
  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 h-[70px] glass-dark border-t border-foreground/[0.08] z-[999] px-1.5 transition-all duration-400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex justify-around items-center h-full">
        {bottomNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1.5 min-w-0 transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-muted-foreground/60'
              }`}
            >
              <span
                className={`mb-1 transition-transform duration-300 ${
                  isActive ? '-translate-y-0.5' : ''
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full transition-all duration-300 ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
