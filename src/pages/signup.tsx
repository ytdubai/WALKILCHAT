import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../lib/providers/AuthProvider';

export default function Signup() {
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithPhone } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signUp(email || phone, password, {
        full_name: fullName,
        phone: phone
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google signup failed');
    }
  };

  const handlePhoneSignup = async () => {
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    try {
      await signInWithPhone(phone);
      router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
    } catch (err: any) {
      setError(err.message || 'Phone signup failed');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: "'Outfit', sans-serif",
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '7px',
  };

  return (
    <>
      <Head>
        <title>Create Account - WakilChat</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '20px',
      }}>
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
          top: '-200px',
          left: '-100px',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
          bottom: '-100px',
          right: '-100px',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))',
              borderRadius: '18px',
              border: '1px solid rgba(234,179,8,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(234,179,8,0.1)',
              fontSize: '36px',
            }}>&#129409;</div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#EAB308', margin: '0 0 4px', letterSpacing: '-0.5px' }}>WakilChat</h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Business Super App</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '36px 32px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Create your free account</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>Join 50,000+ African entrepreneurs. Takes 30 seconds.</p>
            
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#fca5a5',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" required style={inputStyle} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." required style={inputStyle} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" required style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{
                width: '100%',
                padding: '16px',
                background: loading ? 'rgba(234,179,8,0.5)' : 'linear-gradient(135deg, #EAB308, #CA8A04)',
                border: 'none',
                borderRadius: '12px',
                color: '#050505',
                fontSize: '16px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(234,179,8,0.3)',
                fontFamily: "'Outfit', sans-serif",
              }}>{loading ? 'Creating account...' : 'Create My Account'}</button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '14px 0 0' }}>Free forever &middot; No credit card &middot; Setup in 60 seconds</p>
            </form>

            {/* Social Auth */}
            <div style={{ margin: '24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  Google
                </button>
                
                <button
                  type="button"
                  onClick={handlePhoneSignup}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  📱 Phone OTP
                </button>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            Already have an account? <a href="/login" style={{ color: '#EAB308', textDecoration: 'none', fontWeight: 600 }}>Log in</a>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>&#128274; Secure</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>&#10003; Free forever</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>&#9889; Instant setup</span>
          </div>
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>&copy; 2026 WakilChat &middot; All Rights Reserved</p>
        </div>
      </div>
    </>
  );
}
