import React, { useState, useEffect } from 'react';
import { heroSlides } from '../data';



const floatingBrands = [
  { text: 'SAMSUNG', x: '68%',  y: '10%', size: '1rem',   rotate: '-6deg',  opacity: 0.07, delay: '0s'    },
  { text: 'Hisense',  x: '55%',  y: '52%', size: '1.5rem', rotate: '5deg',   opacity: 0.05, delay: '0.8s'  },
  { text: 'LG',       x: '46%',  y: '16%', size: '2rem',   rotate: '-3deg',  opacity: 0.06, delay: '1.6s'  },
  { text: 'QLINK',    x: '76%',  y: '65%', size: '0.9rem', rotate: '7deg',   opacity: 0.05, delay: '0.4s'  },
  { text: 'QASA',     x: '34%',  y: '68%', size: '1.1rem', rotate: '-4deg',  opacity: 0.05, delay: '1.2s'  },
  { text: 'SAMSUNG',  x: '60%',  y: '33%', size: '0.8rem', rotate: '9deg',   opacity: 0.04, delay: '2s'    },
  { text: 'LG',       x: '82%',  y: '28%', size: '1.3rem', rotate: '-8deg',  opacity: 0.04, delay: '0.6s'  },
  { text: 'QASA',     x: '22%',  y: '38%', size: '0.85rem',rotate: '4deg',   opacity: 0.04, delay: '1.4s'  },
  { text: 'Hisense',  x: '72%',  y: '78%', size: '0.9rem', rotate: '-5deg',  opacity: 0.04, delay: '1.8s'  },
  { text: 'Hisense',     x: '90%', y: '50%', size: '0.8rem', rotate: '-9deg',  opacity: 0.04, delay: '1.4s' },
  { text: 'DuraVolt',     x: '50%', y: '6%', size: '0.8rem', rotate: '4deg',  opacity: 0.04, delay: '1.4s'  },
  { text: 'DuraVolt',     x: '85%', y: '6%', size: '0.8rem', rotate: '4deg',  opacity: 0.04, delay: '1.4s'  },

];

const Hero: React.FC = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const s = heroSlides[active];

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(p => (p + 1) % heroSlides.length);
        setAnimating(false);
      }, 300);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 300);
  };

  return (
    <section id="hero" style={{
      background: s.bg,
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.8s ease',
    }}>
      {/* Floating animation keyframes */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50%       { transform: translateY(-14px) rotate(var(--rot)); }
        }
        .floating-brand {
          position: absolute;
          font-weight: 900;
          color: #ffffff;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          animation: floatUp 6s ease-in-out infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          #hero { min-height: 85vh !important; }
          .hero-content { padding: 60px 24px 80px !important; }
        }
      `}</style>

      
      {/* Floating brand names */}
      {floatingBrands.map((b, i) => (
        <div
          key={i}
          className="floating-brand"
          style={{
            left: b.x,
            top: b.y,
            fontSize: b.size,
            opacity: b.opacity,
            '--rot': b.rotate,
            animationDelay: b.delay,
            animationDuration: `${5 + i * 0.4}s`,
          } as React.CSSProperties}
        >{b.text}</div>
      ))}

      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '20%',
        width: '360px', height: '360px', borderRadius: '50%',
        background: `radial-gradient(circle, ${s.accent}18 0%, transparent 70%)`,
        filter: 'blur(40px)', pointerEvents: 'none',
        transition: 'background 0.8s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '10%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: `radial-gradient(circle, ${s.accent}0e 0%, transparent 70%)`,
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: 'relative', zIndex: 2,
          padding: '80px 56px',
          maxWidth: '620px',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Accent bar */}
        <div style={{
          width: '40px', height: '3px',
          background: s.accent,
          marginBottom: '28px',
          borderRadius: '2px',
          transition: 'background 0.8s ease',
        }} />

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: '20px',
          whiteSpace: 'pre-line',
        }}>{s.headline}</h1>

        <p style={{
          fontSize: '1rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.8,
          maxWidth: '480px',
          marginBottom: '36px',
        }}>{s.sub}</p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <a href="#products" style={{
            background: s.accent, color: '#fff',
            fontSize: '0.88rem', fontWeight: 700,
            padding: '13px 28px', borderRadius: '7px',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s, transform 0.15s',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
          >
            {s.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="#brands" style={{
            color: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.14)',
            fontSize: '0.88rem', fontWeight: 500,
            padding: '13px 28px', borderRadius: '7px',
            transition: 'all 0.2s', textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
          >{s.ctaSecondary}</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '36px',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          {[['500+','Products'],['5','Brands'],['36','States covered']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontSize: '2.0rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontWeight: 400 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '56px',
        display: 'flex', gap: '8px', zIndex: 3,
      }}>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: active === i ? '28px' : '8px',
            height: '4px', borderRadius: '2px',
            background: active === i ? s.accent : 'rgba(255,255,255,0.2)',
            transition: 'all 0.35s ease', border: 'none',
          }} />
        ))}
      </div>
    </section>
  );
};

export default Hero;