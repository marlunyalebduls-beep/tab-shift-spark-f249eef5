import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  ChevronDown,
  MessageCircle,
  FileText,
  Zap,
  Shield,
  CreditCard,
  Users,
  Settings,
  Smartphone
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
}

const faqItems: FAQItem[] = [
  {
    question: 'Что такое ZAKAZSPLIT?',
    answer: 'ZAKAZSPLIT — это сервис для автоматизации работы с аккаунтами и заказами. Мы предоставляем инструменты для прогрева аккаунтов, управления эмуляторами и оформления заказов.',
    icon: HelpCircle,
  },
  {
    question: 'Как начать работу с сервисом?',
    answer: 'Для начала работы вам нужно авторизоваться через Telegram, пополнить баланс и добавить свои аккаунты. После этого вы сможете использовать все функции сервиса.',
    icon: Users,
  },
  {
    question: 'Какие способы пополнения доступны?',
    answer: 'Мы принимаем оплату через: банковские карты (Visa, MasterCard, МИР), криптовалюту (BTC, ETH, USDT), электронные кошельки (ЮMoney, QIWI) и СБП.',
    icon: CreditCard,
  },
  {
    question: 'Что такое прогрев аккаунтов?',
    answer: 'Прогрев — это процесс имитации естественной активности на аккаунте для повышения его трастовости. Это включает просмотры, лайки, добавления в корзину и другие действия.',
    icon: Zap,
  },
  {
    question: 'Безопасно ли использовать сервис?',
    answer: 'Да, мы используем продвинутые алгоритмы для имитации человеческого поведения, уникальные прокси для каждого аккаунта и современные методы обхода защиты.',
    icon: Shield,
  },
  {
    question: 'Как работает эмулятор управления?',
    answer: 'Эмулятор позволяет удалённо управлять виртуальными устройствами. Вы можете видеть экран устройства в реальном времени и выполнять любые действия.',
    icon: Smartphone,
  },
  {
    question: 'Какие тарифы доступны?',
    answer: 'У нас есть несколько тарифов: Базовый (до 10 аккаунтов), Продвинутый (до 50 аккаунтов) и Профессиональный (безлимит). Подробности можно узнать в разделе "Пополнение".',
    icon: Settings,
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Вы можете написать нам в чат поддержки прямо в личном кабинете, или в наш Telegram-бот @zakazsplit_support.',
    icon: MessageCircle,
  },
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* FAQ Items */}
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const Icon = item.icon;
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card 
                className={`bg-black/30 border border-white/20 cursor-pointer transition-all duration-300 ${
                  isOpen ? 'border-primary/50 bg-black/40' : 'hover:bg-black/40'
                }`}
                onClick={() => toggleItem(index)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary/20' : 'bg-white/5'}`}>
                        <Icon className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <span className={`font-medium ${isOpen ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="pl-11 text-muted-foreground leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Support Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card className="bg-black/30 border border-white/20">
          <CardContent className="py-8 text-center">
            <div className="mb-4">
              <MessageCircle className="w-12 h-12 text-primary mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-muted-foreground mb-6">
              Наша команда поддержки всегда готова помочь
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button className="gradient-telegram">
                <MessageCircle className="w-4 h-4 mr-2" />
                Написать в поддержку
              </Button>
              <Button variant="outline" className="border-white/20">
                <FileText className="w-4 h-4 mr-2" />
                Документация
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
