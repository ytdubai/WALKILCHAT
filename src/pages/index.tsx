import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head><title>WakilChat - Free Messaging for Africa</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <nav className="p-6">
          <h1 className="text-2xl font-bold text-white">WakilChat</h1>
        </nav>
        
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Free Messaging<br/>
            <span className="text-purple-400">Built for Africa</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Free calls, messages, and video chat. Works on slow networks. 
            AI-powered for business. No fees, no limits.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold">
              Get Started Free
            </Link>
            <Link href="/business" className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg">
              For Business
            </Link>
          </div>
          
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-6 rounded-2xl">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">Free Messages</h3>
              <p className="text-gray-400">Unlimited text, voice messages, photos</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Free Calls</h3>
              <p className="text-gray-400">Voice & video calls worldwide</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-gray-400">For businesses - auto-reply 24/7</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
