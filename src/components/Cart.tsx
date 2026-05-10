import React, { useState } from 'react';
import { CartItem } from '../type';
import { useAuth } from '../hooks/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onRemove: (id: number, model?: string) => void;
  onUpdateQuantity: (id: number, qty: number, model?: string) => void;
  onOrderComplete: () => void;
}

const fmt = (n: number) => '₦' + n.toLocaleString();
type Step = 'cart' | 'delivery' | 'payment' | 'confirmed';

const Cart: React.FC<Props> = ({ open, onClose, items, totalPrice, onRemove, onUpdateQuantity, onOrderComplete }) => {
  const { user, addOrder } = useAuth();
  const [step, setStep] = useState<Step>('cart');
  const [delivery, setDelivery] = useState({ name:'', phone:'', email:'', address:'', state:'' });
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const states = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      // Save order to user account if logged in
      const newId = 'VTX' + Math.random().toString(36).slice(2,8).toUpperCase();
      if (user && addOrder) {
        addOrder({
          items: items.map(i => ({ name: i.name, brand: i.brand, quantity: i.quantity, price: i.price, model: i.selectedModel })),
          total: totalPrice,
          deliveryAddress: `${delivery.address}, ${delivery.state}`,
        });
      }
      setOrderId(newId);
      setProcessing(false);
      setStep('confirmed');
    }, 2500);
  };

  const reset = () => {
    setStep('cart');
    setDelivery({ name:'', phone:'', email:'', address:'', state:'' });
    setOrderId('');
    onOrderComplete();
  };

  const inpStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface)',
    border: '1.5px solid var(--border)', outline: 'none',
    fontFamily: 'var(--font)', fontSize: '0.82rem',
    fontWeight: 400, color: 'var(--text)',
    padding: '10px 13px', borderRadius: '7px',
    transition: 'border-color 0.2s', marginBottom: '10px',
  };

  const deliveryComplete = delivery.name && delivery.phone && delivery.email && delivery.address && delivery.state;

  if (!open) return null;

  return (
    <>
      <div onClick={step === 'confirmed' ? reset : onClose} style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)' }} />

      <div style={{ position:'fixed', top:0, right:0, bottom:0, zIndex:500, width:'440px', maxWidth:'100vw', background:'#fff', boxShadow:'-8px 0 40px rgba(0,0,0,0.12)', transform: open ? 'translateX(0)' : 'translateX(100%)', transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)', display:'flex', flexDirection:'column' }}>

        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:'1px solid var(--border)', background:'var(--surface)', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div>
            <h2 style={{ fontSize:'0.95rem', fontWeight:800, letterSpacing:'-0.02em' }}>
              {step==='cart' ? 'Your Cart' : step==='delivery' ? 'Delivery Details' : step==='payment' ? 'Secure Checkout' : '🎉 Order Confirmed!'}
              {step==='cart' && items.length > 0 && <span style={{ color:'var(--blue)', fontWeight:500, fontSize:'0.85rem', marginLeft:'6px' }}>({items.length})</span>}
            </h2>
            {step !== 'confirmed' && (
              <div style={{ display:'flex', gap:'4px', marginTop:'6px' }}>
                {(['cart','delivery','payment'] as Step[]).map(s => (
                  <div key={s} style={{ height:'3px', width: step===s ? '20px' : '8px', borderRadius:'2px', background: step===s ? 'var(--blue)' : 'var(--border)', transition:'all 0.3s' }} />
                ))}
              </div>
            )}
          </div>
          <button onClick={step==='confirmed' ? reset : onClose} style={{ background:'var(--surface2)', border:'1px solid var(--border)', width:'32px', height:'32px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mid)', cursor:'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--surface2)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'18px 22px' }}>

          {/* CART */}
          {step==='cart' && (
            items.length === 0 ? (
              <div style={{ textAlign:'center', padding:'80px 0' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ margin:'0 auto 16px' }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <div style={{ fontSize:'0.9rem', fontWeight:700, marginBottom:'6px' }}>Your cart is empty</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>Browse our products and add items to get started</div>
              </div>
            ) : items.map(item => (
              <div key={`${item.id}-${item.selectedModel}`} style={{ display:'flex', gap:'12px', padding:'14px 0', borderBottom:'1px solid var(--border)' }}>
                <img src={item.imgPath} alt={item.name} style={{ maxWidth:'6rem', maxHeight:'6rem', objectFit:'contain' }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'0.62rem', fontWeight:700, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'2px' }}>{item.brand}</div>
                  <div style={{ fontSize:'0.78rem', fontWeight:600, color:'var(--text)', marginBottom:'3px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</div>
                  {item.selectedModel && <div style={{ fontSize:'0.65rem', color:'var(--muted)', marginBottom:'8px' }}>Model: {item.selectedModel}</div>}
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    {[['−', item.quantity-1], ['+', item.quantity+1]].map(([label, qty]) => (
                      <button key={String(label)} onClick={() => onUpdateQuantity(item.id, qty as number, item.selectedModel)} style={{ width:'26px', height:'26px', borderRadius:'6px', background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text)', cursor:'pointer', fontSize:'1rem' }}>{label}</button>
                    ))}
                    <span style={{ fontSize:'0.85rem', fontWeight:700, minWidth:'20px', textAlign:'center' }}>{item.quantity}</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'8px', flexShrink:0 }}>
                  <div style={{ fontSize:'0.92rem', fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em' }}>{fmt(item.price * item.quantity)}</div>
                  <button onClick={() => onRemove(item.id, item.selectedModel)} style={{ background:'none', color:'var(--muted)', cursor:'pointer', transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color='var(--red)'}
                    onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* DELIVERY */}
          {step==='delivery' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {[
                  { label:'Full name *', key:'name', type:'text', placeholder:'Your full name', col:'1/-1' },
                  { label:'Phone number *', key:'phone', type:'tel', placeholder:'+234 800 000 0000', col:'1' },
                  { label:'Email address *', key:'email', type:'email', placeholder:'you@email.com', col:'1' },
                  { label:'Street address *', key:'address', type:'text', placeholder:'Street address, area', col:'1/-1' },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.col }}>
                    <label style={{ fontSize:'0.68rem', fontWeight:600, color:'var(--mid)', display:'block', marginBottom:'5px' }}>{f.label}</label>
                    <input style={inpStyle} type={f.type} placeholder={f.placeholder}
                      value={delivery[f.key as keyof typeof delivery]}
                      onChange={e => setDelivery(d => ({ ...d, [f.key]: e.target.value }))}
                      onFocus={e => e.target.style.borderColor='var(--blue)'}
                      onBlur={e => e.target.style.borderColor='var(--border)'}
                    />
                  </div>
                ))}
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ fontSize:'0.68rem', fontWeight:600, color:'var(--mid)', display:'block', marginBottom:'5px' }}>State *</label>
                  <select style={{ ...inpStyle, appearance:'none' as any, cursor:'pointer' }} value={delivery.state} onChange={e => setDelivery(d => ({ ...d, state: e.target.value }))} onFocus={e => e.target.style.borderColor='var(--blue)'} onBlur={e => e.target.style.borderColor='var(--border)'}>
                    <option value="">Select your state</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', padding:'14px', marginTop:'4px' }}>
                <div style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>Order summary</div>
                {items.map(item => (
                  <div key={`${item.id}-${item.selectedModel}`} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.74rem', color:'var(--mid)', marginBottom:'6px' }}>
                    <span>{item.name}{item.selectedModel ? ` (${item.selectedModel})` : ''} × {item.quantity}</span>
                    <span style={{ fontWeight:600, color:'var(--text)' }}>{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div style={{ borderTop:'1px solid var(--border)', marginTop:'8px', paddingTop:'8px', display:'flex', justifyContent:'space-between', fontSize:'0.82rem', fontWeight:800 }}>
                  <span>Total</span><span style={{ color:'var(--blue)' }}>{fmt(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {step==='payment' && (
            <div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', padding:'14px', marginBottom:'16px' }}>
                <div style={{ fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', marginBottom:'8px', letterSpacing:'0.05em' }}>DELIVERING TO</div>
                <div style={{ fontSize:'0.82rem', fontWeight:600, color:'var(--text)' }}>{delivery.name}</div>
                <div style={{ fontSize:'0.76rem', color:'var(--muted)', marginTop:'2px' }}>{delivery.address}, {delivery.state}</div>
                <div style={{ fontSize:'0.76rem', color:'var(--muted)' }}>{delivery.phone}</div>
              </div>
              <div style={{ background:'var(--blue-lt)', border:'1.5px solid var(--blue)', borderRadius:'10px', padding:'16px', marginBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:'0.7rem', fontWeight:600, color:'var(--blue)', marginBottom:'3px', letterSpacing:'0.05em' }}>AMOUNT TO PAY</div>
                  <div style={{ fontSize:'1.5rem', fontWeight:900, color:'var(--text)', letterSpacing:'-0.03em' }}>{fmt(totalPrice)}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'0.65rem', color:'var(--muted)' }}>Secured by</div>
                  <div style={{ fontSize:'0.8rem', fontWeight:800, color:'#00b8f1' }}>Paystack</div>
                </div>
              </div>
              <div style={{ fontSize:'0.7rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.08em', marginBottom:'10px' }}>ACCEPTED PAYMENT METHODS</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginBottom:'20px' }}>
                {[{ label:'Debit/Credit Card', icon:'💳' },{ label:'Bank Transfer', icon:'🏦' },{ label:'USSD', icon:'📱' }].map(m => (
                  <div key={m.label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', padding:'12px 8px', textAlign:'center' }}>
                    <div style={{ fontSize:'1.4rem', marginBottom:'5px' }}>{m.icon}</div>
                    <div style={{ fontSize:'0.65rem', fontWeight:600, color:'var(--mid)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:'8px', alignItems:'center', justifyContent:'center', marginBottom:'16px', flexWrap:'wrap' }}>
                {[{ label:'paystack', color:'#00b8f1', bg:'#e8f8ff' },{ label:'VISA', color:'#1a1f71', bg:'#f0f2ff' },{ label:'Mastercard', color:'#eb001b', bg:'#fff0f0' },{ label:'verve', color:'#10b981', bg:'#f0fff8' }].map(p => (
                  <div key={p.label} style={{ background:p.bg, border:`1px solid ${p.color}25`, borderRadius:'5px', padding:'4px 10px' }}>
                    <span style={{ fontSize:'0.72rem', fontWeight:800, color:p.color }}>{p.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:'6px', alignItems:'flex-start', padding:'10px 12px', background:'#f0fff8', border:'1px solid #10b98130', borderRadius:'7px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" style={{ flexShrink:0, marginTop:'1px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontSize:'0.7rem', color:'#059669', lineHeight:1.6 }}>Your payment is encrypted and secured by Paystack. We never store your card details.</span>
              </div>
            </div>
          )}

          {/* CONFIRMED */}
          {step==='confirmed' && (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <div style={{ width:'72px', height:'72px', background:'var(--green)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--text)', marginBottom:'8px', letterSpacing:'-0.02em' }}>Order placed!</h3>
              <div style={{ fontSize:'0.82rem', color:'var(--muted)', marginBottom:'24px', lineHeight:1.7 }}>
                Your order has been confirmed. A confirmation email has been sent to <strong style={{ color:'var(--text)' }}>{delivery.email}</strong>
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', padding:'16px', marginBottom:'20px', textAlign:'left' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                  <span style={{ fontSize:'0.72rem', color:'var(--muted)', fontWeight:500 }}>Order number</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:800, color:'var(--blue)' }}>{orderId}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                  <span style={{ fontSize:'0.72rem', color:'var(--muted)', fontWeight:500 }}>Total paid</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:800, color:'var(--text)' }}>{fmt(totalPrice)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ fontSize:'0.72rem', color:'var(--muted)', fontWeight:500 }}>Delivery to</span>
                  <span style={{ fontSize:'0.72rem', fontWeight:600, color:'var(--text)', textAlign:'right', maxWidth:'200px' }}>{delivery.address}, {delivery.state}</span>
                </div>
              </div>
              {user && <div style={{ fontSize:'0.78rem', color:'var(--muted)', lineHeight:1.7 }}>Track your order from <strong style={{ color:'var(--blue)' }}>Account → My Orders</strong></div>}
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'confirmed' && (
          <div style={{ padding:'16px 22px', borderTop:'1px solid var(--border)', background:'var(--surface)', flexShrink:0 }}>
            {step==='cart' && items.length > 0 && (
              <>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
                  <span style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--mid)' }}>Subtotal ({items.reduce((s,i)=>s+i.quantity,0)} items)</span>
                  <span style={{ fontSize:'1.15rem', fontWeight:900, color:'var(--text)', letterSpacing:'-0.02em' }}>{fmt(totalPrice)}</span>
                </div>
                <div style={{ fontSize:'0.66rem', color:'var(--muted)', marginBottom:'14px' }}>Delivery fee calculated at checkout</div>
                <button onClick={() => setStep('delivery')} style={{ width:'100%', padding:'13px', background:'var(--blue)', color:'#fff', fontSize:'0.85rem', fontWeight:700, borderRadius:'8px', transition:'background 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', cursor:'pointer', marginBottom:'8px' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--blue-dk)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--blue)'}
                >
                  Proceed to checkout
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
                <button onClick={onClose} style={{ width:'100%', padding:'10px', background:'transparent', color:'var(--mid)', fontSize:'0.78rem', fontWeight:500, border:'1px solid var(--border)', borderRadius:'8px', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--text)'; e.currentTarget.style.color='var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--mid)'; }}
                >Continue shopping</button>
              </>
            )}
            {step==='delivery' && (
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={() => setStep('cart')} style={{ flex:1, padding:'12px', background:'transparent', color:'var(--mid)', fontSize:'0.82rem', fontWeight:600, border:'1px solid var(--border)', borderRadius:'8px', cursor:'pointer' }}>← Back</button>
                <button onClick={() => setStep('payment')} disabled={!deliveryComplete} style={{ flex:2, padding:'12px', background:'var(--blue)', color:'#fff', fontSize:'0.82rem', fontWeight:700, borderRadius:'8px', cursor: deliveryComplete ? 'pointer' : 'not-allowed', opacity: deliveryComplete ? 1 : 0.5, transition:'background 0.2s' }}
                  onMouseEnter={e => { if (deliveryComplete) e.currentTarget.style.background='var(--blue-dk)'; }}
                  onMouseLeave={e => e.currentTarget.style.background='var(--blue)'}
                >Continue to payment →</button>
              </div>
            )}
            {step==='payment' && (
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={() => setStep('delivery')} style={{ flex:1, padding:'12px', background:'transparent', color:'var(--mid)', fontSize:'0.82rem', fontWeight:600, border:'1px solid var(--border)', borderRadius:'8px', cursor:'pointer' }}>← Back</button>
                <button onClick={handlePay} disabled={processing} style={{ flex:2, padding:'12px', background: processing ? 'var(--green)' : 'var(--blue)', color:'#fff', fontSize:'0.82rem', fontWeight:700, borderRadius:'8px', transition:'background 0.3s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', cursor: processing ? 'not-allowed' : 'pointer' }}>
                  {processing ? (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Processing...</>
                  ) : `Pay ${fmt(totalPrice)} →`}
                </button>
              </div>
            )}
          </div>
        )}
        {step==='confirmed' && (
          <div style={{ padding:'16px 22px', borderTop:'1px solid var(--border)', flexShrink:0 }}>
            <button onClick={reset} style={{ width:'100%', padding:'13px', background:'var(--blue)', color:'#fff', fontSize:'0.85rem', fontWeight:700, borderRadius:'8px', cursor:'pointer', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--blue-dk)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--blue)'}
            >Continue shopping</button>
          </div>
        )}

        <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
      </div>
    </>
  );
};

export default Cart;
