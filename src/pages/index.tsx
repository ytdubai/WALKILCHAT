import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WakilChat - Run Your Entire Business From One App</title>
        <meta name="description" content="The all-in-one super app for African entrepreneurs. Free calls, instant payments, and AI-powered business tools." />
        <style>{`
          body { 
            margin: 0; 
            background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 100%);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .flag-scroll {
            animation: slideLeft 30s linear infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .pulse-animate {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50, 
          background: 'rgba(10, 10, 10, 0.95)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat Lion" width={40} height={40} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat
              </span>
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/login" style={{ 
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,215,0,0.3)',
                fontWeight: '500'
              }}>
                Login
              </Link>
              <Link href="/signup" style={{ 
                background: '#FFD700', 
                color: '#000', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '50px', 
                fontWeight: '600', 
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(255,215,0,0.3)'
              }}>
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        {/* African Flags Banner - Moving */}
        <div style={{ 
          overflow: 'hidden', 
          background: 'rgba(255,215,0,0.05)', 
          borderBottom: '2px solid rgba(255,215,0,0.2)',
          marginTop: '72px',
          padding: '0.75rem 0'
        }}>
          <div className="flag-scroll" style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}>
            {['🇳🇬 Nigeria', '🇰🇪 Kenya', '🇪🇹 Ethiopia', '🇬🇭 Ghana', '🇿🇦 South Africa', '🇹🇿 Tanzania', '🇺🇬 Uganda', '🇷🇼 Rwanda', '🇳🇬 Nigeria', '🇰🇪 Kenya', '🇪🇹 Ethiopia', '🇬🇭 Ghana'].map((flag, i) => (
              <span key={i} style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FFD700' }}>{flag}</span>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Image 
              src="/branding/logo-icon.jpg" 
              alt="WakilChat Lion" 
              width={150} 
              height={150} 
              style={{ borderRadius: '50%', boxShadow: '0 0 60px rgba(255, 215, 0, 0.4)' }}
            />
          </div>
          
          <p style={{ color: '#FFD700', fontSize: '1.25rem', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            🔥 For African Entrepreneurs Who Want Freedom 🔥
          </p>
          
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Run Your <span style={{ color: '#FFD700' }}>ENTIRE</span> Business <br />
            From <span style={{ color: '#FFD700' }}>ONE APP</span>
          </h1>
          
          <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Stop juggling 5 different apps. Stop paying ₦50,000/month on calls. Stop losing money to payment delays.
          </p>
          
          <div className="pulse-animate" style={{ marginBottom: '2rem' }}>
            <Link href="/signup" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFD700', 
              color: '#000', 
              padding: '1.5rem 3rem', 
              borderRadius: '50px', 
              fontSize: '1.25rem',
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)'
            }}>
              👉 START FREE — NO CARD REQUIRED
            </Link>
          </div>
          
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            ✓ Free FOREVER &nbsp;•&nbsp; ✓ Setup in 60 seconds &nbsp;•&nbsp; ✓ Cancel anytime
          </p>
        </section>

        {/* Stats Bar */}
        <section style={{ borderTop: '2px solid rgba(255,215,0,0.2)', borderBottom: '2px solid rgba(255,215,0,0.2)', background: 'rgba(255,215,0,0.05)', padding: '2rem 0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {['50,000+|Businesses', '₦2.3B+|Processed', '4.9/5|Rating', '99.9%|Uptime'].map((stat, i) => {
              const [value, label] = stat.split('|');
              return (
                <div key={i}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700' }}>{value}</div>
                  <div style={{ color: '#999', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Problem - Hormozi Style */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Here's The <span style={{ color: '#ef4444' }}>PAINFUL</span> Truth...
            </h2>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '1rem', padding: '2rem' }}>
            <p style={{ color: '#FCA5A5', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Right now, you're probably using:
            </p>
            <ul style={{ color: '#FEE2E2', fontSize: '1.25rem', lineHeight: '2', listStyle: 'none', paddingLeft: 0 }}>
              <li>❌ WhatsApp for customer messages</li>
              <li>❌ M-Pesa app for payments</li>
              <li>❌ Excel for inventory tracking</li>
              <li>❌ Regular phone (₦50,000/month in calls!)</li>
              <li>❌ Email for invoices</li>
            </ul>
            <p style={{ color: '#FCA5A5', fontSize: '1.75rem', fontWeight: 'bold', marginTop: '1.5rem', textAlign: 'center' }}>
              That's <span style={{ fontSize: '2rem', color: '#FEE2E2' }}>₦2.1 TRILLION</span> lost annually across Africa. 💸
            </p>
          </div>
        </section>

        {/* What Is WakilChat - Detailed Explanation */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.03)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
                What Is <span style={{ color: '#FFD700' }}>WakilChat</span>?
              </h2>
              <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto' }}>
                WakilChat is the FIRST and ONLY all-in-one business super app built specifically for African entrepreneurs.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,215,0,0.3)', borderRadius: '1.5rem', padding: '3rem', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1.5rem' }}>
                🎯 The Simple Truth:
              </h3>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#ddd', marginBottom: '1.5rem' }}>
                Instead of paying for 5 different apps and wasting hours switching between them...
              </p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#FFD700', textAlign: 'center', padding: '2rem', background: 'rgba(255,215,0,0.1)', borderRadius: '1rem' }}>
                You get EVERYTHING in ONE place. For FREE. Forever. 🚀
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - Step by Step */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              How It <span style={{ color: '#FFD700' }}>Works</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#999' }}>
              It's ridiculously simple. Here's the exact process:
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              {
                step: '1',
                title: 'Download WakilChat',
                desc: 'Click "Start Free" above. No credit card. No payment info. Just your name and phone number. Takes 60 seconds.',
                time: '60 seconds'
              },
              {
                step: '2',
                title: 'Add Your First Product',
                desc: 'Take a photo of what you sell. Set a price. Done. Your online shop is now LIVE and people can buy from you.',
                time: '2 minutes'
              },
              {
                step: '3',
                title: 'Start Calling Customers',
                desc: 'Tap the call button. FREE voice or video calls. No airtime needed. Crystal clear quality. Call as long as you want.',
                time: 'Unlimited'
              },
              {
                step: '4',
                title: 'Get Paid Instantly',
                desc: 'Customer pays via M-Pesa, Telebirr, or card. Money hits your account INSTANTLY. No delays. No fees.',
                time: '3 seconds'
              },
              {
                step: '5',
                title: 'Let AI Handle The Rest',
                desc: 'Our AI assistant sends payment reminders, follows up with customers, tracks inventory. You focus on GROWING.',
                time: 'Automatic'
              }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex',
                gap: '1.5rem',
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,215,0,0.2)', 
                borderRadius: '1rem', 
                padding: '2rem',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#000',
                  flexShrink: 0,
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', margin: 0 }}>{item.title}</h3>
                    <span style={{
                      background: 'rgba(255,215,0,0.2)',
                      color: '#FFD700',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      ⏱️ {item.time}
                    </span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '1.25rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#FFD700', fontWeight: 'bold', marginBottom: '1rem' }}>
              Total setup time: Less than 5 minutes. 🚀
            </p>
            <Link href="/signup" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFD700', 
              color: '#000', 
              padding: '1rem 2rem', 
              borderRadius: '50px', 
              fontSize: '1.25rem',
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)'
            }}>
              Get Started Now →
            </Link>
          </div>
        </section>

        {/* Features with Modern Icons */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Everything You Need. <span style={{ color: '#FFD700' }}>Nothing You Don't.</span>
            </h2>
            <p style={{ color: '#999', fontSize: '1.25rem' }}>No bloat. No confusion. Just tools that make you money.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '📞', gradient: 'linear-gradient(135deg, #10b981, #059669)', title: 'FREE Calls', desc: 'Voice & video calls with zero charges. Save ₦600,000/year.' },
              { icon: '💬', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', title: 'Instant Chat', desc: 'Message customers in real-time. Never miss a sale.' },
              { icon: '💳', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', title: 'Get Paid Fast', desc: 'Accept M-Pesa, Telebirr, cards. Money in 3 seconds.' },
              { icon: '🏪', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', title: 'Online Shop', desc: 'Sell products 24/7. Even when you sleep.' },
              { icon: '🛡️', gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)', title: 'Bank Security', desc: 'Military-grade encryption. Your money is safe.' },
              { icon: '⚡', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', title: 'Works Offline', desc: 'No internet? No problem. Full access anywhere.' }
            ].map((feature, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '1rem', 
                padding: '1.5rem', 
                cursor: 'pointer', 
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: feature.gradient,
                  opacity: 0.1,
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }} />
                
                <div style={{ 
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  background: feature.gradient,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '1rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', position: 'relative' }}>{feature.title}</h3>
                <p style={{ color: '#999', position: 'relative', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Value Stack - What You Get */}
        <section style={{ padding: '4rem 2rem', background: 'linear-gradient(to bottom, rgba(255,215,0,0.05), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
                The <span style={{ color: '#FFD700' }}>FULL</span> Value Stack
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#999' }}>
                If you paid for each feature separately, here's what it would cost:
              </p>
            </div>

            <div style={{ background: '#111', border:'2px solid rgba(255,215,0,0.3)', borderRadius: '1.5rem', padding: '2rem' }}>
              {[
                { item: 'Business Phone System (Unlimited Calls)', value: '₦750,000/yr' },
                { item: 'Customer Chat & CRM Software', value: '₦480,000/yr' },
                { item: 'Payment Gateway Fees', value: '₦360,000/yr' },
                { item: 'E-commerce Platform', value: '₦420,000/yr' },
                { item: 'Inventory Management System', value: '₦240,000/yr' },
                { item: 'AI Business Assistant', value: '₦180,000/yr' }
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ fontSize: '1.25rem', color: 'white' }}>{item.item}</span>
                  </div>
                  <span style={{ color: '#FFD700', fontWeight: '600', fontSize: '1.25rem' }}>{item.value}</span>
                </div>
              ))}
              
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '2px solid rgba(255,215,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', color: '#999' }}>Normal Price:</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: 'bold', textDecoration: 'line-through', color: '#666' }}>₦2,430,000/yr</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>Your Price with WakilChat:</span>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700' }}>FREE</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link href="/signup" style={{ 
                  display: 'inline-block',
                  width: '100%',
                  background: '#FFD700', 
                  color: '#000', 
                  padding: '1.25rem', 
                  borderRadius: '50px', 
                  fontSize: '1.25rem',
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
                }}>
                  Claim Your FREE Account Now →
                </Link>
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem' }}>
                  ⚡ Limited to 100,000 businesses • 50,000 already joined
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - Testimonials */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Don't Take <span style={{ color: '#FFD700' }}>Our</span> Word For It
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#999' }}>Here's what real African entrepreneurs are saying:</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                name: 'Amina K.',
                role: 'Fashion Retailer, Lagos 🇳🇬',
                text: '"I was spending ₦50,000/month on phone calls. With WakilChat, it\'s ₦0. That\'s ₦600,000 saved this year. Plus my sales are up 40% because I respond faster."',
                saved: '₦600,000/yr'
              },
              {
                name: 'David M.',
                role: 'Electronics Shop, Nairobi 🇰🇪',
                text: '"Before WakilChat, customers would cancel orders because payment took too long. Now it\'s instant. My conversion rate went from 30% to 65%. Game changer."',
                saved: '+116% conversion'
              },
              {
                name: 'Sara T.',
                role: 'Coffee Exporter, Addis Ababa 🇪🇹',
                text: '"I was using 6 different apps. WakilChat replaced ALL of them. I save 5+ hours every week on admin. That\'s time I spend actually growing my business."',
                saved: '5 hours/week'
              }
            ].map((testimonial, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '1rem',
                padding: '2rem',
                position: 'relative'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} style={{ color: '#FFD700', fontSize: '1.25rem' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '1.25rem', color: '#ddd', lineHeight: '1.7', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  {testimonial.text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>{testimonial.name}</p>
                    <p style={{ fontSize: '1.25rem', color: '#999' }}>{testimonial.role}</p>
                  </div>
                  <div style={{
                    background: 'rgba(16,185,129,0.2)',
                    color: '#10b981',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    {testimonial.saved}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'linear-gradient(to top, rgba(255,215,0,0.1), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Stop Losing Money. <br />
              <span style={{ color: '#FFD700' }}>Start With WakilChat.</span>
            </h2>
            <p style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '2rem' }}>
              50,000+ businesses already made the switch. Will you be next?
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFD700',
              color: '#000',
              padding: '1.5rem 3rem',
              borderRadius: '50px',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)'
            }}>
              YES! Get WakilChat FREE →
            </Link>
            <p style={{ marginTop: '1.5rem', fontSize: '1.25rem', color: '#666' }}>
              Free forever • No credit card • Setup in 60 seconds
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', marginBottom: '3.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={32} height={32} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <Link href="/about" style={{ color: '#999', textDecoration: 'none' }}>About</Link>
              <Link href="/pricing" style={{ color: '#999', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/help" style={{ color: '#999', textDecoration: 'none' }}>Help</Link>
              <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy</Link>
            </div>
            <p style={{ color: '#666' }}>Made with 🦁 in Africa</p>
          </div>
        </footer>
      </div>
    </>
  );
}