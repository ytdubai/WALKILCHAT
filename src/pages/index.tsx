import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WakilChat - Run Your Entire Business From One App</title>
        <meta name="description" content="The all-in-one super app for African entrepreneurs. Free calls, instant payments, and AI-powered business tools." />
        <style>{`
          body { 
            margin: 0; 
            background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 100%);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50, 
          background: 'rgba(10, 10, 10, 0.8)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat Lion" width={40} height={40} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat
              </span>
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/login" style={{ 
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,215,0,0.3)',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}>
                Login
              </Link>
              <Link href="/signup" style={{ 
                background: '#FFD700', 
                color: '#000', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '50px', 
                fontWeight: '600', 
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(255,215,0,0.3)'
              }}>
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
          {/* Golden Lion Hero Image */}
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Image 
              src="/branding/logo-icon.jpg" 
              alt="WakilChat Lion" 
              width={150} 
              height={150} 
              style={{ borderRadius: '50%', boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}
            />
          </div>
          
          <p style={{ color: '#FFD700', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            For African Entrepreneurs Who Want Freedom
          </p>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Run Your Entire Business <br />
            <span style={{ color: '#FFD700' }}>From One App</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#999', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Free calls. Instant payments. AI assistant. Join 50,000+ businesses who ditched 5 different apps for WakilChat.
          </p>
          
          <Link href="/signup" style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#FFD700', 
            color: '#000', 
            padding: '1rem 2rem', 
            borderRadius: '50px', 
            fontSize: '1.125rem',
            fontWeight: 'bold', 
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
          }}>
            Start Free — No Card Required →
          </Link>
          
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
            ✓ Free forever plan &nbsp; ✓ Works offline &nbsp; ✓ Cancel anytime
          </p>
        </section>

        {/* Stats */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '2rem 0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {['50,000+|Businesses', '₦2.3B+|Processed', '4.9/5|Rating', '99.9%|Uptime'].map((stat, i) => {
              const [value, label] = stat.split('|');
              return (
                <div key={i}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700' }}>{value}</div>
                  <div style={{ color: '#666', fontSize: '0.875rem' }}>{label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Problem */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#FCA5A5', fontSize: '1.125rem' }}>
              African SMEs lose <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FEE2E2' }}>₦2.1 TRILLION</span> annually to payment delays, manual bookkeeping, and juggling multiple apps.
            </p>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Everything You Need. <span style={{ color: '#FFD700' }}>One App.</span>
            </h2>
            <p style={{ color: '#999', fontSize: '1.125rem' }}>Stop switching between apps. Start growing your business.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '📞', gradient: 'linear-gradient(135deg, #10b981, #059669)', title: 'FREE Calls', desc: 'Voice & video calls with zero charges' },
              { icon: '💬', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', title: 'Instant Chat', desc: 'Message customers in real-time' },
              { icon: '💳', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', title: 'Get Paid Fast', desc: 'Accept M-Pesa, Telebirr, cards' },
              { icon: '🏪', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', title: 'Online Shop', desc: 'Sell products to anyone, anywhere' },
              { icon: '🛡️', gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)', title: 'Bank Security', desc: 'Your money is always protected' },
              { icon: '⚡', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', title: 'Works Offline', desc: 'Full access without internet' }
            ].map((feature, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '1rem', 
                padding: '1.5rem', 
                cursor: 'pointer', 
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Gradient glow effect */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: feature.gradient,
                  opacity: 0.1,
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }} />
                
                {/* Icon with gradient background */}
                <div style={{ 
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  background: feature.gradient,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '1rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', position: 'relative' }}>{feature.title}</h3>
                <p style={{ color: '#999', position: 'relative' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'linear-gradient(to top, rgba(255,215,0,0.1), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Ready to Grow Your Business?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#999', marginBottom: '2rem' }}>
              Join 50,000+ entrepreneurs who run their business from one app.
            </p>
            <Link href="/signup" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFD700', 
              color: '#000', 
              padding: '1.25rem 2.5rem', 
              borderRadius: '50px', 
              fontSize: '1.25rem',
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)'
            }}>
              Get WakilChat Free →
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Free forever • No credit card • Setup in 60 seconds
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', marginBottom: '3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={32} height={32} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <Link href="/about" style={{ color: '#999', textDecoration: 'none' }}>About</Link>
              <Link href="/pricing" style={{ color: '#999', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/help" style={{ color: '#999', textDecoration: 'none' }}>Help</Link>
              <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy</Link>
            </div>
            <p style={{ color: '#666' }}>Made with 🦁 in Africa</p>
          </div>
        </footer>
      </div>
    </>
  );
}