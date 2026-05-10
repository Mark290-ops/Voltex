import React, { useState } from 'react';
import { categories } from '../data';
import useScrollReveal from '../hooks/useScrollReveal';


const Categories: React.FC = () => {
  const ref = useScrollReveal();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? categories : categories.slice(0, 8);
  const row1 = visible.slice(0, 4);
  const row2 = visible.slice(4, 8);

  return (
    <section id="categories" ref={ref} style={{
      background: 'white',
      padding: '48px 56px',
      borderTop: '8px solid var(--surface)',
      borderBottom: '1px solid var(--border2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' }}>Categories</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 400 }}>Browse by product type across all brands</p>
        </div>
      </div>

      {/* Row 1 */}
      <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '12px' }}>
        {row1.map(cat => <CategoryCard key={cat.name} cat={cat} />)}
      </div>

      {/* Row 2 */}
      {row2.length > 0 && (
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
          {row2.map(cat => <CategoryCard key={cat.name} cat={cat} />)}
        </div>
      )}

      {/* View more */}
      {categories.length > 8 && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setShowAll(!showAll)} style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--mid)',
            fontSize: '0.8rem', fontWeight: 500,
            padding: '10px 28px', borderRadius: '7px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mid)'; }}
          >{showAll ? 'Show less ↑' : 'View more categories →'}</button>
        </div>
      )}

      <style>{`
        #categories { padding: 48px 56px; }
        .cat-grid { grid-template-columns: repeat(4, 1fr); }

        /* iPad — 2 per row */
        @media (max-width: 768px) {
          #categories { padding: 36px 28px !important; }
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Phone — 2 per row (still readable) */
        @media (max-width: 600px) {
          #categories { padding: 28px 16px !important; }
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  );
};

const CategoryCard: React.FC<{ cat: typeof categories[0] }> = ({ cat }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1.5px solid ${hovered ? 'var(--blue)' : 'var(--border)'}`,
        borderRadius: '10px', overflow: 'hidden',
        cursor: 'pointer', transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 8px 24px rgba(26,107,255,0.1)' : 'none',
        transform: hovered ? 'translateY(-3px)' : 'none',
        background: '#fff',
      }}
    >
      
      <div style={{
        height: '150px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative', 
        overflow: 'hidden', // Keeps the zoom inside the box
      }}>
        <img 
          src={cat.img} 
          alt={cat.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)', // The image zooms, the box stays still
          }} 
        />
      </div>

      {/* Label */}
      <div style={{
        padding: '10px 12px',
        borderTop: `1px solid ${hovered ? 'rgba(26,107,255,0.15)' : 'var(--border)'}`,
        transition: 'border-color 0.2s',
      }}>
        <div style={{
          fontSize: '0.84rem', fontWeight: 700,
          color: hovered ? 'var(--blue)' : 'var(--text)',
          marginBottom: '3px', transition: 'color 0.2s',
        }}>{cat.name}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 400 }}>{cat.brands}</div>
      </div>
    </div>
  );
};

export default Categories;