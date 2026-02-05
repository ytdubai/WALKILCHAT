import { useState, useEffect } from 'react';

export function SecurityWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show in development mode, not to regular users!
    if (process.env.NODE_ENV === 'development') {
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
            <p style={{ fontWeight: 'bold', fontSize: '0.875rem', margin: 0 }}>DEV MODE - Code Protected</p>
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

// Copyright footer - ALWAYS VISIBLE but subtle
export function CopyrightWatermark() {
  return (
    <>
      {/* Subtle copyright footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.7rem',
        borderTop: '1px solid rgba(255,215,0,0.2)',
        zIndex: 40,
        opacity: 0.7
      }}>
        <p style={{ margin: 0 }}>
          © 2026 WakilChat™ • All Rights Reserved • Patent Pending
        </p>
      </div>

      {/* Invisible metadata for legal protection */}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        data-copyright="WakilChat-2026"
        data-license="Proprietary"
      />
    </>
  );
}