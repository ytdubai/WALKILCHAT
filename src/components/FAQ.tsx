import { useState } from 'react';

const faqs = [
  {
    q: "Is WakilChat really 100% free?",
    a: "YES! WakilChat is free forever. No credit card required. No hidden fees. No premium tier. We only charge 5% when you make a sale on our marketplace - that's it."
  },
  {
    q: "How do the FREE calls work?",
    a: "Our calls use VoIP technology (Voice over Internet). As long as you have WiFi or data, you can make unlimited voice and video calls to anyone, anywhere - completely free. No airtime needed."
  },
  {
    q: "When do I get paid after a sale?",
    a: "Money is held in secure escrow for 7 days after the customer receives the item. This protects both you and the buyer. After 7 days (if no disputes), funds are released to your account automatically."
  },
  {
    q: "What payment methods can I accept?",
    a: "M-Pesa, Telebirr, bank cards, and bank transfers. Your customers can pay however they prefer - you receive everything in one place."
  },
  {
    q: "Do I need to ship products myself?",
    a: "You can! OR use our fulfillment service - ship to our warehouse, we verify quality and ship to customers. This builds trust and gets you better reviews."
  },
  {
    q: "What if a customer doesn't pay?",
    a: "Payments are collected BEFORE order processing. No payment = no order. You're 100% protected from non-payment."
  },
  {
    q: "Can I use WakilChat without internet?",
    a: "YES! You can view products, draft messages, and prepare orders offline. Everything syncs automatically when you're back online."
  },
  {
    q: "What countries is WakilChat available in?",
    a: "Currently: Nigeria, Kenya, Ethiopia, Ghana, Tanzania, Uganda, Rwanda, South Africa, and expanding. If you're in another African country, join our waitlist!"
  },
  {
    q: "How is this different from Jumia?",
    a: "WakilChat combines EVERYTHING: calls, chat, payments, shop. Jumia is just a marketplace. Plus our fees are 5% vs Jumia's 15-20%. And we have FREE unlimited calls!"
  },
  {
    q: "What's the catch?",
    a: "No catch. We make money when YOU make money (5% transaction fee). Your success is our success. That's why we give you all the tools for free."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Questions? <span style={{ color: '#FFD700' }}>Answered.</span>
        </h2>
        <p style={{ color: '#999', fontSize: '1.125rem' }}>
          Everything you need to know about WakilChat
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${openIndex === i ? '#FFD700' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '1rem',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{faq.q}</span>
              <span style={{
                fontSize: '1.5rem',
                color: '#FFD700',
                transition: 'transform 0.3s',
                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)'
              }}>
                +
              </span>
            </button>
            
            {openIndex === i && (
              <div style={{
                padding: '0 1.5rem 1.5rem',
                color: '#ccc',
                fontSize: '1rem',
                lineHeight: '1.7',
                borderTop: '1px solid rgba(255,215,0,0.2)',
                paddingTop: '1rem'
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        textAlign: 'center',
        background: 'rgba(255,215,0,0.05)',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '1rem',
        padding: '2rem'
      }}>
        <p style={{ fontSize: '1.125rem', color: '#ddd', marginBottom: '1rem' }}>
          Still have questions?
        </p>
        <p style={{ color: '#999', marginBottom: '1.5rem' }}>
          Our team is here to help 24/7
        </p>
        <a
          href="mailto:support@wakilchat.com"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            padding: '0.875rem 2rem',
            borderRadius: '50px',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(255,215,0,0.3)'
          }}
        >
          📧 Contact Support
        </a>
      </div>
    </section>
  );
}