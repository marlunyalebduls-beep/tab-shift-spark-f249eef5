import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  RefreshCw,
  BookOpen,
  GraduationCap,
  X,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Globe
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import splitLogo from '@/assets/split-logo-icon.png';

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
  { id: '59FgfkdFG-5124jf4-F54Ggt5', name: 'Дмитрий Смирнов', username: '@dmitry_s', city: 'Москва', split: 50000, price: 5000, emulation_status: 'Готов к заказу - легкий прогрев' },
  { id: '72HjklMN-8234op5-Q89Rtu7', name: 'Анна Петрова', username: '@anna_p', city: 'Санкт-Петербург', split: 75000, price: 6500, emulation_status: 'Догрев - Активный прогрев' },
  { id: '31AbcdEF-4567gh8-H12Ijk3', name: 'Иван Козлов', username: '@ivan_k', city: 'Москва', split: 100000, price: 8000, emulation_status: 'Готов к заказу - легкий прогрев' },
  { id: '45XyzWV-9012rs3-S56Tuv4', name: 'Елена Волкова', username: '@elena_v', city: 'Казань', split: 120000, price: 9500, emulation_status: 'Догрев - Активный прогрев' },
  { id: '88QwrTY-3456mn7-M90Nop8', name: 'Сергей Новиков', username: '@sergey_n', city: 'Неизвестно', split: 80000, price: 7000, emulation_status: 'Догрев - Активный прогрев' },
  { id: '63PklBN-7890cd1-C23Def6', name: 'Мария Соколова', username: '@maria_s', city: 'Новосибирск', split: 60000, price: 5500, emulation_status: 'Готов к заказу - легкий прогрев' },
];

const formatCurrency = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;
const formatSplit = (value: number) => `${(value / 1000).toFixed(0)}K`;

const tutorialSteps = [
  {
    title: 'Добро пожаловать в раздел Аккаунты!',
    description: 'Здесь вы можете выбрать и приобрести аккаунты для заказа товара. Давайте познакомимся с интерфейсом.',
    highlight: 'none',
    icon: '👋'
  },
  {
    title: 'Статистика аккаунтов',
    description: 'В верхней части страницы отображается общая статистика: количество всех аккаунтов, готовых к заказу и находящихся на догреве.',
    highlight: 'stats',
    icon: '📊'
  },
  {
    title: 'Быстрый старт — Готовые аккаунты',
    description: 'Зелёная карточка "Готовы к заказу" показывает аккаунты, которые уже прошли прогрев. Их можно использовать прямо сейчас!',
    highlight: 'ready',
    icon: '✅'
  },
  {
    title: 'Догрев аккаунтов',
    description: 'Жёлтая карточка "Догрев" показывает аккаунты в процессе подготовки. Они получат больший лимит после завершения.',
    highlight: 'warmup',
    icon: '🔥'
  },
  {
    title: 'Активные фильтры',
    description: 'Здесь отображаются все применённые фильтры. Статус всегда виден первым, остальные фильтры можно удалить.',
    highlight: 'activeFilters',
    icon: '🏷️'
  },
  {
    title: 'Панель фильтрации',
    description: 'Используйте поиск, выбор города и сортировку по сплиту для быстрого поиска нужного аккаунта.',
    highlight: 'filters',
    icon: '🔍'
  },
  {
    title: 'Выбор и покупка',
    description: 'Кликните на карточку аккаунта, чтобы добавить его в корзину. Выбранные аккаунты появятся в панели покупки сверху.',
    highlight: 'accounts',
    icon: '🛒'
  }
];

const glossaryItems = [
  { term: 'Аккаунт', definition: 'Учетная запись на маркетплейсе, используемая для заказа товаров.', icon: Users, color: 'text-blue-400' },
  { term: 'SPLIT (Сплит)', definition: 'Максимальный лимит суммы заказа на аккаунте. Чем выше сплит — тем дороже товары можно заказывать.', icon: Zap, color: 'text-green-400' },
  { term: 'Прогрев', definition: 'Процесс подготовки аккаунта к заказам путем имитации реальной активности покупателя.', icon: RefreshCw, color: 'text-orange-400' },
  { term: 'Догрев', definition: 'Дополнительный этап прогрева для увеличения лимита аккаунта и повышения доверия.', icon: ArrowUp, color: 'text-yellow-400' },
  { term: 'ГЕО', definition: 'Геолокация аккаунта — город, к которому привязан аккаунт для получения доставки.', icon: MapPin, color: 'text-red-400' },
  { term: 'Эмуляция', definition: 'Текущий статус активности аккаунта: готов к заказу, на прогреве или догреве.', icon: CheckCircle, color: 'text-purple-400' },
];

