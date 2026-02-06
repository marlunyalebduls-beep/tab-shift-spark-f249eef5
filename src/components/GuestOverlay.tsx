import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuestOverlayProps {
  onOpenAuth: () => void;
}

export const GuestOverlay: React.FC<GuestOverlayProps> = ({ onOpenAuth }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Blur backdrop - instant visibility */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Square container with shaking lock inside */}
        <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -8, 0, -4, 0],
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeOut",
              times: [0, 0.3, 0.5, 0.7, 1]
            }}
          >
            <Lock className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
        
        {/* Text */}
        <p className="text-muted-foreground text-lg max-w-xs mb-6">
          Вы находитесь в гостевом режиме.
          <br />
          <span className="text-muted-foreground/70 text-base">
            Авторизуйтесь, чтобы получить все функции
          </span>
        </p>
        
        {/* Auth Button */}
        <Button 
          onClick={onOpenAuth}
          className="gradient-telegram px-8 py-3 text-base font-medium rounded-full"
        >
          Авторизоваться
        </Button>
      </div>
    </motion.div>
  );
};
