import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Nav */}
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

        {/* Hero */}
        <section style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}></div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Built by Africans, <span style={{ color: '#FFD700' }}>For Africans</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#ccc', lineHeight: '1.7', marginBottom: '3rem' }}>
            WakilChat™ is on a mission to empower 1 million African entrepreneurs by eliminating the $75 billion broker gap.
          </p>
        </section>

        {/* Story */}
        <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#FFD700' }}>
            Our Story
          </h2>
          <div style={{ fontSize: '1.25rem', lineHeight: '1.9', color: '#ddd' }}>
            <p style={{ marginBottom: '2rem' }}>
              WakilChat was born from a simple observation: African entrepreneurs are brilliant, hardworking, and determined. 
              But they're being held back by fragmented tools and exploitative middlemen.
            </p>
            <p style={{ marginBottom: '2rem' }}>
              We watched coffee farmers earn $3/kg while brokers took the other $6. We saw exporters lose 40% of every deal to middlemen. 
              We heard entrepreneurs complain about juggling 5 different apps just to run their business.
            </p>
            <p style={{ marginBottom: '2rem' }}>
              So we built WakilChat™ - the AI-powered platform that connects African suppliers directly to global buyers, 
              eliminating the middle and putting profit back where it belongs: in entrepreneurs' pockets.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.05)', borderTop: '1px solid rgba(255,215,0,0.2)', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              Our <span style={{ color: '#FFD700' }}>Mission</span>
            </h2>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', lineHeight: '1.6' }}>
              Empower 1 million African entrepreneurs by 2030 by giving them the tools and connections they need to thrive globally.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>
            Our <span style={{ color: '#FFD700' }}>Values</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '', title: 'African Pride', desc: 'Built by Africans, for Africans. We understand your reality because we live it.' },
              { icon: '', title: 'Fair Pricing', desc: 'We charge 2-5% vs brokers\' 40%. Your success is our success.' },
              { icon: '', title: 'Innovation First', desc: 'AI technology that levels the playing field for African entrepreneurs.' },
              { icon: '', title: 'Global Reach', desc: 'Connect African suppliers to buyers worldwide. No borders, no limits.' }
            ].map((value, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{value.icon}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '1.25rem', color: '#ccc', lineHeight: '1.7' }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem 6rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Join the Movement
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
            Start Free Today →
          </Link>
        </section>
      </div>
    </>
  );
}