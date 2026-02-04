import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - WakilChat™</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#FFD700', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
            ← Back to Home
          </Link>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#999', marginBottom: '3rem' }}>
            Last updated: February 4, 2026
          </p>

          <div style={{ lineHeight: '1.8', color: '#ccc' }}>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                Your Privacy Matters
              </h2>
              <p>
                WakilChat™ ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, 
                use, and safeguard your personal information.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                1. Information We Collect
              </h2>
              
              <h3 style={{ color: 'white', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Personal Information:
              </h3>
              <ul style={{ paddingLeft: '2rem' }}>
                <li>Name, email address, phone number</li>
                <li>Business name and details</li>
                <li>Payment information (encrypted)</li>
                <li>Government ID (for verification)</li>
              </ul>

              <h3 style={{ color: 'white', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Usage Data:
              </h3>
              <ul style={{ paddingLeft: '2rem' }}>
                <li>Device information (IP address, browser type)</li>
                <li>Usage analytics (pages visited, features used)</li>
                <li>Transaction history</li>
                <li>Communication logs</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                2. How We Use Your Information
              </h2>
              <ul style={{ paddingLeft: '2rem' }}>
                <li>Provide and maintain the Service</li>
                <li>Process transactions and payments</li>
                <li>Send important notifications</li>
                <li>Prevent fraud and ensure security</li>
                <li>Improve AI matching algorithms</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                3. Data Security
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                We implement industry-standard security measures:
              </p>
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1fae5' }}>
                  <li>🔒 End-to-end encryption for sensitive data</li>
                  <li>🛡️ PCI-DSS compliant payment processing</li>
                  <li>🔐 Two-factor authentication available</li>
                  <li>🚨 24/7 security monitoring</li>
                  <li>💾 Regular security audits</li>
                  <li>🔑 Encrypted data at rest and in transit</li>
                </ul>
              </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                4. Data Sharing
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                We do NOT sell your personal data. We may share information with:
              </p>
              <ul style={{ paddingLeft: '2rem' }}>
                <li><strong>Service Providers:</strong> Payment processors, cloud hosting, analytics</li>
                <li><strong>Business Partners:</strong> Logistics partners for fulfillment</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
              </ul>
              <p style={{ marginTop: '1rem', fontWeight: '600', color: '#10b981' }}>
                ✓ We NEVER share with advertisers or data brokers
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                5. Your Rights
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                You have the right to:
              </p>
              <ul style={{ paddingLeft: '2rem' }}>
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request data deletion</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Contact <strong style={{ color: '#FFD700' }}>privacy@wakilchat.com</strong> to exercise these rights.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                6. Cookies & Tracking
              </h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and improve the Service. 
                You can control cookies through your browser settings.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                7. Children's Privacy
              </h2>
              <p>
                Our Service is not intended for users under 18. We do not knowingly collect information from children. 
                If you believe a child has provided us with data, contact us immediately.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                8. International Data Transfers
              </h2>
              <p>
                Your data may be transferred to and processed in countries outside your own. We ensure appropriate safeguards 
                are in place to protect your information in compliance with applicable laws.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                9. Updates to Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with updated date. 
                Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                10. Contact Us
              </h2>
              <p>
                Questions or concerns about privacy?
              </p>
              <div style={{
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginTop: '1rem'
              }}>
                <p><strong>Email:</strong> privacy@wakilchat.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@wakilchat.com</p>
                <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
              </div>
            </section>

            <div style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#666'
            }}>
              <p>© 2026 WakilChat™. All Rights Reserved.</p>
              <div style={{ marginTop: '1rem' }}>
                <Link href="/terms" style={{ color: '#FFD700', marginRight: '2rem' }}>Terms of Service</Link>
                <Link href="/privacy" style={{ color: '#FFD700' }}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}