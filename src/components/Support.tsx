import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

type Tab = 'fault' | 'feedback' | 'repair';

const Support: React.FC = () => {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState<Tab>('fault');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '', rating: 0 });

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', phone: '', product: '', message: '', rating: 0 });
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'fault', label: 'Report a fault', color: '#df0000',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    },
    {
      id: 'feedback', label: 'Leave feedback', color: '#054fda',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    },
    {
      id: 'repair', label: 'Request repair', color: '#10b92c',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    },
  ];

  const active = tabs.find(t => t.id === activeTab)!;

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface)',
    border: '1.5px solid var(--border)', outline: 'none',
    fontFamily: 'var(--font)', fontSize: '0.84rem',
    fontWeight: 400, color: 'var(--text)',
    padding: '11px 14px', borderRadius: '7px',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="support" ref={ref} style={{ background: '#fff', padding: '64px 56px', borderTop: '1px solid var(--border2)' }}>
      <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>Customer Support</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '14px' }}>
            Have an issue with your appliance?
          </h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.85, marginBottom: '32px' }}>
            Report a fault, request a repair or share feedback. Our support team responds within 24 hours. You can also access this from your account profile at any time.
          </p>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '⚠️', bg: '#fef2f2', title: 'Report a fault', sub: 'Log issues with your appliance — our team contacts you within 24hrs.' },
              { icon: '💬', bg: '#e8f0ff', title: 'Leave feedback', sub: 'Share your purchase experience and help other customers decide.' },
              { icon: '🔧', bg: '#f0fff8', title: 'Request a repair', sub: 'Book a technician for warranty or out-of-warranty repairs.' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '14px 16px',
                display: 'flex', alignItems: 'flex-start', gap: '12px',
              }}>
                <div style={{ width: '36px', height: '36px', background: item.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                flex: 1, padding: '14px 8px',
                background: activeTab === t.id ? '#fff' : 'transparent',
                borderBottom: activeTab === t.id ? `2px solid ${t.color}` : '2px solid transparent',
                color: activeTab === t.id ? t.color : 'var(--muted)',
                fontSize: '0.72rem', fontWeight: activeTab === t.id ? 700 : 400,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                transition: 'all 0.2s', marginBottom: '-1px',
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div style={{ padding: '24px' }}>
            <div className="support-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: '5px', letterSpacing: '0.05em' }}>Full name</label>
                <input style={inputStyle} type="text" placeholder="Your name"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = active.color}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: '5px', letterSpacing: '0.05em' }}>Phone number</label>
                <input style={inputStyle} type="tel" placeholder="+234..."
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = active.color}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: '5px', letterSpacing: '0.05em' }}>Product</label>
              <input style={inputStyle} type="text" placeholder="e.g. QASA Solar Fan 18"
                value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                onFocus={e => e.target.style.borderColor = active.color}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Star rating for feedback tab */}
            {activeTab === 'feedback' && (
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>Rating</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))} style={{
                      fontSize: '1.4rem', background: 'none',
                      color: form.rating >= n ? '#f59e0b' : 'var(--border)',
                      transition: 'color 0.15s',
                    }}>★</button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: '5px', letterSpacing: '0.05em' }}>
                {activeTab === 'fault' ? 'Describe the fault' : activeTab === 'feedback' ? 'Your feedback' : 'Describe the issue'}
              </label>
              <textarea style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 } as React.CSSProperties}
                rows={4}
                placeholder={
                  activeTab === 'fault' ? 'Describe what happened and when...'
                  : activeTab === 'feedback' ? 'Tell us about your experience...'
                  : 'Describe the problem requiring repair...'
                }
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={e => e.target.style.borderColor = active.color}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button onClick={handleSubmit} style={{
              width: '100%', padding: '13px',
              background: submitted ? 'var(--green)' : active.color,
              color: '#fff', fontSize: '0.84rem', fontWeight: 700,
              borderRadius: '8px', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              letterSpacing: '0.01em',
            }}>
              {submitted ? '✓ Submitted successfully' : `Submit ${activeTab === 'fault' ? 'fault report' : activeTab === 'feedback' ? 'feedback' : 'repair request'}`}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        #support { padding: 64px 56px; }
        .support-grid { grid-template-columns: 1fr 1.2fr; gap: 64px; }
        .support-inner-grid { grid-template-columns: 1fr 1fr; }

        @media (max-width: 1024px) {
          .support-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #support { padding: 48px 32px !important; }
        }

        @media (max-width: 600px) {
          .support-inner-grid { grid-template-columns: 1fr !important; }
          #support { padding: 40px 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default Support;