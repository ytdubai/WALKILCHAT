import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function AIMatchingPage() {
  return (
    <>
      <Head>
        <title>AI Buyer Matching - Automatically Find Global Buyers | WakilChat™</title>
        <meta name="description" content="African exporters: Our AI automatically finds and contacts global buyers for your products. Coffee, sesame, cars, minerals - AI does the work while you sleep." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
        {/* Animated Header */}
        <section style={{
          padding: '6rem 2rem 4rem',
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(255,215,0,0.1))',
          borderBottom: '2px solid rgba(139,92,246,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated orbs */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite'
          }} />
          <style>{`
            @keyframes float {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(50px, 30px); }
            }
          `}</style>

          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '2rem' }}>
              <Image src="/branding/logo-icon.jpg" alt="WakilChat" width={50} height={50} style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#FFD700' }}>Wakil</span>Chat™
              </span>
            </Link>

            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖🌍</div>
              
              <p style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                ⚡ Powered by Advanced AI Technology
              </p>

              <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                Our <span style={{ color: '#a78bfa' }}>AI Finds Buyers</span><br />
                While You <span style={{ color: '#FFD700' }}>Sleep</span>
              </h1>

              <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                List your product once. Our AI automatically searches the world, finds qualified buyers, and contacts them for you.
                <span style={{ display: 'block', color: '#FFD700', fontWeight: 'bold', marginTop: '1rem' }}>
                  No manual searching. No cold calling. Pure automation.
                </span>
              </p>

              <div style={{
                background: 'rgba(139,92,246,0.15)',
                border: '2px solid rgba(139,92,246,0.4)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                maxWidth: '700px',
                margin: '0 auto 2.5rem'
              }}>
                <p style={{ fontSize: '1.25rem', color: '#c4b5fd', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  🎯 Real Example:
                </p>
                <div style={{ textAlign: 'left', fontSize: '1.125rem', color: '#e9d5ff', lineHeight: '1.9' }}>
                  <strong>Abebe lists:</strong> 20 tons Ethiopian coffee<br />
                  <strong>AI finds:</strong> 127 potential buyers in 23 countries<br />
                  <strong>AI contacts:</strong> Top 20 matches automatically<br />
                  <strong>Buyers respond:</strong> 6 interested<br />
                  <strong>Deals close:</strong> 3 containers sold<br />
                  <strong>Time Abebe spent:</strong> <span style={{ color: '#FFD700', fontWeight: 'bold' }}>2 hours total</span><br />
                  <strong>Revenue generated:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>$480,000</span>
                </div>
              </div>

              <Link href="/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 8px 40px rgba(139,92,246,0.5)'
              }}>
                🤖 Activate AI Buyer Matching
              </Link>

              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1.5rem' }}>
                ✓ AI works 24/7 &nbsp;•&nbsp; ✓ Finds buyers globally &nbsp;•&nbsp; ✓ $500 only when deal closes
              </p>
            </div>
          </div>
        </section>

        {/* How AI Works */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            How The <span style={{ color: '#a78bfa' }}>AI</span> Works Its Magic
          </h2>

          {[
            {
              step: '🎯',
              title: 'You List Your Product (5 minutes)',
              desc: 'Ethiopian coffee, Nigerian sesame, Ghana cocoa, whatever you export. Add photos, specs, certifications.',
              tech: 'Standard listing'
            },
            {
              step: '🔍',
              title: 'AI Scans Global Markets (Instant)',
              desc: 'Searches import databases, LinkedIn, trade directories, customs records across 180+ countries.',
              tech: 'Web scraping + APIs'
            },
            {
              step: '🎲',
              title: 'AI Scores Every Match (2 minutes)',
              desc: 'Analyzes 50+ factors: volume needs, price range, quality requirements, payment history. Ranks buyers 0-100%.',
              tech: 'Machine learning algorithm'
            },
            {
              step: '✉️',
              title: 'AI Contacts Top Matches (Automatic)',
              desc: 'Sends personalized introduction emails to top 20 buyers. Customizes message based on their company profile.',
              tech: 'GPT-4 personalization'
            },
            {
              step: '📊',
              title: 'You See Responses (Real-time)',
              desc: 'Dashboard shows which buyers opened email, clicked link, expressed interest. AI highlights hot leads.',
              tech: 'Real-time tracking'
            },
            {
              step: '🤝',
              title: 'You Close Deals (Human Touch)',
              desc: 'AI schedules video calls. You negotiate final terms. AI assists with pricing suggestions. Deal closes on platform.',
              tech: 'AI-assisted negotiation'
            }
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '2.5rem',
              background: 'rgba(139,92,246,0.05)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '1.25rem',
              padding: '2rem',
              alignItems: 'start'
            }}>
              <div style={{
                fontSize: '3rem',
                flexShrink: 0
              }}>
                {step.step}
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.7', marginBottom: '0.75rem' }}>
                  {step.desc}
                </p>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#7c3aed',
                  background: 'rgba(139,92,246,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  display: 'inline-block'
                }}>
                  💡 Tech: {step.tech}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Success Metrics */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(139,92,246,0.05)', borderTop: '1px solid rgba(139,92,246,0.2)', borderBottom: '1px solid rgba(139,92,246,0.2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              AI Matching <span style={{ color: '#a78bfa' }}>Performance</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              {[
                { value: '127', label: 'Avg Buyers Found', icon: '🔍' },
                { value: '30%', label: 'Match Success Rate', icon: '🎯' },
                { value: '3-5', label: 'Days to First Response', icon: '⚡' },
                { value: '24/7', label: 'AI Always Working', icon: '🤖' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: '1rem',
                  padding: '2rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#999', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            Simple, <span style={{ color: '#FFD700' }}>Fair</span> Pricing
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Free Plan */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '1.5rem',
              padding: '2.5rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#666', fontWeight: '600', marginBottom: '0.5rem' }}>
                FOR BEGINNERS
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Manual Search
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1.5rem' }}>
                FREE
              </div>
              <div style={{ color: '#aaa', marginBottom: '2rem', lineHeight: '1.8' }}>
                ✓ List unlimited products<br />
                ✓ Search buyer directory<br />
                ✓ Contact buyers manually<br />
                ✓ 3% transaction fee
              </div>
              <Link href="/signup" style={{
                display: 'block',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                Start Free
              </Link>
            </div>

            {/* AI Plan */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(255,215,0,0.1))',
              border: '2px solid rgba(139,92,246,0.5)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(139,92,246,0.3)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                🔥 RECOMMENDED
              </div>
              
              <div style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: '600', marginBottom: '0.5rem' }}>
                FOR SERIOUS EXPORTERS
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                AI Auto-Match
              </h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a78bfa' }}>
                  $500
                </div>
                <div style={{ fontSize: '0.875rem', color: '#999' }}>per successful deal</div>
              </div>
              <div style={{ color: '#e9d5ff', marginBottom: '2rem', lineHeight: '1.8',fontSize: '0.95rem' }}>
                ✓ AI scans global markets<br />
                ✓ Finds 50-200 buyers automatically<br />
                ✓ AI sends personalized intro emails<br />
                ✓ Tracks all responses in dashboard<br />
                ✓ AI negotiation assistant<br />
                ✓ Only pay when deal closes<br />
                ✓ 2% transaction fee (vs 3%)
              </div>
              <Link href="/signup" style={{
                display: 'block',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
              }}>
                Activate AI Matching
              </Link>
            </div>
          </div>
        </section>

        {/* The Math */}
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            The <span style={{ color: '#FFD700' }}>ROI</span> Is Ridiculous
          </h2>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,215,0,0.3)',
            borderRadius: '1.5rem',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '1.25rem', color: '#FFD700', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
              Example: Coffee Exporter Using AI
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#999', marginBottom: '1rem' }}>WITHOUT AI MATCHING:</div>
              <div style={{ color: '#fee2e2', lineHeight: '2', fontSize: '1rem' }}>
                Hire sales agent: $3,000/month<br />
                Trade show attendance: $5,000<br />
                Cold calling: 40 hours/month<br />
                Success rate: 5-10%<br />
                Deals closed: 1-2/month<br />
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong>Cost per deal: $4,000-8,000</strong><br />
                  <strong>Time investment: 160+ hours</strong>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(16,185,129,0.1)',
              border: '2px solid rgba(16,185,129,0.4)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6ee7b7', marginBottom: '1rem', fontWeight: 'bold' }}>
                WITH WAKILCHAT AI:
              </div>
              <div style={{ color: '#d1fae5', lineHeight: '2', fontSize: '1rem' }}>
                AI searches: Automated<br />
                AI contacts: Automated<br />
                AI qualifies: Automated<br />
                Your time: 2 hours to close<br />
                Success rate: 30%<br />
                Deals closed: 3-5/month<br />
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(16,185,129,0.4)' }}>
                  <strong>Cost per deal: $500 (AI fee)</strong><br />
                  <strong>Time investment: 2 hours</strong>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              ROI: Save $3,500-7,500 per deal + 158 hours/month
            </div>
          </div>
        </section>

        {/* What AI Can Match */}
        <section style={{ padding: '4rem 2rem', background: 'rgba(139,92,246,0.03)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
              AI Matches <span style={{ color: '#a78bfa' }}>Any</span> African Export
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '☕', category: 'Agricultural', products: 'Coffee, Sesame, Cocoa, Cashew, Tea, Spices' },
                { icon: '🚗', category: 'Vehicles', products: 'Cars, Trucks, Buses, Parts, Motorcycles' },
                { icon: '💎', category: 'Minerals', products: 'Gold, Diamonds, Lithium, Tantalum, Cobalt' },
                { icon: '🏭', category: 'Manufactured', products: 'Textiles, Leather, Furniture, Machinery' },
                { icon: '🎨', category: 'Artisan', products: 'Art, Crafts, Musical Instruments, Fashion' },
                { icon: '🐟', category: 'Seafood', products: 'Frozen Fish, Shrimp, Lobster, Tuna' }
              ].map((cat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: '1rem',
                  padding: '2rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.75rem' }}>
                    {cat.category}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    {cat.products}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '1rem' }}>
                + 1,000+ other product categories
              </p>
              <p style={{ fontSize: '1rem', color: '#999' }}>
                If it exports from Africa, our AI can find buyers for it.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '4rem 2rem 6rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Stop Searching. <br />
              Let <span style={{ color: '#a78bfa' }}>AI</span> Find Buyers for You.
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '2rem' }}>
              List your export products. AI does the rest. Get your first buyer in 3-5 days.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              padding: '1.5rem 3rem',
              borderRadius: '50px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 8px 40px rgba(139,92,246,0.5)'
            }}>
              🤖 Activate AI Now
            </Link>
            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
              First deal FREE • Then $500 per successful match • No monthly fees
            </p>
          </div>
        </section>
      </div>
    </>
  );
}