import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function HelpPage() {
  return (
    <>
      <Head>
        <title>Help & Support - WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Nav */}
        <nav style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,215,0,0.2)', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', zIndex: 50 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={50} height={50} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </Link>
            <Link href="/" style={{ color: '#FFD700', textDecoration: 'none', fontSize: '1.125rem' }}>← Back Home</Link>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}></div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            How Can We <span style={{ color: '#FFD700' }}>Help</span>?
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#ccc', lineHeight: '1.7' }}>
            Get answers to common questions or contact our team directly
          </p>
        </section>

        {/* Contact Options */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '',
                title: 'Email Us',
                desc: 'Get a response within 24 hours',
                action: 'support@wakilchat.com',
                link: 'mailto:support@wakilchat.com'
              },
              {
                icon: '',
                title: 'Business Inquiries',
                desc: 'Partnerships, press, or enterprise',
                action: 'business@wakilchat.com',
                link: 'mailto:business@wakilchat.com'
              },
              {
                icon: '',
                title: 'Founder Program',
                desc: 'Questions about founder supplier status',
                action: 'Learn More',
                link: '/founder-supplier'
              }
            ].map((option, i) => (
              <a key={i} href={option.link} style={{
                display: 'block',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{option.icon}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.75rem' }}>
                  {option.title}
                </h3>
                <p style={{ fontSize: '1.25rem', color: '#aaa', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {option.desc}
                </p>
                <span style={{
                  display: 'inline-block',
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,215,0,0.1)',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,215,0,0.3)'
                }}>
                  {option.action} →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Preview */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.03)', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              Common <span style={{ color: '#FFD700' }}>Questions</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                {
                  q: "When does WakilChat launch?",
                  a: "Platform launches Q2 2026 (April-June). Join the waitlist to be notified and get early access."
                },
                {
                  q: "What does it cost?",
                  a: "FREE to join. We only charge 2-5% when you make a sale. No monthly fees, no hidden costs."
                },
                {
                  q: "Who is WakilChat for?",
                  a: "African suppliers & exporters (coffee, sesame, cars, etc.) who want to connect directly with global buyers and eliminate broker fees."
                },
                {
                  q: "How do I become a Founder Supplier?",
                  a: "First 100 suppliers get legendary status with 0% fees forever. Visit /founder-supplier to claim your spot."
                }
              ].map((faq, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: '1rem',
                  padding: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '1.25rem', color: '#ccc', lineHeight: '1.7' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ fontSize: '1.25rem', color: '#999', marginBottom: '1.5rem' }}>
                More questions?
              </p>
              <a href="mailto:support@wakilchat.com" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
              }}>
                Contact Support →
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem' }}>
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
            <p style={{ color: '#999', fontSize: '1.125rem' }}>Pre-Launch 2026 • Made with  in Africa</p>
          </div>
        </footer>
      </div>
  );
}
