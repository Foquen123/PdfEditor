'use client';

import { ITab } from '@/interfaces/tab.interface';
import { useState, useEffect, useCallback } from 'react';

export function useHashTab(validTabs: readonly ITab[], defaultTab: ITab) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const getHashTab = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const tab = validTabs.find((t) => t.name === hash) || defaultTab;
    return tab;
  }, [validTabs, defaultTab]);

  useEffect(() => {
    function x() {
      setActiveTab(getHashTab());
    }
    x();

    const handleHashChange = () => setActiveTab(getHashTab());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [getHashTab]);

  const switchTab = useCallback((tab: ITab) => {
    setActiveTab(tab);
    window.location.hash = tab.name;
  }, []);

  return { activeTab, switchTab };
}
