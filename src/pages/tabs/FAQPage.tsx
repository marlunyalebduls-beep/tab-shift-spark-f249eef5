import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'Что такое ZAKAZSPLIT?',
    answer: 'ZAKAZSPLIT — это сервис для автоматизации работы с аккаунтами и заказами. Мы предоставляем инструменты для прогрева аккаунтов, управления эмуляторами и оформления заказов.'
  },
  {
    question: 'Как начать работу с сервисом?',
    answer: 'Для начала работы вам нужно авторизоваться через Telegram, пополнить баланс и добавить свои аккаунты. После этого вы сможете использовать все функции сервиса.'
  },
  {
    question: 'Какие способы пополнения доступны?',
    answer: 'Мы принимаем оплату через: банковские карты (Visa, MasterCard, МИР), криптовалюту (BTC, ETH, USDT), электронные кошельки (ЮMoney, QIWI) и СБП.'
  },
  {
    question: 'Что такое прогрев аккаунтов?',
    answer: 'Прогрев — это процесс имитации естественной активности на аккаунте для повышения его трастовости. Это включает просмотры, лайки, добавления в корзину и другие действия.'
  },
  {
    question: 'Безопасно ли использовать сервис?',
    answer: 'Да, мы используем продвинутые алгоритмы для имитации человеческого поведения, уникальные прокси для каждого аккаунта и современные методы обхода защиты.'
  },
  {
    question: 'Как работает эмулятор управления?',
    answer: 'Эмулятор позволяет удалённо управлять виртуальными устройствами. Вы можете видеть экран устройства в реальном времени и выполнять любые действия.'
  },
  {
    question: 'Какие тарифы доступны?',
    answer: 'У нас есть несколько тарифов: Базовый (до 10 аккаунтов), Продвинутый (до 50 аккаунтов) и Профессиональный (безлимит). Подробности можно узнать в разделе "Пополнение".'
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Вы можете написать нам в чат поддержки прямо в личном кабинете, или в наш Telegram-бот @zakazsplit_support.'
  },
];

export const FAQPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            ❓ Часто задаваемые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-foreground/5">
                <AccordionTrigger className="text-foreground hover:text-primary text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a 
              href="https://t.me/zakazsplit_support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg gradient-telegram text-white font-medium hover:opacity-90 transition-opacity"
            >
              💬 Написать в поддержку
            </a>
            <a 
              href="https://zakazsplit.tech/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg border border-foreground/10 text-foreground hover:bg-foreground/5 transition-colors"
            >
              📚 Документация
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
