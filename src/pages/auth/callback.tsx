import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Logging in...');

  useEffect(() => {
    let cancelled = false;

    // Set up auth state listener FIRST to catch events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!cancelled && session) {
          setStatus('Success! Redirecting...');
          router.push('/dashboard');
        }
      }
    );

    // Poll for session - handles both PKCE and implicit flows
    // detectSessionInUrl processes the URL automatically,
    // so we just need to wait for the session to appear
    const checkSession = async () => {
      for (let i = 0; i < 20; i++) {
        if (cancelled) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setStatus('Success! Redirecting...');
          router.push('/dashboard');
          return;
        }
        await new Promise(r => setTimeout(r, 500));
      }
      // Timed out after 10 seconds
      if (!cancelled) {
        setStatus('Authentication failed. Redirecting...');
        router.push('/login?error=timeout');
      }
    };

    checkSession();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTop: '3px solid #d4a017', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '18px' }}>{status}</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
