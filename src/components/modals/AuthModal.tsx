import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TelegramIcon } from '@/components/icons/NavIcons';
import { X, Shield } from 'lucide-react';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[2000] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card/95 border border-border/50 rounded-2xl p-6 w-full max-w-[380px] shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Авторизация
              </h2>
              <p className="text-sm text-muted-foreground">
                Войдите через Telegram для доступа к функциям
              </p>
            </div>

            {/* Telegram Button */}
            <button
              onClick={onLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Авторизация...</span>
                </>
              ) : (
                <>
                  <TelegramIcon className="w-5 h-5" />
                  <span>Войти через Telegram</span>
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground/60 mt-5">
              Быстрый и безопасный вход через Telegram
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
