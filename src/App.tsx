import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/MainLayout';

export default function App() {
  useEffect(() => {
    // Prevent mouse wheel / trackpad gesture scrolling from changing values in number inputs
    const handleWheel = (e: WheelEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && activeEl.tagName === 'INPUT' && (activeEl as HTMLInputElement).type === 'number') {
        activeEl.blur();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
