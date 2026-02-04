import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, CreditCard, Store, Shield, Zap, ArrowRight } from 'lucide-react';

const features = [
  { icon: Phone, title: 'FREE Calls', desc: 'Voice & video calls with zero charges' },
  { icon: MessageSquare, title: 'Instant Chat', desc: 'Message customers in real-time' },
  { icon: CreditCard, title: 'Get Paid Fast', desc: 'Accept M-Pesa, Telebirr, cards' },
  { icon: Store, title: 'Online Shop', desc: 'Sell products to anyone, anywhere' },
  { icon: Shield, title: 'Bank Security', desc: 'Your money is always protected' },
  { icon: Zap, title: 'Works Offline', desc: 'Full access without internet' },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WakilChat - Run Your Entire Business From One App</title>
        <meta
          name="description"
          content="The all-in-one super app for African entrepreneurs. Free calls, instant payments, and AI-powered business tools."
        />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-gold">Wakil</span>Chat
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gold text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all hover:scale-105"
              >
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Run Your Entire Business <br />
              <span className="text-gold">From One App</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            >
              Free calls. Instant payments. AI assistant. Join 50,000+ businesses
              who ditched 5 different apps for WakilChat.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="group bg-gold text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Free — No Card Required
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/50 hover:bg-white/[0.05] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <feature.icon className="text-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-t from-gold/10 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Grow Your Business?
              </h2>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-gold text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-yellow-400 transition-all hover:scale-105"
              >
                Get WakilChat Free <ArrowRight size={24} />
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Free forever • No credit card • Setup in 60 seconds
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-2xl font-bold">
                <span className="text-gold">Wakil</span>Chat
              </div>
              <div className="flex gap-8 text-gray-400">
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </div>
              <p className="text-gray-500">Made with 🦁 in Africa</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}