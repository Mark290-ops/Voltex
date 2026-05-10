import React, { useState } from 'react';
import { brands } from '../data';
import useScrollReveal from '../hooks/useScrollReveal';


const Brands: React.FC = () => {
  const ref = useScrollReveal();
  return(
    <section id="brands" ref={ref} style={{
      background: 'white',
      padding: '56px 56px',
      borderBottom: '1px solid var(--border2)',
    }}>
      <h2 style={{
        fontSize: '1.75rem', fontWeight: 800,
        letterSpacing: '-0.03em', color: 'var(--text)',
        marginBottom: '6px',
      }}>Shop by brand</h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '28px', fontWeight: 400 }}>
        Official stockists for 5 trusted brands
      </p>

      <div className="brands-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
        {brands.map(b => <BrandCard key={b.id} brand={b} />)}
      </div>

      <style>{`
        #brands { padding: 56px 56px; }
        .brands-grid { grid-template-columns: repeat(5, 1fr); }

        
        @media (max-width: 768px) {
          #brands { padding: 90px 58px !important; }
          .brands-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        
        @media (max-width: 600px) {
          #brands { padding: 32px 20px !important; }
          .brands-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .brand-card { aspect-ratio: 5.6/3 !important; min-height: 80px !important; }
        }
      `}</style>
    </section>
  );
};
const BrandCard: React.FC<{ brand: typeof brands[0] }> = ({ brand: b }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${b.id}`}
      className="brand-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: b.bg,
        borderRadius: '7px',
        aspectRatio: '5.6/3',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Logo — centered */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}>
        
        <img
            src={b.logo}
            alt={b.name}
            style={{
              maxHeight: '90px', maxWidth: '100%',
              objectFit: 'contain',
              filter: b.light ? 'none' : 'brightness(0) invert(1)',
              opacity: hovered ? 1 : 0.85,
              transition: 'opacity 0.2s',
            }}
          />
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: '12px', left: '14px', right: '14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 1,
      }}>
        <span style={{
          fontSize: '0.65rem', fontWeight: 500,
          color: b.light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.5)',
        }}>{b.tagline}</span>
        <span style={{
          fontSize: '0.7rem',
          color: b.light ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
          transform: hovered ? 'translateX(3px)' : 'none',
          transition: 'transform 0.2s',
        }}>→</span>
      </div>
    </a>
  );
};

export default Brands;