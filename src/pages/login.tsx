import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/providers/AuthProvider';

export default function Login() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // Note: Redirect is handled by Supabase OAuth flow
    } catch (err: any) {
      setError(err.message || 'Google login failed');
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In - WakilChat</title>
        <meta name="description" content="Log in to WakilChat to manage your business" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #0d4a6b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 150, 255, 0.15) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40, cursor: 'pointer' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #00D4AA, #00A3CC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 212, 170, 0.3)',
              }}>
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                  <path d="M50 10L55 15L65 12L75 20L80 30L82 45L78 60L70 75L55 85L50 90L45 85L30 75L22 60L18 45L20 30L25 20L35 12L45 15L50 10Z" fill="white" fillOpacity="0.95"/>
                  <circle cx="42" cy="35" r="5" fill="#0a2540"/>
                  <circle cx="58" cy="50" r="5" fill="#0a2540"/>
                  <circle cx="38" cy="60" r="5" fill="#0a2540"/>
                  <line x1="42" y1="35" x2="58" y2="50" stroke="#0a2540" strokeWidth="3"/>
                  <line x1="58" y1="50" x2="38" y2="60" stroke="#0a2540" strokeWidth="3"/>
                </svg>
              </div>
              <span style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>WakilChat</span>
            </div>
          </Link>

          {/* Login Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: 20,
            padding: '40px 36px',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
          }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0a2540', margin: '0 0 8px' }}>Welcome back</h1>
            <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 32px' }}>Log in to manage your business</p>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 10,
                padding: '12px 16px',
                marginBottom: 20,
                fontSize: 14,
                color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    fontSize: 15,
                    color: '#0a2540',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00D4AA';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 170, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 60px 14px 16px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 10,
                      fontSize: 15,
                      color: '#0a2540',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00D4AA';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 170, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <Link href="/forgot-password" style={{ fontSize: 14, color: '#00A3CC', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: 16,
                  background: loading ? '#94a3b8' : 'linear-gradient(135deg, #00D4AA, #00A3CC)',
                  border: 'none',
                  borderRadius: 10,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 15px rgba(0, 212, 170, 0.3)',
                  transition: 'all 0.2s',
                }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0', gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              <span style={{ fontSize: 13, color: '#94a3b8' }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            </div>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: 14,
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  cursor: googleLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: googleLoading ? 0.6 : 1,
                }}
                onMouseOver={(e) => { if (!googleLoading) e.currentTarget.style.background = '#f8fafc'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'white'; }}
              >
                {/* Google Icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                  {googleLoading ? 'Connecting...' : 'Google'}
                </span>
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: 14,
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'white'; }}
              >
                {/* Phone Icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Phone</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 15, color: 'rgba(255, 255, 255, 0.7)' }}>
            New here?{' '}
            <Link href="/signup" style={{ color: '#00D4AA', fontWeight: 600 }}>
              Create free account
            </Link>
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255, 255, 255, 0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              256-bit encryption
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255, 255, 255, 0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Free to start
            </span>
          </div>

          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'rgba(255, 255, 255, 0.3)' }}>
            © 2026 WakilChat™ · All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
