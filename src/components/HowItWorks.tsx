import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';


const steps = [
  { n:'01', color:'#1a6bff', title:'Add to cart',         sub:'Browse products, pick your model and size, then add to your cart.',                          icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { n:'02', color:'#4800c5', title:'Enter delivery details',sub:'Your full name, phone number, delivery address and state. We deliver to all 36 states.',   icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { n:'03', color:'#10b92c', title:'Pay securely',          sub:'Checkout via Paystack. Pay by card, bank transfer or USSD. All transactions are encrypted.', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { n:'04', color:'#f59e0b', title:'Track & receive',       sub:'Get your order confirmation by email. Track your delivery status in your account dashboard.', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> },
];

const HowItWorks: React.FC = () => {
  const ref = useScrollReveal();
  return(
    <section id="how-it-works" ref={ref} style={{ background: '#fff', padding: '64px 56px', borderTop: '1px solid var(--border2)' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>Checkout</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px' }}>How it works</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 400 }}>From browsing to delivery in 4 simple steps</p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Connecting gradient line — hidden on mobile via className */}
        <div className="how-line" style={{
          position: 'absolute', top: '24px', left: '24px', right: '24px', height: '2px',
          background: 'linear-gradient(to right, #1a6bff, #6366f1, #10b981, #f59e0b)',
          opacity: 0.2, borderRadius: '1px',
        }} />

        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', position: 'relative' }}>
          {steps.map(s => (
            <div key={s.n} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '24px 20px',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}18`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: '16px' }}>{s.icon}</div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: s.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>Step / {s.n}</div>
              <h3 style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.76rem', fontWeight: 500, color: 'var(--muted)', lineHeight: 1.75 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #how-it-works { padding: 64px 56px; }
        .how-grid { grid-template-columns: repeat(4, 1fr); }

        @media (max-width: 1024px) {
          .how-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-line { display: none !important; }
          #how-it-works { padding: 48px 32px !important; }
        }

        @media (max-width: 600px) {
          .how-grid { grid-template-columns: 1fr !important; }
          #how-it-works { padding: 40px 20px !important; }
        }
      `}</style>
    </section>
  );
};
export default HowItWorks;