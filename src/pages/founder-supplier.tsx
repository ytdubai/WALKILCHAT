import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function FounderSupplierPage() {
  const [spotsLeft, setSpotsLeft] = useState(47);
  const [lastSignup, setLastSignup] = useState('Ahmed T. (Ethiopia)');
  
  // Simulate countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 47,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title> Founder Supplier Program - Lifetime 0% Fees | WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Urgency Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(239,68,68,0.5)'
        }}>
          ⚠️ URGENT: Only <span style={{ fontSize: '1.25rem', color: '#fff' }}>{spotsLeft}</span> Founder Spots Remaining!
          Time until Tier 2: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s ⏰
        </div>

        {/* Hero */}
        <section style={{
          padding: '4rem 2rem',
          background: 'radial-gradient(circle at 50% 0%, rgba(255,215,0,0.15), transparent 70%)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 'bold',
              lineHeight: '1.1',
              marginBottom: '1.5rem'
            }}>
              Become a <span style={{ color: '#FFD700' }}>Legendary</span><br />
              Founder Supplier
            </h1>

            <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              The first 100 suppliers to join WakilChat™ get <span style={{ color: '#FFD700', fontWeight: 'bold' }}>LIFETIME</span> benefits 
              worth over <span style={{ color: '#10b981', fontWeight: 'bold' }}>$200,000</span>.
            </p>

            <div style={{
              background: 'rgba(255,215,0,0.1)',
              border: '2px solid rgba(255,215,0,0.4)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem' }}>
                {spotsLeft}/100
              </div>
              <div style={{ fontSize: '1.125rem', color: '#ddd' }}>
                Legendary Spots Remaining
              </div>
              <div style={{ fontSize: '0.875rem', color: '#999', marginTop: '1rem' }}>
                 Last signup: <strong>{lastSignup}</strong> (2 minutes ago)
              </div>
            </div>

            <Link href="/signup?tier=founder" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              padding: '1.5rem 3rem',
              borderRadius: '50px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 8px 40px rgba(255,215,0,0.6)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
               CLAIM YOUR FOUNDER STATUS NOW
            </Link>
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
            `}</style>

            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
               Setup takes 3 minutes • Spots filling in real-time
            </p>
          </div>
        </section>

        {/* What You Get */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              Founder Supplier <span style={{ color: '#FFD700' }}>Lifetime Benefits</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '', title: '0% Fees FOREVER', value: '$200,000+', desc: 'Never pay transaction fees. Save millions over 10 years.' },
                { icon: '', title: 'Legendary Badge', value: 'Priceless', desc: 'Founder #XX badge on every listing. Instant credibility.' },
                { icon: '⭐', title: 'Auto 5-Star Rating', value: '$50,000', desc: 'Start with perfect rating. Get more sales from day 1.' },
                { icon: '', title: 'Priority Placement', value: '$36,000', desc: 'Always show first in search results. Forever.' },
                { icon: '', title: 'Free AI Matching', value: '$60,000', desc: 'AI finds buyers for life. No per-deal fees.' },
                { icon: '', title: 'Premium Analytics', value: '$24,000', desc: 'Advanced insights forever. See what competitors can\'t.' }
              ].map((benefit, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(139,92,246,0.05))',
                  border: '2px solid rgba(255,215,0,0.3)',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '6rem',
                    opacity: 0.05
                  }}>
                    {benefit.icon}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{benefit.icon}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem' }}>
                      {benefit.title}
                    </h3>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#10b981',
                      marginBottom: '0.75rem'
                    }}>
                      Value: {benefit.value}
                    </div>
                    <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '3rem',
              textAlign: 'center',
              background: 'rgba(255,215,0,0.1)',
              border: '2px solid rgba(255,215,0,0.4)',
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Total Lifetime Value:
              </div>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#FFD700' }}>
                $370,000+
              </div>
              <div style={{ fontSize: '1rem', color: '#999', marginTop: '0.5rem' }}>
                For being one of the first 100 suppliers
              </div>
            </div>
          </div>
        </section>

        {/* The Math */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            Don't Be Supplier <span style={{ color: '#ef4444' }}>#101</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Supplier #100 */}
            <div style={{
              background: 'rgba(16,185,129,0.1)',
              border: '2px solid rgba(16,185,129,0.4)',
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem' }}></div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                  Supplier #100
                </div>
              </div>
              <div style={{ color: '#d1fae5', lineHeight: '2' }}>
                <strong>Status:</strong> Legendary Founder<br />
                <strong>Badge:</strong>  Displayed forever<br />
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐ (5.0)<br />
                <strong>Fees:</strong> 0% forever<br />
                <strong>AI Matching:</strong> Free for life<br />
                <br />
                <strong>10-Year Revenue:</strong> $5M<br />
                <strong>Fees Paid:</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$0</span><br />
                <strong>Profit:</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>$5M</span>
              </div>
            </div>

            {/* Supplier #101 */}
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '2px solid rgba(239,68,68,0.4)',
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem' }}>😢</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                  Supplier #101
                </div>
              </div>
              <div style={{ color: '#fee2e2', lineHeight: '2' }}>
                <strong>Status:</strong> Standard member<br />
                <strong>Badge:</strong> None<br />
                <strong>Rating:</strong> ⭐☆☆☆☆ (0.0 - must build)<br />
                <strong>Fees:</strong> 2% on all sales<br />
                <strong>AI Matching:</strong> $500 per deal<br />
                <br />
                <strong>10-Year Revenue:</strong> $5M<br />
                <strong>Fees Paid:</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>-$100k</span><br />
                <strong>Profit:</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$4.9M</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            fontSize: '1.75rem',
            fontWeight: 'bold'
          }}>
            Supplier #100 makes $100,000 MORE by registering NOW!
          </div>
        </section>

        {/* Live Activity Feed */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#FFD700' }}>
               Live Registrations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Ahmed T.', country: 'Ethiopia', product: 'Coffee', num: 53, time: '2 min ago' },
                { name: 'Chinwe O.', country: 'Nigeria', product: 'Sesame', num: 52, time: '8 min ago' },
                { name: 'David K.', country: 'Kenya', product: 'Tea', num: 51, time: '15 min ago' },
                { name: 'Amira M.', country: 'Ethiopia', product: 'Sesame', num: 50, time: '23 min ago' },
                { name: 'Ibrahim A.', country: 'Nigeria', product: 'Cocoa', num: 49, time: '31 min ago' }
              ].map((signup, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: i === 0 ? 'slideIn 0.5s ease-out' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: '#000',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}>
                      #{signup.num}
                    </div>
                    <div>
                      <div style={{ color: 'white', fontWeight: '600' }}>
                        {signup.name} 🇪🇹
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#999' }}>
                        {signup.product} Exporter, {signup.country}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {signup.time}
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(-20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `}</style>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            Choose Your <span style={{ color: '#FFD700' }}>Tier</span>
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,215,0,0.3)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#FFD700' }}>Benefit</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#FFD700', background: 'rgba(255,215,0,0.1)' }}>
                     FOUNDER<br />(1-100)
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>🥇 GOLD<br />(101-500)</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>🥈 SILVER<br />(501-1,000)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Transaction Fees', '0% Forever', '1% Forever', '2% Standard'],
                  ['Starting Rating', '⭐⭐⭐⭐⭐ 5.0', '⭐⭐⭐⭐☆ 4.5', '⭐⭐⭐⭐☆ 4.0'],
                  ['AI Matching', 'FREE Forever', '50% Off', '3 Free Matches'],
                  ['Priority Placement', 'Lifetime', '6 Months', 'None'],
                  ['Badge Display', ' #XX', '🥇 #XXX', '🥈 #XXX'],
                  ['Value Over 10 Years', '$370,000+', '$80,000', '$15,000']
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '1rem', color: '#ccc' }}>{row[0]}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#FFD700', background: 'rgba(255,215,0,0.05)' }}>
                      {row[1]}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#ddd' }}>{row[2]}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#999' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'linear-gradient(to bottom, rgba(255,215,0,0.1), transparent)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(239,68,68,0.2)',
              border: '2px solid rgba(239,68,68,0.5)',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ fontSize: '1.25rem', color: '#fca5a5', fontWeight: 'bold' }}>
                Once we hit 100 Founder Suppliers, this offer CLOSES forever.
              </p>
              <p style={{ fontSize: '1rem', color: '#fee2e2', marginTop: '1rem' }}>
                Supplier #101 will look at Supplier #100's benefits and wish they registered one day earlier.
              </p>
            </div>

            <Link href="/signup?tier=founder" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              padding: '1.75rem 3.5rem',
              borderRadius: '50px',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 10px 50px rgba(255,215,0,0.6)',
              marginBottom: '1rem'
            }}>
              YES! Make Me a Founder Supplier →
            </Link>

            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              ✓ Setup: 3 minutes • ✓ Spots: {spotsLeft}/100 • ✓ Value: $370,000+
            </p>
          </div>
        </section>
      </div>
    </>
  );
}