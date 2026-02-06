import React from 'react';
import { NavItem, User } from '@/types/navigation';
import {
  HomePage,
  AccountsPage,
  OrderPage,
  WarmupPage,
  EmulatorPage,
  FAQPage,
  ConfigPage,
  PaymentPage,
  ChatPage,
  AdminPage,
} from '@/pages/tabs';

interface MainContentProps {
  activeTab: NavItem;
  user: User | null;
  onOpenAuth: () => void;
}

const tabTitles: Record<NavItem, string> = {
  home: 'Главная',
  accounts: 'Аккаунты',
  order: 'Заказ товара',
  warmup: 'Прогрев',
  emulator: 'Эмулятор управления',
  faq: 'FAQ',
  config: 'Конфигурация фермы',
  payment: 'Пополнение',
  chat: 'Чат поддержки',
  admin: 'Админ панель',
};

export const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  user,
  onOpenAuth,
}) => {
  const title = tabTitles[activeTab];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage user={user} onOpenAuth={onOpenAuth} />;
      case 'accounts':
        return <AccountsPage user={user} onOpenAuth={onOpenAuth} />;
      case 'order':
        return <OrderPage user={user} onOpenAuth={onOpenAuth} />;
      case 'warmup':
        return <WarmupPage user={user} onOpenAuth={onOpenAuth} />;
      case 'emulator':
        return <EmulatorPage user={user} onOpenAuth={onOpenAuth} />;
      case 'faq':
        return <FAQPage />;
      case 'config':
        return <ConfigPage user={user} onOpenAuth={onOpenAuth} />;
      case 'payment':
        return <PaymentPage user={user} onOpenAuth={onOpenAuth} />;
      case 'chat':
        return <ChatPage user={user} onOpenAuth={onOpenAuth} />;
      case 'admin':
        return <AdminPage user={user} onOpenAuth={onOpenAuth} />;
      default:
        return <HomePage user={user} onOpenAuth={onOpenAuth} />;
    }
  };

  return (
    <main className="flex-1 p-5 md:p-[30px] overflow-y-auto z-[5] relative transition-all duration-400 mt-[65px] mb-[70px] md:mt-0 md:mb-0 min-h-[calc(100vh-135px)] md:min-h-0">
      <h1 className="text-2xl md:text-[28px] font-normal text-foreground mb-4 md:mb-5 transition-all duration-400">
        {title}
      </h1>

      {renderContent()}
    </main>
  );
};
