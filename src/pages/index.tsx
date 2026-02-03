import Head from 'next/head';
import Link from 'next/link';
import { Card } from '../lib/components/Card';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WakilChat - Your Business. Simplified.</title>
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              WakilChat
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <main>
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Run Your Business From Your Phone
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Payments. Customers. AI Assistant. All free to start.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link 
                href="/signup"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
              >
                Start Free—No Bank Needed
              </Link>
            </div>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              🔒 Bank-level security • 40,000+ businesses trust Wakil
            </p>
          </div>

          {/* Features */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Get paid instantly
                </h3>
                <p className="text-gray-400">
                  Accept payments from anyone—M-Pesa, Telebirr, bank transfer, or cash.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  AI assistant works 24/7
                </h3>
                <p className="text-gray-400">
                  Wakil answers your customers, sends invoices, and reminds people to pay.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sell anywhere
                </h3>
                <p className="text-gray-400">
                  List products, share to WhatsApp, get orders. Your shop is now open.
                </p>
              </Card>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold text-white mb-2">Create free account</h3>
                <p className="text-gray-400">Takes 30 seconds. No bank needed.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold text-white mb-2">Add your products</h3>
                <p className="text-gray-400">List what you sell with photos and prices.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold text-white mb-2">Share & get paid</h3>
                <p className="text-gray-400">Share your shop link and receive payments instantly.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Ready to grow your business?
            </h2>
            <Link 
              href="/signup"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400">Made with 🦁 in Africa</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
                  <Link href="/help" className="text-gray-400 hover:text-white">Help</Link>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
