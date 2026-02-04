import { useState, useEffect } from 'react';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Listen for install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show our custom prompt after 5 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // For iOS - show instructions
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        alert('To install:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add"');
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      maxWidth: '90%',
      width: '400px',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
      
      <div style={{
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: '0 20px 60px rgba(255,215,0,0.4)',
        border: '2px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
          <div style={{ 
            fontSize: '2.5rem',
            flexShrink: 0
          }}>
            🦁
          </div>
          
          <div style flex: 1 }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              Install WakilChat!
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#333',
              marginBottom: '1rem',
              margin: '0.5rem 0 1rem 0'
            }}>
              Add to your home screen for instant access. Works offline!
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleInstall}
                style={{
                  flex: 1,
                  background: '#000',
                  color: '#FFD700',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                ✨ Install Now
              </button>
              
              <button
                onClick={handleDismiss}
                style={{
                  background: 'rgba(0,0,0,0.1)',
                  color: '#333',
                  padding: '0.75rem 1rem',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            style={{
              background: 'none',
              border: 'none',
              color: '#333',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}