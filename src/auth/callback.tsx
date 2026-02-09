import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const handle = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setStatus('Authentication failed');
          setTimeout(() => router.push('/login?error=auth_failed'), 1500);
          return;
        }

        if (session) {
          setStatus('Success! Redirecting...');
          setTimeout(() => router.push('/dashboard'), 500);
        } else {
          // Wait for auth state
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
              setStatus('Success! Redirecting...');
              setTimeout(() => router.push('/dashboard'), 500);
              subscription.unsubscribe();
            }
          });
          // Timeout fallback
          setTimeout(() => {
            setStatus('Session not found');
            router.push('/login');
          }, 5000);
        }
      } catch (err) {
        setStatus('Something went wrong');
        setTimeout(() => router.push('/login?error=callback_failed'), 1500);
      }
    };
    handle();
  }, [router]);

  return (
    <>
      <style jsx global>{`
        body { font-family: 'DM Sans', -apple-system, sans-serif; background: #0f0f0f; margin: 0; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.8; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #D4AF37, #F4D03F)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, animation: 'pulse 1.5s ease-in-out infinite', boxShadow: '0 4px 32px rgba(212,175,55,0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#0f0f0f" fillOpacity="0.9"/><circle cx="12" cy="11" r="2.5" fill="#D4AF37"/></svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Signing you in</p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{status}</p>
        <div style={{ marginTop: 32, width: 24, height: 24, border: '2px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    </>
  );
}
