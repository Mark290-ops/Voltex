import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Footer: React.FC = () => {
  const ref = useScrollReveal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const cols = [
    {
      title: 'Brands',
      links: ['QASA Products', 'Hisense Products', 'LG Products', 'Samsung Products', 'Qlink Products'],
    },
    {
      title: 'Categories',
      links: ['Smart TVs', 'Fans & Cooling', 'Air Conditioners', 'Washing Machines', 'Kitchen Appliances', 'Solar Appliances'],
    },
    {
      title: 'Support',
      links: ['Track My Order', 'Report a Fault', 'Request Repair', 'Warranty Policy', 'Returns & Refunds', 'Contact Us'],
    },
    {
      title: 'Account',
      links: ['Create Account', 'Sign In', 'My Orders', 'My Profile', 'Wishlist'],
    },
  ];

  return (
    <footer ref={ref} style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.65)' }}>

      {/* Newsletter strip */}
      <div style={{
        background: 'var(--dark4)',
        padding: '40px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '5px', letterSpacing: '-0.02em' }}>
            Get exclusive deals in your inbox
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
            Be the first to know about new arrivals, flash sales and restocks.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
          <input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '12px 18px', border: 'none', outline: 'none',
              fontFamily: 'var(--font)', fontSize: '0.82rem',
              width: '260px', background: 'rgba(255,255,255,0.1)',
              color: '#fff',
            }}
          />
          <button
            onClick={handleSubscribe}
            style={{
              background: subscribed ? 'var(--green)' : '#0a0d14',
              color: '#fff', fontSize: '0.78rem', fontWeight: 700,
              padding: '12px 20px', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (!subscribed) e.currentTarget.style.background = '#1a2340'; }}
            onMouseLeave={e => { if (!subscribed) e.currentTarget.style.background = '#0a0d14'; }}
          >
            {subscribed ? '✓ Subscribed!' : (
              <>
                Subscribe
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: '64px 56px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '56px' }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid var(--blue)' }} />
              <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
                Volt<span style={{ color: 'var(--blue)' }}>ex</span>
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.9, maxWidth: '220px', marginBottom: '24px' }}>
              Nigeria's most trusted home appliance store. Official stockists for QASA, Hisense, LG, Samsung and Qlink.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: 'voltexng@gmail.com' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>, text: '0810-531-1179' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Opp. Polo Club, Eleyele, Ibadan, Oyo State.' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
                  <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '18px' }}>
                {col.title}
              </h4>
              {col.links.map(link => (
                <a key={link} href="/" style={{
                  display: 'block', fontSize: '0.78rem', fontWeight: 300,
                  color: 'rgba(255,255,255,0.45)', marginBottom: '11px',
                  transition: 'color 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {/* Copyright + social */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 300, color: 'rgba(255,255,255,0.2)', marginBottom: '10px' }}>
              © 2025 Voltex Store Nigeria Ltd. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Twitter', 'Instagram', 'Facebook', 'WhatsApp'].map(s => (
                <a key={s} href="/" style={{
                  fontSize: '0.7rem', fontWeight: 400,
                  color: 'rgba(255,255,255,0.25)',
                  transition: 'color 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Payment logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.70rem', color: 'rgba(255,255,255,0.2)', marginRight: '4px' }}>Secured by</span>

            {/* Paystack */}
            <img src="/logos/Paystack.png" alt="Mastercard" style={{ height:'20px', objectFit:'contain' }} />

            {/* Visa */}
            <img src="/logos/visa.svg" alt="Visa" style={{ height:'40px', objectFit:'contain' }} />

            {/* Mastercard */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '5px', padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eb001b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f79e1b', marginLeft: '-8px' }} />
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginLeft: '3px' }}>Mastercard</span>
            </div>

            {/* Verve */}
            <img src="/logos/verve.svg" alt="Mastercard" style={{ height:'65px', objectFit:'contain' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          footer div[style*="gridTemplateColumns: 1.8fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          footer div[style*="padding: 64px 56px"] { padding: 40px 24px 28px !important; }
          footer div[style*="padding: 40px 56px"] { padding: 28px 24px !important; flex-direction: column !important; }
          footer div[style*="gridTemplateColumns: 1.8fr"] { grid-template-columns: 1fr !important; }
          footer input { width: 200px !important; }
        }
      `}</style>

      <style>{`
      #how-it-works { padding: 64px 56px; }
      footer input { width: 200px !important; }
      footer div { grid-template-columns: repeat(4, 1fr); }

      @media (max-width: 1024px) {
      footer input { width: 200px !important; }
        footer div { grid-template-columns: repeat(2, 1fr) !important; }
        #how-it-works { padding: 48px 32px !important; }
      }

      @media (max-width: 600px) {
      footer input { width: 200px !important; }
        footer div { grid-template-columns: 1fr !important; }
        #how-it-works { padding: 40px 20px !important; }
      }
    `}</style>
    </footer>
  );
};

export default Footer;