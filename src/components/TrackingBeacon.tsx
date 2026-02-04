import { useEffect } from 'react';

export function TrackingBeacon() {
  useEffect(() => {
    // Only in production
    if (process.env.NODE_ENV === 'production') {
      const sendBeacon = async () => {
        try {
          const data = {
            buildId: 'WK-2026-02-04',
            domain: window.location.hostname,
            path: window.location.pathname,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
          };

          // Send to your tracking endpoint
          // For now, just log to console in production
          // Later: replace with actual endpoint
          console.log('[TRACKING]', btoa(JSON.stringify(data)));
          
          // You can add this later:
          // await fetch('https://api.wakilchat.com/track', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(data)
          // });
        } catch (err) {
          // Silent fail - don't break site if tracking fails
        }
      };

      // Send on load
      sendBeacon();

      // Send periodically to detect if someone's using your code
      const interval = setInterval(sendBeacon, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, []);

  return null;
}