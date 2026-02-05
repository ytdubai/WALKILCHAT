import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════════
   WAKILCHAT — Plaid-Inspired Premium Fintech Landing Page
   Ocean Blue (#0066CC) + Teal (#00B4D8) + Lime (#39FF14) + Mint (#E8F5F0)
   ══════════════════════════════════════════════════════════════════ */

function useInView(threshold) {
  var ref = useRef(null);
  var state = useState(false);
  var inView = state[0];
  var setInView = state[1];
  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: threshold || 0.15 });
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, []);
  return { ref: ref, inView: inView };
}

function useCounter(end, duration) {
  var state = useState(0);
  var count = state[0];
  var setCount = state[1];
  var view = useInView(0.3);
  useEffect(function() {
    if (!view.inView) return;
    var dur = duration || 2000;
    var raf;
    var t0 = performance.now();
    function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return function() { cancelAnimationFrame(raf); };
  }, [view.inView, end, duration]);
  return { count: count, ref: view.ref };
}

function Reveal(props) {
  var d = props.d || 0;
  var y = props.y || 40;
  var view = useInView(0.1);
  return (
    <div ref={view.ref} style={{
      opacity: view.inView ? 1 : 0,
      transform: view.inView ? 'translate3d(0,0,0)' : 'translate3d(0,' + y + 'px,0)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ' + d + 's',
    }}>
      {props.children}
    </div>
  );
}

