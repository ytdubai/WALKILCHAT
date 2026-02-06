import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// Custom SVG Icons
const Icons = {
  Messages: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Payments: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  AI: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Phone: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="9" rx="1"/>
      <rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/>
      <rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
  ),
  Shield: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Status: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

// Animation hooks
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(end: number, duration = 2000) {
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// Golden Lion Logo
function Logo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: size * 0.2,
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
      }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100" fill="none">
          <path d="M50 10L55 15L65 12L75 20L80 30L82 45L78 60L70 75L55 85L50 90L45 85L30 75L22 60L18 45L20 30L25 20L35 12L45 15L50 10Z" fill="#0a0a0a" fillOpacity="0.9"/>
          <circle cx="42" cy="35" r="5" fill="#FFD700"/>
          <circle cx="58" cy="50" r="5" fill="#FFD700"/>
          <circle cx="38" cy="60" r="5" fill="#FFD700"/>
          <line x1="42" y1="35" x2="58" y2="50" stroke="#FFD700" strokeWidth="3"/>
          <line x1="58" y1="50" x2="38" y2="60" stroke="#FFD700" strokeWidth="3"/>
        </svg>
      </div>
      <span style={{ fontSize: size * 0.55, fontWeight: 800, color: '#FFD700', letterSpacing: '-0.02em' }}>
        WakilChat
      </span>
    </div>
  );
}

