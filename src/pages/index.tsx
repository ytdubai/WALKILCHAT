import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// ============================================
// WAKILCHAT - Premium Fintech Landing Page
// Inspired by Plaid's clean, professional design
// Dark theme with gold accents
// ============================================

// Animation hook for scroll reveal
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated counter for stats
function useCounter(end: number, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return { count, ref, suffix };
}

// Reveal animation wrapper
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// WakilChat Logo Component
function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = { small: 28, default: 36, large: 48 };
  const s = sizes[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s * 0.3 }}>
      <div style={{
        width: s, height: s, borderRadius: s * 0.22,
        background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(212, 175, 55, 0.3)',
      }}>
        <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#1a1a1a" fillOpacity="0.9"/>
          <circle cx="12" cy="11" r="2" fill="#D4AF37"/>
        </svg>
      </div>
      <span style={{
        fontSize: s * 0.6, fontWeight: 700, letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        WakilChat
      </span>
    </div>
  );
}

// Icon components
const Icons = {
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Messages: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Payments: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  AI: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Phone: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Dashboard: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2"/></svg>,
  Globe: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Status: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  LinkedIn: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    { icon: <Icons.Messages />, title: 'Unified Inbox', desc: 'WhatsApp, Telegram, SMS — all in one place. Never miss a customer message again.', color: '#3B82F6' },
    { icon: <Icons.Payments />, title: 'Accept Payments', desc: 'M-Pesa, Telebirr, cards, bank transfers. 20+ payment providers integrated seamlessly.', color: '#10B981' },
    { icon: <Icons.AI />, title: 'AI Assistant', desc: 'Auto-reply to common questions. Qualify leads and support customers while you sleep.', color: '#8B5CF6' },
    { icon: <Icons.Phone />, title: 'Free Calls', desc: 'Voice and video calls over internet. Zero per-minute charges across Africa.', color: '#F59E0B' },
    { icon: <Icons.Dashboard />, title: 'Simple Dashboard', desc: 'See your sales, messages, and tasks at a glance. Built for clarity, not complexity.', color: '#EC4899' },
    { icon: <Icons.Shield />, title: 'Bank-Grade Security', desc: '256-bit AES encryption. SOC 2 compliant. Your data stays yours, always.', color: '#06B6D4' },
  ];

  const stats = [
    useCounter(50, 2000, 'K+'),
    useCounter(12800, 2500, ''),
    useCounter(35, 1500, '+'),
    useCounter(99.7, 2000, '%'),
  ];
  const statLabels = ['Businesses signed up', 'Monthly active users', 'Countries served', 'Uptime (30-day)'];

  return (
    <>
      <Head>
        <title>WakilChat — Business Tools for African Entrepreneurs</title>
        <meta name="description" content="Payments, messaging, and AI tools unified in one app. Built for Africa. Free to start, pay only when you earn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0f0f0f;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(212, 175, 55, 0.3); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 8px; border: none;
          font-family: inherit; font-size: 15px; font-weight: 600;
          background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
          color: #0f0f0f; cursor: pointer;
          box-shadow: 0 2px 16px rgba(212, 175, 55, 0.25);
          transition: all 0.2s ease;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(212, 175, 55, 0.35); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 8px;
          font-family: inherit; font-size: 15px; font-weight: 600;
          background: transparent; color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer; transition: all 0.2s ease;
        }
        .btn-secondary:hover { border-color: rgba(212, 175, 55, 0.5); background: rgba(212, 175, 55, 0.05); }

        .card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .card:hover { border-color: rgba(212, 175, 55, 0.2); transform: translateY(-2px); }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* ========== NAVIGATION ========== */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(15, 15, 15, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <nav style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
        }}>
          <Link href="/"><Logo /></Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {['Features', 'Pricing', 'Team', 'Docs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)',
                transition: 'color 0.2s',
              }} onMouseOver={e => e.currentTarget.style.color = '#D4AF37'}
                 onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                {item}
              </a>
            ))}
            <a href="https://status.wakilchat.com" target="_blank" rel="noopener noreferrer" style={{
              fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              Status
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/login" className="hide-mobile" style={{ fontSize: 14, fontWeight: 600, color: '#D4AF37', padding: '10px 16px' }}>
              Log in
            </Link>
            <Link href="/signup">
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                Get started free
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section style={{
        minHeight: '100vh', paddingTop: 120, paddingBottom: 80,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.12), transparent)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(212, 175, 55, 0.1)', borderRadius: 100,
              padding: '6px 16px', marginBottom: 24,
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#D4AF37' }}>
                🌍 Built for Africa. Growing globally.
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{
              fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 700, lineHeight: 1.05,
              letterSpacing: '-0.03em', marginBottom: 24,
            }}>
              Turn conversations into<br />
              <span style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>revenue</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px',
            }}>
              Payments, messaging, and AI — unified in one app for African entrepreneurs.
              Free to start. Pay only when you earn.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/signup"><button className="btn-primary">Start for free <Icons.Arrow /></button></Link>
              <a href="#features"><button className="btn-secondary">See how it works</button></a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['No credit card required', '2-5% transaction fees', 'Cancel anytime'].map((text) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ color: '#10B981' }}><Icons.Check /></span> {text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Hero visual */}
        <Reveal delay={0.5}>
          <div style={{
            maxWidth: 900, margin: '80px auto 0', padding: '0 24px',
          }}>
            <div style={{
              background: 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(15,15,15,1) 100%)',
              borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)',
              padding: 24, boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
              }}>
                {[
                  { label: 'Today\'s Revenue', value: '$2,847', change: '+12.5%', up: true },
                  { label: 'Messages', value: '1,284', change: '+8.2%', up: true },
                  { label: 'Conversion', value: '24.8%', change: '+3.1%', up: true },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{stat.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: '#10B981', marginTop: 4 }}>{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
            {stats.map((stat, i) => (
              <div key={i} ref={stat.ref} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {stat.count.toLocaleString()}{stat.suffix}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{statLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
                Everything you need to grow
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto' }}>
                Simple tools that solve real problems. No complexity, no learning curve.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="card" style={{ padding: 32, height: '100%' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${f.color}15`, border: `1px solid ${f.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: f.color, marginBottom: 20,
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
                Simple, honest pricing
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
                No monthly fees. No hidden charges. Pay only when you earn.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <Reveal>
              <div className="card" style={{ padding: 40 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 12 }}>FREE FOREVER</div>
                <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 8 }}>$0</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Perfect for getting started</div>
                {['Unified messaging inbox', '100 AI responses/month', 'Basic dashboard', 'Community support'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#10B981' }}><Icons.Check /></span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
                <Link href="/signup" style={{ display: 'block', marginTop: 32 }}>
                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Start free</button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(244, 208, 63, 0.03))',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 16, padding: 40, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: '#D4AF37', color: '#0f0f0f',
                  fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
                }}>POPULAR</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 12 }}>PAY AS YOU GROW</div>
                <div style={{ fontSize: 56, fontWeight: 700, color: '#D4AF37', marginBottom: 8 }}>2-5%</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Per transaction, when you earn</div>
                {['Everything in Free', '2% on consumer sales', '5% on B2B/exports', 'Unlimited AI responses', 'Priority support', 'Custom rates for volume'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <span style={{ color: '#D4AF37' }}><Icons.Check /></span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                  </div>
                ))}
                <Link href="/signup" style={{ display: 'block', marginTop: 32 }}>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get started</button>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{
              marginTop: 32, background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: 12, padding: 20, textAlign: 'center',
            }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                <strong style={{ color: '#D4AF37' }}>Honest comparison:</strong> For businesses under $50K/month revenue, we're cheaper than subscriptions.
                High volume? <a href="mailto:hello@wakilchat.com" style={{ color: '#D4AF37' }}>Contact us for custom rates</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section id="team" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
                Meet the team
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
                Real people building this. Not a faceless corporation.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <Reveal>
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: '#0f0f0f' }}>Y</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Yitayal</h3>
                <p style={{ fontSize: 14, color: '#D4AF37', fontWeight: 600, marginBottom: 16 }}>Founder & CEO</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
                  Real estate advisor turned fintech builder. 5+ years helping African businesses navigate payments and operations.
                </p>
                <a href="https://linkedin.com/in/yitayal-menkir-6ab3b77a" target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#D4AF37', fontWeight: 500 }}>
                  <Icons.LinkedIn /> LinkedIn
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(212, 175, 55, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 32, color: '#D4AF37' }}>+</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Join Us</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: 16 }}>We're hiring</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
                  Looking for engineers, designers, and operators who want to build something meaningful for Africa.
                </p>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: '#D4AF37', fontWeight: 500 }}>
                  careers@wakilchat.com →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{
              marginTop: 32, background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12, padding: 20, textAlign: 'center',
            }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Transparency note:</strong> We're a small, bootstrapped team. No fancy office or millions in funding. Just building tools we wish we had.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== TRUST SECTION ========== */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: <Icons.Lock />, title: '256-bit Encryption', subtitle: 'AES-256, TLS 1.3' },
              { icon: <Icons.Status />, title: 'Public Status', subtitle: 'status.wakilchat.com', link: 'https://status.wakilchat.com' },
              { icon: <Icons.Globe />, title: '35+ Countries', subtitle: 'Growing across Africa' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#D4AF37', marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#D4AF37' }}>{item.subtitle}</a>
                  ) : (
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{item.subtitle}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section style={{
        padding: '120px 24px',
        background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08), transparent 70%)',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
              Ready to grow your business?
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
              Start free. No credit card required. No sales calls.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup"><button className="btn-primary">Start for free <Icons.Arrow /></button></Link>
              <a href="mailto:hello@wakilchat.com"><button className="btn-secondary">Contact sales</button></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ background: '#0a0a0a', padding: '80px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 48, marginBottom: 64 }}>
            <div>
              <Logo size="small" />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginTop: 20, maxWidth: 260 }}>
                Built by African founders, for African entrepreneurs. Simple tools that just work.
              </p>
            </div>
            {[
              { title: 'Product', links: [['Features', '#features'], ['Pricing', '#pricing'], ['Status', 'https://status.wakilchat.com']] },
              { title: 'Company', links: [['Team', '#team'], ['Careers', 'mailto:careers@wakilchat.com'], ['Contact', 'mailto:hello@wakilchat.com']] },
              { title: 'Legal', links: [['Privacy', '/privacy'], ['Terms', '/terms'], ['Security', '/security']] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 20 }}>{col.title.toUpperCase()}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map(([label, href]) => (
                    <a key={label} href={href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                       onMouseOver={e => e.currentTarget.style.color = '#D4AF37'}
                       onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 32,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 WakilChat™ · All Rights Reserved</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Based in Dubai · Serving Africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