function Stat(props) {
  var c = useCounter(props.value, 2200);
  return (
    <div ref={c.ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 56, fontWeight: 800, color: '#0066CC', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {props.prefix || ''}{c.count.toLocaleString()}{props.suffix || ''}
      </div>
      <div style={{ fontSize: 16, color: '#64748b', marginTop: 8, fontWeight: 500 }}>{props.label}</div>
    </div>
  );
}

export default function PlaidStylePage() {
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];

  var modalState = useState(false);
  var showModal = modalState[0];
  var setShowModal = modalState[1];

  var mobileMenuState = useState(false);
  var mobileMenu = mobileMenuState[0];
  var setMobileMenu = mobileMenuState[1];

  var carouselState = useState(0);
  var carouselIndex = carouselState[0];
  var setCarouselIndex = carouselState[1];

  var activityState = useState(0);
  var activityIndex = activityState[0];
  var setActivityIndex = activityState[1];

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(function() {
    var interval = setInterval(function() {
      setActivityIndex(function(i) { return (i + 1) % 6; });
    }, 2500);
    return function() { clearInterval(interval); };
  }, []);

  var testimonials = [
    { quote: "WakilChat reduced our onboarding friction by 73%. The API integration took just two days.", name: "Sarah Chen", role: "CTO, FinanceFlow", metric: "73% faster onboarding" },
    { quote: "We process 10x more payments with half the fraud rate since switching to WakilChat.", name: "Marcus Johnson", role: "Head of Payments, QuickPay", metric: "10x payment volume" },
    { quote: "The developer experience is unmatched. Best documentation I've seen in fintech.", name: "Priya Patel", role: "Lead Engineer, NeoBank", metric: "2-day integration" },
  ];

  var activities = [
    { company: "Venmo", action: "connected bank account", color: "#008CFF" },
    { company: "Robinhood", action: "verified identity", color: "#00C805" },
    { company: "Chime", action: "processed payment", color: "#00D4AA" },
    { company: "Cash App", action: "linked debit card", color: "#00D632" },
    { company: "SoFi", action: "completed KYC check", color: "#7B68EE" },
    { company: "Coinbase", action: "verified bank ownership", color: "#0052FF" },
  ];

  return (
    <>
      <Head>
        <title>WakilChat — The Financial Infrastructure for African Businesses</title>
        <meta name="description" content="Connect to financial accounts, verify identities, and move money — all through one API." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          background: #ffffff; 
          color: #1e293b;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(0, 102, 204, 0.2); }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 30px; border: none; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: linear-gradient(135deg, #0066CC 0%, #00B4D8 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 102, 204, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 30px rgba(0, 102, 204, 0.4);
          background: linear-gradient(135deg, #0052a3 0%, #00a0c4 100%);
        }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 30px; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: transparent; color: #0066CC;
          border: 2px solid #0066CC;
          transition: all 0.3s;
        }
        .btn-secondary:hover { background: rgba(0, 102, 204, 0.08); }

        .btn-lime {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 30px; border: none; cursor: pointer;
          font-family: inherit; font-weight: 700; font-size: 16px;
          background: #39FF14; color: #0a0a0a;
          box-shadow: 0 4px 20px rgba(57, 255, 20, 0.3);
          transition: all 0.3s;
        }
        .btn-lime:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 30px rgba(57, 255, 20, 0.5);
        }

        .glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }

        .card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 50px rgba(0, 102, 204, 0.12);
        }

        .code-block {
          background: #0f172a;
          border-radius: 16px;
          padding: 24px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.6;
          overflow-x: auto;
        }
        .code-keyword { color: #c084fc; }
        .code-string { color: #34d399; }
        .code-comment { color: #64748b; }
        .code-property { color: #60a5fa; }
        .code-number { color: #fbbf24; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .stack-mobile { flex-direction: column !important; }
          .full-mobile { width: 100% !important; }
          .hero-title { font-size: 40px !important; }
          .section-pad { padding: 60px 20px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════ NAVIGATION ══════════ */}
      <header className="glass" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        <nav style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #0066CC, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {/* Africa continent shape */}
                <path d="M50,5 L55,8 L60,7 L68,12 L72,10 L78,15 L80,22 L82,28 L80,35 L78,40 L80,48 L78,55 L75,62 L70,68 L65,75 L60,80 L55,85 L50,90 L45,92 L38,88 L32,82 L28,75 L25,68 L22,60 L20,52 L22,45 L25,38 L28,32 L32,25 L38,18 L45,10 L50,5 Z" 
                  fill="white" opacity="0.95" />
                {/* Unity connection lines */}
                <circle cx="45" cy="30" r="4" fill="#39FF14" />
                <circle cx="55" cy="45" r="4" fill="#39FF14" />
                <circle cx="40" cy="55" r="4" fill="#39FF14" />
                <circle cx="50" cy="70" r="4" fill="#39FF14" />
                <line x1="45" y1="30" x2="55" y2="45" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                <line x1="55" y1="45" x2="40" y2="55" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                <line x1="40" y1="55" x2="50" y2="70" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                <line x1="45" y1="30" x2="40" y2="55" stroke="#39FF14" strokeWidth="1.5" opacity="0.5" />
                <line x1="55" y1="45" x2="50" y2="70" stroke="#39FF14" strokeWidth="1.5" opacity="0.5" />
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #0066CC, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WakilChat</span>
          </Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#products" style={{ fontSize: 15, fontWeight: 500, color: '#475569', transition: 'color 0.2s' }}>Products</a>
            <a href="#use-cases" style={{ fontSize: 15, fontWeight: 500, color: '#475569', transition: 'color 0.2s' }}>Use Cases</a>
            <a href="#developers" style={{ fontSize: 15, fontWeight: 500, color: '#475569', transition: 'color 0.2s' }}>Developers</a>
            <a href="#pricing" style={{ fontSize: 15, fontWeight: 500, color: '#475569', transition: 'color 0.2s' }}>Pricing</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/login" className="hide-mobile" style={{ fontSize: 15, fontWeight: 500, color: '#475569' }}>Sign in</Link>
            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }} onClick={function() { setShowModal(true); }}>Get API Keys</button>
            <button className="hide-mobile" onClick={function() { setMobileMenu(!mobileMenu); }} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
              <div style={{ width: 24, height: 2, background: '#1e293b', marginBottom: 6 }} />
              <div style={{ width: 24, height: 2, background: '#1e293b', marginBottom: 6 }} />
              <div style={{ width: 24, height: 2, background: '#1e293b' }} />
            </button>
          </div>
        </nav>
      </header>

      {/* ══════════ HERO SECTION ══════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 72 }}>
        {/* Mesh Gradient Background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, #E8F5F0 0%, #ffffff 30%, #f0f9ff 60%, #E8F5F0 100%)',
        }} />
        
        {/* Flowing Lines SVG */}
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', opacity: 0.5 }} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q200,100 400,200 T800,200" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <path d="M0,300 Q200,200 400,300 T800,300" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" style={{ animation: 'float 8s ease-in-out infinite 0.5s' }} />
          <path d="M0,400 Q200,300 400,400 T800,400" fill="none" stroke="url(#lineGrad2)" strokeWidth="2" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
          <path d="M0,500 Q200,400 400,500 T800,500" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" style={{ animation: 'float 8s ease-in-out infinite 1.5s' }} />
          <path d="M0,600 Q200,500 400,600 T800,600" fill="none" stroke="url(#lineGrad2)" strokeWidth="2" style={{ animation: 'float 8s ease-in-out infinite 2s' }} />
          <circle cx="650" cy="200" r="80" fill="url(#lineGrad1)" opacity="0.3" style={{ animation: 'float 6s ease-in-out infinite' }} />
          <circle cx="550" cy="450" r="120" fill="url(#lineGrad2)" opacity="0.2" style={{ animation: 'float 7s ease-in-out infinite 1s' }} />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>
            <Reveal d={0}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 100, background: 'rgba(0, 102, 204, 0.08)', marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#39FF14', animation: 'pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0066CC' }}>Now processing $2B+ monthly</span>
              </div>
            </Reveal>

            <Reveal d={0.1}>
              <h1 className="hero-title" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a' }}>
                The financial
                <br />
                <span style={{ background: 'linear-gradient(135deg, #0066CC, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>infrastructure</span>
                <br />
                for Africa
              </h1>
            </Reveal>

            <Reveal d={0.2}>
              <p style={{ fontSize: 20, color: '#64748b', lineHeight: 1.6, marginBottom: 40, maxWidth: 540 }}>
                Connect to bank accounts, verify identities, and move money across 35+ African countries — all through one powerful API.
              </p>
            </Reveal>

            <Reveal d={0.3}>
              <div className="stack-mobile" style={{ display: 'flex', gap: 16 }}>
                <button className="btn-primary full-mobile" onClick={function() { setShowModal(true); }}>
                  Talk to our team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
                <Link href="#developers"><button className="btn-secondary full-mobile">Start building</button></Link>
              </div>
            </Reveal>

            <Reveal d={0.4}>
              <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>TRUSTED BY</span>
                <div style={{ display: 'flex', gap: 24, opacity: 0.5 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>M-Pesa</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Telebirr</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Paystack</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Flutterwave</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ LIVE ACTIVITY FEED ══════════ */}
      <section style={{ background: '#0f172a', padding: '32px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#39FF14', animation: 'pulse 1s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Activity</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 32, animation: 'scroll 20s linear infinite' }}>
                {[...activities, ...activities].map(function(a, i) {
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 100, background: 'rgba(255,255,255,0.05)' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                      <span style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{a.company}</span>
                      <span style={{ fontSize: 14, color: '#64748b' }}>{a.action}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATISTICS ══════════ */}
      <section className="section-pad" style={{ padding: '100px 32px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Network Power</h2>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Trusted by millions across Africa</p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            <Reveal d={0}><Stat value={50} suffix="%" prefix="1 in " label="African fintech users connected via WakilChat" /></Reveal>
            <Reveal d={0.1}><Stat value={25} suffix="%" label="Higher conversion than competitors" /></Reveal>
            <Reveal d={0.2}><Stat value={500} suffix="K+" label="Daily API connections processed" /></Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="products" className="section-pad" style={{ padding: '100px 32px', background: '#E8F5F0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Products</h2>
              <p style={{ fontSize: 42, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', maxWidth: 600, margin: '0 auto' }}>Everything you need to build financial products</p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🔗', title: 'Account Linking', desc: 'Connect to 12,000+ financial institutions across Africa with a single integration.', color: '#0066CC' },
              { icon: '✓', title: 'Identity Verification', desc: 'Verify customer identities in real-time with bank-level accuracy and compliance.', color: '#00B4D8' },
              { icon: '💸', title: 'Payment Processing', desc: 'Move money instantly between accounts, wallets, and banks across borders.', color: '#39FF14' },
              { icon: '🛡️', title: 'Fraud Prevention', desc: 'AI-powered fraud detection that blocks suspicious transactions before they happen.', color: '#8B5CF6' },
              { icon: '📊', title: 'Credit Underwriting', desc: 'Make smarter lending decisions with real-time income and asset verification.', color: '#F59E0B' },
              { icon: '🌍', title: 'Open Finance', desc: 'Access the full financial data stack with a unified, developer-friendly API.', color: '#EC4899' },
            ].map(function(f, i) {
              return (
                <Reveal key={i} d={i * 0.05}>
                  <div className="card" style={{ height: '100%' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: f.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{f.title}</h3>
                    <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ API SECTION ══════════ */}
      <section id="developers" className="section-pad" style={{ padding: '100px 32px', background: '#0f172a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid-2 stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <Reveal>
              <div>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#39FF14', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>For Developers</h2>
                <p style={{ fontSize: 42, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: 24 }}>Build with confidence</p>
                <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
                  Clean APIs, comprehensive SDKs, and documentation that developers actually love. Get up and running in minutes, not months.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                  {['Node.js', 'Python', 'Ruby', 'Go', 'Java', 'PHP'].map(function(lang) {
                    return <span key={lang} style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: 14, fontWeight: 500 }}>{lang}</span>;
                  })}
                </div>
                <Link href="#"><button className="btn-lime">Read the docs →</button></Link>
              </div>
            </Reveal>

            <Reveal d={0.1}>
              <div className="code-block">
                <div style={{ marginBottom: 16, display: 'flex', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <pre style={{ color: '#e2e8f0', margin: 0 }}>
                  <span className="code-comment">// Create a payment link in seconds</span>{'\n'}
                  <span className="code-keyword">const</span> <span className="code-property">payment</span> = <span className="code-keyword">await</span> wakilchat.payments.create({'{'}
                  {'\n'}  <span className="code-property">amount</span>: <span className="code-number">50000</span>,
                  {'\n'}  <span className="code-property">currency</span>: <span className="code-string">&apos;ETB&apos;</span>,
                  {'\n'}  <span className="code-property">customer</span>: {'{'}
                  {'\n'}    <span className="code-property">email</span>: <span className="code-string">&apos;customer@email.com&apos;</span>,
                  {'\n'}    <span className="code-property">phone</span>: <span className="code-string">&apos;+251911234567&apos;</span>
                  {'\n'}  {'}'},
                  {'\n'}  <span className="code-property">methods</span>: [<span className="code-string">&apos;telebirr&apos;</span>, <span className="code-string">&apos;cbe&apos;</span>]
                  {'\n'}{'}'});
                  {'\n\n'}<span className="code-comment">// Returns checkout URL instantly</span>
                  {'\n'}console.log(payment.<span className="code-property">checkout_url</span>);
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section-pad" style={{ padding: '100px 32px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Customer Stories</h2>
              <p style={{ fontSize: 42, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Loved by teams everywhere</p>
            </div>
          </Reveal>

          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ overflow: 'hidden', borderRadius: 24 }}>
              <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: 'translateX(-' + (carouselIndex * 100) + '%)' }}>
                {testimonials.map(function(t, i) {
                  return (
                    <div key={i} style={{ minWidth: '100%', padding: '48px', background: '#E8F5F0', borderRadius: 24 }}>
                      <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 100, background: '#0066CC', color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>{t.metric}</div>
                      <p style={{ fontSize: 24, color: '#0f172a', lineHeight: 1.6, marginBottom: 32, fontWeight: 500 }}>&ldquo;{t.quote}&rdquo;</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #0066CC, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>{t.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                          <div style={{ fontSize: 14, color: '#64748b' }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              {testimonials.map(function(_, i) {
                return (
                  <button key={i} onClick={function() { setCarouselIndex(i); }} style={{
                    width: carouselIndex === i ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: 'none',
                    background: carouselIndex === i ? '#0066CC' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }} />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════ */}
      <section style={{ position: 'relative', padding: '120px 32px', background: 'linear-gradient(135deg, #0066CC 0%, #00B4D8 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: 24 }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.6 }}>
              Join thousands of companies using WakilChat to power their financial infrastructure.
            </p>
            <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button className="btn-lime full-mobile" onClick={function() { setShowModal(true); }}>Talk to sales</button>
              <Link href="#developers"><button style={{ padding: '16px 32px', borderRadius: 30, border: '2px solid white', background: 'transparent', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }} className="full-mobile">Start building →</button></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: '#0f172a', padding: '80px 32px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #0066CC, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <path d="M50,5 L55,8 L60,7 L68,12 L72,10 L78,15 L80,22 L82,28 L80,35 L78,40 L80,48 L78,55 L75,62 L70,68 L65,75 L60,80 L55,85 L50,90 L45,92 L38,88 L32,82 L28,75 L25,68 L22,60 L20,52 L22,45 L25,38 L28,32 L32,25 L38,18 L45,10 L50,5 Z" 
                      fill="white" opacity="0.95" />
                    <circle cx="45" cy="30" r="4" fill="#39FF14" />
                    <circle cx="55" cy="45" r="4" fill="#39FF14" />
                    <circle cx="40" cy="55" r="4" fill="#39FF14" />
                    <circle cx="50" cy="70" r="4" fill="#39FF14" />
                    <line x1="45" y1="30" x2="55" y2="45" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                    <line x1="55" y1="45" x2="40" y2="55" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                    <line x1="40" y1="55" x2="50" y2="70" stroke="#39FF14" strokeWidth="2" opacity="0.8" />
                  </svg>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>WakilChat</span>
              </div>
              <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, maxWidth: 280 }}>
                The financial infrastructure powering the next generation of African fintech.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Products</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Account Linking</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Identity</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Payments</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Fraud</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Developers</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Documentation</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>API Reference</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>SDKs</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Status</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>About</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Careers</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Blog</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Press</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Privacy</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Terms</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Security</a>
                <a href="#" style={{ fontSize: 14, color: '#94a3b8' }}>Compliance</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 14, color: '#64748b' }}>© 2026 WakilChat. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>🔒 SOC 2 Compliant</span>
              <span style={{ fontSize: 13, color: '#64748b' }}>PCI DSS Level 1</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════ CONTACT MODAL ══════════ */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={function() { setShowModal(false); }} />
          <div style={{ position: 'relative', background: 'white', borderRadius: 24, padding: 40, maxWidth: 480, width: '100%', animation: 'slideUp 0.3s ease' }}>
            <button onClick={function() { setShowModal(false); }} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8' }}>×</button>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Get in touch</h3>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Fill out the form and our team will reach out within 24 hours.</p>
            
            <form onSubmit={function(e) { e.preventDefault(); alert('Thanks! We will be in touch soon.'); setShowModal(false); }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Work email</label>
                <input type="email" required placeholder="you@company.com" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 15, outline: 'none', transition: 'border 0.2s' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Company name</label>
                <input type="text" required placeholder="Your company" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 15, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>How can we help?</label>
                <textarea required rows={3} placeholder="Tell us about your project..." style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 15, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
