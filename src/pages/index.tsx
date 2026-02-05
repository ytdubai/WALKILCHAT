import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

var G = '#F5C542';
var BG = '#07070a';
var SF = '#0f0f13';
var BD = 'rgba(255,255,255,0.06)';
var TX = '#ededef';
var TD = '#7c7c84';
var GD = 'rgba(245,197,66,0.10)';
var GB = 'rgba(245,197,66,0.18)';

function useFade() {
  var ref = useRef(null);
  var s = useState(false);
  var vis = s[0];
  var setVis = s[1];
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setVis(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return { ref: ref, vis: vis };
}

function Fade(props) {
  var f = useFade();
  var d = props.delay || 0;
  return (
    <div ref={f.ref} style={{
      opacity: f.vis ? 1 : 0,
      transform: f.vis ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.65s ease ' + d + 's, transform 0.65s ease ' + d + 's',
    }}>
      {props.children}
    </div>
  );
}

function useCount(end) {
  var ref = useRef(null);
  var s = useState(0);
  var val = s[0];
  var setVal = s[1];
  var started = useState(false);
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) started[1](true);
    }, { threshold: 0.3 });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  useEffect(function () {
    if (!started[0]) return;
    var raf;
    var t0 = performance.now();
    function tick(now) {
      var p = Math.min((now - t0) / 2000, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return function () { cancelAnimationFrame(raf); };
  }, [started[0], end]);
  return { val: val, ref: ref };
}
export default function HomePage() {
  var ns = useState(false);
  var navSolid = ns[0];

  useEffect(function () {
    function onScroll() { ns[1](window.scrollY > 50); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () { window.removeEventListener('scroll', onScroll); };
  }, []);

  var c1 = useCount(50000);
  var c2 = useCount(12);
  var c3 = useCount(4);
  var c4 = useCount(99);

  var features = [
    { t: 'Unified Messaging', d: 'WhatsApp, Telegram, SMS — all conversations in one inbox. Never miss a customer again.', e: '💬' },
    { t: 'Free Voice & Video', d: 'Crystal-clear calls over data. No per-minute charges. Works on 2G networks across the continent.', e: '📞' },
    { t: 'AI Business Assistant', d: 'Answers customer questions 24/7, qualifies leads while you sleep, writes follow-ups in your voice.', e: '⚡' },
    { t: 'Revenue Dashboard', d: 'Track every payment, invoice, and expense. Know your numbers in real-time, not next quarter.', e: '📊' },
    { t: 'Marketplace', d: 'List products, accept orders, manage inventory. Your storefront — built right into the conversation.', e: '🌍' },
    { t: 'Bank-Grade Security', d: 'End-to-end encryption, scam detection, fraud monitoring. Your business data stays yours.', e: '🛡️' },
  ];

  var values = [
    ['Business Phone Line', '$30/mo'],
    ['CRM Software', '$50/mo'],
    ['AI Chatbot Service', '$99/mo'],
    ['Payment Processing', '$40/mo'],
    ['Analytics Dashboard', '$25/mo'],
    ['Marketing Automation', '$60/mo'],
  ];

  var testimonials = [
    { q: "I was juggling WhatsApp, Excel, and a notebook. WakilChat replaced all three. My customers think I hired an assistant.", n: 'Amina K.', r: 'Fashion Designer', l: 'Nairobi' },
    { q: "The AI handles 80% of my customer questions at night. I wake up to qualified leads ready to buy. It is like a 24-hour sales team.", n: 'Dawit T.', r: 'Real Estate Broker', l: 'Addis Ababa' },
    { q: "Free voice calls saved my business $200 a month. I talk to suppliers in Lagos without worrying about airtime.", n: 'Chidi O.', r: 'Electronics Trader', l: 'Lagos' },
  ];

  return (
    <>
      <Head>
        <title>WakilChat - Run Your Entire Business From One App</title>
        <meta name="description" content="Free calls, instant payments, AI assistant. The super app for African entrepreneurs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{font-family:'DM Sans',-apple-system,sans-serif;background:#07070a;color:#ededef;overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        ::selection{background:rgba(245,197,66,.25);color:#fff}
        @keyframes floatOrb{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-24px);opacity:.55}}
        @keyframes pulseRing{0%{transform:scale(.85);opacity:.7}100%{transform:scale(1.8);opacity:0}}
        .bg{display:inline-flex;align-items:center;gap:10px;background:#F5C542;color:#0a0a0a;padding:15px 34px;border-radius:60px;font-weight:700;font-size:15px;font-family:inherit;border:none;cursor:pointer;transition:transform .18s,box-shadow .18s;box-shadow:0 0 28px rgba(245,197,66,.25)}
        .bg:hover{transform:translateY(-2px);box-shadow:0 0 48px rgba(245,197,66,.4)}
        .bo{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#ededef;padding:15px 34px;border-radius:60px;font-weight:600;font-size:15px;font-family:inherit;border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:border-color .2s,background .2s}
        .bo:hover{border-color:rgba(245,197,66,.18);background:rgba(245,197,66,.10)}
        @media(max-width:768px){
          .hh{font-size:34px!important}
          .g3{grid-template-columns:1fr!important}
          .sr{flex-direction:column!important;gap:32px!important}
          .sr .dv{display:none!important}
          .cr{flex-direction:column!important;align-items:stretch!important}
          .cr .bg,.cr .bo{width:100%;justify-content:center}
          .mg{grid-template-columns:1fr!important}
          .vb{padding:24px!important}
          .fi{flex-direction:column!important;text-align:center;gap:24px!important}
        }
      `}</style>
      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:navSolid?'rgba(7,7,10,.88)':'transparent',backdropFilter:navSolid?'blur(16px)':'none',borderBottom:navSolid?'1px solid '+BD:'1px solid transparent',transition:'all .3s'}}>
        <div style={{maxWidth:1080,margin:'0 auto',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:28}}>🦁</span>
            <span style={{fontSize:21,fontWeight:700,letterSpacing:'-.02em'}}><span style={{color:G}}>Wakil</span>Chat</span>
          </Link>
          <div style={{display:'flex',alignItems:'center',gap:24}}>
            <Link href="/login" style={{color:TD,fontSize:14.5,fontWeight:500}}>Log in</Link>
            <Link href="/signup"><button className="bg" style={{padding:'10px 22px',fontSize:13.5}}>Get Started Free</button></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{position:'relative',paddingTop:152,paddingBottom:80,overflow:'hidden'}}>
        <div style={{position:'absolute',top:-240,left:'50%',transform:'translateX(-50%)',width:900,height:900,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,197,66,.07) 0%,transparent 65%)',animation:'floatOrb 9s ease-in-out infinite',pointerEvents:'none'}} />
        <div style={{position:'absolute',inset:0,opacity:.025,backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)',backgroundSize:'68px 68px',maskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',WebkitMaskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',pointerEvents:'none'}} />

        <div style={{maxWidth:780,margin:'0 auto',textAlign:'center',padding:'0 20px',position:'relative'}}>
          <Fade>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:GD,border:'1px solid '+GB,borderRadius:60,padding:'7px 16px',marginBottom:26,fontSize:12,fontWeight:600,color:G,letterSpacing:'.06em',textTransform:'uppercase'}}>
              <span style={{position:'relative',width:8,height:8,borderRadius:'50%',background:G,boxShadow:'0 0 8px '+G,display:'inline-block'}}>
                <span style={{position:'absolute',inset:-4,borderRadius:'50%',border:'1.5px solid '+G,animation:'pulseRing 2s ease-out infinite'}} />
              </span>
              Built for African entrepreneurs
            </div>
          </Fade>

          <Fade delay={0.07}>
            <h1 className="hh" style={{fontSize:58,fontWeight:700,lineHeight:1.08,letterSpacing:'-.04em',marginBottom:22}}>
              Run your entire <span style={{color:G,textShadow:'0 0 60px rgba(245,197,66,.15)'}}>business</span><br/>from one app
            </h1>
          </Fade>

          <Fade delay={0.14}>
            <p style={{fontSize:18,color:TD,lineHeight:1.6,maxWidth:500,margin:'0 auto 36px'}}>
              Free calls. Instant payments. AI assistant that works while you sleep. Replace five apps with one.
            </p>
          </Fade>

          <Fade delay={0.21}>
            <div className="cr" style={{display:'flex',justifyContent:'center',gap:14,marginBottom:16}}>
              <Link href="/signup"><button className="bg">Start Free Today →</button></Link>
              <Link href="#features"><button className="bo">See How It Works</button></Link>
            </div>
            <p style={{color:TD,fontSize:12.5}}>No credit card · Free forever · 60-second setup</p>
          </Fade>

          {/* MOCK DASHBOARD */}
          <Fade delay={0.32}>
            <div style={{marginTop:56,background:'linear-gradient(160deg,'+SF+',rgba(16,16,20,1))',border:'1px solid '+BD,borderRadius:18,padding:2,boxShadow:'0 40px 100px rgba(0,0,0,.55), 0 0 60px '+GD}}>
              <div style={{background:SF,borderRadius:16,padding:28,display:'flex',flexDirection:'column',gap:20}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',gap:7}}>
                    <div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}} />
                    <div style={{width:11,height:11,borderRadius:'50%',background:'#febc2e'}} />
                    <div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}} />
                  </div>
                  <div style={{color:TD,fontSize:12,background:'rgba(255,255,255,.04)',padding:'4px 14px',borderRadius:6}}>wakilchat.com/dashboard</div>
                  <div style={{width:40}} />
                </div>
                <div className="mg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
                  {[{l:'Revenue',v:'$12,480',c:'+23%'},{l:'Messages',v:'2,841',c:'+18%'},{l:'AI Saved',v:'127 hrs',c:'this month'}].map(function(s,i){
                    return (
                      <div key={i} style={{background:'rgba(255,255,255,.025)',borderRadius:12,padding:'18px 16px',border:'1px solid '+BD}}>
                        <div style={{color:TD,fontSize:11,textTransform:'uppercase',letterSpacing:'.07em',marginBottom:6}}>{s.l}</div>
                        <div style={{fontSize:22,fontWeight:700,color:TX,letterSpacing:'-.02em'}}>{s.v}</div>
                        <div style={{fontSize:11.5,color:G,marginTop:4}}>↑ {s.c}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{background:'rgba(255,255,255,.015)',borderRadius:12,padding:'18px 16px',border:'1px solid '+BD,height:100,display:'flex',alignItems:'flex-end',gap:5}}>
                  {[30,48,38,65,52,78,68,88,82,92,86,100].map(function(h,i){
                    return <div key={i} style={{flex:1,height:h+'%',background:'linear-gradient(180deg,'+G+' 0%,rgba(245,197,66,.15) 100%)',borderRadius:'3px 3px 0 0',opacity:0.5+i/20}} />;
                  })}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      {/* STATS */}
      <section style={{borderTop:'1px solid '+BD,borderBottom:'1px solid '+BD,background:'rgba(15,15,19,.5)'}}>
        <div style={{maxWidth:1080,margin:'0 auto',padding:'52px 20px'}}>
          <div className="sr" style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <div ref={c1.ref} style={{textAlign:'center',minWidth:120}}>
              <div style={{fontSize:44,fontWeight:700,color:G,letterSpacing:'-.04em',lineHeight:1}}>{c1.val.toLocaleString()}+</div>
              <div style={{color:TD,fontSize:12.5,marginTop:8,textTransform:'uppercase',letterSpacing:'.1em'}}>Active Businesses</div>
            </div>
            <div className="dv" style={{width:1,height:44,background:BD}} />
            <div ref={c2.ref} style={{textAlign:'center',minWidth:120}}>
              <div style={{fontSize:44,fontWeight:700,color:G,letterSpacing:'-.04em',lineHeight:1}}>{c2.val}+</div>
              <div style={{color:TD,fontSize:12.5,marginTop:8,textTransform:'uppercase',letterSpacing:'.1em'}}>African Countries</div>
            </div>
            <div className="dv" style={{width:1,height:44,background:BD}} />
            <div ref={c3.ref} style={{textAlign:'center',minWidth:120}}>
              <div style={{fontSize:44,fontWeight:700,color:G,letterSpacing:'-.04em',lineHeight:1}}>{c3.val}+</div>
              <div style={{color:TD,fontSize:12.5,marginTop:8,textTransform:'uppercase',letterSpacing:'.1em'}}>Hours Saved Daily</div>
            </div>
            <div className="dv" style={{width:1,height:44,background:BD}} />
            <div ref={c4.ref} style={{textAlign:'center',minWidth:120}}>
              <div style={{fontSize:44,fontWeight:700,color:G,letterSpacing:'-.04em',lineHeight:1}}>{c4.val}.9%</div>
              <div style={{color:TD,fontSize:12.5,marginTop:8,textTransform:'uppercase',letterSpacing:'.1em'}}>Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{maxWidth:1080,margin:'0 auto',padding:'96px 20px'}}>
        <Fade>
          <div style={{textAlign:'center',marginBottom:52}}>
            <p style={{color:G,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Everything you need</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em',marginBottom:14}}>Six apps. One platform. Zero friction.</h2>
            <p style={{color:TD,fontSize:16,maxWidth:480,margin:'0 auto',lineHeight:1.6}}>Every tool your business needs — messaging, payments, analytics, AI — unified in a single interface.</p>
          </div>
        </Fade>
        <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {features.map(function(f,i){
            return (
              <Fade key={i} delay={i*0.04}>
                <div style={{background:SF,border:'1px solid '+BD,borderRadius:16,padding:'30px 26px',transition:'all .25s',cursor:'default'}}>
                  <div style={{width:48,height:48,borderRadius:12,background:GD,border:'1px solid '+GB,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18,fontSize:24}}>{f.e}</div>
                  <h3 style={{color:TX,fontSize:17,fontWeight:600,marginBottom:8,letterSpacing:'-.01em'}}>{f.t}</h3>
                  <p style={{color:TD,fontSize:14.5,lineHeight:1.6}}>{f.d}</p>
                </div>
              </Fade>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{borderTop:'1px solid '+BD,borderBottom:'1px solid '+BD,background:SF}}>
        <div style={{maxWidth:1080,margin:'0 auto',padding:'96px 20px'}}>
          <Fade>
            <div style={{textAlign:'center',marginBottom:52}}>
              <p style={{color:G,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Get started in 3 steps</p>
              <h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>Up and running in 60 seconds</h2>
            </div>
          </Fade>
          <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {[
              {n:'01',t:'Sign Up Free',d:'Enter your phone number. No credit card, no forms, no friction. You are in.'},
              {n:'02',t:'Connect Your Channels',d:'Link WhatsApp, add your products, set up your AI assistant. One-tap setup for each.'},
              {n:'03',t:'Grow on Autopilot',d:'AI handles inquiries, payments flow in, dashboard tracks everything. You focus on what matters.'},
            ].map(function(s,i){
              return (
                <Fade key={i} delay={i*0.06}>
                  <div style={{padding:'28px 24px'}}>
                    <div style={{fontSize:48,fontWeight:700,color:G,opacity:.2,lineHeight:1,marginBottom:16,letterSpacing:'-.04em'}}>{s.n}</div>
                    <h3 style={{color:TX,fontSize:18,fontWeight:600,marginBottom:10}}>{s.t}</h3>
                    <p style={{color:TD,fontSize:14.5,lineHeight:1.6}}>{s.d}</p>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>
      {/* VALUE STACK */}
      <section style={{maxWidth:1080,margin:'0 auto',padding:'96px 20px'}}>
        <Fade>
          <div style={{textAlign:'center',marginBottom:44}}>
            <p style={{color:G,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>The math is simple</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>What you would normally pay vs. what you get</h2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div className="vb" style={{maxWidth:560,margin:'0 auto',background:SF,borderRadius:18,border:'1px solid '+BD,padding:36}}>
            {values.map(function(v,i){
              return (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid '+BD}}>
                  <span style={{color:TX,fontSize:15,display:'flex',alignItems:'center',gap:8}}>✓ {v[0]}</span>
                  <span style={{color:G,fontWeight:700,fontSize:15}}>{v[1]}</span>
                </div>
              );
            })}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 0 0'}}>
              <span style={{color:TD,fontSize:15}}>Total if bought separately</span>
              <span style={{color:TD,fontSize:19,fontWeight:700,textDecoration:'line-through'}}>$304/mo</span>
            </div>
            <div style={{marginTop:20,padding:'20px 24px',background:GD,border:'1px solid '+GB,borderRadius:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:G,fontSize:17,fontWeight:700}}>WakilChat</span>
              <span style={{color:G,fontSize:26,fontWeight:700}}>FREE</span>
            </div>
            <p style={{color:TD,fontSize:12.5,textAlign:'center',marginTop:14}}>Premium features from $2/mo · Cheaper than a cup of coffee</p>
          </div>
        </Fade>
      </section>

      {/* TESTIMONIALS */}
      <section style={{borderTop:'1px solid '+BD,borderBottom:'1px solid '+BD,background:SF}}>
        <div style={{maxWidth:1080,margin:'0 auto',padding:'96px 20px'}}>
          <Fade>
            <div style={{textAlign:'center',marginBottom:44}}>
              <p style={{color:G,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:14}}>Trusted across Africa</p>
              <h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>Entrepreneurs who made the switch</h2>
            </div>
          </Fade>
          <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {testimonials.map(function(t,i){
              return (
                <Fade key={i} delay={i*0.05}>
                  <div style={{background:BG,border:'1px solid '+BD,borderRadius:16,padding:'28px 24px',display:'flex',flexDirection:'column',gap:16,height:'100%'}}>
                    <div style={{color:G,fontSize:28,lineHeight:1}}>&ldquo;</div>
                    <p style={{color:TX,fontSize:15,lineHeight:1.65,fontStyle:'italic',flex:1}}>{t.q}</p>
                    <div>
                      <div style={{color:TX,fontWeight:600,fontSize:14}}>{t.n}</div>
                      <div style={{color:TD,fontSize:12.5,marginTop:2}}>{t.r} · {t.l}</div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:-280,left:'50%',transform:'translateX(-50%)',width:860,height:560,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,197,66,.07) 0%,transparent 60%)',pointerEvents:'none'}} />
        <div style={{maxWidth:1080,margin:'0 auto',padding:'96px 20px',textAlign:'center',position:'relative'}}>
          <Fade>
            <h2 style={{fontSize:40,fontWeight:700,letterSpacing:'-.03em',marginBottom:18}}>
              Your competitors will not wait.<br/><span style={{color:G}}>Why should you?</span>
            </h2>
            <p style={{color:TD,fontSize:17,maxWidth:440,margin:'0 auto 32px',lineHeight:1.6}}>
              Every day without WakilChat is leads lost, hours wasted, and money left on the table.
            </p>
            <Link href="/signup">
              <button className="bg" style={{fontSize:17,padding:'17px 40px'}}>Start Free - Takes 60 Seconds →</button>
            </Link>
            <p style={{color:TD,fontSize:12.5,marginTop:14}}>Join 50,000+ African entrepreneurs already growing with WakilChat</p>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid '+BD,padding:'40px 20px'}}>
        <div className="fi" style={{maxWidth:1080,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:24}}>🦁</span>
            <span style={{fontSize:18,fontWeight:700}}><span style={{color:G}}>Wakil</span>Chat</span>
          </div>
          <div style={{display:'flex',gap:28,flexWrap:'wrap'}}>
            {['About','Pricing','Help','Privacy','Terms'].map(function(l){
              return <Link key={l} href={'/'+l.toLowerCase()} style={{color:TD,fontSize:13.5}}>{l}</Link>;
            })}
          </div>
          <p style={{color:'rgba(255,255,255,.18)',fontSize:12}}>Made with conviction in Africa</p>
        </div>
      </footer>
    </>
  );
}
