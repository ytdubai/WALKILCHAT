import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WakilChat™ - Transform African Commerce with AI</title>
        <meta name="description" content="Pre-launching Q2 2026: AI-powered platform connecting African suppliers to global buyers. Join early access." />
        <style>{`
          body { 
            margin: 0; 
            background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 100%);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .flag-scroll {
            animation: slideLeft 30s linear infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .pulse-animate {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Pre-Launch Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          padding: '0.75rem',
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          borderBottom: '2px solid rgba(139,92,246,0.5)'
        }}>
          🚀 PRE-LAUNCH: Platform launching Q2 2026 • Join Early Access Program
        </div>

        {/* Navigation */}
        <nav style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 50, 
          background: 'rgba(10, 10, 10, 0.95)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat Lion" width={50} height={50} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/login" style={{ 
                color: 'white',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,215,0,0.3)',
                fontWeight: '500',
                fontSize: '1.125rem'
              }}>
                Login
              </Link>
              <Link href="/signup" style={{ 
                background: '#FFD700', 
                color: '#000', 
                padding: '0.75rem 1.75rem', 
                borderRadius: '50px', 
                fontWeight: '600', 
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(255,215,0,0.3)',
                fontSize: '1.125rem'
              }}>
                Join Waitlist
              </Link>
            </div>
          </div>
        </nav>

        {/* African Flags Banner */}
        <div style={{ 
          overflow: 'hidden', 
          background: 'rgba(255,215,0,0.05)', 
          borderBottom: '2px solid rgba(255,215,0,0.2)',
          padding: '1rem 0'
        }}>
          <div className="flag-scroll" style={{ display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap' }}>
            {['🇳🇬 Nigeria', '🇰🇪 Kenya', '🇪🇹 Ethiopia', '🇬🇭 Ghana', '🇿🇦 South Africa', '🇹🇿 Tanzania', '🇺🇬 Uganda', '🇷🇼 Rwanda', '🇦🇪 UAE', '🇳🇬 Nigeria', '🇰🇪 Kenya', '🇪🇹 Ethiopia'].map((flag, i) => (
              <span key={i} style={{ fontSize: '1.5rem', fontWeight: '600', color: '#FFD700' }}>{flag}</span>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <Image 
              src="/branding/logo-icon.jpg" 
              alt="WakilChat Lion" 
              width={180} 
              height={180} 
              style={{ borderRadius: '50%', boxShadow: '0 0 60px rgba(255, 215, 0, 0.4)' }}
            />
          </div>
          
          <p style={{ color: '#FFD700', fontSize: '1.125rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            AI-Powered Platform for African Business
          </p>
          
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 5rem)', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '2rem' }}>
            Close the <span style={{ color: '#ef4444' }}>$75B Broker Gap</span><br />
            Connect African Suppliers to <span style={{ color: '#FFD700' }}>Global Buyers</span>
          </h1>
          
          <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
            AI-powered platform eliminating middlemen for coffee, sesame, and agricultural exporters. 
            Coming Q2 2026 - reserve your spot.
          </p>
          
          <div className="pulse-animate" style={{ marginBottom: '2rem' }}>
            <Link href="/signup" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#FFD700', 
              color: '#000', 
              padding: '1.5rem 3rem', 
              borderRadius: '50px', 
              fontSize: '1.5rem',
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)'
            }}>
              🚀 JOIN EARLY ACCESS
            </Link>
          </div>
          
          <p style={{ fontSize: '1.125rem', color: '#999' }}>
            ✓ First 100 suppliers get 0% fees forever &nbsp;•&nbsp; ✓ Platform launches Q2 2026
          </p>
        </section>

        {/* Stats Bar */}
        <section style={{ borderTop: '2px solid rgba(255,215,0,0.2)', borderBottom: '2px solid rgba(255,215,0,0.2)', background: 'rgba(255,215,0,0.05)', padding: '3rem 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            {['$89B|Market Size', '$28B|Broker Fees Lost', '23M|Suppliers Addressable', '2-5%|Our Fair Fee'].map((stat, i) => {
              const [value, label] = stat.split('|');
              return (
                <div key={i}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700' }}>{value}</div>
                  <div style={{ color: '#ccc', fontSize: '1.125rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>{label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Problem */}
        <section style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              The <span style={{ color: '#ef4444' }}>Broker Problem</span>
            </h2>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '1.5rem', padding: '3rem' }}>
            <p style={{ color: '#FCA5A5', fontSize: '1.5rem', lineHeight: '1.8', marginBottom: '2rem', fontWeight: '600' }}>
              African exporters lose 30-45% of every deal to multiple middlemen:
            </p>
            <ul style={{ color: '#FEE2E2', fontSize: '1.375rem', lineHeight: '2.2', listStyle: 'none', paddingLeft: 0 }}>
              <li>❌ Local brokers (10%)</li>
              <li>❌ Export agents (8%)</li>
              <li>❌ International brokers (12%)</li>
              <li>❌ Other fees (5-10%)</li>
              <li>❌ Payment delays (60-90 days)</li>
            </ul>
            <p style={{ color: '#FCA5A5', fontSize: '1.75rem', fontWeight: 'bold', marginTop: '2rem', textAlign: 'center' }}>
              Result: <span style={{ fontSize: '2.5rem', color: '#FEE2E2' }}>$28 Billion</span> lost annually
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section style={{ padding: '5rem 2rem', background: 'rgba(255,215,0,0.03)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                The <span style={{ color: '#FFD700' }}>WakilChat™</span> Solution
              </h2>
              <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '900px', margin: '0 auto' }}>
                AI-powered platform connecting suppliers directly to global buyers
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,215,0,0.3)', borderRadius: '1.5rem', padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '2rem' }}>
                📊 Example: $200,000 Coffee Export
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <p style={{ fontSize: '1.25rem', color: '#fca5a5', fontWeight: 'bold', marginBottom: '1rem' }}>❌ Traditional (With Brokers):</p>
                  <p style={{ fontSize: '1.125rem', color: '#fee2e2', lineHeight: '2' }}>
                    Sale: $200,000<br/>
                    Broker fees: -$70,000<br/>
                    <strong>You get: $130,000</strong><br/>
                    <span style={{ fontSize: '1rem', opacity: 0.8 }}>Paid in: 90 days</span>
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '1.25rem', color: '#6ee7b7', fontWeight: 'bold', marginBottom: '1rem' }}>✅ With WakilChat™:</p>
                  <p style={{ fontSize: '1.125rem', color: '#d1fae5', lineHeight: '2' }}>
                    Sale: $200,000<br/>
                    Our fee: -$4,000 (2%)<br/>
                    <strong>You get: $196,000</strong><br/>
                    <span style={{ fontSize: '1rem', color: '#10b981' }}>Paid in: 5 days</span>
                  </p>
                </div>
              </div>

              <div style={{ 
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                Save $66,000 per deal + Get paid 85 days faster!
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              How It <span style={{ color: '#FFD700' }}>Works</span>
            </h2>
            <p style={{ fontSize: '1.375rem', color: '#999' }}>
              Simple 5-step process from listing to payment
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {[
              {
                step: '1',
                title: 'List Your Products',
                desc: 'Coffee, sesame, cars - whatever you export. Add photos, specs, certifications. Takes 5 minutes.',
                time: '5 min'
              },
              {
                step: '2',
                title: 'AI Finds Buyers',
                desc: 'Our AI scans global databases, finds 50-200 qualified buyers, and contacts them automatically.',
                time: '24-48 hrs'
              },
              {
                step: '3',
                title: 'Connect Direct',
                desc: 'FREE video calls with interested buyers. No brokers in between. Negotiate your best terms.',
                time: '2-5 days'
              },
              {
                step: '4',
                title: 'Secure Escrow',
                desc: 'Buyer pays into escrow. Money is safe. You prepare shipment with confidence.',
                time: '1 day'
              },
              {
                step: '5',
                title: 'Get Paid Fast',
                desc: 'Ship, buyer confirms, escrow releases. Get your money in 3-5 days instead of 90.',
                time: '3-5 days'
              }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex',
                gap: '2rem',
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,215,0,0.2)', 
                borderRadius: '1.5rem', 
                padding: '2.5rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#000',
                  flexShrink: 0,
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', margin: 0 }}>{item.title}</h3>
                    <span style={{
                      background: 'rgba(255,215,0,0.2)',
                      color: '#FFD700',
                      padding: '0.5rem 1rem',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      ⏱️ {item.time}
                    </span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '1.25rem', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '5rem 2rem', maxWidth: '1300px', margin: '0 auto', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Platform <span style={{ color: '#FFD700' }}>Features</span>
            </h2>
            <p style={{ color: '#999', fontSize: '1.375rem' }}>Built for African exporters, designed for global scale</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🤖', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', title: 'AI Buyer Matching', desc: 'Automatically find and contact qualified buyers worldwide' },
              { icon: '💰', gradient: 'linear-gradient(135deg, #10b981, #059669)', title: 'Secure Escrow', desc: 'Protected payments with money-back guarantee' },
              { icon: '📹', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', title: 'Free Video Calls', desc: 'Negotiate directly with buyers via video' },
              { icon: '⚡', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', title: 'Fast Payment', desc: '3-5 days vs 90 days traditional' },
              { icon: '🌍', gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)', title: 'Global Reach', desc: 'Access buyers in 180+ countries' },
              { icon: '📊', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', title: 'Market Intelligence', desc: 'Real-time pricing and demand data' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}>
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
                
                <div style={{ 
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  background: feature.gradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', position: 'relative' }}>{feature.title}</h3>
                <p style={{ color: '#999', position: 'relative', lineHeight: '1.7', fontSize: '1.125rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '5rem 2rem 7rem', background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.1))' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '2rem' }}>
              Ready to Eliminate Broker Fees?
            </h2>
            <p style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '3rem' }}>
              Join the early access program. First 100 suppliers get legendary status.
            </p>
            <Link href="/founder-supplier" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#FFD700',
              color: '#000',
              padding: '1.75rem 3.5rem',
              borderRadius: '50px',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)'
            }}>
              👑 Become a Founder Supplier
            </Link>
            <p style={{ marginTop: '2rem', fontSize: '1.125rem', color: '#999' }}>
              Platform launches Q2 2026 • 0% fees for first 100 • Only 47 spots left
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={40} height={40} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', fontSize: '1.125rem' }}>
              <Link href="/about" style={{ color: '#999', textDecoration: 'none' }}>About</Link>
              <Link href="/pricing" style={{ color: '#999', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/export" style={{ color: '#999', textDecoration: 'none' }}>Export</Link>
              <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy</Link>
              <Link href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms</Link>
            </div>
            <p style={{ color: '#999', fontSize: '1.125rem' }}>Pre-Launch 2026 • Made with 🦁 in Africa</p>
          </div>
        </footer>
      </div>
    </>
  );
}