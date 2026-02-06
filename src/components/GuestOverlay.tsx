import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface GuestOverlayProps {
  onOpenAuth: () => void;
}

export const GuestOverlay: React.FC<GuestOverlayProps> = ({ onOpenAuth }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Shaking lock icon */}
        <motion.div
          animate={{ 
            x: [0, -8, 8, -8, 8, 0],
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-6"
        >
          <Lock className="w-10 h-10 text-primary" />
        </motion.div>
        
        {/* Text */}
        <p className="text-muted-foreground text-lg max-w-xs">
          Вы находитесь в гостевом режиме.
          <br />
          <button 
            onClick={onOpenAuth}
            className="text-primary hover:underline mt-2 inline-block"
          >
            Авторизуйтесь
          </button>
          {' '}чтобы получить все функции
        </p>
      </div>
    </motion.div>
  );
};
