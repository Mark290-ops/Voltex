import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const reasons = [
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>, color:'#1a6bff', title:'Nationwide Delivery', sub:'We deliver to all 36 states across Nigeria via trusted logistics partners.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>, color:'#4800c5', title:'Easy Returns', sub:'30-day hassle-free returns on all eligible products. No questions asked.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color:'#10b92c', title:'1-Year Warranty', sub:'Every product comes with a minimum 1-year manufacturer-backed warranty.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>, color:'#f59e0b', title:'24/7 Support', sub:'Our customer care team is always available to assist you with any issues.' },
];

const WhyVoltex: React.FC = () => {
  const ref = useScrollReveal();
  return(
    <section id="why-voltex" ref={ref} style={{ background: 'var(--surface)', padding: '56px 56px', borderTop: '1px solid var(--border2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px' }}>Why shop at Voltex?</h2>
        <p style={{ fontSize: '0.93rem', color: 'var(--muted)', fontWeight: 400 }}>Nigeria's most trusted appliance destination</p>
      </div>

      <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {reasons.map(r => (
          <div key={r.title} style={{
            background: '#fff', borderRadius: '12px',
            border: '1.5px solid var(--border)',
            padding: '28px 22px', textAlign: 'center',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}18`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: r.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: r.color }}>
              {r.icon}
            </div>
            <h3 style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{r.title}</h3>
            <p style={{ fontSize: '0.76rem', fontWeight: 500, color: 'var(--muted)', lineHeight: 1.7 }}>{r.sub}</p>
          </div>
        ))}
      </div>

      <style>{`
        #why-voltex { padding: 56px 56px; }
        .why-grid { grid-template-columns: repeat(4, 1fr); }

        @media (max-width: 1024px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #why-voltex { padding: 48px 32px !important; }
        }

        @media (max-width: 600px) {
          .why-grid { grid-template-columns: 1fr !important; }
          #why-voltex { padding: 40px 20px !important; }
        }
      `}</style>
    </section>
);
};
export default WhyVoltex;