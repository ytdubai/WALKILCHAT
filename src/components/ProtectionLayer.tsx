import { useEffect } from 'react';

export function ProtectionLayer() {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable common shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // Redirect or show warning
        document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">Unauthorized access detected</h1>';
      }
    };

    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Check for DevTools periodically (only in production)
    let devToolsInterval: NodeJS.Timeout;
    if (process.env.NODE_ENV === 'production') {
      devToolsInterval = setInterval(detectDevTools, 1000);
    }

    // Add copyright watermark
    console.log(
      '%c⚠️ WARNING',
      'color: red; font-size: 40px; font-weight: bold;'
    );
    console.log(
      '%cThis is proprietary code. Unauthorized copying, modification, or distribution is strictly prohibited and will be prosecuted.',
      'color: yellow; font-size: 16px;'
    );
    console.log(
      '%c© 2026 WakilChat. All Rights Reserved.',
      'color: white; font-size: 14px;'
    );

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      if (devToolsInterval) {
        clearInterval(devToolsInterval);
      }
    };
  }, []);

  return null;
}