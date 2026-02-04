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
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-sm">SECURITY WARNING - PROTECTED CODE</p>
            <p className="text-xs">
              This code is copyrighted © 2026 WakilChat. Unauthorized copying is illegal and monitored.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-white/80 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Watermark for every page
export function CopyrightWatermark() {
  return (
    <>
      {/* Visible footer warning */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white py-2 px-4 text-center text-xs border-t border-red-500/30 z-50">
        <p>
          © 2026 WakilChat • All Rights Reserved • Patent Pending • 
          <span className="text-red-400 font-semibold"> Protected by Law</span> • 
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

      {/* CSS watermark */}
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