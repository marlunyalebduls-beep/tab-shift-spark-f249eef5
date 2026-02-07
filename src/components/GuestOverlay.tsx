import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface GuestOverlayProps {
  onOpenAuth: () => void;
}

export const GuestOverlay: React.FC<GuestOverlayProps> = ({ onOpenAuth }) => {
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find the main element to portal into and block scrolling
    const main = document.querySelector('main');
    if (main) {
      setMainElement(main as HTMLElement);
      main.style.overflow = 'hidden';
    }
    return () => {
      if (main) {
        main.style.overflow = '';
      }
    };
  }, []);

  const overlayContent = (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ transform: 'none' }}
    >
      {/* Blur backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 backdrop-blur-md bg-background/70" 
      />
      
      {/* Content - centered immediately */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Circle container with bouncing lock inside */}
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6 overflow-hidden">
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
        
        {/* Text with clickable authorization */}
        <p className="text-muted-foreground text-lg max-w-xs">
          Вы находитесь в гостевом режиме.
        </p>
        <p className="text-muted-foreground/70 text-base mt-2">
          <button 
            onClick={onOpenAuth}
            className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium"
          >
            Авторизуйтесь
          </button>
          , чтобы получить все функции
        </p>
      </motion.div>
    </motion.div>
  );

  // Portal into main element to stay within content area but escape page animations
  if (mainElement) {
    return createPortal(overlayContent, mainElement);
  }

  // Fallback render while waiting for main element
  return overlayContent;
};
