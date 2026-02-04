import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/Button';
import { Input } from '../lib/components/Input';
import { signIn } from '../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(form);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-white">
              WakilChat
            </Link>
            <h1 className="text-3xl font-bold text-white mt-6 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Log in to manage your business
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8">
            {error && (
              <div className="bg-red-900/50 text-red-400 rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email or Phone"
                type="text"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email or phone"
              />

              <Input
                label="Password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
              />

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              New here?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                Create free account
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <span>🔒</span> Secure login
              </div>
              <div className="flex items-center gap-1">
                <span>🚀</span> Instant access
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}