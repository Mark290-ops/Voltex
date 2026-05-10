import React, { useState, useEffect } from 'react';

interface Props {
  totalItems: number;
  onCartClick: () => void;
  onAccountClick: () => void;
}

const Navbar: React.FC<Props> = ({ totalItems, onCartClick, onAccountClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Brands',     href: '#brands'     },
    { label: 'Categories', href: '#categories' },
    { label: 'Products',   href: '#products'   },
    { label: 'Support',    href: '#support'    },
    { label: 'Deals🔥',   href: '#products', red: true },
  ];

  const iconBtn: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    width: '40px', height: '40px', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 300,
        background: 'var(--dark)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ padding: '0 56px', display: 'flex', alignItems: 'center', gap: '20px', height: '64px' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0, textDecoration: 'none' }}>
            <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '13px solid var(--blue)' }} />
            <span style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
              Volt<span style={{ color: 'var(--blue)' }}>ex</span>
            </span>
          </a>

          {/* Nav links */}
          <div className="nav-links" style={{ display: 'flex', gap: '2px', flex: 1 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} style={{
                fontSize: '0.85rem', fontWeight: 800,
                color: l.red ? 'var(--red)' : 'rgba(255,255,255,0.45)',
                padding: '8px 14px', borderRadius: '6px',
                letterSpacing: '0.02em', transition: 'all 0.2s',
                textDecoration: 'none',
              }}
                onMouseEnter={e => { if (!l.red) e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = l.red ? 'var(--red)' : 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent'; }}
              >{l.label}</a>
            ))}
          </div>

          {/* Search bar */}
          <div className="nav-search" style={{ display: 'flex', maxWidth: '260px', flex: 1 }}>
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRight: 'none', outline: 'none',
                fontFamily: 'var(--font)', fontSize: '0.8rem',
                color: '#fff', padding: '9px 14px',
                borderRadius: '6px 0 0 6px', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(26,107,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
            <button style={{
              background: 'var(--blue)', border: 'none',
              padding: '9px 14px', borderRadius: '0 6px 6px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dk)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          {/* Action icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>

            {/* Cart */}
            <button onClick={onCartClick} style={{ ...iconBtn, position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,107,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(26,107,255,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'var(--blue)', color: '#fff',
                  borderRadius: '50%', width: '18px', height: '18px',
                  fontSize: '0.6rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--dark)',
                }}>{totalItems}</div>
              )}
            </button>

            {/* Account */}
            <button onClick={onAccountClick} style={iconBtn}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            {/* Hamburger */}
            <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
              ...iconBtn, display: 'none',
            }}>
              {menuOpen
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 299,
          background: 'var(--dark)', padding: '80px 24px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: '1.1rem', fontWeight: 600,
              color: l.red ? 'var(--red)' : '#fff',
              padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
              textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onAccountClick(); }} style={{
            marginTop: '20px', padding: '14px',
            background: 'var(--blue)', color: '#fff',
            fontSize: '0.9rem', fontWeight: 700,
            borderRadius: '8px',
          }}>My Account</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links    { display: none !important; }
          .nav-search   { display: none !important; }
          .hamburger-btn { display: flex !important; }
          nav > div { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;