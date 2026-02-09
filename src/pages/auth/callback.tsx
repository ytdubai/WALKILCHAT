import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Logging in...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL query params (PKCE flow)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error('Code exchange error:', error);
            setStatus('Authentication failed');
            setTimeout(() => router.push('/login?error=auth_failed'), 1500);
            return;
          }
          if (data.session) {
            setStatus('Success! Redirecting...');
            setTimeout(() => router.push('/dashboard'), 500);
            return;
          }
        }

        // Check for hash fragments (implicit flow fallback)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');

        if (accessToken) {
          // Wait for Supabase to detect the session from URL
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setStatus('Success! Redirecting...');
            setTimeout(() => router.push('/dashboard'), 500);
            return;
          }
        }

        // Listen for auth state changes as fallback
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            setStatus('Success! Redirecting...');
            setTimeout(() => router.push('/dashboard'), 500);
            subscription.unsubscribe();
          }
        });

        // Timeout after 5 seconds
        setTimeout(() => {
          setStatus('Session not found');
          subscription.unsubscribe();
          router.push('/login');
        }, 5000);

      } catch (err) {
        console.error('Callback error:', err);
        setStatus('Something went wrong');
        setTimeout(() => router.push('/login?error=callback_failed'), 1500);
      }
    };

    handleCallback();
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
