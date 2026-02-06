import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { 
  Users, 
  Activity, 
  Zap, 
  MapPin,
  Search,
  Filter,
  CheckCircle,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Info,
  RefreshCw
} from 'lucide-react';

type SortOrder = 'none' | 'asc' | 'desc';

// Список топ городов России
const TOP_RUSSIAN_CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар',
  'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Ульяновск',
  'Иркутск', 'Хабаровск', 'Ярославль', 'Владивосток', 'Махачкала',
  'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Астрахань'
];

// Моковые данные аккаунтов
interface Account {
  id: string;
  name: string;
  username: string;
  city: string;
  split: number;
  price: number;
  emulation_status: string;
}

const mockAccounts: Account[] = [
  { id: 'acc_001', name: 'Аккаунт #1', username: '@user_001', city: 'Москва', split: 50000, price: 1500, emulation_status: 'Готов к заказу - пассивный прогрев' },
  { id: 'acc_002', name: 'Аккаунт #2', username: '@user_002', city: 'Санкт-Петербург', split: 75000, price: 2000, emulation_status: 'Прогрев аккаунта на ГЕО' },
  { id: 'acc_003', name: 'Аккаунт #3', username: '@user_003', city: 'Москва', split: 100000, price: 2500, emulation_status: 'Готов к заказу - пассивный прогрев' },
  { id: 'acc_004', name: 'Аккаунт #4', username: '@user_004', city: 'Казань', split: 120000, price: 3000, emulation_status: 'Предварительный прогрев' },
  { id: 'acc_005', name: 'Аккаунт #5', username: '@user_005', city: 'Неизвестно', split: 80000, price: 1800, emulation_status: 'Предварительный прогрев' },
  { id: 'acc_006', name: 'Аккаунт #6', username: '@user_006', city: 'Новосибирск', split: 60000, price: 1700, emulation_status: 'Готов к заказу - пассивный прогрев' },
  { id: 'acc_007', name: 'Аккаунт #7', username: '@user_007', city: 'Екатеринбург', split: 90000, price: 2200, emulation_status: 'Прогрев аккаунта на ГЕО' },
  { id: 'acc_008', name: 'Аккаунт #8', username: '@user_008', city: 'Неизвестно', split: 45000, price: 1400, emulation_status: 'Предварительный прогрев' },
];

// Форматирование валюты
const formatCurrency = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;
const formatSplit = (value: number) => `${(value / 1000).toFixed(0)}K`;

