import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuestOverlay } from '@/components/GuestOverlay';
import { 
  MessageCircle, 
  Send, 
  Bot,
  User,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  showTelegramLink?: boolean;
}

// FAQ data for automatic responses
const faqData = [
  {
    keywords: ['zakazsplit', 'закаизсплит', 'что такое', 'сервис'],
    question: 'Что такое ZAKAZSPLIT?',
    answer: 'ZAKAZSPLIT — это сервис для автоматизации работы с аккаунтами и заказами. Мы предоставляем инструменты для прогрева аккаунтов, управления эмуляторами и оформления заказов.',
  },
  {
    keywords: ['начать', 'работу', 'начинать', 'старт', 'регистрация'],
    question: 'Как начать работу?',
    answer: 'Для начала работы вам нужно авторизоваться через Telegram, пополнить баланс и добавить свои аккаунты. После этого вы сможете использовать все функции сервиса.',
  },
  {
    keywords: ['пополнение', 'оплата', 'способы', 'карта', 'криптовалюта', 'баланс', 'пополнить'],
    question: 'Способы пополнения',
    answer: 'Мы принимаем оплату через: банковские карты (Visa, MasterCard, МИР), криптовалюту (BTC, ETH, USDT), электронные кошельки (ЮMoney, QIWI) и СБП.',
  },
  {
    keywords: ['прогрев', 'аккаунт', 'прогревать', 'траст', 'трастовость'],
    question: 'Что такое прогрев?',
    answer: 'Прогрев — это процесс имитации естественной активности на аккаунте для повышения его трастовости. Это включает просмотры, лайки, добавления в корзину и другие действия.',
  },
  {
    keywords: ['безопасно', 'безопасность', 'риск', 'блокировка', 'бан'],
    question: 'Безопасность',
    answer: 'Да, мы используем продвинутые алгоритмы для имитации человеческого поведения, уникальные прокси для каждого аккаунта и современные методы обхода защиты.',
  },
  {
    keywords: ['эмулятор', 'управление', 'устройство', 'виртуальный'],
    question: 'Эмулятор управления',
    answer: 'Эмулятор позволяет удалённо управлять виртуальными устройствами. Вы можете видеть экран устройства в реальном времени и выполнять любые действия.',
  },
  {
    keywords: ['тариф', 'цена', 'стоимость', 'план', 'подписка'],
    question: 'Тарифы',
    answer: 'У нас есть несколько тарифов: Базовый (до 10 аккаунтов), Продвинутый (до 50 аккаунтов) и Профессиональный (безлимит). Подробности можно узнать в разделе "Пополнение".',
  },
  {
    keywords: ['поддержка', 'помощь', 'связаться', 'контакт', 'оператор'],
    question: 'Связь с поддержкой',
    answer: 'Вы можете написать нам в чат поддержки прямо в личном кабинете, или в наш Telegram-бот @zakazsplit_support.',
  },
  {
    keywords: ['сплит', 'split', 'лимит'],
    question: 'Что такое SPLIT?',
    answer: 'SPLIT (Сплит) — это максимальный лимит суммы заказа на аккаунте. Чем выше сплит, тем более дорогие товары можно заказывать через аккаунт.',
  },
];

// Find best matching FAQ response
const findFAQResponse = (userInput: string): string | null => {
  const input = userInput.toLowerCase();
  
  let bestMatch: { answer: string; score: number } | null = null;
  
  for (const faq of faqData) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: faq.answer, score };
    }
  }
  
  return bestMatch ? bestMatch.answer : null;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Привет! Я AI-ассистент ZAKAZSPLIT. Задайте мне вопрос, и я постараюсь помочь на основе нашей базы знаний.',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000)
  }
];

export const ChatPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const faqResponse = findFAQResponse(userInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: faqResponse || 'К сожалению, я не нашёл ответа на ваш вопрос в базе знаний. Попробуйте переформулировать вопрос или свяжитесь с оператором.',
        sender: 'bot',
        timestamp: new Date(),
        showTelegramLink: true
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative h-[calc(100vh-200px)] flex flex-col">
      <AnimatePresence>
        {user === null && <GuestOverlay onOpenAuth={onOpenAuth} />}
      </AnimatePresence>

      {/* Header */}
      <Card className="bg-black/30 border border-white/20 backdrop-blur-sm mb-4">
        <CardHeader className="py-4">
          <CardTitle className="text-lg text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground">Чат поддержки</p>
              <p className="text-xs text-muted-foreground font-normal flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                AI-ассистент онлайн
              </p>
            </div>
            <Sparkles className="w-4 h-4 text-yellow-400 ml-auto" />
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card className="bg-black/30 border border-white/20 flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-primary/20' : 'bg-white/10'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-white/10 text-foreground rounded-tl-sm'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  
                  {/* Telegram link for bot messages */}
                  {message.sender === 'bot' && message.showTelegramLink && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs text-muted-foreground">
                        Ваш вопрос не решён?{' '}
                        <a 
                          href="https://t.me/zakazsplit_support" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          Telegram →
                        </a>
                      </p>
                    </div>
                  )}
                  
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Введите сообщение..."
              className="flex-1 bg-black/30 border-white/20"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
