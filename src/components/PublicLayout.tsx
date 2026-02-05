import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        background: 'rgba(10, 10, 10, 0.95)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid rgba(255, 215, 0, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
            <Image src="/branding/logo-icon.jpg" alt="WakilChat Lion" width={50} height={50} style={{ borderRadius: '50%' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>
              <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/login" style={{ 
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '50px',
              border: '1px solid rgba(255,215,0,0.3)',
              fontWeight: '500',
              fontSize: '1.125rem'
            }}>
              Login
            </Link>
            <Link href="/signup" style={{ 
              background: '#FFD700', 
              color: '#000', 
              padding: '0.75rem 1.75rem', 
              borderRadius: '50px', 
              fontWeight: '600', 
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(255,215,0,0.3)',
              fontSize: '1.125rem'
            }}>
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={40} height={40} style={{ borderRadius: '50%' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
              <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
            </span>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', fontSize: '1.125rem' }}>
            <Link href="/about" style={{ color: '#999', textDecoration: 'none' }}>About</Link>
            <Link href="/pricing" style={{ color: '#999', textDecoration: 'none' }}>Pricing</Link>
            <Link href="/export" style={{ color: '#999', textDecoration: 'none' }}>Export</Link>
            <Link href="/ai-matching" style={{ color: '#999', textDecoration: 'none' }}>AI Matching</Link>
            <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms</Link>
          </div>
          <p style={{ color: '#999', fontSize: '1.125rem' }}>Pre-Launch 2026 • Made with 🦁 in Africa</p>
        </div>
      </footer>
    </div>
  );
}