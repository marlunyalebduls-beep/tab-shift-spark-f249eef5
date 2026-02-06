import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/types/navigation';
import { MenuIcon, WalletIcon } from '@/components/icons/NavIcons';
import logoImg from '@/assets/logo.png';
import logoTextImg from '@/assets/logo-text.png';

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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden fixed top-0 left-0 right-0 h-[65px] glass-dark border-b border-foreground/[0.08] z-[1000] flex items-center px-4 justify-between"
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
          src={logoImg}
          alt="Logo"
          className="h-[35px] w-[35px] object-contain opacity-95"
        />
        <img
          src={logoTextImg}
          alt="ZAKAZSPLIT"
          className="h-[33px] w-[112px] object-contain opacity-90 brightness-110"
        />
      </a>

      {/* Balance (only when authenticated) */}
      {user && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center gap-1 px-2 py-1.5 bg-secondary/80 rounded-lg h-8"
        >
          <WalletIcon className="w-4 h-4 text-primary/90 mr-0.5" />
          <span className="text-sm font-medium text-foreground/90">₽</span>
          <span className="text-sm font-medium text-foreground">
            {Math.floor(user.balance)}
          </span>
        </motion.div>
      )}
    </motion.header>
  );
};
