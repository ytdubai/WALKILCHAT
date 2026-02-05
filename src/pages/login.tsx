import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { router.push('/dashboard'); }, 1500);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
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
    marginBottom: '8px',
  };

  return (
    <>
      <Head>
        <title>Log In - WakilChat</title>
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
          right: '-100px',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
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
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))',
              borderRadius: '20px',
              border: '1px solid rgba(234,179,8,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(234,179,8,0.1)',
              fontSize: '40px',
            }}>&#129409;</div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#EAB308', margin: '0 0 4px', letterSpacing: '-0.5px' }}>WakilChat</h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Business Super App</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '40px 32px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', margin: '0 0 6px' }}>Welcome back</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: '0 0 32px' }}>Log in to manage your business</p>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Email or Phone</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email or phone" style={inputStyle} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginBottom: '28px' }}>
                <a href="#" style={{ fontSize: '13px', color: '#EAB308', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
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
              }}>{loading ? 'Logging in...' : 'Log In'}</button>
            </form>
            <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Google</button>
              <button style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Phone</button>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            New here? <a href="/signup" style={{ color: '#EAB308', textDecoration: 'none', fontWeight: 600 }}>Create free account</a>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>&#128274; Bank-grade security</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>&#10003; Free forever</span>
          </div>
          <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>&copy; 2026 WakilChat &middot; All Rights Reserved</p>
        </div>
      </div>
    </>
  );
}
