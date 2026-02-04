import { useState, useEffect } from 'react';

export function SecurityWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show warning in development or when DevTools are open
    const isDev = process.env.NODE_ENV === 'development';
    const isDevToolsOpen = window.outerWidth - window.innerWidth > 160;
    
    if (isDev || isDevToolsOpen) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: 'linear-gradient(to right, #dc2626, #ea580c)',
      color: 'white',
      padding: '0.75rem 1rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <p style={{ fontWeight: 'bold', fontSize: '0.875rem', margin: 0 }}>SECURITY WARNING - PROTECTED CODE</p>
            <p style={{ fontSize: '0.75rem', margin: 0 }}>
              This code is copyrighted © 2026 WakilChat. Unauthorized copying is illegal and monitored.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Permanent copyright footer - ALWAYS VISIBLE
export function CopyrightWatermark() {
  return (
    <>
      {/* ALWAYS VISIBLE copyright footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        borderTop: '1px solid rgba(239,68,68,0.3)',
        zIndex: 50
      }}>
        <p style={{ margin: 0 }}>
          © 2026 WakilChat • All Rights Reserved • Patent Pending • 
          <span style={{ color: '#fca5a5', fontWeight: '600' }}> Protected by Law</span> • 
          Unauthorized use is monitored and prosecuted
        </p>
      </div>

      {/* Invisible watermark in DOM */}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        data-copyright="WakilChat-2026-All-Rights-Reserved"
        data-license="Proprietary"
        data-tracking-id="WK-BUILD-20260204"
        data-warning="Unauthorized-copying-is-illegal-and-monitored"
      />

      {/* CSS watermark - giant background text */}
      <style jsx global>{`
        body::before {
          content: 'WakilChat © 2026';
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          font-weight: bold;
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
          color: #8B5CF6;
          user-select: none;
        }
      `}</style>
    </>
  );
}