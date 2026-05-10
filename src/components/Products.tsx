import React, { useState } from 'react';
import { products } from '../data';
import { Product } from '../type';
import useScrollReveal from '../hooks/useScrollReveal';


interface Props { addToCart: (p: Product, model?: string) => void; }

const fmt = (n: number) => '₦' + n.toLocaleString();
const brandFilters = ['All', 'QASA', 'Hisense', 'LG', 'Qlink'];

// Pick 2 from each brand for a balanced default "All" view
const getFeatured = (): Product[] => {
  const byBrand: Record<string, Product[]> = {};
  products.forEach(p => {
    if (!byBrand[p.brand]) byBrand[p.brand] = [];
    byBrand[p.brand].push(p);
  });
  const featured: Product[] = [];
  Object.values(byBrand).forEach(group => {
    featured.push(...group.slice(0, 2));
  });
  return featured;
};

const Stars: React.FC<{ r: number }> = ({ r }) => (
  <span style={{ fontSize: '0.72rem' }}>
    {'★'.repeat(Math.floor(r))}<span style={{ color: 'var(--border)' }}>{'★'.repeat(5 - Math.floor(r))}</span>
  </span>
);

const Products: React.FC<Props> = ({ addToCart }) => {
  const ref = useScrollReveal();
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // "All" shows 2 per brand balanced; specific brand shows all of that brand
  const filtered = filter === 'All'
    ? (showAll ? products : getFeatured())
    : products.filter(p => p.brand.toLowerCase() === filter.toLowerCase());

  const visible = filter === 'All'
    ? filtered
    : (showAll ? filtered : filtered.slice(0, 8));

  return (
    <section id="products" ref={ref} style={{ background: 'white', padding: '56px 56px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' }}>Featured products</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 400 }}>Top picks across all brands</p>
        </div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px', gap: '3px', flexWrap: 'wrap' }}>
          {brandFilters.map(f => (
            <button key={f} onClick={() => { setFilter(f); setShowAll(false); }} style={{
              fontSize: '0.75rem', fontWeight: filter === f ? 700 : 400,
              padding: '7px 16px', borderRadius: '6px',
              background: filter === f ? 'var(--blue)' : 'transparent',
              color: filter === f ? '#fff' : 'var(--mid)',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '16px', marginBottom: '28px' }}>
        {visible.map(p => <ProductCard key={`${p.id}-${filter}`} product={p} addToCart={addToCart} />)}
      </div>

      {/* View more — only show for brand-specific filters */}
      {filter !== 'All' && filtered.length > 8 && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setShowAll(!showAll)} style={{
            background: 'var(--blue)', color: '#fff',
            fontSize: '0.82rem', fontWeight: 600,
            padding: '12px 32px', borderRadius: '7px',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dk)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
          >{showAll ? 'Show less' : `View all ${filtered.length} products →`}</button>
        </div>
      )}

      {/* View all for "All" tab */}
      {filter === 'All' && !showAll && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setShowAll(true)} style={{
            background: 'var(--blue)', color: '#fff',
            fontSize: '0.82rem', fontWeight: 600,
            padding: '12px 32px', borderRadius: '7px',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dk)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
          >View all {products.length} products →</button>
        </div>
      )}

      <style>{`
        #products { padding: 56px 56px; }
        @media (max-width: 768px) { #products { padding: 36px 20px !important; } }
      `}</style>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; addToCart: (p: Product, model?: string) => void }> = ({ product: p, addToCart }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedModel, setSelectedModel] = useState(p.models?.[0]);

  const handleAdd = () => {
    if (!p.inStock) return;
    addToCart(p, selectedModel);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const brandColor = () => {
    switch (p.brand) {
      case 'QASA':    return '#c0392b';
      case 'Hisense': return '#009688';
      case 'LG':      return '#a50034';
      case 'Samsung': return '#1428a0';
      case 'Qlink':   return '#4a5568';
      default:        return 'var(--blue)';
    }
  };

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: '12px',
        border: `1.5px solid ${hovered ? 'var(--blue)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 12px 36px rgba(26,107,255,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        height: '270px',         position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.5s ease',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
      }}>
        <img src={p.imgPath} alt={p.name} style={{ width:'100%', height:'100%',objectFit:'cover', filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }} />
        {p.badge && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: p.badgeColor, color: '#fff',
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: '4px',
          }}>{p.badge}</div>
        )}
        {!p.inStock && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted)',
          }}>Out of Stock</div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: brandColor(), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>{p.brand}</div>
        <h3 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: '8px' }}>{p.name}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <span style={{ color: '#f59e0b' }}><Stars r={p.rating} /></span>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 500 }}>{p.rating} ({p.reviews})</span>
        </div>

        {p.models && p.models.length > 1 && (
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {p.models.map(m => (
              <button key={m} onClick={() => setSelectedModel(m)} style={{
                fontSize: '0.62rem', fontWeight: 500,
                padding: '3px 8px', borderRadius: '4px',
                background: selectedModel === m ? 'var(--blue-lt)' : 'var(--surface)',
                border: `1px solid ${selectedModel === m ? 'var(--blue)' : 'var(--border)'}`,
                color: selectedModel === m ? 'var(--blue)' : 'var(--mid)',
                transition: 'all 0.15s',
              }}>{m}</button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{fmt(p.price)}</span>
          {p.oldPrice && (
            <>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', textDecoration: 'line-through' }}>{fmt(p.oldPrice)}</span>
              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--red)', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>
                -{Math.round((1 - p.price / p.oldPrice!) * 100)}%
              </span>
            </>
          )}
        </div>

        <button onClick={handleAdd} style={{
          width: '100%', padding: '11px',
          background: !p.inStock ? 'var(--surface2)' : added ? 'var(--green)' : 'var(--blue)',
          color: !p.inStock ? 'var(--muted)' : '#fff',
          fontSize: '0.8rem', fontWeight: 700,
          borderRadius: '7px', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
        }}>
          {!p.inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Products;