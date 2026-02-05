import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// SVG Icon Components
const Icons = {
  Messages: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M8 9h8M8 13h6" opacity="0.5"/>
    </svg>
  ),
  Payments: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <path d="M7 15h4" opacity="0.5"/>
    </svg>
  ),
  AI: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5" opacity="0.5"/>
    </svg>
  ),
  Phone: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1"/>
      <rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/>
      <rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
  ),
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4" opacity="0.5"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Lock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Globe: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

// Animation hook for scroll reveal
function useInView(threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  
  return { ref, inView };
}

// Counter animation hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const view = useInView(0.3);
  
  useEffect(() => {
    if (!view.inView) return;
    let raf: number;
    const t0 = performance.now();
    function step(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [view.inView, end, duration]);
  
  return { count, ref: view.ref };
}

// Reveal animation component
function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,' + y + 'px,0)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ' + delay + 's',
      }}
    >
      {children}
    </div>
  );
}

// Logo component
function Logo({ size = 40, white = false }: { size?: number; white?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
          background: white ? 'white' : 'linear-gradient(135deg, #00D4AA, #00A3CC)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: white ? 'none' : '0 4px 20px rgba(0, 212, 170, 0.3)',
        }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100" fill="none">
          <path
            d="M50 10L55 15L65 12L75 20L80 30L82 45L78 60L70 75L55 85L50 90L45 85L30 75L22 60L18 45L20 30L25 20L35 12L45 15L50 10Z"
            fill={white ? '#0a2540' : 'white'}
            fillOpacity="0.95"
          />
          <circle cx="42" cy="35" r="5" fill={white ? '#00D4AA' : '#0a2540'} />
          <circle cx="58" cy="50" r="5" fill={white ? '#00D4AA' : '#0a2540'} />
          <circle cx="38" cy="60" r="5" fill={white ? '#00D4AA' : '#0a2540'} />
          <line x1="42" y1="35" x2="58" y2="50" stroke={white ? '#00D4AA' : '#0a2540'} strokeWidth="3" />
          <line x1="58" y1="50" x2="38" y2="60" stroke={white ? '#00D4AA' : '#0a2540'} strokeWidth="3" />
        </svg>
      </div>
      <span style={{ fontSize: size * 0.5, fontWeight: 800, color: white ? 'white' : '#0a2540' }}>
        WakilChat
      </span>
    </div>
  );
}

