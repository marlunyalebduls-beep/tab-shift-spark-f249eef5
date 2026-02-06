import React, { useState } from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Здравствуйте! Чем могу помочь?', sender: 'support', time: '10:00' },
  { id: 2, text: 'Добрый день! У меня вопрос по прогреву аккаунтов', sender: 'user', time: '10:05' },
  { id: 3, text: 'Конечно! Какой у вас вопрос?', sender: 'support', time: '10:06' },
];

export const ChatPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Спасибо за сообщение! Оператор ответит в ближайшее время.',
        sender: 'support',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
            Для доступа к чату необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-250px)] md:h-[calc(100vh-180px)] flex flex-col">
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">👨‍💻</span>
              </div>
              <div>
                <CardTitle className="text-base text-foreground">Техподдержка</CardTitle>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  Онлайн
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              Среднее время ответа: 5 мин
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 border-foreground/5 flex-1 overflow-hidden">
        <CardContent className="p-4 h-full overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="p-3">
          <div className="flex gap-3">
            <Input
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-secondary/50 border-foreground/10"
            />
            <Button onClick={sendMessage} className="gradient-primary text-primary-foreground px-6">
              ➤
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