export const AccountsPage: React.FC = () => {
  const { user, onOpenAuth } = useLayoutContext();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showReadyOnly, setShowReadyOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  // Фильтрация аккаунтов - хук вызывается всегда
  const filteredAccounts = useMemo(() => {
    if (!user) return [];
    
    let filtered = [...mockAccounts];
    
    // Фильтр по городу
    if (selectedCity !== 'all') {
      if (selectedCity === 'unknown') {
        filtered = filtered.filter(acc => acc.city === 'Неизвестно' || acc.city === 'неизвестно');
      } else {
        filtered = filtered.filter(acc => acc.city === selectedCity);
      }
    }
    
    // Фильтр только готовые
    if (showReadyOnly) {
      filtered = filtered.filter(acc => acc.emulation_status === 'Готов к заказу - пассивный прогрев');
    }
    
    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(acc => 
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Сортировка по сплиту
    if (sortOrder !== 'none') {
      filtered.sort((a, b) => sortOrder === 'asc' ? a.split - b.split : b.split - a.split);
    }
    
    return filtered;
  }, [selectedCity, showReadyOnly, searchTerm, sortOrder]);

  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const stats = [
    { label: 'Всего аккаунтов', value: mockAccounts.length, icon: Users, color: 'text-blue-400' },
    { label: 'Готовы к заказу', value: mockAccounts.filter(acc => 
      acc.emulation_status === 'Готов к заказу - пассивный прогрев'
    ).length, icon: CheckCircle, color: 'text-green-400' },
    { label: 'По городам', value: mockAccounts.filter(acc => 
      acc.emulation_status === 'Прогрев аккаунта на ГЕО' && acc.city !== 'Неизвестно'
    ).length, icon: MapPin, color: 'text-cyan-400' },
    { label: 'На прогреве', value: mockAccounts.filter(acc => 
      acc.emulation_status === 'Предварительный прогрев' || acc.city === 'Неизвестно'
    ).length, icon: Zap, color: 'text-yellow-400' }
  ];

  const selectedAccountsData = mockAccounts.filter(acc => selectedAccounts.includes(acc.id));
  const totalCost = selectedAccountsData.reduce((sum, acc) => sum + acc.price, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => 'text-green-400';

  // Проверка авторизации после всех хуков
  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-white mb-2">Доступ ограничен</h3>
          <p className="text-gray-400 mb-6">
            Для просмотра аккаунтов необходимо авторизоваться
          </p>
          <Button onClick={onOpenAuth} className="gradient-telegram">
            Войти через Telegram
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Управление аккаунтами</h1>
          <p className="text-gray-400 mt-1">Мониторинг и управление AI аккаунтами</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск аккаунтов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Выберите город" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600 max-h-60 overflow-y-auto">
            <SelectItem value="all" className="text-white hover:bg-gray-600">Все города</SelectItem>
            <SelectItem value="unknown" className="text-white hover:bg-gray-600">Любой город</SelectItem>
            {TOP_RUSSIAN_CITIES.map((city) => (
              <SelectItem key={city} value={city} className="text-white hover:bg-gray-600">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Сортировка по сплиту */}
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-400">Сплит:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'none' : 'asc')}
            className={`p-1 ${sortOrder === 'asc' ? 'text-primary' : 'text-gray-400'}`}
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'none' : 'desc')}
            className={`p-1 ${sortOrder === 'desc' ? 'text-primary' : 'text-gray-400'}`}
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant={showReadyOnly ? "default" : "outline"}
          onClick={() => setShowReadyOnly(!showReadyOnly)}
          className={showReadyOnly ? "bg-green-600 hover:bg-green-700" : "border-gray-600"}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Готовы к заказу
        </Button>

        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 border-gray-600"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Обновление...' : 'Обновить'}</span>
        </Button>

        <div className="text-sm text-gray-400">
          Показано: {filteredAccounts.length} из {mockAccounts.length}
        </div>
      </div>

      {/* Кнопка покупки */}
      <AnimatePresence>
        {selectedAccounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center justify-between"
          >
            <div className="text-gray-400">
              Выбрано: <span className="text-white font-medium">{selectedAccounts.length}</span> аккаунтов
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-white">
                Итого: {formatCurrency(totalCost)}
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Купить
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accounts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredAccounts.map((account, index) => {
          const isSelected = selectedAccounts.includes(account.id);
          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/50' 
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                }`}
                onClick={() => toggleAccountSelection(account.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header with Checkbox */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={isSelected}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <h3 className="text-white font-medium text-sm">{account.name}</h3>
                      </div>
                      {account.emulation_status === 'Готов к заказу - пассивный прогрев' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>

                    {/* Account ID */}
                    <div className="text-left">
                      <p className="text-xs text-gray-400 mb-1">ID:</p>
                      <p className="text-white font-mono text-xs">{account.id}</p>
                    </div>
                    
                    {/* Split Amount */}
                    <div className="text-left">
                      <div className="flex items-center gap-1 mb-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <p className="text-xs text-gray-400">SPLIT:</p>
                      </div>
                      <p className="text-white font-semibold">
                        {formatSplit(account.split)}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <p className="text-xs text-gray-400 mb-1">Цена:</p>
                      <p className="text-green-400 font-semibold">{formatCurrency(account.price)}</p>
                    </div>
                    
                    {/* City */}
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-300">
                        {account.city === 'Неизвестно' ? 'Любой город' : account.city}
                      </span>
                    </div>
                    
                    {/* Emulation Status */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Эмуляция:</p>
                      <p className={`text-xs font-medium ${getStatusColor(account.emulation_status)}`}>
                        {account.emulation_status}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Нет аккаунтов, соответствующих выбранным фильтрам</p>
        </div>
      )}
    </div>
  );
};
