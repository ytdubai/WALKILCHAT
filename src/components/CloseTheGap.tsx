export function CloseTheGap() {
  const gaps = [
    {
      icon: '🔒',
      problem: 'Trust Gap',
      before: '78% don\'t trust online sellers',
      after: 'Product verification before buying',
      savings: '₦340B lost to fraud → SOLVED'
    },
    {
      icon: '💸',
      problem: 'Fees Gap',
      before: 'Jumia takes 20% of your sales',
      after: 'WakilChat takes only 5%',
      savings: '3x MORE profit in your pocket'
    },
    {
      icon: '📞',
      problem: 'Call Costs Gap',
      before: '₦600,000/year on phone calls',
      after: 'FREE unlimited calls & video',
      savings: 'Save ₦600,000 every year'
    },
    {
      icon: '⚡',
      problem: 'Payment Gap',
      before: 'Wait 7 days for your money',
      after: 'Get paid in 3 seconds',
      savings: 'Instant cash flow'
    }
  ];

  return (
    <section style={{ padding: '4rem 2rem', background: 'rgba(255,215,0,0.03)', borderTop: '2px solid rgba(255,215,0,0.2)', borderBottom: '2px solid rgba(255,215,0,0.2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
            We <span style={{ color: '#FFD700' }}>Close The Gaps</span> That Kill African Businesses
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#ccc', maxWidth: '800px', margin: '0 auto' }}>
            ₦2.1 TRILLION lost annually to these problems. WakilChat solves them all.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {gaps.map((gap, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: '1.25rem',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background gradient */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,215,0,0.1), transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative' }}>
                {/* Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(255,215,0,0.3)'
                }}>
                  {gap.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#FFD700',
                  marginBottom: '1rem'
                }}>
                  {gap.problem}
                </h3>

                {/* Before */}
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: '600', marginBottom: '0.5rem' }}>
                    ❌ BEFORE
                  </div>
                  <div style={{ color: '#fee2e2', fontSize: '0.875rem' }}>
                    {gap.before}
                  </div>
                </div>

                {/* After */}
                <div style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: '600', marginBottom: '0.5rem' }}>
                    ✅ WITH WAKILCHAT
                  </div>
                  <div style={{ color: '#d1fae5', fontSize: '0.875rem' }}>
                    {gap.after}
                  </div>
                </div>

                {/* Savings */}
                <div style={{
                  background: 'rgba(255,215,0,0.2)',
                  color: '#FFD700',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  💰 {gap.savings}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', color: '#ddd', marginBottom: '1.5rem' }}>
            These gaps cost African entrepreneurs <span style={{ color: '#FFD700', fontWeight: 'bold' }}>₦2.1 TRILLION</span> every year.
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
            WakilChat™ closes them all. For FREE.
          </p>
          <a href="/signup" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            padding: '1.25rem 2.5rem',
            borderRadius: '50px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 6px 30px rgba(255,215,0,0.4)'
          }}>
            Close Your Gaps Now →
          </a>
        </div>
      </div>
    </section>
  );
}