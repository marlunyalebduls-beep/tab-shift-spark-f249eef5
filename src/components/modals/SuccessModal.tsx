import React from 'react';
import { CheckIcon } from '@/components/icons/NavIcons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[2100] flex items-center justify-center transition-all duration-400 ease-smooth ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`glass-modal border border-foreground/[0.08] rounded-xl p-[30px] w-[90%] max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-center transition-all duration-500 ease-bounce-soft ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-5 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-[70px] h-[70px] gradient-success-icon rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckIcon className="w-[35px] h-[35px] text-[#00dc64]" />
        </div>

        {/* Header */}
        <div>
          <h2 className="text-[22px] font-medium text-foreground tracking-wide mb-2.5">
            Авторизация успешна!
          </h2>
          <p className="text-[15px] text-muted-foreground/70 mb-6 leading-relaxed">
            Теперь вы можете пользоваться всеми функциями сайта
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-6 gradient-primary text-primary-foreground rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.025] mt-2.5"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};
