import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef, CSSProperties, ReactNode } from 'react';
/* ═══════════════════════════════════════════════════════════════
WAKILCHAT — The Billion-Dollar Homepage
Plaid × Stripe × Cash App level fintech aesthetic
═══════════════════════════════════════════════════════════════ */
/* ─── HOOKS ─── */
function useInView(opts = { threshold: 0.15, once: true }) {
const ref = useRef<HTMLDivElement>(null);
const [inView, setInView] = useState(false);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(([e]) => {
if (e.isIntersecting) { setInView(true); if (opts.once) obs.disconnect(); }
}, { threshold: opts.threshold });
obs.observe(el);
return () => obs.disconnect();
}, []);
return { ref, inView };
}
function useAnimatedCounter(end: number, duration = 2200) {
const [count, setCount] = useState(0);
const { ref, inView } = useInView({ threshold: 0.3, once: true });
useEffect(() => {
if (!inView) return;
let raf: number;
const t0 = performance.now();
const step = (now: number) => {
const p = Math.min((now - t0) / duration, 1);
const ease = 1 - Math.pow(1 - p, 4);
setCount(Math.floor(ease * end));
if (p < 1) raf = requestAnimationFrame(step);
};
raf = requestAnimationFrame(step);
return () => cancelAnimationFrame(raf);
}, [inView, end, duration]);
return { count, ref };
}
function useMouseGlow() {
const ref = useRef<HTMLDivElement>(null);
useEffect(() => {
const el = ref.current;
if (!el) return;
const move = (e: MouseEvent) => {
const rect = el.getBoundingClientRect();
el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
el.addEventListener('mousemove', move);
return () => el.removeEventListener('mousemove', move);
}, []);
return ref;
}

function R({ children, d = 0, y = 36, s }: { children: ReactNode; d?: number; y?: number; s?: CSSProperties }) {
  const { ref, inView } = useInView();
  return (const heroGlow = useMouseGlow();
useEffect(() => {
setMounted(true);
const fn = () => setScrolled(window.scrollY > 40);
window.addEventListener('scroll', fn, { passive: true });
return () => window.removeEventListener('scroll', fn);
}, []);
return (
<>
<Head>
<title>WakilChat — The Financial Infrastructure for African Businesses</title>
<meta name="description" content="Accept payments, manage invoices, and grow your bus
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;8
</Head>
<style jsx global>{`
:root {
--gold: #EAB308;
--gold-light: #FACC15;
--gold-dim: rgba(234,179,8,0.12);
--gold-border: rgba(234,179,8,0.22);
--emerald: #34D399;
--violet: #8B5CF6;
--cyan: #22D3EE;
--bg: #050505;
--surface: #0A0A0A;
--elevated: #111111;
--card: #161616;
--t1: rgba(255,255,255,0.95);
--t2: rgba(255,255,255,0.65);
--t3: rgba(255,255,255,0.40);
--b1: rgba(255,255,255,0.06);
--b2: rgba(255,255,255,0.10);
--b3: rgba(255,255,255,0.16);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothin
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:var(--bg);colo
a{text-decoration:none;color:inherit}
::selection{background:rgba(234,179,8,.3);color:#fff}
.tabular{font-variant-numeric:tabular-nums}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin-slow{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100%
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes glow-pulse{0%,100%{opacity:.5}50%{opacity:1}}
.btn-primary{
display:inline-flex;align-items:center;gap:10px;
padding:14px 32px;border-radius:14px;border:none;cursor:pointer;
font-family:inherit;font-weight:600;font-size:15px;
background:var(--gold);color:#050505;
box-shadow:0 1px 2px rgba(0,0,0,.3),0 0 0 1px rgba(234,179,8,.3),inset 0 1px transition:all .2s cubic-bezier(.16,1,.3,1);
0 rgba
position:relative;overflow:hidden;
}
.btn-primary::after{
content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
transition:left .5s;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(234,179,8,.3
.btn-primary:hover::after{left:100%}
.btn-primary:active{transform:translateY(0)}
.btn-secondary{
display:inline-flex;align-items:center;gap:10px;
padding:14px 32px;border-radius:14px;cursor:pointer;
font-family:inherit;font-weight:500;font-size:15px;
background:rgba(255,255,255,.04);color:var(--t1);
border:1px solid var(--b2);
transition:all .2s;
}
.btn-secondary:hover{background:rgba(255,255,255,.08);border-color:var(--b3)}
@media(max-width:768px){
.resp-grid-3{grid-template-columns:1fr!important}
.resp-grid-2{grid-template-columns:1fr!important}
.resp-flex-col{flex-direction:column!important}
.resp-text-center{text-align:center!important}
.hero-title{font-size:38px!important}
.resp-hide{display:none!important}
.resp-full{width:100%!important}
.resp-gap-sm{gap:12px!important}
.section-pad{padding-top:64px!important;padding-bottom:64px!important}
.resp-px{padding-left:20px!important;padding-right:20px!important}
}
@media(max-width:480px){
.hero-title{font-size:30px!important}
}
`}</style>
{/* ═══ GRAIN TEXTURE ═══ */}
<div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:.018,bac
{/* ═══════════ NAVBAR ═══════════ */}
<header style={{
position:'fixed',top:0,left:0,right:0,zIndex:100,
background:scrolled?'rgba(5,5,5,.85)':'transparent',
backdropFilter:scrolled?'blur(20px) saturate(1.5)':'none',
borderBottom:scrolled?'1px solid var(--b1)':'1px solid transparent',
transition:'all .35s cubic-bezier(.16,1,.3,1)',
}}>
<nav style={{maxWidth:1200,margin:'0 auto',padding:'0 32px',display:'flex',alignItems
<Link href="/" style={{display:'flex',alignItems:'center',gap:10}}>
<div style={{width:34,height:34,borderRadius:10,background:'var(--gold)',display:
<span style={{color:'#050505',fontWeight:800,fontSize:16,lineHeight:1}}>W</span
</div>
<span style={{fontSize:19,fontWeight:700,letterSpacing:'-.03em'}}>
<span style={{color:'var(--gold)'}}>Wakil</span><span style={{color:'var(--t1)'
</span>
</Link>
<div className="resp-hide" style={{display:'flex',alignItems:'center',gap:8}}>
{['Products','Solutions','Pricing','Company'].map(item=>(
<a key={item} href={`#${item.toLowerCase()}`} style={{padding:'8px 16px',fontSi
onMouseEnter={e=>{(e.target as HTMLElement).style.color='var(--t1)';(e.target
onMouseLeave={e=>{(e.target as HTMLElement).style.color='var(--t2)';(e.target
>{item}</a>
))}
</div>
<div style={{display:'flex',alignItems:'center',gap:16}}>
<Link href="/login" className="resp-hide" style={{fontSize:14,color:'var(--t2)',f
onMouseEnter={e=>(e.target as HTMLElement).style.color='var(--t1)'}
onMouseLeave={e=>(e.target as HTMLElement).style.color='var(--t2)'}
>Sign in</Link>
<Link href="/signup"><button className="btn-primary" style={{padding:'10px </div>
</nav>
</header>
22px',
{/* ═══════════ HERO ═══════════ */}
<section ref={heroGlow} style={{position:'relative',minHeight:'100vh',display:'flex',al
{/* Animated mesh gradient background */}
<div style={{
position:'absolute',inset:0,
background:`
radial-gradient(ellipse 80% 60% at 50% 0%, rgba(234,179,8,.08) 0%, transparent 50
radial-gradient(ellipse 60% 40% at 20% 60%, rgba(139,92,246,.04) 0%, transparent
radial-gradient(ellipse 50% 50% at 80% 80%, rgba(34,211,238,.03) 0%, transparent
`,
}}/>
{/* Interactive mouse glow */}
<div style={{
position:'absolute',
width:600,height:600,borderRadius:'50%',
background:'radial-gradient(circle,rgba(234,179,8,.06) 0%,transparent 70%)',
left:'var(--mx,50%)',top:'var(--my,50%)',
transform:'translate(-50%,-50%)',
pointerEvents:'none',transition:'left .3s ease-out,top .3s ease-out',
}}/>
{/* Subtle grid */}
<div style={{
position:'absolute',inset:0,opacity:.03,
backgroundImage:'linear-gradient(var(--b1) 1px,transparent 1px),linear-gradient(90d
backgroundSize:'64px 64px',
maskImage:'radial-gradient(ellipse 70% 50% at 50% 40%,black,transparent)',
WebkitMaskImage:'radial-gradient(ellipse 70% 50% at 50% 40%,black,transparent)',
}}/>
{/* Floating orbs */}
<div style={{position:'absolute',top:'15%',left:'10%',width:300,height:300,borderRadi
<div style={{position:'absolute',bottom:'20%',right:'8%',width:250,height:250,borderR
<div style={{position:'relative',maxWidth:860,margin:'0 auto',textAlign:'center'}}>
{/* Live badge */}
<R d={0}>
<div style={{
display:'inline-flex',alignItems:'center',gap:10,
padding:'8px 18px',borderRadius:100,
background:'rgba(234,179,8,.08)',border:'1px solid rgba(234,179,8,.18)',
marginBottom:32,
}}>
<span style={{width:7,height:7,borderRadius:'50%',background:'var(--emerald)',b
<span style={{fontSize:13,fontWeight:600,color:'var(--gold)',letterSpacing:'.04
</div>
</R>
{/* Headline */}
<R d={.08}>
<h1 className="hero-title" style={{
fontSize:64,fontWeight:800,lineHeight:1.06,letterSpacing:'-.045em',
marginBottom:24,
background:'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,.85) 40%, var(
backgroundSize:'200% 200%',
animation:'gradient-shift 8s ease infinite',
WebkitBackgroundClip:'text',
WebkitTextFillColor:'transparent',
backgroundClip:'text',
}}>
The financial infrastructure
<br/>for African businesses
</h1>
</R>
{/* Subheadline */}
<R d={.16}>
<p style={{fontSize:19,color:'var(--t2)',lineHeight:1.65,maxWidth:540,margin:'0 a
Accept payments, send money, manage invoices, and grow your business with AI —
</p>
</R>
{/* CTAs */}
<R d={.24}>
<div className="resp-flex-col resp-gap-sm" style={{display:'flex',alignItems:'cen
<Link href="/signup"><button className="btn-primary resp-full" style={{fontSize
Start for free
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentCo
</button></Link>
<Link href="#demo"><button className="btn-secondary resp-full">Contact sales</b
</div>
<p style={{fontSize:13,color:'var(--t3)'}}>Free forever &middot; No credit </R>
card r
{/* ─── HERO DASHBOARD VISUAL ─── */}
<R d={.38} y={50}>
<div style={{
marginTop:64,borderRadius:20,
background:'linear-gradient(180deg,var(--elevated) 0%,var(--surface) 100%)',
border:'1px solid var(--b1)',
padding:3,
boxShadow:'0 60px 120px -20px rgba(0,0,0,.7), 0 0 0 1px var(--b1), 0 0 80px rgb
position:'relative',overflow:'hidden',
}}>
{/* Shimmer effect on card */}
<div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'line
<div style={{background:'var(--surface)',borderRadius:17,padding:'24px 28px',di
{/* Window bar */}
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between
<div style={{display:'flex',gap:7}}>
<div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57'}}
<div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e'}}
<div style={{width:12,height:12,borderRadius:'50%',background:'#28c840'}}
</div>
<div style={{color:'var(--t3)',fontSize:12,background:'var(--b1)',padding:'
<div style={{width:48}}/>
</div>
{/* Metric cards */}
<div className="resp-grid-3" style={{display:'grid',gridTemplateColumns:'repe
{[
{label:'Total Revenue',value:'$48,290',change:'+23.5%',color:'var(--emera
{label:'Active Users',value:'12,841',change:'+18.2%',color:'var(--gold)',
{label:'AI Resolved',value:'94.7%',change:'+5.1%',color:'var(--cyan)',ico
].map((m,i)=>(
<div key={i} style={{
background:'var(--elevated)',borderRadius:14,padding:'20px 18px',
border:'1px solid var(--b1)',
transition:'border-color .2s',
}}>
<div style={{fontSize:11,color:'var(--t3)',textTransform:'uppercase',le
<div className="tabular" style={{fontSize:26,fontWeight:700,color:'var(
<div style={{fontSize:12,color:m.color,fontWeight:600,display:'flex',al
<span>{m.icon}</span>{m.change}
</div>
</div>
))}
</div>
{/* Chart area */}
<div style={{background:'var(--elevated)',borderRadius:14,padding:'20px 18px
<div style={{display:'flex',justifyContent:'space-between',alignItems:'cent
<span style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>Revenue Over
<div style={{display:'flex',gap:6}}>
{['1W','1M','3M','1Y'].map((p,i)=>(
<span key={p} style={{fontSize:11,padding:'4px 10px',borderRadius:6,b
))}
</div>
</div>
{/* SVG Chart */}
<svg viewBox="0 0 500 100" style={{width:'100%',height:80}}>
<defs>
<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="var(--gold)" stopOpacity=".25"/>
<stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
</linearGradient>
</defs>
<path d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,42 C210,24 240,35 27
<path d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,42 C210,24 240,35 27
<circle cx="450" cy="10" r="4" fill="var(--gold)">
<animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="
</circle>
</svg>
</div>
</div>
</div>
</R>
</div>
</section>
{/* ═══════════ LOGOS / TRUST BAR ═══════════ */}
<section style={{borderTop:'1px solid var(--b1)',borderBottom:'1px solid var(--b1)',pad
<div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
<p style={{fontSize:13,color:'var(--t3)',marginBottom:24,fontWeight:500,letterSpaci
<div className="resp-flex-col" style={{display:'flex',alignItems:'center',justifyCo
{['M-Pesa','Telebirr','Paystack','Flutterwave','MTN MoMo'].map(name=>(
<span key={name} style={{fontSize:16,fontWeight:600,color:'var(--t1)',letterSpa
))}
</div>
</div>
</section>
{/* ═══════════ STATS ═══════════ */}
<section className="section-pad" style={{padding:'96px 32px'}}>
<div className="resp-grid-2 resp-flex-col" style={{maxWidth:1000,margin:'0 auto',disp
{[
{n:50000,s:'+',l:'Businesses'},
{n:35,s:'+',l:'Countries'},
{n:99,s:'.9%',l:'Uptime'},
{n:2,s:'M+',l:'Transactions'},
].map((stat,i)=>{
const {count,ref} = useAnimatedCounter(stat.n);
return (
<R key={i} d={i*.06}>
<div ref={ref}>
<div className="tabular" style={{fontSize:48,fontWeight:800,letterSpacing:'
background:'linear-gradient(135deg,var(--gold-light),var(--gold))',Webkit
}}>{count.toLocaleString()}{stat.s}</div>
<div style={{fontSize:14,color:'var(--t3)',fontWeight:500}}>{stat.l}</div>
</div>
</R>
);
})}
</div>
</section>
{/* ═══════════ FEATURES ═══════════ */}
<section id="products" className="section-pad" style={{padding:'96px 32px'}}>
<div style={{maxWidth:1100,margin:'0 auto'}}>
<R>
<div className="resp-text-center" style={{maxWidth:560,marginBottom:64}}>
<p style={{fontSize:13,fontWeight:600,color:'var(--gold)',textTransform:'upperc
<h2 style={{fontSize:40,fontWeight:800,letterSpacing:'-.035em',lineHeight:1.1,m
<p style={{fontSize:17,color:'var(--t2)',lineHeight:1.65}}>One platform for pay
</div>
</R>
<div className="resp-grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1
{[
{icon:' ',title:'Unified Messaging',desc:'WhatsApp, Telegram, and SMS in one i
{icon:' ',title:'Free Voice & Video',desc:'Crystal-clear calls over data. Zero
{icon:' ',title:'AI Assistant',desc:'Qualifies leads, answers FAQs, and drafts
{icon:' ',title:'Revenue Dashboard',desc:'Real-time financials. Every payment,
{icon:' ',title:'Marketplace',desc:'List products, take orders, manage invento
{icon:' ',title:'Bank-Grade Security',desc:'End-to-end encryption, scam detect
].map((f,i)=>(
<R key={i} d={i*.05}>
<div style={{
padding:'32px 28px',borderRadius:18,
background:'var(--elevated)',border:'1px solid var(--b1)',
transition:'all .25s cubic-bezier(.16,1,.3,1)',
cursor:'default',position:'relative',overflow:'hidden',
}}
onMouseEnter={e=>{
const el = e.currentTarget;
el.style.borderColor='var(--b3)';
el.style.transform='translateY(-4px)';
el.style.boxShadow=`0 20px 40px -10px rgba(0,0,0,.4)`;
}}
onMouseLeave={e=>{
const el = e.currentTarget;
el.style.borderColor='var(--b1)';
el.style.transform='translateY(0)';
el.style.boxShadow='none';
}}
>
<div style={{fontSize:28,marginBottom:20,width:52,height:52,borderRadius:14
<h3 style={{fontSize:17,fontWeight:700,color:'var(--t1)',marginBottom:8,let
<p style={{fontSize:14.5,color:'var(--t2)',lineHeight:1.6}}>{f.desc}</p>
</div>
</R>
))}
</div>
</div>
</section>
{/* ═══════════ VALUE STACK ═══════════ */}
<section className="section-pad" style={{padding:'96px 32px',borderTop:'1px solid var(-
<div style={{maxWidth:1100,margin:'0 auto'}}>
<div className="resp-grid-2 resp-flex-col" style={{display:'grid',gridTemplateColum
{/* Left — copy */}
<R>
<div>
<p style={{fontSize:13,fontWeight:600,color:'var(--gold)',textTransform:'uppe
<h2 style={{fontSize:38,fontWeight:800,letterSpacing:'-.035em',lineHeight:1.1
<p style={{fontSize:16,color:'var(--t2)',lineHeight:1.65,marginBottom:32}}>Ev
<Link href="/signup"><button className="btn-primary">Start for free <svg widt
</div>
</R>
{/* Right — price stack */}
<R d={.1}>
<div style={{background:'var(--elevated)',borderRadius:20,border:'1px solid var
<div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'li
{[
{item:'Business Phone Line',price:'$30/mo'},
{item:'CRM Software',price:'$50/mo'},
{item:'AI Chatbot Service',price:'$99/mo'},
{item:'Payment Processing',price:'$40/mo'},
{item:'Analytics Dashboard',price:'$25/mo'},
{item:'Marketing Automation',price:'$60/mo'},
].map((row,i)=>(
<div key={i} style={{display:'flex',justifyContent:'space-between',alignIte
<span style={{fontSize:14.5,color:'var(--t2)',display:'flex',alignItems:'
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var
{row.item}
</span>
<span className="tabular" style={{fontSize:14,color:'var(--t3)',fontWeigh
</div>
))}
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center
<span style={{fontSize:15,color:'var(--t3)'}}>Total separately</span>
<span className="tabular" style={{fontSize:18,color:'var(--t3)',fontWeight:
</div>
<div style={{
marginTop:16,padding:'18px 22px',borderRadius:14,
background:'linear-gradient(135deg,rgba(234,179,8,.1),rgba(234,179,8,.05))'
border:'1px solid var(--gold-border)',
display:'flex',justifyContent:'space-between',alignItems:'center',
}}>
<span style={{fontSize:16,fontWeight:700,color:'var(--gold)'}}>WakilChat</s
<span className="tabular" style={{fontSize:28,fontWeight:800,color:'var(--g
</div>
<p style={{fontSize:12,color:'var(--t3)',textAlign:'center',marginTop:12}}>Pr
</div>
</R>
</div>
</div>
</section>
{/* ═══════════ TESTIMONIALS ═══════════ */}
<section className="section-pad" style={{padding:'96px 32px'}}>
<div style={{maxWidth:1100,margin:'0 auto'}}>
<R>
<div style={{textAlign:'center',marginBottom:56}}>
<p style={{fontSize:13,fontWeight:600,color:'var(--gold)',textTransform:'upperc
<h2 style={{fontSize:38,fontWeight:800,letterSpacing:'-.035em'}}>Built for Afri
</div>
</R>
<div className="resp-grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1
{[
{q:"I was juggling WhatsApp, Excel, and a notebook. WakilChat replaced all thre
{q:"The AI handles 80% of customer questions overnight. I wake up to qualified
{q:"Free calls saved $200 a month. I talk to suppliers in Lagos without worryin
].map((t,i)=>(
<R key={i} d={i*.06}>
<div style={{
background:'var(--elevated)',border:'1px solid var(--b1)',borderRadius:18,
padding:'28px 24px',display:'flex',flexDirection:'column',height:'100%',
transition:'border-color .25s',
}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--b2)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--b1)')}
>
<div style={{display:'flex',gap:2,marginBottom:16}}>
{[...Array(5)].map((_,j)=><span key={j} style={{fontSize:14,color:'var(--
</div>
<p style={{fontSize:15,color:'var(--t1)',lineHeight:1.65,flex:1,marginBotto
<div style={{display:'flex',alignItems:'center',gap:12}}>
<div style={{width:40,height:40,borderRadius:12,background:`linear-gradie
<div>
<div style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>{t.name}</d
<div style={{fontSize:12,color:'var(--t3)'}}>{t.role} &middot; {t.loc}<
</div>
</div>
</div>
</R>
))}
</div>
</div>
</section>
{/* ═══════════ FINAL CTA ═══════════ */}
<section style={{position:'relative',overflow:'hidden',borderTop:'1px solid var(--b1)'}
<div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 50%
<div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gra
<div className="section-pad resp-text-center" style={{padding:'96px 32px',maxWidth:70
<R>
<h2 style={{fontSize:44,fontWeight:800,letterSpacing:'-.04em',lineHeight:1.1,marg
Ready to grow your
<br/><span style={{color:'var(--gold)'}}>business?</span>
</h2>
<p style={{fontSize:18,color:'var(--t2)',lineHeight:1.6,maxWidth:460,margin:'0 au
Join 50,000+ African entrepreneurs who run their entire business from one app.
</p>
<div className="resp-flex-col resp-gap-sm" style={{display:'flex',justifyContent:
<Link href="/signup"><button className="btn-primary resp-full" style={{fontSize
Get started free
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentCo
</button></Link>
<Link href="#demo"><button className="btn-secondary resp-full">Talk to sales</b
</div>
<p style={{fontSize:13,color:'var(--t3)'}}>Free forever &middot; No credit </R>
</div>
</section>
card &
{/* ═══════════ FOOTER ═══════════ */}
<footer style={{borderTop:'1px solid var(--b1)',background:'var(--surface)',padding:'64
<div style={{maxWidth:1100,margin:'0 auto'}}>
<div className="resp-grid-2 resp-flex-col" style={{display:'grid',gridTemplateColum
{/* Brand */}
<div>
<div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
<div style={{width:30,height:30,borderRadius:8,background:'var(--gold)',displ
<span style={{color:'#050505',fontWeight:800,fontSize:14}}>W</span>
</div>
<span style={{fontSize:17,fontWeight:700}}><span style={{color:'var(--gold)'}
</div>
<p style={{fontSize:14,color:'var(--t3)',lineHeight:1.6,maxWidth:260}}>The fina
</div>
{/* Links */}
{[
{title:'Products',links:['Payments','Messaging','AI Assistant','Marketplace']},
{title:'Company',links:['About','Careers','Blog','Press']},
{title:'Resources',links:['Documentation','API','Help Center','Status']},
{title:'Legal',links:['Privacy','Terms','Cookies']},
].map(col=>(
<div key={col.title}>
<h4 style={{fontSize:13,fontWeight:600,color:'var(--t1)',marginBottom:16}}>{c
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{col.links.map(link=>(
<a key={link} href="#" style={{fontSize:13.5,color:'var(--t3)',transition
onMouseEnter={e=>(e.target as HTMLElement).style.color='var(--t1)'}
onMouseLeave={e=>(e.target as HTMLElement).style.color='var(--t3)'}
>{link}</a>
))}
</div>
</div>
))}
</div>
{/* Bottom */}
<div style={{borderTop:'1px solid var(--b1)',paddingTop:24,display:'flex',justifyCo
<span style={{fontSize:13,color:'var(--t3)'}}>© 2026 WakilChat. All rights reserv
<div style={{display:'flex',alignItems:'center',gap:16}}>
<span style={{fontSize:12,color:'var(--t3)',display:'flex',alignItems:'center',
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentCo
256-bit encryption
</span>
</div>
</div>
</div>
</footer>
<span style={{fontSize:12,color:'var(--t3)'}}>PCI DSS Compliant</span>
</>
);
}
