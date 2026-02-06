import React from 'react';

export const LoadingScreen: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="w-12 h-12 border-3 border-muted border-t-primary rounded-full animate-spin-slow mb-5" />
      <div className="text-sm text-muted-foreground uppercase tracking-[2px]">
        Инициализация...
      </div>
    </div>
  );
};
