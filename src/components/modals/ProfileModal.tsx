import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/types/navigation';
import { X, LogOut, User as UserIcon, Wallet, AtSign, Hash, Shield } from 'lucide-react';

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

  const isAdmin = user.role === 'admin';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[2200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card/95 border border-border/50 rounded-2xl w-full max-w-[420px] shadow-2xl backdrop-blur-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Avatar */}
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 pb-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-3">
                  <UserIcon className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{user.first_name}</h2>
                <div className={`flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                  isAdmin 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-primary/10 text-primary border border-primary/20'
                }`}>
                  <Shield className="w-3 h-3" />
                  {isAdmin ? 'Администратор' : 'Пользователь'}
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="p-5 space-y-3">
              <ProfileInfoCard 
                icon={<Hash className="w-4 h-4" />}
                label="Telegram ID"
                value={user.telegram_id}
              />
              <ProfileInfoCard 
                icon={<AtSign className="w-4 h-4" />}
                label="Username"
                value={user.username ? `@${user.username}` : 'Не указан'}
              />
              <ProfileInfoCard 
                icon={<Wallet className="w-4 h-4" />}
                label="Баланс"
                value={`${Math.floor(user.balance)} ₽`}
                highlight
              />
            </div>

            {/* Logout Button */}
            <div className="p-5 pt-0">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Выйти из аккаунта
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProfileInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  icon,
  label,
  value,
  highlight,
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30">
      <div className={`p-2 rounded-lg ${highlight ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm font-medium truncate ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </p>
      </div>
    </div>
  );
};
