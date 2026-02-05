import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

function useInView(threshold) {
  if (!threshold) threshold = 0.15;
  var ref = useRef(null);
  var s = useState(false);
  var inView = s[0];
  var setInView = s[1];
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: threshold });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return { ref: ref, inView: inView };
}

function useCounter(end, duration) {
  if (!duration) duration = 2200;
  var s = useState(0);
  var count = s[0];
  var setCount = s[1];
  var view = useInView(0.3);
  useEffect(function () {
    if (!view.inView) return;
    var raf;
    var t0 = performance.now();
    function step(now) {
      var p = Math.min((now - t0) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return function () { cancelAnimationFrame(raf); };
  }, [view.inView, end, duration]);
  return { count: count, ref: view.ref };
}

function Reveal(props) {
  var d = props.d || 0;
  var y = props.y || 36;
  var view = useInView(0.12);
  return (
    <div ref={view.ref} style={{
      opacity: view.inView ? 1 : 0,
      transform: view.inView ? 'translate3d(0,0,0)' : 'translate3d(0,' + y + 'px,0)',
      transition: 'all .8s cubic-bezier(.16,1,.3,1) ' + d + 's',
    }}>
      {props.children}
    </div>
  );
}

function FeatureCard(props) {
  var s = useState(false);
  var hov = s[0];
  var setHov = s[1];
  return (
    <div
      onMouseEnter={function () { setHov(true); }}
      onMouseLeave={function () { setHov(false); }}
      style={{
        padding: '32px 28px',
        borderRadius: 18,
        background: hov ? '#141414' : '#111111',
        border: '1px solid ' + (hov ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.06)'),
        transition: 'all .25s cubic-bezier(.16,1,.3,1)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? '0 20px 40px -10px rgba(0,0,0,.4)' : 'none',
      }}
    >
      <div style={{
        fontSize: 36, marginBottom: 20, width: 52, height: 52, borderRadius: 14,
        background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{props.icon}</div>
      <h3 style={{ fontSize: 36, fontWeight: 700, color: 'rgba(255,255,255,.95)', marginBottom: 8 }}>{props.title}</h3>
      <p style={{ fontSize: 19, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{props.desc}</p>
    </div>
  );
}

function Stat(props) {
  var c = useCounter(props.target, 2200);
  return (
    <div ref={c.ref} style={{ textAlign: 'center', minWidth: 100 }}>
      <div style={{
        fontSize: 60, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1,
        marginBottom: 8, color: '#EAB308',
      }}>
        {c.count.toLocaleString()}{props.suffix}
      </div>
      <div style={{ fontSize: 18, color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>{props.label}</div>
    </div>
  );
}

export default function HomePage() {
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];

  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <Head>
        <title>WakilChat — The Financial Infrastructure for African Businesses</title>
        <meta name="description" content="Accept payments, manage invoices, and grow your business with AI — all from one platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{font-family:'Inter',system-ui,sans-serif;background:#050505;color:rgba(255,255,255,.95);overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        ::selection{background:rgba(234,179,8,.3);color:#fff}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        .btn-primary{
          display:inline-flex;align-items:center;gap:10px;
          padding:14px 32px;border-radius:14px;border:none;cursor:pointer;
          font-family:inherit;font-weight:600;font-size:15px;
          background:#EAB308;color:#050505;
          box-shadow:0 1px 2px rgba(0,0,0,.3),0 0 0 1px rgba(234,179,8,.3);
          transition:all .2s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(234,179,8,.3),0 0 0 1px rgba(234,179,8,.5)}
        .btn-secondary{
          display:inline-flex;align-items:center;gap:10px;
          padding:14px 32px;border-radius:14px;cursor:pointer;
          font-family:inherit;font-weight:500;font-size:15px;
          background:rgba(255,255,255,.04);color:rgba(255,255,255,.95);
          border:1px solid rgba(255,255,255,.1);transition:all .2s;
        }
        .btn-secondary:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16)}
        @media(max-width:768px){
          .rg3{grid-template-columns:1fr !important}
          .rg2{grid-template-columns:1fr !important}
          .rfc{flex-direction:column !important}
          .htitle{font-size:34px !important}
          .rhide{display:none !important}
          .rfull{width:100% !important}
          .spad{padding-top:64px !important;padding-bottom:64px !important}
        }
        @media(max-width:480px){.htitle{font-size:28px !important}}
      `}</style>

      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:.018,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'}} />

      <header style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        background:scrolled ? 'rgba(5,5,5,.85)' : 'transparent',
        backdropFilter:scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom:scrolled ? '1px solid rgba(255,255,255,.06)' : '1px solid transparent',
        transition:'all .35s',
      }}>
        <nav style={{maxWidth:1200,margin:'0 auto',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',height:scrolled ? 64 : 72,transition:'height .35s'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:34,height:34,borderRadius:10,background:'#EAB308',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 20px rgba(234,179,8,.2)'}}>
              <span style={{color:'#050505',fontWeight:800,fontSize:16}}>W</span>
            </div>
            <span style={{fontSize:19,fontWeight:700,letterSpacing:'-.03em'}}>
              <span style={{color:'#EAB308'}}>Wakil</span><span>Chat</span>
            </span>
          </Link>
          <div className="rhide" style={{display:'flex',alignItems:'center',gap:8}}>
            <a href="#products" style={{padding:'8px 16px',fontSize:14,color:'rgba(255,255,255,.6)',fontWeight:500,borderRadius:8}}>Products</a>
            <a href="#pricing" style={{padding:'8px 16px',fontSize:14,color:'rgba(255,255,255,.6)',fontWeight:500,borderRadius:8}}>Pricing</a>
            <a href="#about" style={{padding:'8px 16px',fontSize:14,color:'rgba(255,255,255,.6)',fontWeight:500,borderRadius:8}}>Company</a>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <Link href="/login" className="rhide" style={{fontSize:14,color:'rgba(255,255,255,.6)',fontWeight:500}}>Sign in</Link>
            <Link href="/signup"><button className="btn-primary" style={{padding:'10px 22px',fontSize:14}}>Get started</button></Link>
          </div>
        </nav>
      </header>

      <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:'120px 32px 80px'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(234,179,8,.08) 0%,transparent 50%),radial-gradient(ellipse 60% 40% at 20% 60%,rgba(139,92,246,.04) 0%,transparent 50%),radial-gradient(ellipse 50% 50% at 80% 80%,rgba(34,211,238,.03) 0%,transparent 50%)'}} />
        <div style={{position:'absolute',inset:0,opacity:.03,backgroundImage:'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(ellipse 70% 50% at 50% 40%,black,transparent)',WebkitMaskImage:'radial-gradient(ellipse 70% 50% at 50% 40%,black,transparent)'}} />
        <div style={{position:'absolute',top:'15%',left:'10%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.06),transparent 70%)',animation:'float 8s ease-in-out infinite',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:'20%',right:'8%',width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,.05),transparent 70%)',animation:'float 10s ease-in-out infinite 2s',pointerEvents:'none'}} />

        <div style={{position:'relative',maxWidth:860,margin:'0 auto',textAlign:'center'}}>
          <Reveal d={0}>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'8px 18px',borderRadius:100,background:'rgba(234,179,8,.08)',border:'1px solid rgba(234,179,8,.18)',marginBottom:32}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#34D399',boxShadow:'0 0 10px #34D399',animation:'pulse-dot 2s ease-in-out infinite'}} />
              <span style={{fontSize:13,fontWeight:600,color:'#EAB308',letterSpacing:'.04em'}}>Trusted by 50,000+ African businesses</span>
            </div>
          </Reveal>

          <Reveal d={0.08}>
            <h1 className="htitle" style={{fontSize:64,fontWeight:800,lineHeight:1.06,letterSpacing:'-.045em',marginBottom:24,background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,.85) 40%,#FACC15 100%)',backgroundSize:'200% 200%',animation:'gradient-shift 8s ease infinite',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              The financial infrastructure for African businesses
            </h1>
          </Reveal>

          <Reveal d={0.16}>
            <p style={{fontSize:19,color:'rgba(255,255,255,.6)',lineHeight:1.65,maxWidth:540,margin:'0 auto 40px'}}>
              Accept payments, send money, manage invoices, and grow your business with AI — all from one platform.
            </p>
          </Reveal>

          <Reveal d={0.24}>
            <div className="rfc" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
              <Link href="/signup"><button className="btn-primary rfull" style={{fontSize:16,padding:'16px 36px'}}>Start for free →</button></Link>
              <Link href="#demo"><button className="btn-secondary rfull">Contact sales</button></Link>
            </div>
            <p style={{fontSize:13,color:'rgba(255,255,255,.4)'}}>Free forever · No credit card · 60 second setup</p>
          </Reveal>

          <Reveal d={0.38} y={50}>
            <div style={{marginTop:64,borderRadius:20,background:'linear-gradient(180deg,#111111,#0A0A0A)',border:'1px solid rgba(255,255,255,.06)',padding:3,boxShadow:'0 60px 120px -20px rgba(0,0,0,.7),0 0 80px rgba(234,179,8,.04)',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(234,179,8,.3),transparent)',animation:'shimmer 3s ease-in-out infinite'}} />
              <div style={{background:'#0A0A0A',borderRadius:17,padding:'24px 28px',display:'flex',flexDirection:'column',gap:18}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',gap:7}}>
                    <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57'}} />
                    <div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e'}} />
                    <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840'}} />
                  </div>
                  <div style={{color:'rgba(255,255,255,.4)',fontSize:12,background:'rgba(255,255,255,.06)',padding:'5px 16px',borderRadius:8,fontWeight:500}}>dashboard.wakilchat.com</div>
                  <div style={{width:48}} />
                </div>

                <div className="rg3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
                  <div style={{background:'#111111',borderRadius:14,padding:'20px 18px',border:'1px solid rgba(255,255,255,.06)'}}>
                    <div style={{fontSize:11,color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10,fontWeight:600}}>Total Revenue</div>
                    <div style={{fontSize:26,fontWeight:700,color:'rgba(255,255,255,.95)',letterSpacing:'-.02em',marginBottom:4}}>$48,290</div>
                    <div style={{fontSize:12,color:'#34D399',fontWeight:600}}>↗ +23.5%</div>
                  </div>
                  <div style={{background:'#111111',borderRadius:14,padding:'20px 18px',border:'1px solid rgba(255,255,255,.06)'}}>
                    <div style={{fontSize:11,color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10,fontWeight:600}}>Active Users</div>
                    <div style={{fontSize:26,fontWeight:700,color:'rgba(255,255,255,.95)',letterSpacing:'-.02em',marginBottom:4}}>12,841</div>
                    <div style={{fontSize:12,color:'#EAB308',fontWeight:600}}>↗ +18.2%</div>
                  </div>
                  <div style={{background:'#111111',borderRadius:14,padding:'20px 18px',border:'1px solid rgba(255,255,255,.06)'}}>
                    <div style={{fontSize:11,color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10,fontWeight:600}}>AI Resolved</div>
                    <div style={{fontSize:26,fontWeight:700,color:'rgba(255,255,255,.95)',letterSpacing:'-.02em',marginBottom:4}}>94.7%</div>
                    <div style={{fontSize:12,color:'#22D3EE',fontWeight:600}}>↗ +5.1%</div>
                  </div>
                </div>

                <div style={{background:'#111111',borderRadius:14,padding:'20px 18px 14px',border:'1px solid rgba(255,255,255,.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                    <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,.95)'}}>Revenue Overview</span>
                    <div style={{display:'flex',gap:6}}>
                      <span style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:'transparent',color:'rgba(255,255,255,.4)',fontWeight:600}}>1W</span>
                      <span style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:'rgba(234,179,8,.12)',color:'#EAB308',fontWeight:600}}>1M</span>
                      <span style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:'transparent',color:'rgba(255,255,255,.4)',fontWeight:600}}>3M</span>
                      <span style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:'transparent',color:'rgba(255,255,255,.4)',fontWeight:600}}>1Y</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 500 100" style={{width:'100%',height:80}}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EAB308" stopOpacity=".25" />
                        <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,42 C210,24 240,35 270,20 C300,15 330,25 360,18 C390,12 420,22 450,10 C470,6 490,8 500,5 L500,100 L0,100 Z" fill="url(#cg)" />
                    <path d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,42 C210,24 240,35 270,20 C300,15 330,25 360,18 C390,12 420,22 450,10 C470,6 490,8 500,5" fill="none" stroke="#EAB308" strokeWidth="2" />
                    <circle cx="450" cy="10" r="4" fill="#EAB308"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" /></circle>
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{borderTop:'1px solid rgba(255,255,255,.06)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:'40px 32px',background:'#0A0A0A'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:13,color:'rgba(255,255,255,.4)',marginBottom:24,fontWeight:500,letterSpacing:'.04em',textTransform:'uppercase'}}>Integrated with leading African payment platforms</p>
          <div className="rfc" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:40,opacity:.4}}>
            <span style={{fontSize:16,fontWeight:600}}>M-Pesa</span>
            <span style={{fontSize:16,fontWeight:600}}>Telebirr</span>
            <span style={{fontSize:16,fontWeight:600}}>Paystack</span>
            <span style={{fontSize:16,fontWeight:600}}>Flutterwave</span>
            <span style={{fontSize:16,fontWeight:600}}>MTN MoMo</span>
          </div>
        </div>
      </section>

      <section className="spad" style={{padding:'96px 32px'}}>
        <div className="rg2" style={{maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:32,textAlign:'center'}}>
          <Reveal d={0}><Stat target={50000} suffix="+" label="Businesses" /></Reveal>
          <Reveal d={0.06}><Stat target={35} suffix="+" label="Countries" /></Reveal>
          <Reveal d={0.12}><Stat target={99} suffix=".9%" label="Uptime" /></Reveal>
          <Reveal d={0.18}><Stat target={2} suffix="M+" label="Transactions" /></Reveal>
        </div>
      </section>

      <section id="products" className="spad" style={{padding:'96px 32px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <Reveal>
            <div style={{maxWidth:560,marginBottom:64}}>
              <p style={{fontSize:13,fontWeight:600,color:'#EAB308',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Products</p>
              <h2 style={{fontSize:40,fontWeight:800,letterSpacing:'-.035em',lineHeight:1.1,marginBottom:16}}>Everything your business needs</h2>
              <p style={{fontSize:17,color:'rgba(255,255,255,.6)',lineHeight:1.65}}>One platform for payments, messaging, AI, and growth.</p>
            </div>
          </Reveal>
          <div className="rg3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            <Reveal d={0}><FeatureCard icon="" title="Unified Messaging" desc="WhatsApp, Telegram, and SMS in one inbox. AI handles first response, you close the deal." /></Reveal>
            <Reveal d={0.05}><FeatureCard icon="" title="Free Voice & Video" desc="Crystal-clear calls over data. Zero per-minute charges. Works across 2G and 3G networks." /></Reveal>
            <Reveal d={0.1}><FeatureCard icon="" title="AI Assistant" desc="Qualifies leads, answers FAQs, and drafts follow-ups 24/7 — trained on your business." /></Reveal>
            <Reveal d={0.15}><FeatureCard icon="�" title="Revenue Dashboard" desc="Real-time financials. Every payment, invoice, and expense tracked automatically." /></Reveal>
            <Reveal d={0.2}><FeatureCard icon="�" title="Marketplace" desc="List products, take orders, manage inventory. Your storefront inside the conversation." /></Reveal>
            <Reveal d={0.25}><FeatureCard icon="" title="Bank-Grade Security" desc="End-to-end encryption, scam detection, and fraud monitoring built into every layer." /></Reveal>
          </div>
        </div>
      </section>

      <section className="spad" style={{padding:'96px 32px',borderTop:'1px solid rgba(255,255,255,.06)',borderBottom:'1px solid rgba(255,255,255,.06)',background:'#0A0A0A'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="rg2 rfc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
            <Reveal>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:'#EAB308',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Why WakilChat</p>
                <h2 style={{fontSize:38,fontWeight:800,letterSpacing:'-.035em',lineHeight:1.12,marginBottom:20}}>Replace $304/mo in tools with one free platform</h2>
                <p style={{fontSize:16,color:'rgba(255,255,255,.6)',lineHeight:1.65,marginBottom:32}}>Every tool your competitors pay hundreds for — unified in WakilChat. Free to start, scales with you.</p>
                <Link href="/signup"><button className="btn-primary">Start for free →</button></Link>
              </div>
            </Reveal>
            <Reveal d={0.1}>
              <div style={{background:'#111111',borderRadius:20,border:'1px solid rgba(255,255,255,.06)',padding:32,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(234,179,8,.22),transparent)'}} />
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ Business Phone Line</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$30/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ CRM Software</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$50/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ AI Chatbot Service</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$99/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ Payment Processing</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$40/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ Analytics Dashboard</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$25/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'13px 0'}}><span style={{fontSize:14.5,color:'rgba(255,255,255,.6)'}}>✓ Marketing Automation</span><span style={{fontSize:14,color:'rgba(255,255,255,.4)',fontWeight:600}}>$60/mo</span></div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:16,marginTop:8}}>
                  <span style={{fontSize:15,color:'rgba(255,255,255,.4)'}}>Total separately</span>
                  <span style={{fontSize:18,color:'rgba(255,255,255,.4)',fontWeight:700,textDecoration:'line-through'}}>$304/mo</span>
                </div>
                <div style={{marginTop:16,padding:'18px 22px',borderRadius:14,background:'rgba(234,179,8,.08)',border:'1px solid rgba(234,179,8,.22)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:16,fontWeight:700,color:'#EAB308'}}>WakilChat</span>
                  <span style={{fontSize:28,fontWeight:800,color:'#EAB308'}}>FREE</span>
                </div>
                <p style={{fontSize:12,color:'rgba(255,255,255,.4)',textAlign:'center',marginTop:12}}>Premium from $2/mo · Cancel anytime</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="spad" style={{padding:'96px 32px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <Reveal>
            <div style={{textAlign:'center',marginBottom:56}}>
              <p style={{fontSize:13,fontWeight:600,color:'#EAB308',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Loved by entrepreneurs</p>
              <h2 style={{fontSize:38,fontWeight:800,letterSpacing:'-.035em'}}>Built for Africa. Proven by thousands.</h2>
            </div>
          </Reveal>
          <div className="rg3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            <Reveal d={0}>
              <div style={{background:'#111111',border:'1px solid rgba(255,255,255,.06)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column',height:'100%'}}>
                <div style={{marginBottom:16,color:'#EAB308'}}>★★★★★</div>
                <p style={{fontSize:15,color:'rgba(255,255,255,.95)',lineHeight:1.65,flex:1,marginBottom:20}}>&quot;I was juggling WhatsApp, Excel, and a notebook. WakilChat replaced all three. Customers think I hired a team.&quot;</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'#34D399',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:15,color:'#050505'}}>A</div>
                  <div><div style={{fontSize:14,fontWeight:600}}>Amina K.</div><div style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>Fashion Designer · Nairobi</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal d={0.06}>
              <div style={{background:'#111111',border:'1px solid rgba(255,255,255,.06)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column',height:'100%'}}>
                <div style={{marginBottom:16,color:'#EAB308'}}>★★★★★</div>
                <p style={{fontSize:15,color:'rgba(255,255,255,.95)',lineHeight:1.65,flex:1,marginBottom:20}}>&quot;The AI handles 80% of customer questions overnight. I wake up to qualified leads ready to buy.&quot;</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'#EAB308',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:15,color:'#050505'}}>D</div>
                  <div><div style={{fontSize:14,fontWeight:600}}>Dawit T.</div><div style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>Real Estate Broker · Addis Ababa</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal d={0.12}>
              <div style={{background:'#111111',border:'1px solid rgba(255,255,255,.06)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column',height:'100%'}}>
                <div style={{marginBottom:16,color:'#EAB308'}}>★★★★★</div>
                <p style={{fontSize:15,color:'rgba(255,255,255,.95)',lineHeight:1.65,flex:1,marginBottom:20}}>&quot;Free calls saved $200 a month. I talk to suppliers in Lagos without worrying about airtime ever again.&quot;</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'#22D3EE',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:15,color:'#050505'}}>C</div>
                  <div><div style={{fontSize:14,fontWeight:600}}>Chidi O.</div><div style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>Electronics Trader · Lagos</div></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{position:'relative',overflow:'hidden',borderTop:'1px solid rgba(255,255,255,.06)'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 50% at 50% 100%,rgba(234,179,8,.06),transparent)',pointerEvents:'none'}} />
        <div className="spad" style={{padding:'96px 32px',maxWidth:700,margin:'0 auto',textAlign:'center',position:'relative'}}>
          <Reveal>
            <h2 style={{fontSize:44,fontWeight:800,letterSpacing:'-.04em',lineHeight:1.1,marginBottom:20}}>
              Ready to grow your <span style={{color:'#EAB308'}}>business?</span>
            </h2>
            <p style={{fontSize:18,color:'rgba(255,255,255,.6)',lineHeight:1.6,maxWidth:460,margin:'0 auto 36px'}}>
              Join 50,000+ African entrepreneurs who run their entire business from one app.
            </p>
            <div className="rfc" style={{display:'flex',justifyContent:'center',gap:14,marginBottom:16}}>
              <Link href="/signup"><button className="btn-primary rfull" style={{fontSize:16,padding:'16px 36px'}}>Get started free →</button></Link>
              <Link href="#demo"><button className="btn-secondary rfull">Talk to sales</button></Link>
            </div>
            <p style={{fontSize:13,color:'rgba(255,255,255,.4)'}}>Free forever · No credit card · 60 second setup</p>
          </Reveal>
        </div>
      </section>

      <footer style={{borderTop:'1px solid rgba(255,255,255,.06)',background:'#0A0A0A',padding:'64px 32px 40px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="rg2 rfc" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:40,marginBottom:48}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <div style={{width:30,height:30,borderRadius:8,background:'#EAB308',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{color:'#050505',fontWeight:800,fontSize:14}}>W</span>
                </div>
                <span style={{fontSize:17,fontWeight:700}}><span style={{color:'#EAB308'}}>Wakil</span>Chat</span>
              </div>
              <p style={{fontSize:14,color:'rgba(255,255,255,.4)',lineHeight:1.6,maxWidth:260}}>The financial infrastructure powering African businesses.</p>
            </div>
            <div>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:16}}>Products</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Payments</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Messaging</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>AI Assistant</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Marketplace</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:16}}>Company</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>About</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Careers</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Blog</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:16}}>Resources</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Documentation</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>API</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Help Center</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:16}}>Legal</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Privacy</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Terms</a>
                <a href="#" style={{fontSize:13.5,color:'rgba(255,255,255,.4)'}}>Cookies</a>
              </div>
            </div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
            <span style={{fontSize:13,color:'rgba(255,255,255,.4)'}}>© 2026 WakilChat. All rights reserved.</span>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <span style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>� 256-bit encryption</span>
              <span style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
