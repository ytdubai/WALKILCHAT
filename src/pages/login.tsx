import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/providers/AuthProvider';

// ============================================
// WAKILCHAT LOGIN - Plaid-inspired Design
// Split layout with branding sidebar
// ============================================

export default function Login() {
  const router = useRouter();
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Check for error in URL params
  useEffect(() => {
    if (router.query.error) {
      setError('Authentication failed. Please try again.');
    }
  }, [router.query]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await signIn(email, password);
      console.log('Login successful, redirecting...');
      // Small delay to ensure session is set
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.href = '/dashboard'; // Use window.location for hard redirect
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // OAuth redirect handled by Supabase
    } catch (err: any) {
      setError(err.message || 'Google login failed');
      setGoogleLoading(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f0f0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Log In — WakilChat</title>
        <meta name="description" content="Log in to your WakilChat dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: #0f0f0f;
          color: #fff;
          -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
        input:focus { outline: none; }
        ::selection { background: rgba(212, 175, 55, 0.3); }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex' }}>
        
        {/* ========== LEFT SIDEBAR - BRANDING ========== */}
        <div className="sidebar" style={{
          width: 420, flexShrink: 0,
          background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 40px',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(212, 175, 55, 0.3)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#0f0f0f" fillOpacity="0.9"/>
                <circle cx="12" cy="11" r="2" fill="#D4AF37"/>
              </svg>
            </div>
            <span style={{
              fontSize: 22, fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>WakilChat</span>
          </Link>

          {/* Value proposition */}
          <div style={{ marginTop: 80 }}>
            <h1 style={{
              fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 16,
            }}>
              Business tools that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>just work</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Payments, messaging, and AI — unified in one app for African entrepreneurs.
            </p>
          </div>

          {/* Features list */}
          <div style={{ marginTop: 48 }}>
            {[
              { icon: '💬', text: 'Unified inbox for WhatsApp, Telegram & SMS' },
              { icon: '💳', text: 'Accept M-Pesa, Telebirr, cards & transfers' },
              { icon: '🤖', text: 'AI assistant for 24/7 customer support' },
              { icon: '📊', text: 'Real-time analytics and insights' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20,
              }}>
                <span style={{ fontSize: 18, lineHeight: 1.5 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              © 2026 WakilChat™ · Built for Africa
            </div>
          </div>
        </div>

        {/* ========== RIGHT SIDE - LOGIN FORM ========== */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '48px 24px', background: '#0f0f0f',
        }}>
          <div style={{ width: '100%', maxWidth: 380 }}>
            
            {/* Mobile logo */}
            <div className="mobile-logo" style={{ marginBottom: 32, textAlign: 'center' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#0f0f0f" fillOpacity="0.9"/>
                  </svg>
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#D4AF37' }}>WakilChat</span>
              </Link>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Welcome back</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              Log in to your dashboard
            </p>

            {/* Error message */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 10, padding: '14px 16px', marginBottom: 24,
                fontSize: 14, color: '#EF4444',
              }}>
                {error}
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: 'block', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)', marginBottom: 8,
                }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%', padding: '14px 16px', fontSize: 15,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: '#fff',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: 'block', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)', marginBottom: 8,
                }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: '100%', padding: '14px 16px', paddingRight: 64,
                      fontSize: 15, background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10, color: '#fff',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                      e.target.style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.target.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 16, top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', color: 'rgba(255,255,255,0.4)',
                      fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <Link href="/forgot-password" style={{ fontSize: 13, color: '#D4AF37', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%', padding: '15px', fontSize: 15, fontWeight: 600,
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  border: 'none', borderRadius: 10, color: '#0f0f0f',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: '0 2px 16px rgba(212, 175, 55, 0.25)',
                  transition: 'all 0.2s',
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* Social logins */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px', fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, color: '#fff', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {googleLoading ? 'Connecting...' : 'Google'}
              </button>

              <Link href="/login-phone" style={{ flex: 1 }}>
                <button style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px', fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, color: '#fff', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Phone
                </button>
              </Link>
            </div>

            {/* Sign up link */}
            <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
              Don't have an account?{' '}
              <Link href="/signup" style={{ color: '#D4AF37', fontWeight: 600 }}>
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .sidebar { display: none !important; }
          .mobile-logo { display: block !important; }
        }
        @media (min-width: 901px) {
          .mobile-logo { display: none !important; }
        }
      `}</style>
    </>
  );
}
