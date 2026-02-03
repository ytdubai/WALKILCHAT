import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  
  return (
    <>
      <Head><title>Login - WakilChat</title></Head>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h1>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 bg-gray-700 rounded-lg text-white"
              onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" placeholder="Password" className="w-full p-4 bg-gray-700 rounded-lg text-white"
              onChange={e => setForm({...form, password: e.target.value})} />
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-bold">
              Login
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            New here? <Link href="/signup" className="text-purple-400">Create Account</Link>
          </p>
        </div>
      </div>
    </>
  )
}