// Stat counter component
function Stat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const counter = useCounter(value, 2000);
  return (
    <div ref={counter.ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 48, fontWeight: 800, color: '#FFD700', letterSpacing: '-0.02em' }}>
        {counter.count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </div>
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
    { icon: <Icons.Messages />, title: 'Unified Inbox', desc: 'WhatsApp, Telegram, SMS in one place. Never miss a customer message.' },
    { icon: <Icons.Payments />, title: 'Accept Payments', desc: 'M-Pesa, Telebirr, cards, bank transfers. 20+ providers integrated.' },
    { icon: <Icons.AI />, title: 'AI Assistant', desc: 'Auto-reply to FAQs. Qualify leads while you sleep.' },
    { icon: <Icons.Phone />, title: 'Free Calls', desc: 'Voice and video over internet. Zero per-minute charges.' },
    { icon: <Icons.Dashboard />, title: 'Simple Dashboard', desc: 'See sales, messages, and tasks at a glance.' },
    { icon: <Icons.Shield />, title: 'Bank-Grade Security', desc: '256-bit AES encryption. Your data stays yours.' },
  ];

  return (
    <>
      <Head>
        <title>WakilChat - Business Tools for African Entrepreneurs</title>
        <meta name="description" content="Payments, messaging, and AI tools. Free to start, pay only when you earn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Space Grotesk', -apple-system, sans-serif; 
          background: #0a0a0a; 
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 8px; border: none; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #0a0a0a;
          box-shadow: 0 4px 20px rgba(255, 215, 0, 0.25);
          transition: all 0.3s ease;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255, 215, 0, 0.35); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 8px; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: transparent; color: #FFD700;
          border: 2px solid rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }
        .btn-outline:hover { border-color: #FFD700; background: rgba(255, 215, 0, 0.1); }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .glass-card:hover { border-color: rgba(255, 215, 0, 0.3); transform: translateY(-4px); }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .stack-mobile { flex-direction: column !important; }
          .hero-title { font-size: 36px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* NAVIGATION */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 215, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          <Link href="/"><Logo size={36} /></Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <a href="#features" style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>Features</a>
            <a href="#pricing" style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>Pricing</a>
            <a href="#team" style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>Team</a>
            <a href="https://status.wakilchat.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>Status</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/login" className="hide-mobile" style={{ fontSize: 15, fontWeight: 600, color: '#FFD700' }}>Log in</Link>
            <Link href="/signup"><button className="btn-gold" style={{ padding: '12px 24px', fontSize: 14 }}>Get started</button></Link>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh', paddingTop: 140, paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.08) 0%, transparent 50%), #0a0a0a',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255, 215, 0, 0.1)', borderRadius: 50,
              padding: '8px 20px', marginBottom: 32, border: '1px solid rgba(255, 215, 0, 0.2)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD700', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#FFD700' }}>Built for Africa. Growing globally.</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="hero-title" style={{
              fontSize: 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em',
              color: '#ffffff', marginBottom: 24,
            }}>
              Business tools that<br/>
              <span style={{ color: '#FFD700' }}>just work</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40, maxWidth: 550, margin: '0 auto 40px' }}>
              Payments, messaging, and AI — unified in one app.<br/>
              Free to start. Pay only when you earn.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 48 }}>
              <Link href="/signup"><button className="btn-gold">Start for free <Icons.Arrow /></button></Link>
              <a href="#features"><button className="btn-outline">See how it works</button></a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
              {['No credit card required', '2-5% transaction fees only', 'Cancel anytime'].map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  <span style={{ color: '#FFD700' }}><Icons.Check /></span> {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ padding: '60px 24px', background: '#0f0f0f', borderTop: '1px solid rgba(255, 215, 0, 0.1)', borderBottom: '1px solid rgba(255, 215, 0, 0.1)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            <Stat value={50} suffix="K+" label="Businesses signed up" />
            <Stat value={12800} label="Monthly active users" />
            <Stat value={35} suffix="+" label="Countries served" />
            <Stat value={99.7} suffix="%" label="Uptime (30-day)" />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
            Real numbers, updated monthly. <a href="https://status.wakilchat.com" style={{ color: '#FFD700' }}>View live status →</a>
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
                Everything you need to <span style={{ color: '#FFD700' }}>grow</span>
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto' }}>
                Simple tools that solve real problems. No complexity, no learning curve.
              </p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass-card" style={{ padding: 32, height: '100%' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20, color: '#FFD700',
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ padding: '100px 24px', background: '#0f0f0f' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
                Simple, <span style={{ color: '#FFD700' }}>honest</span> pricing
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
                No monthly fees. No hidden charges. Pay only when you earn.
              </p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div className="glass-card" style={{ padding: 40 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', marginBottom: 8, letterSpacing: '0.1em' }}>FREE FOREVER</div>
                <div style={{ fontSize: 56, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>$0</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Perfect for getting started</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                  {['Unified messaging inbox', '100 AI responses/month', 'Basic dashboard', 'Community support'].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.7)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#FFD700' }}><Icons.Check /></span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"><button className="btn-outline" style={{ width: '100%' }}>Start free</button></Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05))',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                borderRadius: 16, padding: 40, position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 20, right: 20, background: '#FFD700', color: '#0a0a0a', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em' }}>POPULAR</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', marginBottom: 8, letterSpacing: '0.1em' }}>PAY AS YOU GROW</div>
                <div style={{ fontSize: 56, fontWeight: 700, color: '#FFD700', marginBottom: 8 }}>2-5%</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Per transaction, when you earn</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                  {['Everything in Free', '2% on consumer sales', '5% on B2B/exports', 'Unlimited AI responses', 'Priority support', 'Custom rates for high volume'].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)', padding: '12px 0', borderBottom: '1px solid rgba(255, 215, 0, 0.1)' }}>
                      <span style={{ color: '#FFD700' }}><Icons.Check /></span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"><button className="btn-gold" style={{ width: '100%' }}>Get started</button></Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{
              marginTop: 32, background: 'rgba(255, 215, 0, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.15)',
              borderRadius: 12, padding: 24, textAlign: 'center',
            }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                <strong style={{ color: '#FFD700' }}>Honest comparison:</strong> For businesses under $50K/month revenue, we are cheaper than subscriptions. For high-volume, <a href="mailto:hello@wakilchat.com" style={{ color: '#FFD700' }}>contact us for custom rates</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 42, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
                Meet the <span style={{ color: '#FFD700' }}>team</span>
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
                Real people building this. Not a faceless corporation.
              </p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div className="glass-card" style={{ textAlign: 'center', padding: 40 }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: '#0a0a0a' }}>Y</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>Yitayal</div>
                <div style={{ fontSize: 14, color: '#FFD700', fontWeight: 600, marginBottom: 16 }}>Founder & CEO</div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
                  Real estate advisor turned fintech builder. 5+ years helping African businesses navigate payments and operations.
                </p>
                <a href="https://linkedin.com/in/yitayal-menkir-6ab3b77a" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#FFD700', fontWeight: 500 }}>LinkedIn →</a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-card" style={{ textAlign: 'center', padding: 40 }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)', border: '2px dashed rgba(255, 215, 0, 0.3)',
                  margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 32, color: '#FFD700' }}>+</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>Join Us</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: 16 }}>We are hiring</div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
                  Looking for engineers, designers, and operators who want to build something meaningful for Africa.
                </p>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: '#FFD700', fontWeight: 500 }}>careers@wakilchat.com →</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{
              marginTop: 32, background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 12, padding: 24, textAlign: 'center',
            }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Transparency note:</strong> We are a small, bootstrapped team. No fancy office or millions in funding. Just building tools we wish we had.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center' }}>
            <Reveal>
              <div>
                <div style={{ color: '#FFD700', marginBottom: 12 }}><Icons.Lock /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>256-bit Encryption</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>AES-256, TLS 1.3</div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <div style={{ color: '#FFD700', marginBottom: 12 }}><Icons.Status /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>Public Status Page</div>
                <a href="https://status.wakilchat.com" style={{ fontSize: 13, color: '#FFD700' }}>status.wakilchat.com</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div style={{ color: '#FFD700', marginBottom: 12 }}><Icons.Globe /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>35+ Countries</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Growing across Africa</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '100px 24px',
        background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 60%), #0a0a0a',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontSize: 42, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
              Ready to grow your business?
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
              Start free. No credit card required. No sales calls.
            </p>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/signup"><button className="btn-gold">Start for free <Icons.Arrow /></button></Link>
              <a href="mailto:hello@wakilchat.com"><button className="btn-outline">Contact us</button></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#050505', padding: '80px 24px 40px', borderTop: '1px solid rgba(255, 215, 0, 0.1)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
            <div>
              <Logo size={32} />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginTop: 20, maxWidth: 280 }}>
                Built by African founders, for African entrepreneurs. Simple tools that just work.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', marginBottom: 20, letterSpacing: '0.1em' }}>PRODUCT</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#features" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Features</a>
                <a href="#pricing" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Pricing</a>
                <a href="https://status.wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Status</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', marginBottom: 20, letterSpacing: '0.1em' }}>COMPANY</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#team" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Team</a>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Careers</a>
                <a href="mailto:hello@wakilchat.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Contact</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', marginBottom: 20, letterSpacing: '0.1em' }}>LEGAL</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="/privacy" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Privacy</a>
                <a href="/terms" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Terms</a>
                <a href="/security" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Security</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 WakilChat. Built with honesty.</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Based in Dubai · Serving Africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
