import { useState } from 'react';
import Link from 'next/link';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.75rem',
          cursor: 'pointer',
          padding: '0.5rem',
          zIndex: 100
        }}
        className="mobile-menu-btn"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 90,
              animation: 'fadeIn 0.2s ease-out'
            }}
          />

          {/* Menu Panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '80%',
            maxWidth: '320px',
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,215,0,0.2)',
            zIndex: 100,
            padding: '2rem 1.5rem',
            overflowY: 'auto',
            animation: 'slideInRight 0.3s ease-out',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                color: '#999',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1
              }}
            >
              ✕
            </button>

            {/* Menu Items */}
            <nav style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/export', label: 'B2B Export' },
                { href: '/ai-matching', label: 'AI Matching' },
                { href: '/founder-supplier', label: 'Founder Program' },
                { href: '/help', label: 'Help' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    display: 'block',
                    transition: 'all 0.2s',
                    borderLeft: '3px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,215,0,0.1)';
                    e.currentTarget.style.borderLeftColor = '#FFD700';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'rgba(255,255,255,0.1)', 
                margin: '1.5rem 0' 
              }} />

              {/* Auth Buttons */}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,215,0,0.3)',
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#FFD700',
                  color: '#000',
                  textDecoration: 'none',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.3)'
                }}
              >
                Start Free
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* CSS for mobile menu */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .desktop-nav-links {
            display: none !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}