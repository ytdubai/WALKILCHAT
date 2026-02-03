import Head from 'next/head'
import Link from 'next/link'

export default function Business() {
  return (
    <>
      <Head><title>WakilChat for Business</title></Head>
      <div className="min-h-screen bg-gray-900">
        <nav className="p-6"><Link href="/" className="text-2xl font-bold text-white">WakilChat</Link></nav>
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">AI Employee for Your Business</h1>
          <p className="text-xl text-gray-300 mb-12">$15/month - Handles customers 24/7 while you sleep</p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">🤖 AI Auto-Reply</h3>
              <p className="text-gray-400">Responds to customers instantly in Amharic, Swahili, English</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">💰 Built-in Payments</h3>
              <p className="text-gray-400">Accept M-Pesa, Telebirr, Stripe directly in chat</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">📅 Auto Booking</h3>
              <p className="text-gray-400">Customers book appointments without you lifting a finger</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">📊 Analytics</h3>
              <p className="text-gray-400">See all conversations, bookings, payments in one dashboard</p>
            </div>
          </div>
          
          <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold">
            Start Free Trial
          </Link>
        </main>
      </div>
    </>
  )
}