// Stat component
function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const counter = useCounter(value, 2200);
  return (
    <div ref={counter.ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 42, fontWeight: 800, color: '#00D4AA', letterSpacing: '-0.02em' }}>
        {counter.count.toLocaleString()}{suffix || ''}
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    { icon: <Icons.Messages />, title: 'Unified Inbox', desc: 'WhatsApp, Telegram, SMS — all in one place. Never miss a customer message.', color: '#00D4AA' },
    { icon: <Icons.Payments />, title: 'Accept Payments', desc: 'Mobile money, cards, bank transfers. Works with M-Pesa, Telebirr, and 20+ providers.', color: '#00A3CC' },
    { icon: <Icons.AI />, title: 'AI Assistant', desc: 'Auto-reply to common questions. Qualify leads while you sleep.', color: '#0a2540' },
    { icon: <Icons.Phone />, title: 'Free Calls', desc: 'Voice and video over internet. No per-minute charges.', color: '#00D4AA' },
    { icon: <Icons.Dashboard />, title: 'Simple Dashboard', desc: 'See your sales, messages, and tasks at a glance.', color: '#00A3CC' },
    { icon: <Icons.Shield />, title: 'Secure', desc: '256-bit encryption. Your data stays yours.', color: '#0a2540' },
  ];

  return (
    <>
      <Head>
        <title>WakilChat — Business Tools for African Entrepreneurs</title>
        <meta name="description" content="Payments, messaging, and AI tools. Free to start, pay only when you make money. Built by African founders." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; 
          background: #ffffff; 
          color: #0a2540;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a { text-decoration: none; color: inherit; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 50px; border: none; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: linear-gradient(135deg, #00D4AA, #00A3CC);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
          transition: all 0.3s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(0, 212, 170, 0.4); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 50px; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: white; color: #0a2540;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover { border-color: #00D4AA; background: rgba(0, 212, 170, 0.05); }

        .card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .card:hover { border-color: #00D4AA; box-shadow: 0 10px 40px rgba(0, 212, 170, 0.1); transform: translateY(-4px); }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .stack-mobile { flex-direction: column !important; }
          .full-mobile { width: 100% !important; }
          .hero-title { font-size: 36px !important; }
          .section-pad { padding: 60px 20px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVIGATION */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          <Link href="/">
            <Logo size={36} />
          </Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <a href="#features" style={{ fontSize: 15, fontWeight: 500, color: '#64748b', transition: 'color 0.2s' }}>Features</a>
            <a href="#pricing" style={{ fontSize: 15, fontWeight: 500, color: '#64748b', transition: 'color 0.2s' }}>Pricing</a>
            <a href="#team" style={{ fontSize: 15, fontWeight: 500, color: '#64748b', transition: 'color 0.2s' }}>Team</a>
            <a href="https://status.wakilchat.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 500, color: '#64748b', transition: 'color 0.2s' }}>Status</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/login" className="hide-mobile" style={{ fontSize: 15, fontWeight: 600, color: '#0a2540' }}>Log in</Link>
            <Link href="/signup"><button className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>Get started</button></Link>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          minHeight: '100vh',
          paddingTop: 120,
          paddingBottom: 80,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #e8f7f5 0%, #ffffff 100%)',
        }}
      >
        {/* Background decoration */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '0%',
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(0, 163, 204, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0, 212, 170, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.05) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0, 212, 170, 0.1)', borderRadius: 50, padding: '8px 20px', marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00D4AA' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#00A3CC' }}>Built for Africa. Growing globally.</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="hero-title"
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#0a2540',
                marginBottom: 24,
              }}
            >
              Business tools that
              <br />
              <span style={{ background: 'linear-gradient(135deg, #00D4AA, #00A3CC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                just work
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: 20, color: '#64748b', lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
              Payments, messaging, and AI — unified in one app.
              <br />
              Free to start. Pay only when you earn.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40 }}>
              <Link href="/signup"><button className="btn-primary full-mobile">Start for free <Icons.Arrow /></button></Link>
              <a href="#features"><button className="btn-secondary full-mobile">See how it works</button></a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 14 }}>
                <Icons.Check /> <span>No credit card required</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 14 }}>
                <Icons.Check /> <span>2-5% transaction fees only</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 14 }}>
                <Icons.Check /> <span>Cancel anytime</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ padding: '60px 24px', background: '#0a2540', color: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            <Stat value={50} suffix="K+" label="Businesses signed up" />
            <Stat value={12800} label="Monthly active users" />
            <Stat value={35} suffix="+" label="Countries served" />
            <Stat value={99.7} suffix="%" label="Uptime (30-day)" />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 24 }}>
            Real numbers, updated monthly. <a href="https://status.wakilchat.com" style={{ color: '#00D4AA', textDecoration: 'underline' }}>View live status →</a>
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="section-pad" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0a2540', marginBottom: 16 }}>
                Everything you need to grow
              </h2>
              <p style={{ fontSize: 18, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
                Simple tools that solve real problems. No complexity, no learning curve.
              </p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="card" style={{ height: '100%' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: f.color + '15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      color: f.color,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a2540', marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="section-pad" style={{ padding: '100px 24px', background: '#f8fafb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0a2540', marginBottom: 16 }}>
                Simple, honest pricing
              </h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>
                No monthly fees. No hidden charges. Pay only when you earn.
              </p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div style={{ background: 'white', borderRadius: 24, padding: 40, border: '2px solid #e2e8f0', height: '100%' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#00D4AA', marginBottom: 8, letterSpacing: '0.05em' }}>FREE FOREVER</div>
                <div style={{ fontSize: 56, fontWeight: 800, color: '#0a2540', marginBottom: 8 }}>$0</div>
                <div style={{ fontSize: 16, color: '#64748b', marginBottom: 32 }}>Perfect for getting started</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                  {['Unified messaging inbox', '100 AI responses/month', 'Basic dashboard', 'Community support'].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#374151', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#00D4AA' }}><Icons.Check /></span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"><button className="btn-secondary" style={{ width: '100%' }}>Start free</button></Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ background: '#0a2540', borderRadius: 24, padding: 40, border: '2px solid #0a2540', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, background: '#00D4AA', color: '#0a2540', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>POPULAR</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#00D4AA', marginBottom: 8, letterSpacing: '0.05em' }}>PAY AS YOU GROW</div>
                <div style={{ fontSize: 56, fontWeight: 800, color: 'white', marginBottom: 8 }}>2-5%</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>Per transaction, when you earn</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                  {['Everything in Free', '2% on consumer sales', '5% on B2B/exports', 'Unlimited AI responses', 'Priority support', 'Custom rates for high volume'].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.9)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ color: '#00D4AA' }}><Icons.Check /></span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"><button className="btn-primary" style={{ width: '100%' }}>Get started</button></Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{ marginTop: 32, background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 163, 204, 0.1))', borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: '#0a2540', margin: 0 }}>
                <strong>Honest comparison:</strong> For businesses under $50K/month revenue, we are cheaper than subscriptions. For high-volume businesses, <a href="mailto:hello@wakilchat.com" style={{ color: '#00A3CC', textDecoration: 'underline' }}>contact us for custom rates</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="section-pad" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0a2540', marginBottom: 16 }}>Meet the team</h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>Real people building this. Not a faceless corporation.</p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div className="card" style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #00D4AA, #00A3CC)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: 'white' }}>Y</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0a2540', marginBottom: 4 }}>Yitayal</div>
                <div style={{ fontSize: 14, color: '#00A3CC', fontWeight: 600, marginBottom: 16 }}>Founder & CEO</div>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                  Real estate advisor turned fintech builder. 5+ years helping African businesses navigate payments and operations.
                </p>
                <a href="https://linkedin.com/in/yitayal" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#00A3CC', fontWeight: 500 }}>LinkedIn →</a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card" style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, color: '#94a3b8' }}>+</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0a2540', marginBottom: 4 }}>Join Us</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>We are hiring</div>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                  Looking for engineers, designers, and operators who want to build something meaningful for Africa.
                </p>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: '#00A3CC', fontWeight: 500 }}>careers@wakilchat.com →</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{ marginTop: 32, background: '#f8fafb', borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                <strong>Transparency note:</strong> We are a small, bootstrapped team. No fancy office or millions in funding. Just building tools we wish we had.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center' }}>
            <Reveal>
              <div>
                <div style={{ color: '#00D4AA', marginBottom: 12 }}><Icons.Lock /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0a2540' }}>256-bit Encryption</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>AES-256, TLS 1.3</div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <div style={{ color: '#00D4AA', marginBottom: 12 }}><Icons.Chart /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0a2540' }}>Public Status Page</div>
                <a href="https://status.wakilchat.com" style={{ fontSize: 13, color: '#00A3CC' }}>status.wakilchat.com</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div style={{ color: '#00D4AA', marginBottom: 12 }}><Icons.Globe /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0a2540' }}>35+ Countries</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Growing across Africa</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0, 163, 204, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: 'white', marginBottom: 16 }}>
              Ready to grow your business?
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>
              Start free. No credit card required. No sales calls.
            </p>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/signup">
                <button className="btn-primary" style={{ background: 'white', color: '#0a2540' }}>
                  Start for free <Icons.Arrow />
                </button>
              </Link>
              <a href="mailto:hello@wakilchat.com">
                <button className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>
                  Contact us
                </button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0a2540', padding: '80px 24px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
            <div>
              <Logo size={32} white />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginTop: 20, maxWidth: 280 }}>
                Built by African founders, for African entrepreneurs. Simple tools that just work.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.05em' }}>PRODUCT</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#features" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Features</a>
                <a href="#pricing" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Pricing</a>
                <a href="https://status.wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Status</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.05em' }}>COMPANY</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#team" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Team</a>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Careers</a>
                <a href="mailto:hello@wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Contact</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.05em' }}>LEGAL</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="/privacy" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Privacy</a>
                <a href="/terms" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Terms</a>
                <a href="/security" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Security</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>© 2026 WakilChat. Built with honesty.</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Based in Dubai · Serving Africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
