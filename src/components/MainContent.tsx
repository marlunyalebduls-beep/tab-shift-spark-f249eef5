import React from 'react';
import { NavItem, User } from '@/types/navigation';

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

  return (
    <main className="flex-1 p-5 md:p-[30px] overflow-y-auto z-[5] relative transition-all duration-400 mt-[65px] mb-[70px] md:mt-0 md:mb-0 min-h-[calc(100vh-135px)] md:min-h-0">
      <h1 className="text-2xl md:text-[28px] font-normal text-foreground mb-4 md:mb-5 transition-all duration-400">
        {title}
      </h1>

      <div className="bg-card/30 rounded-xl p-5 md:p-6 border border-foreground/5 mb-5 transition-all duration-400">
        <ContentForTab activeTab={activeTab} user={user} onOpenAuth={onOpenAuth} />
      </div>
    </main>
  );
};

interface ContentForTabProps {
  activeTab: NavItem;
  user: User | null;
  onOpenAuth: () => void;
}

const ContentForTab: React.FC<ContentForTabProps> = ({ activeTab, user, onOpenAuth }) => {
  if (activeTab === 'admin' && user?.role === 'admin') {
    return (
      <div>
        <p className="text-foreground mb-4">
          <strong>👑 Панель администратора</strong>
        </p>
        <p className="text-foreground mb-4">
          Добро пожаловать, {user.first_name}!
        </p>
        <p className="text-foreground mb-2"><strong>Доступные функции:</strong></p>
        <ol className="list-decimal list-inside text-foreground mb-4 space-y-1">
          <li>Управление пользователями</li>
          <li>Просмотр статистики</li>
          <li>Управление заказами</li>
          <li>Настройки системы</li>
        </ol>
        <p className="text-primary italic">
          Данный раздел доступен только администраторам
        </p>
      </div>
    );
  }

  if (user) {
    const roleIcon = user.role === 'admin' ? '👑' : '👤';
    const roleText = user.role === 'admin' ? 'Администратор' : 'Пользователь';
    const roleClass = user.role === 'admin' ? 'text-[#ff6b6b]' : 'text-primary';

    return (
      <div>
        <p className="text-foreground mb-2">
          <strong>Добро пожаловать, {user.first_name}!</strong>
        </p>
        <p className={`${roleClass} font-medium mb-2`}>
          {roleIcon} {roleText}
        </p>
        <p className="text-foreground">
          Ваш баланс:{' '}
          <span className="text-primary font-medium">
            {Math.floor(user.balance)} руб.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-foreground mb-2">
        <strong>Вы находитесь в гостевом режиме</strong>
      </p>
      <p className="text-foreground">
        Для доступа ко всем функциям{' '}
        <button
          onClick={onOpenAuth}
          className="text-primary underline hover:no-underline transition-all"
        >
          войдите через Telegram
        </button>
      </p>
    </div>
  );
};
