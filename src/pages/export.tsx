import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function ExportPage() {
  return (
    <>
      <Head>
        <title>B2B Export Marketplace - Stop Paying Brokers 40% | WakilChat™</title>
        <meta name="description" content="African exporters: Sell coffee, sesame, cocoa directly to international buyers. No brokers. 2% fee vs 40%. Get paid in days, not months." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Hero */}
        <section style={{ 
          padding: '6rem 2rem 4rem',
          background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(139,92,246,0.05))',
          borderBottom: '2px solid rgba(255,215,0,0.2)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '2rem' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={50} height={50} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </Link>

            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#FFD700', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                ☕ For African Coffee & Agricultural Exporters 🌾
              </p>

              <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                Stop Paying Brokers <span style={{ color: '#ef4444' }}>40%</span><br />
                Sell <span style={{ color: '#FFD700' }}>Direct to Buyers</span>
              </h1>

              <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Connect Ethiopian coffee, Nigerian sesame, and African agricultural exporters directly with international buyers. 
                <span style={{ color: '#FFD700', fontWeight: 'bold' }}> No middlemen. No delays.</span>
              </p>

              <div style={{ 
                background: 'rgba(239,68,68,0.15)',
                border: '2px solid rgba(239,68,68,0.4)',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto 2.5rem'
              }}>
                <p style={{ fontSize: '1.25rem', color: '#FCA5A5', fontWeight: 'bold', marginBottom: '1rem' }}>
                  The Broker Problem:
                </p>
                <div style={{ fontSize: '1.125rem', color: '#fee2e2', textAlign: 'left' }}>
                  ❌ Local broker takes 10%<br />
                  ❌ Export agent takes 8%<br />
                  ❌ International broker takes 12%<br />
                  ❌ Importer markup 15%<br />
                  <div style={{ borderTop: '1px solid rgba(239,68,68,0.4)', marginTop: '1rem', paddingTop: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
                    = <span style={{ color: '#FEE2E2', fontWeight: 'bold' }}>45% GONE</span>
                  </div>
                </div>
              </div>

              <Link href="/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 8px 40px rgba(255,215,0,0.5)'
              }}>
                🌍 List Your Export Products FREE
              </Link>

              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1.5rem' }}>
                ✓ No setup fees &nbsp;•&nbsp; ✓ Only 2% per deal &nbsp;•&nbsp; ✓ Get paid in 5 days
              </p>
            </div>
          </div>
        </section>

        {/* The Math */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            One Deal = <span style={{ color: '#FFD700' }}>₦30M-80M</span> More in Your Pocket
          </h2>

          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,215,0,0.3)',
            borderRadius: '1.5rem',
            padding: '3rem',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '1.25rem', color: '#FFD700', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Example: 1 Container of Ethiopian Coffee (20 tons)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              {/* Traditional Way */}
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '1rem', padding: '1.5rem' }}>
                <div style={{ fontSize: '1rem', color: '#fca5a5', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ❌ TRADITIONAL (With Brokers)
                </div>
                <div style={{ color: '#fee2e2', fontSize: '0.95rem', lineHeight: '1.8' }}>
                  Sale Price: $200,000<br />
                  Local broker (-10%): -$20,000<br />
                  Export agent (-8%): -$16,000<br />
                  Int'l broker (-12%): -$24,000<br />
                  Other fees (-5%): -$10,000<br />
                  <div style={{ borderTop: '1px solid rgba(239,68,68,0.4)', marginTop: '1rem', paddingTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    YOU GET: $130,000
                  </div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>
                    Payment in: 60-90 days ⏰
                  </div>
                </div>
              </div>

              {/* WakilChat Way */}
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.4)', borderRadius: '1rem', padding: '1.5rem' }}>
                <div style={{ fontSize: '1rem', color: '#6ee7b7', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ✅ WAKILCHAT™ (Direct)
                </div>
                <div style={{ color: '#d1fae5', fontSize: '0.95rem', lineHeight: '1.8' }}>
                  Sale Price: $200,000<br />
                  WakilChat fee (-2%): -$4,000<br />
                  No other fees: $0<br />
                  <br />
                  <br />
                  <div style={{ borderTop: '2px solid rgba(16,185,129,0.4)', marginTop: '1rem', paddingTop: '1rem', fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981' }}>
                    YOU GET: $196,000
                  </div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6ee7b7' }}>
                    Payment in: 3-5 days ⚡
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              💰 YOU SAVE: $66,000 PER CONTAINER
            </div>

            <p style={{ textAlign: 'center', color: '#999', marginTop: '1rem', fontSize: '0.875rem' }}>
              If you export 10 containers/year = <span style={{ color: '#FFD700', fontWeight: 'bold' }}>$660,000 saved</span>
            </p>
          </div>
        </section>

        {/* What Exporters Get */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.03)', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              What You Get on <span style={{ color: '#FFD700' }}>WakilChat™ Export</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                {
                  icon: '🌍',
                  title: 'Global Buyer Network',
                  desc: 'Connect with verified importers in USA, Europe, Middle East, Asia. Direct messaging & FREE video calls.'
                },
                {
                  icon: '💰',
                  title: 'Escrow Protection',
                  desc: 'Buyer pays upfront. Money held safely. Released when shipment confirmed. Zero risk of non-payment.'
                },
                {
                  icon: '⚡',
                  title: 'Fast Payment (3-5 Days)',
                  desc: 'No more 60-90 day waits. Get your money in days, not months. Keep cash flow healthy.'
                },
                {
                  icon: '📄',
                  title: 'Quality Certificates',
                  desc: 'Upload all certificates in one place. Buyers see everything. Build trust instantly.'
                },
                {
                  icon: '📹',
                  title: 'Live Product Tours',
                  desc: 'Video call buyers to show them your warehouse, product quality, certifications in real-time.'
                },
                {
                  icon: '📊',
                  title: 'AI Price Intelligence',
                  desc: 'See real-time market prices. Know if you\'re getting fair deals. Optimize your pricing.'
                }
              ].map((feature, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: '1.25rem',
                  padding: '2rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.75rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#ccc', lineHeight: '1.6' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,215,0,0.3)',
            borderRadius: '1.5rem',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#ddd', lineHeight: '1.7', marginBottom: '2rem' }}>
              "I was paying brokers <span style={{ color: '#ef4444' }}>$80,000 per deal</span>. 
              Now I pay WakilChat <span style={{ color: '#10b981' }}>$4,000</span>. 
              That's <span style={{ color: '#FFD700', fontWeight: 'bold' }}>$760,000 saved last year</span> on 10 containers!"
            </p>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '1.125rem', color: 'white' }}>
                Abebe Tadesse
              </p>
              <p style={{ color: '#999' }}>
                Ethiopian Coffee Exporter 🇪🇹 • 15 years experience
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.03)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              How <span style={{ color: '#FFD700' }}>Export Direct</span> Works
            </h2>

            {[
              {
                step: '1',
                title: 'List Your Product',
                desc: 'Ethiopian coffee, Nigerian sesame, etc. Add photos, certificates, quantities. Takes 5 minutes.',
                time: '5 min'
              },
              {
                step: '2',
                title: 'Buyers Find You',
                desc: 'International importers search WakilChat. See your product. Contact you DIRECTLY via platform.',
                time: '1-7 days'
              },
              {
                step: '3',
                title: 'Negotiate Direct',
                desc: 'FREE video calls. Share documents. Agree on terms. No broker in the middle taking cut.',
                time: '2-5 days'
              },
              {
                step: '4',
                title: 'Secure Escrow Payment',
                desc: 'Buyer pays into WakilChat escrow. Money is safe. You prepare shipment with confidence.',
                time: '1 day'
              },
              {
                step: '5',
                title: 'Ship Container',
                desc: 'Ship to buyer (FOB, CIF, whatever terms you agreed). Upload tracking & documents to platform.',
                time: '15-30 days'
              },
              {
                step: '6',
                title: 'Get Paid FAST',
                desc: 'Buyer confirms receipt. Money released from escrow in 3-5 days. Not 60-90 days!',
                time: '3-5 days'
              }
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '1rem',
                padding: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#000',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
                }}>
                  {step.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                      {step.title}
                    </h3>
                    <span style={{
                      background: 'rgba(255,215,0,0.2)',
                      color: '#FFD700',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      ⏱️ {step.time}
                    </span>
                  </div>
                  <p style={{ color: '#aaa', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Products */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            What You Can Export
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { flag: '🇪🇹', country: 'Ethiopia', products: 'Coffee, Sesame, Pulses, Livestock' },
              { flag: '🇳🇬', country: 'Nigeria', products: 'Sesame, Cashew, Cocoa, Palm Oil' },
              { flag: '🇰🇪', country: 'Kenya', products: 'Coffee, Tea, Flowers, Avocados' },
              { flag: '🇬🇭', country: 'Ghana', products: 'Cocoa, Gold, Shea Butter' },
              { flag: '🇹🇿', country: 'Tanzania', products: 'Coffee, Cashew, Sesame' },
              { flag: '🇺🇬', country: 'Uganda', products: 'Coffee, Vanilla, Fish' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{item.flag}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem' }}>
                  {item.country}
                </h3>
                <p style={{ color: '#aaa', fontSize: '0.875rem' }}>{item.products}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.1))' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Ready to Stop Paying Brokers?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '2rem' }}>
              List your first export product FREE. Connect with buyers today.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              padding: '1.5rem 3rem',
              borderRadius: '50px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 8px 40px rgba(255,215,0,0.5)'
            }}>
              🚀 Start Exporting Direct
            </Link>
            <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.875rem' }}>
              Join exporters saving millions in broker fees
            </p>
          </div>
        </section>
      </div>
    </>
  );
}