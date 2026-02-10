import { useState } from 'react';
import Head from 'next/head';

export default function OutreachAdmin() {
  const [emails, setEmails] = useState('');
  const [template, setTemplate] = useState('supplier');
  const [sent, setSent] = useState(0);

  const templates = {
    supplier: `Subject: Stop Paying Brokers 40%

First 100 suppliers get 0% fees forever.
You save $200k+/year.
Spot #47 available.

wakilchat.com/founder-supplier`,
    
    buyer: `Subject: Source African Products Direct - 30% Savings

Direct from suppliers. No markup.
Quality verified. Escrow protected.

wakilchat.com/export`,
    
    investor: `Subject: $2M Seed Round - Close $75B Broker Gap

AI platform. $149B market. Pre-launch.
20 committed customers. Q2 2026 launch.

wakilchat.com + deck attached`
  };

  return (
    <>
      <Head><title>Outreach Manager - WakilChat™</title></Head>
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#FFD700' }}>Email Outreach Manager</h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Campaign Type:</label>
            <select value={template} onChange={(e) => setTemplate(e.target.value)} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '0.5rem', color: 'white', fontSize: '1rem', width: '100%' }}>
              <option value="supplier">Supplier Outreach</option>
              <option value="buyer">Buyer Outreach</option>
              <option value="investor">Investor Outreach</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Template:</label>
            <textarea
              value={templates[template]}
              readOnly
              style={{ width: '100%', minHeight: '150px', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '0.75rem', color: 'white', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email List (one per line):</label>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="email1@example.com&#10;email2@example.com"
              style={{ width: '100%', minHeight: '200px', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '0.75rem', color: 'white', fontSize: '1rem' }}
            />
          </div>

          <button
            onClick={() => {
              const count = emails.split('\n').filter(e => e.trim()).length;
              setSent(count);
              alert(`Would send to ${count} recipients (API integration needed)`);
            }}
            style={{ background: '#FFD700', color: '#000', padding: '1rem 2rem', borderRadius: '0.75rem', border: 'none', fontSize: '1.125rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Send Campaign
          </button>

          {sent > 0 && (
            <p style={{ marginTop: '1rem', color: '#10b981' }}>Sent to {sent} recipients!</p>
          )}
        </div>
      </div>
    </>
  );
}