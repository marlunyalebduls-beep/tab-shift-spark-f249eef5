import React from 'react';
import { User } from '@/types/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface WarmupPageProps {
  user: User | null;
  onOpenAuth: () => void;
}

interface WarmupTask {
  id: string;
  account: string;
  progress: number;
  status: 'running' | 'completed' | 'queued';
  startTime: string;
  actions: number;
}

const mockTasks: WarmupTask[] = [
  { id: '1', account: 'Аккаунт #1', progress: 78, status: 'running', startTime: '10:30', actions: 156 },
  { id: '2', account: 'Аккаунт #2', progress: 100, status: 'completed', startTime: '08:00', actions: 200 },
  { id: '3', account: 'Аккаунт #3', progress: 45, status: 'running', startTime: '11:00', actions: 90 },
  { id: '4', account: 'Аккаунт #4', progress: 0, status: 'queued', startTime: '—', actions: 0 },
];

export const WarmupPage: React.FC<WarmupPageProps> = ({ user, onOpenAuth }) => {
  if (!user) {
    return (
      <Card className="bg-card/50 border-foreground/5">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Доступ ограничен</h3>
          <p className="text-muted-foreground mb-6">
            Для управления прогревом необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  const runningCount = mockTasks.filter(t => t.status === 'running').length;
  const completedCount = mockTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">В процессе</p>
            <p className="text-2xl font-bold text-warning">{runningCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Завершено</p>
            <p className="text-2xl font-bold text-success">{completedCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">В очереди</p>
            <p className="text-2xl font-bold text-muted-foreground">{mockTasks.filter(t => t.status === 'queued').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-foreground/5">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Всего действий</p>
            <p className="text-2xl font-bold text-primary">{mockTasks.reduce((acc, t) => acc + t.actions, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button className="gradient-primary text-primary-foreground">
          + Запустить прогрев
        </Button>
        <Button variant="outline" className="border-foreground/10">
          ⏸️ Приостановить все
        </Button>
        <Button variant="outline" className="border-foreground/10">
          📊 Статистика
        </Button>
      </div>

      {/* Tasks List */}
      <Card className="bg-card/50 border-foreground/5">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🔥 Задачи прогрева</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg bg-secondary/30 border border-foreground/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.status === 'running' ? 'bg-warning animate-pulse' :
                      task.status === 'completed' ? 'bg-success' :
                      'bg-muted-foreground'
                    }`} />
                    <span className="font-medium text-foreground">{task.account}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {task.actions} действий
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {task.startTime}
                    </span>
                    {task.status === 'running' && (
                      <Button variant="outline" size="sm" className="border-foreground/10">
                        Пауза
                      </Button>
                    )}
                    {task.status === 'queued' && (
                      <Button variant="outline" size="sm" className="border-foreground/10">
                        Запустить
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={task.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-foreground min-w-[45px] text-right">
                    {task.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
