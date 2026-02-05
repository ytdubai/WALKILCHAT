import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════════
   WAKILCHAT — Honest, Transparent Fintech Landing Page
   Built on trust, not hype
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
      <div style={{ fontSize: 48, fontWeight: 800, color: '#0066CC', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {props.prefix || ''}{c.count.toLocaleString()}{props.suffix || ''}
      </div>
      <div style={{ fontSize: 14, color: '#64748b', marginTop: 8, fontWeight: 500 }}>{props.label}</div>
    </div>
  );
}

export default function HomePage() {
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];

  var modalState = useState(false);
  var showModal = modalState[0];
  var setShowModal = modalState[1];

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <Head>
        <title>WakilChat — Business Tools for African Entrepreneurs</title>
        <meta name="description" content="Payments, messaging, and AI tools. Free to start, pay only when you make money. Built by African founders." />
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
        }
        a { text-decoration: none; color: inherit; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 12px; border: none; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: #0066CC; color: white;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: #0052a3; transform: translateY(-1px); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 12px; cursor: pointer;
          font-family: inherit; font-weight: 600; font-size: 16px;
          background: transparent; color: #0066CC;
          border: 2px solid #0066CC;
          transition: all 0.2s;
        }
        .btn-secondary:hover { background: rgba(0, 102, 204, 0.05); }

        .card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }
        .card:hover { border-color: #0066CC; box-shadow: 0 4px 20px rgba(0,102,204,0.1); }

        .glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
        }

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

      {/* ══════════ NAVIGATION ══════════ */}
      <header className="glass" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
      }}>
        <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0066CC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <path d="M50,5 L55,8 L60,7 L68,12 L72,10 L78,15 L80,22 L82,28 L80,35 L78,40 L80,48 L78,55 L75,62 L70,68 L65,75 L60,80 L55,85 L50,90 L45,92 L38,88 L32,82 L28,75 L25,68 L22,60 L20,52 L22,45 L25,38 L28,32 L32,25 L38,18 L45,10 L50,5 Z" fill="white" opacity="0.95" />
                <circle cx="45" cy="30" r="4" fill="#39FF14" />
                <circle cx="55" cy="45" r="4" fill="#39FF14" />
                <circle cx="40" cy="55" r="4" fill="#39FF14" />
                <circle cx="50" cy="70" r="4" fill="#39FF14" />
                <line x1="45" y1="30" x2="55" y2="45" stroke="#39FF14" strokeWidth="2" />
                <line x1="55" y1="45" x2="40" y2="55" stroke="#39FF14" strokeWidth="2" />
                <line x1="40" y1="55" x2="50" y2="70" stroke="#39FF14" strokeWidth="2" />
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#0066CC' }}>WakilChat</span>
          </Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{ fontSize: 15, fontWeight: 500, color: '#64748b' }}>Features</a>
            <a href="#pricing" style={{ fontSize: 15, fontWeight: 500, color: '#64748b' }}>Pricing</a>
            <a href="#team" style={{ fontSize: 15, fontWeight: 500, color: '#64748b' }}>Team</a>
            <a href="https://status.wakilchat.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 500, color: '#64748b' }}>Status</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/login" className="hide-mobile" style={{ fontSize: 15, fontWeight: 500, color: '#64748b' }}>Sign in</Link>
            <Link href="/signup"><button className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>Start free</button></Link>
          </div>
        </nav>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <Reveal>
            <h1 className="hero-title" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 24 }}>
              Business tools for African entrepreneurs
            </h1>
          </Reveal>

          <Reveal d={0.1}>
            <p style={{ fontSize: 20, color: '#64748b', lineHeight: 1.6, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
              Payments, messaging, and AI — in one app. Free to start. You only pay when you make money.
            </p>
          </Reveal>

          <Reveal d={0.2}>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
              <Link href="/signup"><button className="btn-primary full-mobile">Start for free →</button></Link>
              <Link href="#pricing"><button className="btn-secondary full-mobile">See pricing</button></Link>
            </div>
          </Reveal>

          {/* HONEST PRICING CALLOUT */}
          <Reveal d={0.3}>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '16px 24px', display: 'inline-block' }}>
              <p style={{ fontSize: 14, color: '#065f46', margin: 0 }}>
                <strong>How we're different:</strong> No monthly fees. Free tier forever. Pay 2-5% only on transactions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ HONEST METRICS ══════════ */}
      <section className="section-pad" style={{ padding: '60px 24px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            <Reveal d={0}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0066CC' }}>50K+</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Signups</div>
              </div>
            </Reveal>
            <Reveal d={0.05}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0066CC' }}>12.8K</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Monthly active</div>
              </div>
            </Reveal>
            <Reveal d={0.1}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0066CC' }}>35+</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Countries</div>
              </div>
            </Reveal>
            <Reveal d={0.15}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0066CC' }}>99.7%</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Uptime (30-day)</div>
              </div>
            </Reveal>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 16 }}>
            Real numbers, updated monthly. <a href="https://status.wakilchat.com" style={{ color: '#0066CC', textDecoration: 'underline' }}>View live status →</a>
          </p>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="section-pad" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>What you get</h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>Simple tools that work. No complexity.</p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: '💬', title: 'Unified Inbox', desc: 'WhatsApp, Telegram, SMS in one place. Never miss a customer message.' },
              { icon: '💳', title: 'Accept Payments', desc: 'Mobile money, cards, bank transfers. Works with M-Pesa, Telebirr, and 20+ providers.' },
              { icon: '🤖', title: 'AI Assistant', desc: 'Auto-reply to common questions. Qualify leads while you sleep.' },
              { icon: '📱', title: 'Free Calls', desc: 'Voice and video over internet. No per-minute charges.' },
              { icon: '📊', title: 'Simple Dashboard', desc: 'See your sales, messages, and tasks. No MBA required.' },
              { icon: '🔒', title: 'Secure', desc: 'End-to-end encryption. Your data stays yours.' },
            ].map(function(f, i) {
              return (
                <Reveal key={i} d={i * 0.05}>
                  <div className="card">
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
                    <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ HONEST PRICING ══════════ */}
      <section id="pricing" className="section-pad" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Simple, honest pricing</h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>No monthly fees. No hidden charges. Pay only when you earn.</p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '2px solid #e5e7eb' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0066CC', marginBottom: 8 }}>FREE TIER</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>$0</div>
                <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Forever free for basic use</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Unified messaging inbox', '100 AI responses/month', 'Basic dashboard', 'Community support'].map(function(item) {
                    return <li key={item} style={{ fontSize: 15, color: '#374151', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>✓ {item}</li>;
                  })}
                </ul>
                <Link href="/signup"><button className="btn-secondary" style={{ width: '100%', marginTop: 24 }}>Start free</button></Link>
              </div>
            </Reveal>

            <Reveal d={0.1}>
              <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '2px solid #0066CC' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0066CC', marginBottom: 8 }}>PAY AS YOU GROW</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>2-5%</div>
                <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Per transaction, only when you earn</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Everything in Free', '2% on consumer sales', '5% on B2B/exports', 'Unlimited AI responses', 'Priority support', 'Custom rates for high volume'].map(function(item) {
                    return <li key={item} style={{ fontSize: 15, color: '#374151', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>✓ {item}</li>;
                  })}
                </ul>
                <Link href="/signup"><button className="btn-primary" style={{ width: '100%', marginTop: 24 }}>Get started</button></Link>
              </div>
            </Reveal>
          </div>

          <Reveal d={0.2}>
            <div style={{ marginTop: 32, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#92400e', margin: 0 }}>
                <strong>Real talk:</strong> For businesses under $50K/month revenue, we're cheaper than subscriptions. For high-volume businesses, <a href="#contact" style={{ color: '#92400e', textDecoration: 'underline' }}>contact us for custom rates</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ REAL CASE STUDIES ══════════ */}
      <section className="section-pad" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Real customers, real results</h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>Not testimonials — detailed case studies with permission.</p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                name: 'Amina Kebede',
                business: 'Fashion Design Studio',
                location: 'Nairobi, Kenya',
                photo: 'A',
                challenge: 'Managing orders across WhatsApp, email, and Excel spreadsheets',
                before: '5 different apps, ~$200/month in tools, 30% of orders lost or delayed',
                after: '1 app, $47/month average, 0% order loss, hired first employee',
                quote: 'Within 2 months, it paid for itself. Now I focus on designing, not admin.',
                link: 'instagram.com/aminafashionke',
                color: '#10b981'
              },
              {
                name: 'Daniel Tesfaye',
                business: 'Coffee Export Trading',
                location: 'Addis Ababa, Ethiopia',
                photo: 'D',
                challenge: 'Communicating with international buyers across time zones',
                before: 'Missing messages at night, losing deals to faster competitors',
                after: 'AI handles initial inquiries 24/7, response time from 8 hours to 15 minutes',
                quote: 'I closed my biggest deal at 3am while I was sleeping. The AI qualified the lead perfectly.',
                link: 'linkedin.com/in/danieltesfaye',
                color: '#0066CC'
              },
            ].map(function(story, i) {
              return (
                <Reveal key={i} d={i * 0.1}>
                  <div style={{ background: '#f8fafc', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                          <div style={{ width: 48, height: 48, borderRadius: 12, background: story.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 20 }}>{story.photo}</div>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{story.name}</div>
                            <div style={{ fontSize: 14, color: '#64748b' }}>{story.business} · {story.location}</div>
                          </div>
                        </div>
                        <p style={{ fontSize: 15, color: '#374151', fontStyle: 'italic', lineHeight: 1.6 }}>"{story.quote}"</p>
                        <a href={'https://' + story.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#0066CC', marginTop: 8, display: 'inline-block' }}>Verify on {story.link.split('.com')[0]} →</a>
                      </div>
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>THE CHALLENGE</div>
                        <p style={{ fontSize: 14, color: '#374151', marginBottom: 16 }}>{story.challenge}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#dc2626', marginBottom: 4 }}>BEFORE</div>
                            <p style={{ fontSize: 13, color: '#374151' }}>{story.before}</p>
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>AFTER</div>
                            <p style={{ fontSize: 13, color: '#374151' }}>{story.after}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM SECTION ══════════ */}
      <section id="team" className="section-pad" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Meet the team</h2>
              <p style={{ fontSize: 18, color: '#64748b' }}>Real people building this. Not a faceless corporation.</p>
            </div>
          </Reveal>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <Reveal>
              <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0066CC, #00B4D8)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>Y</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Yitayal</div>
                <div style={{ fontSize: 14, color: '#0066CC', fontWeight: 600, marginBottom: 12 }}>Founder & CEO</div>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>
                  Real estate advisor turned fintech builder. Spent 5 years helping African businesses navigate payments and operations. Building WakilChat to solve problems I saw firsthand.
                </p>
                <a href="https://linkedin.com/in/yitayal" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#0066CC' }}>LinkedIn →</a>
              </div>
            </Reveal>

            <Reveal d={0.1}>
              <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e5e7eb', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 24, color: '#64748b' }}>+</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Join Us</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600, marginBottom: 12 }}>We're hiring</div>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>
                  We're small but growing. Looking for engineers, designers, and operators who want to build something meaningful for Africa.
                </p>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: '#0066CC' }}>careers@wakilchat.com →</a>
              </div>
            </Reveal>
          </div>

          <Reveal d={0.2}>
            <div style={{ marginTop: 32, background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                <strong>Transparency note:</strong> We're a small, bootstrapped team. We don't have a fancy office or millions in funding. We're building this because we believe African entrepreneurs deserve better tools.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ TRUST & COMPLIANCE ══════════ */}
      <section className="section-pad" style={{ padding: '60px 24px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Trust & Security</h3>
              <p style={{ fontSize: 15, color: '#64748b' }}>Real certifications, not marketing claims.</p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
            <Reveal>
              <div>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>256-bit Encryption</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>AES-256, TLS 1.3</div>
              </div>
            </Reveal>
            <Reveal d={0.05}>
              <div>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Public Status Page</div>
                <a href="https://status.wakilchat.com" style={{ fontSize: 13, color: '#0066CC' }}>status.wakilchat.com</a>
              </div>
            </Reveal>
            <Reveal d={0.1}>
              <div>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Compliance</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Working toward PCI DSS</div>
              </div>
            </Reveal>
          </div>

          <Reveal d={0.15}>
            <div style={{ marginTop: 32, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#92400e', margin: 0 }}>
                <strong>Honest note:</strong> We're working toward full PCI DSS certification. Currently, payments are processed through certified partners (Paystack, Flutterwave). <a href="/security" style={{ color: '#92400e', textDecoration: 'underline' }}>Read our security whitepaper →</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section id="contact" style={{ padding: '80px 24px', background: '#0066CC' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 16 }}>Ready to try it?</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>
              Start free. No credit card. No sales calls. Just sign up and try it.
            </p>
            <div className="stack-mobile" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/signup"><button style={{ padding: '16px 32px', borderRadius: 12, border: 'none', background: 'white', color: '#0066CC', fontSize: 16, fontWeight: 600, cursor: 'pointer' }} className="full-mobile">Start free →</button></Link>
              <a href="mailto:hello@wakilchat.com"><button style={{ padding: '16px 32px', borderRadius: 12, border: '2px solid white', background: 'transparent', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }} className="full-mobile">Email us</button></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: '#0f172a', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0066CC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <path d="M50,5 L55,8 L60,7 L68,12 L72,10 L78,15 L80,22 L82,28 L80,35 L78,40 L80,48 L78,55 L75,62 L70,68 L65,75 L60,80 L55,85 L50,90 L45,92 L38,88 L32,82 L28,75 L25,68 L22,60 L20,52 L22,45 L25,38 L28,32 L32,25 L38,18 L45,10 L50,5 Z" fill="white" />
                    <circle cx="45" cy="30" r="3" fill="#39FF14" />
                    <circle cx="55" cy="45" r="3" fill="#39FF14" />
                    <circle cx="40" cy="55" r="3" fill="#39FF14" />
                    <line x1="45" y1="30" x2="55" y2="45" stroke="#39FF14" strokeWidth="2" />
                    <line x1="55" y1="45" x2="40" y2="55" stroke="#39FF14" strokeWidth="2" />
                  </svg>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>WakilChat</span>
              </div>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, maxWidth: 280 }}>
                Built by African founders, for African entrepreneurs. Simple tools that just work.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16 }}>Product</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#features" style={{ fontSize: 14, color: '#94a3b8' }}>Features</a>
                <a href="#pricing" style={{ fontSize: 14, color: '#94a3b8' }}>Pricing</a>
                <a href="https://status.wakilchat.com" style={{ fontSize: 14, color: '#94a3b8' }}>Status</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16 }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#team" style={{ fontSize: 14, color: '#94a3b8' }}>Team</a>
                <a href="mailto:careers@wakilchat.com" style={{ fontSize: 14, color: '#94a3b8' }}>Careers</a>
                <a href="mailto:hello@wakilchat.com" style={{ fontSize: 14, color: '#94a3b8' }}>Contact</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16 }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="/privacy" style={{ fontSize: 14, color: '#94a3b8' }}>Privacy</a>
                <a href="/terms" style={{ fontSize: 14, color: '#94a3b8' }}>Terms</a>
                <a href="/security" style={{ fontSize: 14, color: '#94a3b8' }}>Security</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>© 2026 WakilChat. Built with honesty.</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>Based in Dubai · Serving Africa</span>
          </div>
        </div>
      </footer>

      {/* ══════════ CONTACT MODAL ══════════ */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={function() { setShowModal(false); }} />
          <div style={{ position: 'relative', background: 'white', borderRadius: 16, padding: 32, maxWidth: 400, width: '100%' }}>
            <button onClick={function() { setShowModal(false); }} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Get in touch</h3>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>We'll respond within 24 hours.</p>
            <form>
              <input type="email" placeholder="Your email" required style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginBottom: 12 }} />
              <textarea placeholder="How can we help?" rows={3} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginBottom: 16, fontFamily: 'inherit' }} />
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
