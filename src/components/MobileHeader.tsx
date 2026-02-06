import React from 'react';
import { User } from '@/types/navigation';
import { MenuIcon, WalletIcon } from '@/components/icons/NavIcons';

interface MobileHeaderProps {
  user: User | null;
  onMenuClick: () => void;
  isVisible: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  user,
  onMenuClick,
  isVisible,
}) => {
  return (
    <header
      className={`md:hidden fixed top-0 left-0 right-0 h-[65px] glass-dark border-b border-foreground/[0.08] z-[1000] flex items-center px-4 justify-between transition-all duration-600 ease-smooth ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
      >
        <MenuIcon className="w-4" />
      </button>

      {/* Logo */}
      <a 
        href="https://zakazsplit.tech/" 
        className="flex items-center gap-2.5 flex-1 ml-2.5"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://zakazsplit.tech/logo1.png"
          alt="Logo"
          className="h-[35px] w-[35px] object-contain opacity-95"
        />
        <img
          src="https://zakazsplit.tech/text.png"
          alt="ZAKAZSPLIT"
          className="h-[33px] w-[112px] object-contain opacity-90 brightness-110"
        />
      </a>

      {/* Balance (only when authenticated) */}
      {user && (
        <div
          className={`flex items-center gap-1 px-2 py-1.5 bg-secondary/80 rounded-lg h-8 transition-all duration-400 ease-bounce-soft ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
          }`}
        >
          <WalletIcon className="w-4 h-4 text-primary/90 mr-0.5" />
          <span className="text-sm font-medium text-foreground/90">₽</span>
          <span className="text-sm font-medium text-foreground">
            {Math.floor(user.balance)}
          </span>
        </div>
      )}
    </header>
  );
};
