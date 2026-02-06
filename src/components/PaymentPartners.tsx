export function PaymentPartners() {
  const partners = ['M-Pesa', 'Telebirr', 'Visa', 'Mastercard', 'Stripe', 'PayPal'];
  
  return (
    <div style={{
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.02)',
      padding: '2rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Payment Partners
      </p>
      <div style={{ display: 'flex', gap: '4rem', animation: 'scroll 30s linear infinite', whiteSpace: 'nowrap' }}>
        {[...partners, ...partners].map((name, i) => (
          <div key={i} style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.3)',
            minWidth: '150px',
            textAlign: 'center'
          }}>
            {name}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}