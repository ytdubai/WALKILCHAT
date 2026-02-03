import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name, phone: form.phone } }
      })
      if (authError) throw authError
      if (data.user) {
        await supabase.from('users').insert({ id: data.user.id, name: form.name, phone: form.phone, email: form.email })
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Check your email!</h1>
        <p className="text-gray-400">Click the link to verify your account</p>
        <Link href="/login" className="text-purple-400 mt-4 block">Go to Login</Link>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>Sign Up - WakilChat</title></Head>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Join WakilChat</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" required className="w-full p-4 bg-gray-700 rounded-lg text-white" onChange={e => setForm({...form, name: e.target.value})} />
            <input type="tel" placeholder="Phone Number" required className="w-full p-4 bg-gray-700 rounded-lg text-white" onChange={e => setForm({...form, phone: e.target.value})} />
            <input type="email" placeholder="Email" required className="w-full p-4 bg-gray-700 rounded-lg text-white" onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" placeholder="Password" required minLength={6} className="w-full p-4 bg-gray-700 rounded-lg text-white" onChange={e => setForm({...form, password: e.target.value})} />
            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white p-4 rounded-lg font-bold">{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className="text-gray-400 text-center mt-6">Already have an account? <Link href="/login" className="text-purple-400">Login</Link></p>
        </div>
      </div>
    </>
  )
}
