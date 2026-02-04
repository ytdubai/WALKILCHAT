import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../lib/providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - WakilChat</title>
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1), transparent 50%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.2), transparent)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Image 
                src="/branding/logo-icon.jpg" 
                alt="WakilChat" 
                width={60} 
                height={60} 
                style={{ borderRadius: '50%', boxShadow: '0 0 30px rgba(255,215,0,0.4)' }}
              />
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat
              </span>
            </Link>
          </div>

          {/* Glassmorphic Card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,215,0,0.2)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.1)',
            position: 'relative'
          }}>
            {/* Shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to bottom, rgba(255,215,0,0.1), transparent)',
              borderRadius: '1.5rem 1.5rem 0 0',
              pointerEvents: 'none'
            }} />

            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome Back 🦁
            </h2>
            <p style={{ textAlign: 'center', color: '#999', marginBottom: '2rem', fontSize: '0.875rem' }}>
              Log in to manage your business
            </p>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                marginBottom: '1.5rem',
                color: '#fca5a5',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.875rem', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,215,0,0.2)'}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.875rem', fontWeight: '500' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,215,0,0.2)'}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: loading ? '#999' : 'linear-gradient(135deg, #FFD700, #FFA500)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? 'Logging in...' : 'Log In to Dashboard'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link href="/forgot-password" style={{ color: '#FFD700', fontSize: '0.875rem', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                Don't have an account?
              </p>
              <Link href="/signup" style={{
                display: 'inline-block',
                color: '#FFD700',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '50px',
                transition: 'all 0.3s'
              }}>
                Create Free Account →
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            opacity: 0.6
          }}>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🔒</div>
              Bank-Level Security
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🛡️</div>
              Data Protected
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>⚡</div>
              99.9% Uptime
            </div>
          </div>
        </div>
      </div>
    </>
  );
}