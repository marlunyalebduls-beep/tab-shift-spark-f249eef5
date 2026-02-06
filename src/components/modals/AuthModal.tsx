import React from 'react';
import { TelegramIcon, CloseIcon } from '@/components/icons/NavIcons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  isLoading: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  isLoading,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[2000] flex items-center justify-center transition-all duration-400 ease-smooth ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`glass-modal border border-foreground/[0.08] rounded-xl p-[30px] w-[90%] max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 ease-bounce-soft ${
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
            Авторизация
          </h2>
          <p className="text-sm text-muted-foreground font-normal">
            Войдите через Telegram для доступа
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 p-4 gradient-telegram text-primary-foreground rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.025] disabled:opacity-70 disabled:cursor-not-allowed mt-2.5"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Авторизация...
              </>
            ) : (
              <>
                <TelegramIcon className="w-6 h-6" />
                Войти через Telegram
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 pt-5 border-t border-foreground/10">
          <p className="text-[13px] text-muted-foreground/50">
            После авторизации вы получите доступ ко всем функциям
          </p>
        </div>
      </div>
    </div>
  );
};
