import React from 'react';
import { User } from '@/types/navigation';
import { CloseIcon, LogoutIcon } from '@/components/icons/NavIcons';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: User | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  user,
}) => {
  if (!user) return null;

  const roleText = user.role === 'admin' ? 'Администратор' : 'Пользователь';
  const roleColor = user.role === 'admin' ? 'text-[#ff6b6b]' : 'text-primary';

  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[2200] flex items-center justify-center transition-all duration-400 ease-smooth ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`glass-modal border border-foreground/5 rounded-lg p-6 w-[90%] max-w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 ease-bounce-soft ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-5 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground/70 hover:text-foreground transition-colors"
        >
          <CloseIcon className="w-[18px] h-[18px]" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-medium text-foreground tracking-wide mb-2">
            Ваш профиль
          </h2>
          <p className="text-sm text-muted-foreground/50 font-normal">
            Информация об аккаунте
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[18px] mb-6">
          <ProfileInfoItem label="Имя:" value={user.first_name} />
          <ProfileInfoItem label="Telegram ID:" value={user.telegram_id} />
          <ProfileInfoItem
            label="Username:"
            value={user.username ? `@${user.username}` : 'не указан'}
          />
          <ProfileInfoItem
            label="Баланс:"
            value={`${Math.floor(user.balance)} руб.`}
            valueClassName="text-primary"
          />
          <ProfileInfoItem
            label="Роль:"
            value={roleText}
            valueClassName={roleColor}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 gradient-danger text-primary-foreground rounded-md text-[13px] font-medium transition-all duration-300 hover:scale-[1.025]"
          >
            <LogoutIcon className="w-5 h-5" />
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProfileInfoItemProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  label,
  value,
  valueClassName = '',
}) => {
  return (
    <div className="flex justify-between py-3 border-b border-foreground/5">
      <span className="text-sm text-muted-foreground/50">{label}</span>
      <span className={`text-sm font-medium text-foreground ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
};
