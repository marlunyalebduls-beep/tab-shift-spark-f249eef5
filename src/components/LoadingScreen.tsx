import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Spinner */}
          <motion.div
            className="w-[50px] h-[50px] border-[3px] border-muted border-t-primary rounded-full mb-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm text-muted-foreground uppercase tracking-[2px]"
          >
            Инициализация...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
