import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  category: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Что такое ZAKAZSPLIT?',
    answer: 'ZAKAZSPLIT — это сервис для автоматизации работы с аккаунтами и заказами. Мы предоставляем инструменты для прогрева аккаунтов, управления эмуляторами и оформления заказов.',
    icon: HelpCircle,
    category: 'general'
  },
  {
    question: 'Как начать работу с сервисом?',
    answer: 'Для начала работы вам нужно авторизоваться через Telegram, пополнить баланс и добавить свои аккаунты. После этого вы сможете использовать все функции сервиса.',
    icon: Users,
    category: 'start'
  },
  {
    question: 'Какие способы пополнения доступны?',
    answer: 'Мы принимаем оплату через: банковские карты (Visa, MasterCard, МИР), криптовалюту (BTC, ETH, USDT), электронные кошельки (ЮMoney, QIWI) и СБП.',
    icon: CreditCard,
    category: 'payment'
  },
  {
    question: 'Что такое прогрев аккаунтов?',
    answer: 'Прогрев — это процесс имитации естественной активности на аккаунте для повышения его трастовости. Это включает просмотры, лайки, добавления в корзину и другие действия.',
    icon: Zap,
    category: 'warmup'
  },
  {
    question: 'Безопасно ли использовать сервис?',
    answer: 'Да, мы используем продвинутые алгоритмы для имитации человеческого поведения, уникальные прокси для каждого аккаунта и современные методы обхода защиты.',
    icon: Shield,
    category: 'security'
  },
  {
    question: 'Как работает эмулятор управления?',
    answer: 'Эмулятор позволяет удалённо управлять виртуальными устройствами. Вы можете видеть экран устройства в реальном времени и выполнять любые действия.',
    icon: Smartphone,
    category: 'emulator'
  },
  {
    question: 'Какие тарифы доступны?',
    answer: 'У нас есть несколько тарифов: Базовый (до 10 аккаунтов), Продвинутый (до 50 аккаунтов) и Профессиональный (безлимит). Подробности можно узнать в разделе "Пополнение".',
    icon: Settings,
    category: 'pricing'
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Вы можете написать нам в чат поддержки прямо в личном кабинете, или в наш Telegram-бот @zakazsplit_support.',
    icon: MessageCircle,
    category: 'support'
  },
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Здесь вы найдете ответы на самые популярные вопросы о нашем сервисе
            </p>
          </CardContent>
        </Card>
      </motion.div>

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
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all duration-300 ${
                  isOpen ? 'border-primary/50 bg-gray-800/70' : 'hover:bg-gray-800/70'
                }`}
                onClick={() => toggleItem(index)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary/20' : 'bg-gray-700/50'}`}>
                        <Icon className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                        {item.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-gray-400'}`} />
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
                          <div className="pl-11 text-gray-400 leading-relaxed">
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
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-8 text-center">
            <div className="mb-4">
              <MessageCircle className="w-12 h-12 text-primary mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-gray-400 mb-6">
              Наша команда поддержки всегда готова помочь
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button className="gradient-telegram text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Написать в поддержку
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Документация
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
