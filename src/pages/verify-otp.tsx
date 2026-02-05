import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabase';

export default function VerifyOTP() {
  const router = useRouter();
  const { phone } = router.query;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone as string,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verify OTP - WakilChat™</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #EAB308, #CA8A04)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(234,179,8,0.1)',
              fontSize: '36px',
            }}>🦁</div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#EAB308', margin: '0 0 4px' }}>WakilChat™</h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Business Super App</p>
          </div>

          {/* Form Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '36px 32px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px', textAlign: 'center' }}>
              Verify Your Phone
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 28px', textAlign: 'center' }}>
              We sent a 6-digit code to {phone}
            </p>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#fca5a5',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '7px',
                  textAlign: 'center'
                }}>
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  required
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '24px',
                    textAlign: 'center',
                    letterSpacing: '8px',
                    outline: 'none',
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: (loading || otp.length !== 6) ? 'rgba(234,179,8,0.5)' : 'linear-gradient(135deg, #EAB308, #CA8A04)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#050505',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: (loading || otp.length !== 6) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(234,179,8,0.3)',
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={() => router.push('/signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EAB308',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← Back to signup
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            Didn't receive code? Check your SMS or try again.
          </p>
        </div>
      </div>
    </>
  );
}