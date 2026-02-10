import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TestAuth() {
  const [result, setResult] = useState('');

  const testConnection = async () => {
    setResult('Testing...');
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@wakilchat.com',
        password: 'Test123456!'
      });
      
      if (error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult(`Success! User created: ${data.user?.email || 'no email'}`);
      }
    } catch (err: any) {
      setResult(`Exception: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <h1>Supabase Connection Test</h1>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
      <button onClick={testConnection} style={{ padding: '1rem 2rem', background: '#FFD700', color: '#000', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', marginTop: '1rem' }}>
        Test Signup
      </button>
      <pre style={{ marginTop: '2rem', padding: '1rem', background: '#111', borderRadius: '0.5rem' }}>
        {result}
      </pre>
    </div>
  );
}