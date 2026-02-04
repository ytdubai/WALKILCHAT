import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/Button';
import { Input } from '../lib/components/Input';
import { signUp } from '../lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(form);
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
        <title>Create Account - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-white">
              WakilChat
            </Link>
            <h1 className="text-3xl font-bold text-white mt-6 mb-2">
              Create Your Free Account
            </h1>
            <p className="text-gray-400">
              Join 40,000+ African entrepreneurs. Takes 30 seconds.
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
                label="Full Name"
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Your full name"
              />

              <Input
                label="Phone Number"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+234..."
              />

              <Input
                label="Email"
                type="email"
                optional
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a secure password"
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Create My Account
              </Button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Log in
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <span>🔒</span> Secure
              </div>
              <div className="flex items-center gap-1">
                <span>🆓</span> Free forever
              </div>
              <div className="flex items-center gap-1">
                <span>⚡</span> Instant setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}