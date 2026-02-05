import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef, CSSProperties, ReactNode } from 'react';
/* ─── DESIGN TOKENS ─── */
const C = {
gold: '#F5C542',
goldDim: 'rgba(245,197,66,0.10)',
goldBorder: 'rgba(245,197,66,0.18)',
goldGlow: 'rgba(245,197,66,0.25)',
bg: '#07070a',
surface: '#0f0f13',
surfaceHover: '#141419',
border: 'rgba(255,255,255,0.06)',
borderHover: 'rgba(255,255,255,0.12)',
text: '#ededef',
textDim: '#7c7c84',
red: '#ef4444',
green: '#22c55e',
};
/* ─── HOOKS ─── */
function useOnScreen(threshold = 0.18) {
const ref = useRef<HTMLDivElement>(null);
const [vis, setVis] = useState(false);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { thresho
obs.observe(el);
return () => obs.disconnect();
}, [threshold]);
return { ref, vis };
}
function useCounter(target: number, ms = 2000) {
const [val, setVal] = useState(0);
const { ref, vis } = useOnScreen(0.3);
useEffect(() => {
if (!vis) return;
let raf: number;
const t0 = performance.now();
const tick = (now: number) => {
const p = Math.min((now - t0) / ms, 1);
setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
if (p < 1) raf = requestAnimationFrame(tick);
};
raf = requestAnimationFrame(tick);
return () => cancelAnimationFrame(raf);
}, [vis, target, ms]);
return { val, ref };
}
style?
/* ─── FADE-IN WRAPPER ─── */
function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; const { ref, vis } = useOnScreen(0.12);
return (
<div ref={ref} style={{
opacity: vis ? 1 : 0,
transform: vis ? 'translateY(0)' : 'translateY(28px)',
transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}s, transform .65s cubic-bez
...style,
}}>{children}</div>
);
}
/* ─── ICONS (inline SVG) ─── */
const Icon = {
message: (
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
</svg>
),
phone: (
</svg>
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.7
),
zap: (
</svg>
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
),
chart: (
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="
</svg>
),
globe: (
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
<path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0
</svg>
),
shield: (
</svg>
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="
<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
),
arrow: (
</svg>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeW
<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
),
check: (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth=
<polyline points="20 6 9 17 4 12"/>
</svg>
),
};
/* ─── LION LOGO MARK ─── */
function LionMark({ size = 32 }: { size?: number }) {
return (
<svg width={size} height={size} viewBox="0 0 48 48" fill="none">
<circle cx="24" cy="24" r="22" stroke={C.gold} strokeWidth="1.8" opacity=".6"/>
<circle cx="24" cy="24" r="16" stroke={C.gold} strokeWidth="1.2" opacity=".3"/>
<text x="24" y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill={C.gold} f
</svg>
);
}
/* ─── FEATURE CARD ─── */
function FeatureCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string })
const [hov, setHov] = useState(false);
return (
<div
onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
style={{
background: hov ? C.surfaceHover : C.surface,
border: `1px solid ${hov ? C.borderHover : C.border}`,
borderRadius: 16, padding: '30px 26px',
transition: 'all .25s ease',
boxShadow: hov ? `0 0 40px ${C.goldDim}` : 'none',
}}
>
<div style={{
width: 48, height: 48, borderRadius: 12,
background: C.goldDim, border: `1px solid ${C.goldBorder}`,
display: 'flex', alignItems: 'center', justifyContent: 'center',
marginBottom: 18,
}}>{icon}</div>
<h3 style={{ color: C.text, fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpaci
<p style={{ color: C.textDim, fontSize: 14.5, lineHeight: 1.6 }}>{desc}</p>
</div>
);
}
/* ─── STAT BLOCK ─── */
function Stat({ target, label, suffix = '' }: { target: number; label: string; suffix?: strin
const { val, ref } = useCounter(target, 2200);
return (
<div ref={ref} style={{ textAlign: 'center', minWidth: 120 }}>
<div style={{ fontSize: 44, fontWeight: 700, color: C.gold, letterSpacing: '-.04em', li
{val.toLocaleString()}{suffix}
</div>
<div style={{ color: C.textDim, fontSize: 12.5, marginTop: 8, textTransform: 'uppercase
</div>
);
}
/* ─── VALUE ROW (Hormozi stack) ─── */
function ValRow({ item, price }: { item: string; price: string }) {
return (
<div style={{
display: 'flex', justifyContent: 'space-between', alignItems: 'center',
padding: '14px 0', borderBottom: `1px solid ${C.border}`,
}}>
<span style={{ color: C.text, fontSize: 15, display: 'flex', alignItems: 'center', gap:
<span style={{ color: C.gold, fontWeight: 700, fontSize: 15 }}>{price}</span>
</div>
);
}
/* ─── TESTIMONIAL ─── */
function Testimonial({ quote, name, role, loc }: { quote: string; name: string; role: string;
return (
<div style={{
background: C.surface, border: `1px solid ${C.border}`,
borderRadius: 16, padding: '28px 24px',
display: 'flex', flexDirection: 'column', gap: 16, height: '100%',
}}>
<div style={{ color: C.gold, fontSize: 28, lineHeight: 1 }}>&ldquo;</div>
<p style={{ color: C.text, fontSize: 15, lineHeight: 1.65, fontStyle: 'italic', flex: 1
<div>
<div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{name}</div>
<div style={{ color: C.textDim, fontSize: 12.5, marginTop: 2 }}>{role} &middot; {loc}
</div>
</div>
);
}
/* ═══════════════════════════════════════════════════════════════
MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
const [navSolid, setNavSolid] = useState(false);
useEffect(() => {
const onScroll = () => setNavSolid(window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });
return () => window.removeEventListener('scroll', onScroll);
}, []);
const pad: CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 20px' };
const sectionPad: CSSProperties = { padding: '96px 20px', maxWidth: 1080, margin: '0 auto'
return (
<>
<Head>
<title>WakilChat — Run Your Entire Business From One App</title>
<meta name="description" content="Free calls, instant payments, AI assistant. The sup
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,3
</Head>
<style jsx global>{`
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: 'DM Sans', -apple-system, sans-serif; background: ${C.bg}; a { text-decoration: none; color: inherit; }
::selection { background: rgba(245,197,66,.25); color: #fff; }
color:
@keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1);opacity:.35} 50%{trans
@keyframes pulseRing { 0%{transform:scale(.85);opacity:.7} 100%{transform:scale(1.8);
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0}
.btn-gold {
display:inline-flex;align-items:center;gap:10px;
background:${C.gold};color:#0a0a0a;
padding:15px 34px;border-radius:60px;
font-weight:700;font-size:15px;font-family:inherit;
border:none;cursor:pointer;
transition:transform .18s,box-shadow .18s;
box-shadow:0 0 28px ${C.goldGlow};
}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 0 48px rgba(245,197,66,.4)}
.btn-ghost {
display:inline-flex;align-items:center;gap:10px;
background:transparent;color:${C.text};
padding:15px 34px;border-radius:60px;
font-weight:600;font-size:15px;font-family:inherit;
border:1px solid rgba(255,255,255,.12);cursor:pointer;
transition:border-color .2s,background .2s;
}
.btn-ghost:hover{border-color:${C.goldBorder};background:${C.goldDim}}
@media(max-width:768px){
.hero-h{font-size:34px!important}
.grid-3{grid-template-columns:1fr!important}
.grid-2{grid-template-columns:1fr!important}
.stats-row{flex-direction:column!important;gap:32px!important}
.stats-row .divider{display:none!important}
.cta-row{flex-direction:column!important;align-items:stretch!important}
.cta-row .btn-gold,.cta-row .btn-ghost{width:100%;justify-content:center}
.mock-grid{grid-template-columns:1fr!important}
.value-box{padding:24px!important}
.footer-inner{flex-direction:column!important;text-align:center;gap:24px!important}
}
`}</style>
{/* ─── GRAIN OVERLAY ─── */}
<div style={{
position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:.02,
backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://w
}}/>
{/* ════════════ NAV ════════════ */}
<nav style={{
position:'fixed',top:0,left:0,right:0,zIndex:100,
background:navSolid?'rgba(7,7,10,.88)':'transparent',
backdropFilter:navSolid?'blur(16px) saturate(1.4)':'none',
borderBottom:navSolid?`1px solid ${C.border}`:'1px solid transparent',
transition:'all .3s ease',
}}>
<div style={{...pad,padding:'16px 20px',display:'flex',justifyContent:'space-between'
<Link href="/" style={{display:'flex',alignItems:'center',gap:10}}>
<LionMark />
<span style={{fontSize:21,fontWeight:700,letterSpacing:'-.02em'}}>
<span style={{color:C.gold}}>Wakil</span>Chat
</span>
</Link>
<div style={{display:'flex',alignItems:'center',gap:24}}>
<Link href="/login" style={{color:C.textDim,fontSize:14.5,fontWeight:500,transiti
<Link href="/signup"><button className="btn-gold" style={{padding:'10px 22px',fon
</div>
</div>
</nav>
{/* ════════════ HERO ════════════ */}
<section style={{position:'relative',paddingTop:152,paddingBottom:80,overflow:'hidden'}
{/* Orbs */}
<div style={{position:'absolute',top:-240,left:'50%',transform:'translateX(-50%)',wid
<div style={{position:'absolute',top:80,right:-260,width:500,height:500,borderRadius:
{/* Grid pattern */}
<div style={{
position:'absolute',inset:0,opacity:.025,
backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-g
backgroundSize:'68px 68px',
maskImage:'radial-gradient(ellipse at 50% 30%,black 20%,transparent 70%)',
WebkitMaskImage:'radial-gradient(ellipse at 50% 30%,black 20%,transparent 70%)',
pointerEvents:'none',
}}/>
<div style={{maxWidth:780,margin:'0 auto',textAlign:'center',padding:'0 20px',positio
{/* Badge */}
<Reveal>
<div style={{
display:'inline-flex',alignItems:'center',gap:8,
background:C.goldDim,border:`1px solid ${C.goldBorder}`,
borderRadius:60,padding:'7px 16px',marginBottom:26,
fontSize:12,fontWeight:600,color:C.gold,letterSpacing:'.06em',textTransform:'up
}}>
<span style={{position:'relative',width:8,height:8,borderRadius:'50%',backgroun
<span style={{position:'absolute',inset:-4,borderRadius:'50%',border:`1.5px s
</span>
Built for African entrepreneurs
</div>
</Reveal>
{/* Headline */}
<Reveal delay={.07}>
<h1 className="hero-h" style={{fontSize:58,fontWeight:700,lineHeight:1.08,letterS
Run your entire{' '}
<span style={{color:C.gold,textShadow:`0 0 60px rgba(245,197,66,.15)`}}>busines
<br/>from one app
</h1>
</Reveal>
{/* Sub */}
<Reveal delay={.14}>
<p style={{fontSize:18,color:C.textDim,lineHeight:1.6,maxWidth:500,margin:'0 auto
Free calls. Instant payments. AI assistant that works while you sleep. Replace
</p>
</Reveal>
{/* CTA */}
<Reveal delay={.21}>
<div className="cta-row" style={{display:'flex',justifyContent:'center',gap:14,ma
<Link href="/signup"><button className="btn-gold">Start Free Today {Icon.arrow}
<Link href="#features"><button className="btn-ghost">See How It Works</button><
</div>
<p style={{color:C.textDim,fontSize:12.5}}>No credit card &middot; Free forever &
</Reveal>
{/* ─── MOCK DASHBOARD ─── */}
<Reveal delay={.32}>
<div style={{
marginTop:56,
background:`linear-gradient(160deg,${C.surface},rgba(16,16,20,1))`,
border:`1px solid ${C.border}`,borderRadius:18,padding:2,
boxShadow:`0 40px 100px rgba(0,0,0,.55), 0 0 60px ${C.goldDim}`,
}}>
<div style={{background:C.surface,borderRadius:16,padding:28,display:'flex',fle
{/* Browser dots */}
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center
<div style={{display:'flex',gap:7}}>
<div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}}
<div style={{width:11,height:11,borderRadius:'50%',background:'#febc2e'}}
<div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}}
</div>
<div style={{color:C.textDim,fontSize:12,background:'rgba(255,255,255,.04)'
<div style={{width:40}}/>
</div>
{/* Stat cards */}
<div className="mock-grid" style={{display:'grid',gridTemplateColumns:'repeat
{[
{l:'Revenue',v:'$12,480',c:'+23%',up:true},
{l:'Messages',v:'2,841',c:'+18%',up:true},
{l:'AI Saved',v:'127 hrs',c:'this month',up:true},
].map((s,i)=>(
<div key={i} style={{background:'rgba(255,255,255,.025)',borderRadius:12,
<div style={{color:C.textDim,fontSize:11,textTransform:'uppercase',lett
<div style={{fontSize:22,fontWeight:700,color:C.text,letterSpacing:'-.0
<div style={{fontSize:11.5,color:C.gold,marginTop:4}}>{s.up?'↑':''} {s.
</div>
))}
</div>
{/* Mini chart */}
<div style={{background:'rgba(255,255,255,.015)',borderRadius:12,padding:'18p
{[30,48,38,65,52,78,68,88,82,92,86,100].map((h,i)=>(
<div key={i} style={{
flex:1,height:`${h}%`,
background:`linear-gradient(180deg,${C.gold} 0%,rgba(245,197,66,.15) 10
borderRadius:'3px 3px 0 0',opacity:.5+i/20,
}}/>
))}
</div>
</div>
</div>
</Reveal>
</div>
</section>
{/* ════════════ STATS BAR ════════════ */}
<section style={{borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`
<div style={{...sectionPad,padding:'52px 20px'}}>
<div className="stats-row" style={{display:'flex',justifyContent:'space-around',ali
<Stat target={50000} label="Active Businesses" suffix="+"/>
<div className="divider" style={{width:1,height:44,background:C.border}}/>
<Stat target={12} label="African Countries" suffix="+"/>
<div className="divider" style={{width:1,height:44,background:C.border}}/>
<Stat target={4} label="Hours Saved Daily" suffix="+"/>
<div className="divider" style={{width:1,height:44,background:C.border}}/>
<Stat target={99} label="Uptime" suffix=".9%"/>
</div>
</div>
</section>
{/* ════════════ FEATURES ════════════ */}
<section id="features" style={sectionPad}>
<Reveal>
<div style={{textAlign:'center',marginBottom:52}}>
<p style={{color:C.gold,fontSize:12,fontWeight:600,textTransform:'uppercase',lett
<h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em',marginBottom:14}}>S
<p style={{color:C.textDim,fontSize:16,maxWidth:480,margin:'0 auto',lineHeight:1.
</div>
</Reveal>
<div className="grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',ga
{[
{icon:Icon.message,t:'Unified Messaging',d:'WhatsApp, Telegram, SMS — all convers
{icon:Icon.phone,t:'Free Voice & Video',d:'Crystal-clear calls over data. No per-
{icon:Icon.zap,t:'AI Business Assistant',d:'Answers customer questions 24/7, qual
{icon:Icon.chart,t:'Revenue Dashboard',d:'Track every payment, invoice, and expen
{icon:Icon.globe,t:'Marketplace',d:'List products, accept orders, manage inventor
{icon:Icon.shield,t:'Bank-Grade Security',d:'End-to-end encryption, scam detectio
].map((f,i)=>(
<Reveal key={i} delay={i*.04}>
<FeatureCard icon={f.icon} title={f.t} desc={f.d}/>
</Reveal>
))}
</div>
</section>
{/* ════════════ HOW IT WORKS ════════════ */}
<section style={{borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`
<div style={sectionPad}>
<Reveal>
<div style={{textAlign:'center',marginBottom:52}}>
<p style={{color:C.gold,fontSize:12,fontWeight:600,textTransform:'uppercase',le
<h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>Up and running
</div>
</Reveal>
<div className="grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
{[
{n:'01',t:'Sign Up Free',d:'Enter your phone number. No credit card, no forms,
{n:'02',t:'Connect Your Channels',d:'Link WhatsApp, add your products, set up y
{n:'03',t:'Grow on Autopilot',d:'AI handles inquiries, payments flow in, dashbo
].map((s,i)=>(
<Reveal key={i} delay={i*.06}>
<div style={{padding:'28px 24px'}}>
<div style={{
fontSize:48,fontWeight:700,color:C.gold,opacity:.2,lineHeight:1,marginBot
fontFamily:'DM Sans,sans-serif',letterSpacing:'-.04em',
}}>{s.n}</div>
<h3 style={{color:C.text,fontSize:18,fontWeight:600,marginBottom:10}}>{s.t}
<p style={{color:C.textDim,fontSize:14.5,lineHeight:1.6}}>{s.d}</p>
</div>
</Reveal>
))}
</div>
</div>
</section>
{/* ════════════ VALUE STACK (HORMOZI) ════════════ */}
<section style={sectionPad}>
<Reveal>
<div style={{textAlign:'center',marginBottom:44}}>
<p style={{color:C.gold,fontSize:12,fontWeight:600,textTransform:'uppercase',lett
<h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>What you&apos;d n
</div>
</Reveal>
<Reveal delay={.08}>
<div className="value-box" style={{maxWidth:560,margin:'0 auto',background:C.surfac
<ValRow item="Business Phone Line" price="$30/mo"/>
<ValRow item="CRM Software" price="$50/mo"/>
<ValRow item="AI Chatbot Service" price="$99/mo"/>
<ValRow item="Payment Processing" price="$40/mo"/>
<ValRow item="Analytics Dashboard" price="$25/mo"/>
<ValRow item="Marketing Automation" price="$60/mo"/>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',pa
<span style={{color:C.textDim,fontSize:15}}>Total if bought separately</span>
<span style={{color:C.textDim,fontSize:19,fontWeight:700,textDecoration:'line-t
</div>
<div style={{
marginTop:20,padding:'20px 24px',
background:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:12,
display:'flex',justifyContent:'space-between',alignItems:'center',
}}>
</div>
</div>
</Reveal>
</section>
<span style={{color:C.gold,fontSize:17,fontWeight:700}}>WakilChat</span>
<span style={{color:C.gold,fontSize:26,fontWeight:700}}>FREE</span>
<p style={{color:C.textDim,fontSize:12.5,textAlign:'center',marginTop:14}}>Premiu
{/* ════════════ TESTIMONIALS ════════════ */}
<section style={{borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`
<div style={sectionPad}>
<Reveal>
<div style={{textAlign:'center',marginBottom:44}}>
<p style={{color:C.gold,fontSize:12,fontWeight:600,textTransform:'uppercase',le
<h2 style={{fontSize:36,fontWeight:700,letterSpacing:'-.03em'}}>Entrepreneurs w
</div>
</Reveal>
<div className="grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
{[
{q:"I was juggling WhatsApp, Excel, and a notebook. WakilChat replaced all thre
{q:"The AI handles 80% of my customer questions at night. I wake up to qualifie
{q:"Free voice calls saved my business $200 a month. I talk to suppliers in Lag
].map((t,i)=>(
<Reveal key={i} delay={i*.05}>
<Testimonial quote={t.q} name={t.n} role={t.r} loc={t.l}/>
</Reveal>
))}
</div>
</div>
</section>
{/* ════════════ FINAL CTA ════════════ */}
<section style={{position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',bottom:-280,left:'50%',transform:'translateX(-50%)',
<div style={{...sectionPad,textAlign:'center',position:'relative'}}>
<Reveal>
<h2 style={{fontSize:40,fontWeight:700,letterSpacing:'-.03em',marginBottom:18}}>
Your competitors won&apos;t wait.<br/>
<span style={{color:C.gold}}>Why should you?</span>
</h2>
<p style={{color:C.textDim,fontSize:17,maxWidth:440,margin:'0 auto 32px',lineHeig
Every day without WakilChat is leads lost, hours wasted, and money left on the
</p>
<Link href="/signup">
<button className="btn-gold" style={{fontSize:17,padding:'17px 40px'}}>
Start Free — Takes 60 Seconds {Icon.arrow}
</button>
</Link>
<p style={{color:C.textDim,fontSize:12.5,marginTop:14}}>Join 50,000+ African entr
</Reveal>
</div>
</section>
</>
);
}
{/* ════════════ FOOTER ════════════ */}
<footer style={{borderTop:`1px solid ${C.border}`,padding:'40px 20px'}}>
<div className="footer-inner" style={{maxWidth:1080,margin:'0 auto',display:'flex',ju
<div style={{display:'flex',alignItems:'center',gap:10}}>
<LionMark size={28}/>
<span style={{fontSize:18,fontWeight:700}}><span style={{color:C.gold}}>Wakil</sp
</div>
<div style={{display:'flex',gap:28,flexWrap:'wrap'}}>
{['About','Pricing','Help','Privacy','Terms'].map(l=>(
<Link key={l} href={`/${l.toLowerCase()}`} style={{color:C.textDim,fontSize:13.
))}
</div>
<p style={{color:'rgba(255,255,255,.18)',fontSize:12}}>Made with conviction in Afri
</div>
</footer>
