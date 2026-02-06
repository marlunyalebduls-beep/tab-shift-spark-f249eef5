import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  isVisible: boolean;
}

interface BottomNavItem {
  id: NavItem;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const bottomNavItems: BottomNavItem[] = [
  { id: 'home', path: '/', label: 'Главная', icon: <HomeIcon className="w-[22px] h-[22px]" /> },
  { id: 'accounts', path: '/accounts', label: 'Аккаунты', icon: <AccountsIcon className="w-[22px] h-[22px]" /> },
  { id: 'order', path: '/order', label: 'Заказы', icon: <OrderIcon className="w-[22px] h-[22px]" /> },
  { id: 'payment', path: '/payment', label: 'Пополнение', icon: <PaymentIcon className="w-[22px] h-[22px]" /> },
  { id: 'faq', path: '/faq', label: 'FAQ', icon: <FAQIcon className="w-[22px] h-[22px]" /> },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  isVisible,
}) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="md:hidden fixed bottom-0 left-0 right-0 h-[70px] glass-dark border-t border-foreground/[0.08] z-[999] px-1.5"
    >
      <div className="flex justify-around items-center h-full">
        {bottomNavItems.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1.5 min-w-0 transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-muted-foreground/60'
              }`}
            >
              <span className={`mb-1 transition-transform duration-300 ${isActive ? '-translate-y-0.5' : ''}`}>
                {item.icon}
              </span>
              <span
                className={`text-[10px] text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full transition-all duration-300 ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