export const AccountsPage: React.FC = () => {
  const { user } = useLayoutContext();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showReadyOnly, setShowReadyOnly] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(true);

  // Check if tutorial should be shown (only once per session)
  useEffect(() => {
    const tutorialShown = sessionStorage.getItem('accounts_tutorial_shown');
    if (!tutorialShown) {
      setShowTutorial(true);
      sessionStorage.setItem('accounts_tutorial_shown', 'true');
    }
  }, []);

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
    const filters: { label: string; value: string; onRemove?: () => void; color?: string }[] = [];
    
    // Status is always first and cannot be removed
    if (showReadyOnly) {
      filters.push({ label: 'Статус', value: 'Готовы к заказу', color: 'text-green-400' });
    } else {
      filters.push({ label: 'Статус', value: 'Догрев', color: 'text-yellow-400' });
    }
    
    if (selectedCity !== 'all') {
      const cityLabel = selectedCity === 'unknown' ? 'Любой город' : selectedCity;
      filters.push({ label: 'Город', value: cityLabel, onRemove: () => setSelectedCity('all') });
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

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    setTutorialStep(0);
  };

  const startTutorial = () => {
    setTutorialStep(0);
    setShowTutorial(true);
  };

  const currentHighlight = showTutorial ? tutorialSteps[tutorialStep].highlight : 'none';

  return (
    <div className="space-y-6 relative">
      {/* Header with buttons - aligned with title */}
      <div className="flex items-center justify-end -mt-12 mb-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowGlossary(true)} className="border-white/20 hover:bg-white/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Глоссарий
          </Button>
          <Button variant="outline" size="sm" onClick={startTutorial} className="border-white/20 hover:bg-white/10">
            <GraduationCap className="w-4 h-4 mr-2" />
            Обучение
          </Button>
        </div>
      </div>

      {/* Tutorial Overlay + Dialog - same AnimatePresence to ensure proper stacking */}
      <AnimatePresence>
        {showTutorial && (
          <>
            {/* Overlay backdrop - pointer-events-auto to block all clicks */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 pointer-events-auto" 
            />
            
            {/* Tutorial Dialog - higher z-index than overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] w-full max-w-md mx-4 pointer-events-auto"
            >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tutorialSteps[tutorialStep].icon}</span>
                  <span className="text-sm text-primary font-medium">
                    {tutorialStep + 1} / {tutorialSteps.length}
                  </span>
                </div>
                <button onClick={closeTutorial} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {tutorialSteps[tutorialStep].title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {tutorialSteps[tutorialStep].description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === tutorialStep ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {tutorialStep > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setTutorialStep(prev => prev - 1)}>
                      Назад
                    </Button>
                  )}
                  <Button size="sm" onClick={nextTutorialStep}>
                    {tutorialStep === tutorialSteps.length - 1 ? 'Завершить' : 'Далее →'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Glossary Modal */}
      <AnimatePresence>
        {showGlossary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-2xl p-6 max-w-lg mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Глоссарий</h3>
                    <p className="text-xs text-muted-foreground">Основные термины</p>
                  </div>
                </div>
                <button onClick={() => setShowGlossary(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                {glossaryItems.map((item, index) => (
                  <motion.div 
                    key={item.term}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${item.color} mb-1`}>{item.term}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Row - Non-clickable */}
      <div className={`grid grid-cols-3 gap-6 transition-all duration-500 ${currentHighlight === 'stats' ? 'ring-2 ring-primary rounded-xl relative z-[110]' : ''}`}>
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-gradient-to-br from-[#1a1f2e]/60 to-[#141820]/40 border-2 border-[#2a3142]/50 backdrop-blur-sm">
            <CardContent className="p-5 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Account type hint - Title above cards */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Выбор особенности аккаунта</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-5 h-5 rounded-full border border-muted-foreground/50 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 bg-black/95 border border-white/20 p-3 text-sm">
            <p className="text-muted-foreground leading-relaxed">
              Определитесь с выбором аккаунта: <span className="text-green-400 font-medium">быстрый старт</span> — гретые аккаунты готовые к заказу, <span className="text-yellow-400 font-medium">догрев</span> — покупают с целью получения высокого лимита.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      {/* Category Cards - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Готовы к заказу */}
        <Card 
          className={`cursor-pointer transition-all duration-500 relative overflow-hidden hover:scale-[1.01] active:scale-[0.99] ${
            showReadyOnly 
              ? 'bg-green-600/30 border-2 border-green-500/70 ring-2 ring-green-500/50' 
              : 'bg-gradient-to-br from-[#1a1f2e]/60 to-[#141820]/40 border-2 border-[#2a3142]/50 hover:border-white/20'
          } ${currentHighlight === 'ready' ? 'ring-2 ring-primary relative z-[110]' : ''}`}
          onClick={() => setShowReadyOnly(true)}
        >
          <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-gray-600/50 border border-gray-500/50 rounded-full text-[10px] text-gray-300 font-medium">
            рекомендуется
          </div>
          <CardContent className="p-4 py-6">
            <div className="flex items-start gap-3">
              <CheckCircle className={`w-6 h-6 flex-shrink-0 ${showReadyOnly ? 'text-green-400' : 'text-muted-foreground'}`} />
              <div>
                <h3 className={`text-base font-bold ${showReadyOnly ? 'text-green-400' : 'text-foreground'}`}>Готовы к заказу</h3>
                <p className={`text-xs mt-1 ${showReadyOnly ? 'text-green-400/80' : 'text-muted-foreground'}`}>Аккаунты для быстрого старта</p>
                <p className={`text-sm font-medium mt-3 ${showReadyOnly ? 'text-green-400' : 'text-muted-foreground'}`}>
                  Доступно: {mockAccounts.filter(acc => acc.emulation_status.includes('Готов')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Догрев */}
        <Card 
          className={`cursor-pointer transition-all duration-500 relative overflow-hidden hover:scale-[1.01] active:scale-[0.99] ${
            !showReadyOnly 
              ? 'bg-yellow-600/30 border-2 border-yellow-500/70 ring-2 ring-yellow-500/50' 
              : 'bg-gradient-to-br from-[#1a1f2e]/60 to-[#141820]/40 border-2 border-[#2a3142]/50 hover:border-white/20'
          } ${currentHighlight === 'warmup' ? 'ring-2 ring-primary relative z-[110]' : ''}`}
          onClick={() => setShowReadyOnly(false)}
        >
          <CardContent className="p-4 py-6">
            <div className="flex items-start gap-3">
              <Zap className={`w-6 h-6 flex-shrink-0 ${!showReadyOnly ? 'text-yellow-400' : 'text-muted-foreground'}`} />
              <div>
                <h3 className={`text-base font-bold ${!showReadyOnly ? 'text-yellow-400' : 'text-foreground'}`}>Догрев</h3>
                <p className={`text-xs mt-1 ${!showReadyOnly ? 'text-yellow-400/80' : 'text-muted-foreground'}`}>Аккаунты для увеличения лимита</p>
                <p className={`text-sm font-medium mt-3 ${!showReadyOnly ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                  Доступно: {mockAccounts.filter(acc => !acc.emulation_status.includes('Готов')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Filters - Always visible */}
      <div className={`p-4 bg-black/40 rounded-lg border-2 border-[#2a3142]/50 transition-all duration-500 ${currentHighlight === 'activeFilters' ? 'ring-2 ring-primary relative z-[110]' : ''}`}>
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setFiltersExpanded(!filtersExpanded)}
        >
          <span className="text-sm font-medium text-foreground">Активные фильтры:</span>
          <Globe className="w-4 h-4 text-muted-foreground" />
          <button className="ml-auto p-1 hover:bg-white/10 rounded transition-colors">
            {filtersExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
        
        <AnimatePresence>
          {filtersExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Active filter name */}
              <div className="mt-3 text-sm">
                <span className={showReadyOnly ? 'text-green-400 font-medium' : 'text-yellow-400 font-medium'}>
                  {showReadyOnly ? 'Быстрый старт' : 'Догрев'}
                </span>
              </div>
              
              {/* Separator with description */}
              <div className="mt-3 py-3 px-4 bg-[#2a3142]/40 rounded-lg border border-[#3a4152]/30">
                <span className="inline-block px-3 py-1.5 bg-black/60 rounded-md">
                  <span className="text-sm font-medium text-foreground">
                    {showReadyOnly 
                      ? 'Быстрый старт — аккаунты готовые уже к заказу.' 
                      : 'Догрев — аккаунты можно использовать для увеличения лимита.'
                    }
                  </span>
                </span>
              </div>
              
              {/* Filter tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <AnimatePresence mode="popLayout">
                  {activeFilters.map((filter, index) => (
                    <motion.div
                      key={`${filter.label}-${filter.value}`}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        filter.label === 'Статус' 
                          ? showReadyOnly 
                            ? 'bg-green-500/20 border border-green-500/50' 
                            : 'bg-yellow-500/20 border border-yellow-500/50'
                          : 'bg-primary/20 border border-primary/50'
                      }`}
                    >
                      <span className="text-muted-foreground">{filter.label}:</span>
                      <span className={filter.color || 'text-foreground'}>{filter.value}</span>
                      {filter.onRemove && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            filter.onRemove?.();
                          }}
                          className="ml-1 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Filters */}
      <div className={`flex flex-wrap items-center gap-4 p-4 bg-gradient-to-br from-[#1a1f2e]/60 to-[#141820]/40 border-2 border-[#2a3142]/50 rounded-lg transition-all duration-500 ${currentHighlight === 'filters' ? 'ring-2 ring-primary relative z-[110]' : ''}`}>
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
          <SelectTrigger className="w-48 bg-[#2a3142]/60 border-white/30 text-foreground">
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
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="border-white/30 bg-[#2a3142]/40 hover:bg-[#2a3142]/60"
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>

        <span className="text-sm text-muted-foreground">
          {filteredAccounts.length} из {mockAccounts.length}
        </span>
      </div>

      {/* Purchase bar */}
      {selectedAccounts.length > 0 && (
        <div className="bg-black/30 p-4 rounded-lg border border-white/20 flex items-center justify-between animate-fade-in">
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
        </div>
      )}

      {/* Accounts Grid - Matching reference design */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-500 ${currentHighlight === 'accounts' ? 'ring-2 ring-primary rounded-xl p-2 relative z-[110]' : ''}`}>
        {filteredAccounts.map((account) => {
          const isSelected = selectedAccounts.includes(account.id);
          const isReady = account.emulation_status.includes('Готов');
          
          return (
            <Card 
              key={account.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-[#1a1f2e]/60 to-[#141820]/40 border-2 border-[#2a3142]/50 ${
                isSelected 
                  ? 'border-primary ring-2 ring-primary/50' 
                  : ''
              }`}
              onClick={() => toggleAccountSelection(account.id)}
            >
              <CardContent className="p-4 space-y-2">
                {/* Name + ID row */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-foreground font-semibold text-sm">{account.name}</h4>
                  <span className="text-muted-foreground/70 font-mono text-[10px] text-right flex-shrink-0 max-w-[100px] truncate">{account.id}</span>
                </div>
                
                {/* Split */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Сплит</span>
                  <div className="flex items-center gap-1.5">
                    <img src={splitLogo} alt="Split" className="w-3.5 h-3.5" />
                    <span className="px-2 py-0.5 bg-gray-600/50 rounded-full text-foreground font-medium text-xs">
                      {account.split.toLocaleString('ru-RU')} RUB
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Цена:</span>
                  <span className="text-foreground font-medium text-xs">{account.price.toLocaleString('ru-RU')} RUB</span>
                </div>
                
                {/* City */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Город</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-foreground text-xs">
                      {account.city === 'Неизвестно' ? 'Любой город' : account.city}
                    </span>
                  </div>
                </div>
                
                {/* Status */}
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-muted-foreground text-xs">Статус</span>
                  <span className={`px-2 py-0.5 border rounded-full text-[10px] font-medium ${
                    isReady 
                      ? 'border-green-500/60 text-green-400' 
                      : 'border-yellow-500/60 text-yellow-400'
                  }`}>
                    {account.emulation_status}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Нет аккаунтов по выбранным фильтрам</p>
        </div>
      )}
    </div>
  );
};
