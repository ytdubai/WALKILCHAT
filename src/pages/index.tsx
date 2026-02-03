import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../lib/components/Button';
import { Card } from '../lib/components/Card';

const features = [
  {
    icon: '💰',
    title: 'Get paid instantly',
    description: 'Accept payments from anyone—M-Pesa, Telebirr, bank transfer, or cash. Money hits your account in seconds.'
  },
  {
    icon: '🤖',
    title: 'AI assistant works 24/7',
    description: 'Wakil answers your customers, sends invoices, and reminds people to pay—while you sleep.'
  },
  {
    icon: '🛒',
    title: 'Sell anywhere',
    description: 'List products, share to WhatsApp, get orders. Your shop is now open to 1 billion Africans.'
  }
];

const testimonials = [
  {
    name: 'Amina K.',
    role: 'Fashion Seller',
    location: 'Nairobi',
    image: '/testimonials/amina.jpg',
    quote: 'Wakil doubled my sales in 2 months. The AI assistant handles everything while I focus on designing.'
  },
  {
    name: 'Dawit T.',
    role: 'Electronics Shop',
    location: 'Addis Ababa',
    image: '/testimonials/dawit.jpg',
    quote: 'Getting paid is so simple now. My customers love using Telebirr to pay instantly.'
  },
  {
    name: 'Chioma O.',
    role: 'Food Vendor',
    location: 'Lagos',
    image: '/testimonials/chioma.jpg',
    quote: 'From market stall to online business. Wakil made it possible. Now I serve customers across Nigeria.'
  }
];

const steps = [
  {
    number: '1',
    title: 'Create free account',
    description: 'Takes 30 seconds'
  },
  {
    number: '2',
    title: 'Add your products',
    description: 'List what you sell'
  },
  {
    number: '3',
    title: 'Share & get paid',
    description: 'Money hits instantly'
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>WakilChat - Your Business. Simplified.</title>
        <meta name="description" content="Run your entire business from your phone. Payments, customers, and AI assistant - all free to start." />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              WakilChat
            </Link>
            <div className="space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link href="/signup">
                <Button size="sm">Start Free</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main>
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Run Your Business From Your Phone
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Payments. Customers. AI Assistant. All free to start.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button size="lg">Start Free—No Bank Needed</Button>
            </div>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              🔒 Bank-level security • 40,000+ businesses trust Wakil
            </p>
          </div>

          {/* Features */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gray-800/50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                Trusted by entrepreneurs across Africa
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-700" />
                      <div>
                        <div className="font-medium text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role} • {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{testimonial.quote}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Ready to grow your business?
            </h2>
            <Button size="lg">Get Started Free</Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800/50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2">
                <div className="text-2xl font-bold text-white mb-4">WakilChat</div>
                <p className="text-gray-400">Your Business. Simplified.</p>
              </div>
              <div>
                <div className="font-medium text-white mb-4">Product</div>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Security</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-white mb-4">Company</div>
                <ul className="space-y-2 text-gray-400">
                  <li>About</li>
                  <li>Contact</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-white mb-4">Legal</div>
                <ul className="space-y-2 text-gray-400">
                  <li>Privacy</li>
                  <li>Terms</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
              Made with 🦁 in Africa
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}