import { useEffect } from 'react';

export function ProtectionLayer() {
  useEffect(() => {
    // Only apply protection in production and NOT on mobile
    if (process.env.NODE_ENV !== 'production') return;
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return; // Don't block mobile users!

    // Disable right-click (desktop only)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U (desktop only)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Add console warning (always)
    console.log(
      '%c⚠️ WARNING',
      'color: red; font-size: 40px; font-weight: bold;'
    );
    console.log(
      '%cThis is proprietary code. Unauthorized copying, modification, or distribution is strictly prohibited.',
      'color: yellow; font-size: 16px;'
    );
    console.log(
      '%c© 2026 WakilChat™. All Rights Reserved.',
      'color: white; font-size: 14px;'
    );

    // Only add event listeners on desktop
    if (!isMobile) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup
    return () => {
      if (!isMobile) {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return null;
}