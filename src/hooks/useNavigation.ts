import { useState, useCallback } from 'react';
import { NavItem } from '@/types/navigation';

export function useNavigation(initialTab: NavItem = 'home') {
  const [activeTab, setActiveTab] = useState<NavItem>(initialTab);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigateTo = useCallback((tab: NavItem) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return {
    activeTab,
    navigateTo,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar,
  };
}
