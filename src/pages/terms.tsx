import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service - WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#FFD700', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
            ← Back to Home
          </Link>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Terms of Service
          </h1>
          <p style={{ color: '#999', marginBottom: '3rem' }}>
            Last updated: February 4, 2026
          </p>

          <div style={{ lineHeight: '1.8', color: '#ccc' }}>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                1. Agreement to Terms
              </h2>
              <p>
                By accessing WakilChat™ ("Platform", "Service", "we", "us", or "our"), you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                2. Use License & Restrictions
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                WakilChat grants you a personal, non-exclusive, non-transferable, limited license to use the Platform for legitimate business purposes.
              </p>
              <p style={{ marginBottom: '1rem', color: '#fca5a5', fontWeight: '600' }}>
                You may NOT:
              </p>
              <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
                <li>Reverse engineer, decompile, or disassemble the Platform</li>
                <li>Copy, modify, or create derivative works</li>
                <li>Use automated systems to scrape or data mine</li>
                <li>Engage in fraudulent activities</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                3. Intellectual Property
              </h2>
              <p>
                The Platform, including all content, features, and functionality, is owned by WakilChat™ and protected by international 
                copyright, trademark, patent, and other intellectual property laws.
              </p>
              <p style={{ marginTop: '1rem', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(239,68,68,0.3)' }}>
                <strong style={{ color: '#fca5a5' }}>⚠️ Unauthorized use is monitored and prosecuted.</strong> 
                Violations will result in immediate account termination and legal action.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                4. User Accounts
              </h2>
              <p>
                You are responsible for safeguarding your account credentials. You agree to notify us immediately of any unauthorized access.
                WakilChat cannot be held liable for losses from unauthorized account use.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                5. Payments & Escrow
              </h2>
              <p>
                All transactions are processed through our secure escrow system. Funds are held until delivery confirmation and satisfaction period completion.
              </p>
              <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li><strong>Transaction Fees:</strong> 2-5% depending on category</li>
                <li><strong>AI Matching Fee:</strong> $500 per successful match (optional)</li>
                <li><strong>Escrow Period:</strong> 7 days after delivery</li>
                <li><strong>Refund Policy:</strong> Full refund if product doesn't match description</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                6. Seller Obligations
              </h2>
              <p>
                Sellers agree to:
              </p>
              <ul style={{ paddingLeft: '2rem' }}>
                <li>Provide accurate product descriptions</li>
                <li>Ship items within agreed timeframe</li>
                <li>Maintain quality standards</li>
                <li>Respond to buyer inquiries promptly</li>
                <li>Honor warranty commitments</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                7. Prohibited Activities
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                The following are strictly prohibited:
              </p>
              <ul style={{ paddingLeft: '2rem', color: '#fca5a5' }}>
                <li>Selling counterfeit or illegal products</li>
                <li>Money laundering or fraud</li>
                <li>Harassment or abusive behavior</li>
                <li>Manipulation of ratings or reviews</li>
                <li>Circumventing platform fees</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Penalty:</strong> Immediate account suspension and legal action.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                8. Limitation of Liability
              </h2>
              <p>
                WakilChat provides the Platform "as is" without warranties. We are not liable for indirect, incidental, or consequential damages 
                arising from your use of the Service. Maximum liability is limited to fees paid in the last 12 months.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                9. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved through arbitration in Dubai.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                10. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Continued use constitutes acceptance of modified terms.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                11. Contact Us
              </h2>
              <p>
                Questions about these Terms?
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Email:</strong> legal@wakilchat.com<br />
                <strong>Address:</strong> Dubai, United Arab Emirates
              </p>
            </section>

            <div style={{
              background: 'rgba(255,215,0,0.1)',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '4rem'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#FFD700' }}>
                © 2026 WakilChat™. All Rights Reserved. Patent Pending. Trademark Pending.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                Unauthorized copying, distribution, or use is monitored and will be prosecuted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}