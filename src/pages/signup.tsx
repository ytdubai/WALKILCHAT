import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../lib/providers/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Start Free - WakilChat</title>
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.15), transparent 40%),
          radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.12), transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08), transparent 50%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite'
        }} />
        <style>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
        `}</style>

        {/* Multiple glow orbs */}
        {[
          { top: '5%', left: '15%', size: '250px', color: 'rgba(255,215,0,0.2)' },
          { bottom: '10%', right: '20%', size: '350px', color: 'rgba(139,92,246,0.15)' },
          { top: '60%', left: '5%', size: '200px', color: 'rgba(6,182,212,0.1)' }
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...orb,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
            filter: 'blur(70px)',
            pointerEvents: 'none'
          }} />
        ))}

        <div style={{
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo & Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <Image 
                src="/branding/logo-icon.jpg" 
                alt="WakilChat" 
                width={70} 
                height={70} 
                style={{ borderRadius: '50%', boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}
              />
            </Link>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Start Your Journey
            </h1>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>
              Join 50,000+ entrepreneurs growing with WakilChat
            </p>
          </div>

          {/* Premium Glassmorphic Card */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(30px)',
            border: '1.5px solid rgba(255,215,0,0.25)',
            borderRadius: '1.75rem',
            padding: '2.5rem',
            boxShadow: '0 25px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 50px rgba(255,215,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(255,215,0,0.12), transparent)',
              pointerEvents: 'none'
            }} />

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#fca5a5',
                fontSize: '0.875rem',
                position: 'relative'
              }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#FFD700', fontSize: '0.875rem', fontWeight: '600' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,215,0,0.25)',
                    borderRadius: '0.875rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,215,0,0.25)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#FFD700', fontSize: '0.875rem', fontWeight: '600' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,215,0,0.25)',
                    borderRadius: '0.875rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,215,0,0.25)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#FFD700', fontSize: '0.875rem', fontWeight: '600' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,215,0,0.25)',
                    borderRadius: '0.875rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,215,0,0.25)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#FFD700', fontSize: '0.875rem', fontWeight: '600' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength={8}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,215,0,0.25)',
                    borderRadius: '0.875rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,215,0,0.25)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Minimum 8 characters"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1.125rem',
                  background: loading ? '#999' : 'linear-gradient(135deg, #FFD700, #FFA500)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '0.875rem',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 25px rgba(255,215,0,0.5)',
                  transition: 'all 0.3s',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? '⏳ Creating Account...' : '🚀 Start FREE - No Card Required'}
              </button>

              <p style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', marginTop: '0.5rem' }}>
                ✓ Free forever &nbsp;•&nbsp; ✓ No credit card &nbsp;•&nbsp; ✓ Cancel anytime
              </p>
            </form>

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                Already have an account?
              </p>
              <Link href="/login" style={{
                display: 'inline-block',
                color: '#FFD700',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '50px',
                transition: 'all 0.3s'
              }}>
                Log In →
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div style={{
            marginTop: '2.5rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,215,0,0.15)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#FFD700', marginBottom: '1rem' }}>
              ✨ What you get instantly:
            </p>
            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.875rem', color: '#ccc' }}>
              {[
                '📞 Unlimited FREE voice & video calls',
                '💰 Accept M-Pesa, Telebirr, card payments',
                '🏪 Your own online shop (live in 60 seconds)',
                '🤖 AI assistant to automate tasks',
                '📊 Business analytics & insights',
                '🛡️ Bank-level security & data protection'
              ].map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-around',
            opacity: 0.7
          }}>
            {[
              { icon: '🔒', text: 'Secure' },
              { icon: '⚡', text: 'Instant Setup' },
              { icon: '🌍', text: '50k+ Users' }
            ].map((badge, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{badge.icon}</div>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}