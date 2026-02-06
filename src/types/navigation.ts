export type NavItem = 
  | 'home' 
  | 'accounts' 
  | 'order' 
  | 'warmup' 
  | 'emulator' 
  | 'faq' 
  | 'config' 
  | 'payment' 
  | 'chat' 
  | 'admin';

export interface NavItemConfig {
  id: NavItem;
  label: string;
  icon: React.ReactNode;
  badge?: 'new' | 'admin';
  section: 'main' | 'settings';
  showInBottomNav?: boolean;
  adminOnly?: boolean;
}

export interface User {
  first_name: string;
  telegram_id: string;
  username?: string;
  balance: number;
  role: 'user' | 'admin';
}
