import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { 
  Users, 
  Zap, 
  MapPin,
  Search,
  CheckCircle,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  RefreshCw
} from 'lucide-react';

type SortOrder = 'none' | 'asc' | 'desc';

const TOP_RUSSIAN_CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'
];

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
];

const formatCurrency = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;
const formatSplit = (value: number) => `${(value / 1000).toFixed(0)}K`;

export const AccountsPage: React.FC = () => {
  const { user } = useLayoutContext();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showReadyOnly, setShowReadyOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const filteredAccounts = useMemo(() => {
    let filtered = [...mockAccounts];
    
    if (selectedCity !== 'all') {
      if (selectedCity === 'unknown') {
        filtered = filtered.filter(acc => acc.city === 'Неизвестно');
      } else {
        filtered = filtered.filter(acc => acc.city === selectedCity);
      }
    }
    
    if (showReadyOnly) {
      filtered = filtered.filter(acc => acc.emulation_status.includes('Готов'));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(acc => 
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
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
    { label: 'Всего', value: mockAccounts.length, icon: Users, color: 'text-blue-400' },
    { label: 'Готовы', value: mockAccounts.filter(acc => acc.emulation_status.includes('Готов')).length, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Догрев', value: mockAccounts.filter(acc => acc.emulation_status.includes('Предварительный') || acc.emulation_status.includes('ГЕО')).length, icon: Zap, color: 'text-yellow-400' },
  ];

  const activeFilters = useMemo(() => {
    const filters: { label: string; value: string; onRemove: () => void }[] = [];
    
    if (selectedCity !== 'all') {
      const cityLabel = selectedCity === 'unknown' ? 'Любой город' : selectedCity;
      filters.push({ label: 'Город', value: cityLabel, onRemove: () => setSelectedCity('all') });
    }
    
    if (showReadyOnly) {
      filters.push({ label: 'Статус', value: 'Готовы к заказу', onRemove: () => setShowReadyOnly(false) });
    }
    
    if (searchTerm) {
      filters.push({ label: 'Поиск', value: searchTerm, onRemove: () => setSearchTerm('') });
    }
    
    if (sortOrder !== 'none') {
      filters.push({ label: 'Сплит', value: sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию', onRemove: () => setSortOrder('none') });
    }
    
    return filters;
  }, [selectedCity, showReadyOnly, searchTerm, sortOrder]);

  const selectedAccountsData = mockAccounts.filter(acc => selectedAccounts.includes(acc.id));
  const totalCost = selectedAccountsData.reduce((sum, acc) => sum + acc.price, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Stats Row - Non-clickable */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Готовы к заказу */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400 font-medium">
              рекомендуется
            </div>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Готовы к заказу</h3>
                  <p className="text-sm text-muted-foreground mt-1">Аккаунты для быстрого старта, готовы к заказу</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Догрев */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Догрев</h3>
                  <p className="text-sm text-muted-foreground mt-1">Аккаунты для догрева с целью получения большего лимита</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-wrap gap-4"
      >
        <Button 
          onClick={() => setShowReadyOnly(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Показать готовые
        </Button>
        <Button 
          onClick={() => setShowReadyOnly(false)}
          variant="outline"
          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
        >
          <Zap className="w-4 h-4 mr-2" />
          Показать на догреве
        </Button>
      </motion.div>

      {/* Active Filters */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Активные фильтры:</span>
            {activeFilters.map((filter, index) => (
              <motion.div
                key={`${filter.label}-${filter.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-1 px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm"
              >
                <span className="text-muted-foreground">{filter.label}:</span>
                <span className="text-foreground">{filter.value}</span>
                <button
                  onClick={filter.onRemove}
                  className="ml-1 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="flex flex-wrap items-center gap-4 p-4 bg-black/20 rounded-lg border border-white/10">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск аккаунтов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-black/30 border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-48 bg-black/30 border-white/20">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Все города</SelectItem>
              <SelectItem value="unknown">Любой город</SelectItem>
              {TOP_RUSSIAN_CITIES.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-1">
            <span className="text-sm text-muted-foreground">Сплит:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'none' : 'asc')}
              className={`p-1 ${sortOrder === 'asc' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'none' : 'desc')}
              className={`p-1 ${sortOrder === 'desc' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant={showReadyOnly ? "default" : "outline"}
            onClick={() => setShowReadyOnly(!showReadyOnly)}
            className={showReadyOnly ? "bg-green-600 hover:bg-green-700" : "border-white/20"}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Готовы
          </Button>

          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-white/20"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>

          <span className="text-sm text-muted-foreground">
            {filteredAccounts.length} из {mockAccounts.length}
          </span>
        </div>
      </motion.div>

      {/* Purchase bar */}
      <AnimatePresence>
        {selectedAccounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-black/30 p-4 rounded-lg border border-white/20 flex items-center justify-between"
          >
            <span className="text-muted-foreground">
              Выбрано: <span className="text-foreground font-medium">{selectedAccounts.length}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">{formatCurrency(totalCost)}</span>
              <Button className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Купить
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAccounts.map((account, index) => {
          const isSelected = selectedAccounts.includes(account.id);
          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/50' 
                    : 'bg-black/30 border-white/20 hover:bg-black/40'
                }`}
                onClick={() => toggleAccountSelection(account.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={isSelected} />
                      <span className="text-foreground font-medium text-sm">{account.name}</span>
                    </div>
                    {account.emulation_status.includes('Готов') && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">ID:</p>
                    <p className="text-foreground font-mono text-xs">{account.id}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">SPLIT:</span>
                    </div>
                    <p className="text-foreground font-semibold">{formatSplit(account.split)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Цена:</p>
                    <p className="text-green-400 font-semibold">{formatCurrency(account.price)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {account.city === 'Неизвестно' ? 'Любой город' : account.city}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Эмуляция:</p>
                    <p className="text-xs font-medium text-green-400">{account.emulation_status}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Нет аккаунтов по выбранным фильтрам</p>
        </div>
      )}
    </motion.div>
  );
};
