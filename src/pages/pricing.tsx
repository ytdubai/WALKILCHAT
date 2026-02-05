import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing - WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={40} height={40} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </Link>
            <Link href="/" style={{ color: '#FFD700', textDecoration: 'none' }}>← Back Home</Link>
          </div>
        </nav>

        <section style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Simple, <span style={{ color: '#FFD700' }}>Fair</span> Pricing
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '3rem' }}>
            We only make money when YOU make money
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            {/* Free Plan */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '2px solid rgba(255,215,0,0.3)',
              borderRadius: '1.5rem',
              padding: '3rem'
            }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Consumer Sales
              </h3>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem' }}>
                5%
              </div>
              <p style={{ color: '#999', marginBottom: '2rem', fontSize: '1.125rem' }}>per transaction</p>
              <ul style={{ textAlign: 'left', fontSize: '1.125rem', lineHeight: '2.2', color: '#ddd', listStyle: 'none', padding: 0 }}>
                <li>✅ FREE unlimited calls</li>
                <li>✅ FREE messaging</li>
                <li>✅ Online shop</li>
                <li>✅ Payment processing</li>
                <li>✅ AI assistant</li>
                <li>✅ Analytics</li>
              </ul>
            </div>

            {/* B2B Plan */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(139,92,246,0.1))',
              border: '2px solid rgba(255,215,0,0.5)',
              borderRadius: '1.5rem',
              padding: '3rem',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(255,215,0,0.3)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                B2B Exports
              </h3>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem' }}>
                2%
              </div>
              <p style={{ color: '#999', marginBottom: '2rem', fontSize: '1.125rem' }}>per transaction</p>
              <ul style={{ textAlign: 'left', fontSize: '1.125rem', lineHeight: '2.2', color: '#ddd', listStyle: 'none', padding: 0 }}>
                <li>✅ Everything in Consumer</li>
                <li>✅ AI buyer matching</li>
                <li>✅ Escrow protection</li>
                <li>✅ Quality verification</li>
                <li>✅ Export documentation</li>
                <li>✅ Priority support</li>
              </ul>
              <p style={{ fontSize: '1rem', color: '#10b981', marginTop: '2rem', fontWeight: 'bold' }}>
                Save $64,000+ per $200k deal vs brokers!
              </p>
            </div>

            {/* Founder */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '2px solid rgba(139,92,246,0.4)',
              borderRadius: '1.5rem',
              padding: '3rem'
            }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Founder Supplier
              </h3>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.5rem' }}>
                0%
              </div>
              <p style={{ color: '#999', marginBottom: '2rem', fontSize: '1.125rem' }}>forever</p>
              <ul style={{ textAlign: 'left', fontSize: '1.125rem', lineHeight: '2.2', color: '#ddd', listStyle: 'none', padding: 0 }}>
                <li>✅ Everything in B2B</li>
                <li>✅ 0% fees FOREVER</li>
                <li>✅ 5-star auto rating</li>
                <li>✅ Priority placement</li>
                <li>✅ Free AI matching</li>
                <li>👑 Legendary badge</li>
              </ul>
              <Link href="/founder-supplier" style={{
                display: 'block',
                marginTop: '2rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize: '1.125rem'
              }}>
                Only 47 spots left →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem 6rem', textAlign: 'center', background: 'rgba(255,215,0,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Ready to Start Saving?
          </h2>
          <Link href="/signup" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            padding: '1.5rem 3rem',
            borderRadius: '50px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 8px 40px rgba(255,215,0,0.5)'
          }}>
            Start Free Now →
          </Link>
        </section>
      </div>
    </>
  );
}