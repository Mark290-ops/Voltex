import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Order } from '../hooks/useAuth';

type View = 'login' | 'register';
type Tab = 'profile' | 'address' | 'orders';

interface Props {
  open: boolean;
  onClose: () => void;
}

const baseInput: React.CSSProperties = {
  width: '100%', background: '#f5f6f8',
  border: '1.5px solid #e8eaf0', outline: 'none',
  fontFamily: 'var(--font)', fontSize: '0.85rem',
  fontWeight: 400, color: 'var(--text)',
  padding: '12px 14px 12px 42px',
  borderRadius: '10px', transition: 'border-color 0.2s',
};

  const Logo = () => (
      <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'24px' }}>
        <div style={{ width:0, height:0, borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderBottom:'13px solid var(--blue)' }} />
        <span style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--text)', letterSpacing:'-0.04em' }}>
          Volt<span style={{ color:'var(--blue)' }}>ex</span>
        </span>
      </div>
    );

  const CloseBtn = ({ onClose }: { onClose: () => void }) => (
      <button onClick={onClose} style={{ position:'absolute', top:'16px', right:'16px', background:'#f0f2f5', border:'none', width:'30px', height:'30px', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mid)', cursor:'pointer', zIndex:1 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    );

  const Field = ({ icon, type, placeholder, value, onChange }: { icon: React.ReactNode; type: string; placeholder: string; value: string; onChange: (v: string) => void }) => (
      <div style={{ position:'relative', marginBottom:'12px' }}>
        <div style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--muted)' }}>{icon}</div>
        <input style={baseInput} type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--blue)'}
          onBlur={e => e.target.style.borderColor = '#e8eaf0'}
        />
      </div>
    );

  const ErrBox = ({ msg }: { msg: string }) => (
      <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'8px', padding:'10px 14px', fontSize:'0.78rem', color:'var(--red)', marginBottom:'14px' }}>{msg}</div>
    );

  
  const PrimaryBtn = ({ children, onClick, loading = false }: { children: React.ReactNode; onClick: () => void; loading?: boolean }) => (
    <button onClick={onClick} disabled={loading} style={{ width:'100%', padding:'13px', background:'var(--text)', color:'#fff', fontSize:'0.9rem', fontWeight:700, borderRadius:'10px', marginBottom:'10px', transition:'background 0.2s', opacity: loading ? 0.7 : 1, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', cursor: loading ? 'not-allowed' : 'pointer' }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--blue)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--text)'; }}
    >
      {loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>}
      {children}
    </button>
  );

  const GhostBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} style={{ width:'100%', padding:'13px', background:'#f5f6f8', color:'var(--mid)', fontSize:'0.88rem', fontWeight:500, borderRadius:'10px', marginBottom:'10px', cursor:'pointer' }}>
      {children}
    </button>
  );


const AccountModal: React.FC<Props> = ({ open, onClose }) => {
  const { user, login, register, logout, addAddress, deleteAddress, setDefaultAddress } = useAuth();

  const [view, setView] = useState<View>('login');
  const [tab, setTab] = useState<Tab>('profile');

  const [lEmail, setLEmail] = useState('');
  const [lPass, setLPass]   = useState('');
  const [lErr, setLErr]     = useState('');
  const [lLoading, setLLoading] = useState(false);

  const [rFirst, setRFirst]   = useState('');
  const [rLast, setRLast]     = useState('');
  const [rEmail, setREmail]   = useState('');
  const [rPass, setRPass]     = useState('');
  const [rRepeat, setRRepeat] = useState('');
  const [rErr, setRErr]       = useState('');
  const [rLoading, setRLoading] = useState(false);

  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ label:'', fullName:'', phone:'', address:'', state:'', isDefault: false });
  const [addrErr, setAddrErr] = useState('');

  const states = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

  const handleLogin = async () => {
    setLErr('');
    if (!lEmail.trim()) { setLErr('Please enter your email address.'); return; }
    if (!lPass) { setLErr('Please enter your password.'); return; }
    setLLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const err = login(lEmail.trim(), lPass);
    setLLoading(false);
    if (err) { setLErr(err); return; }
    setLEmail(''); setLPass('');
  };

  const handleRegister = async () => {
    setRErr('');
    if (!rFirst.trim() || !rLast.trim()) { setRErr('Please enter your first and last name.'); return; }
    if (!rEmail.includes('@') || !rEmail.includes('.')) { setRErr('Please enter a valid email address.'); return; }
    if (rPass.length < 6) { setRErr('Password must be at least 6 characters.'); return; }
    if (rPass !== rRepeat) { setRErr('Passwords do not match.'); return; }
    setRLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const err = register(rFirst.trim(), rLast.trim(), rEmail.trim(), rPass);
    setRLoading(false);
    if (err) { setRErr(err); return; }
    setRFirst(''); setRLast(''); setREmail(''); setRPass(''); setRRepeat('');
  };

  const handleSaveAddress = () => {
    setAddrErr('');
    if (!addrForm.fullName.trim()) { setAddrErr('Please enter full name.'); return; }
    if (!addrForm.phone.trim()) { setAddrErr('Please enter phone number.'); return; }
    if (!addrForm.address.trim()) { setAddrErr('Please enter street address.'); return; }
    if (!addrForm.state) { setAddrErr('Please select a state.'); return; }
    addAddress({ ...addrForm, label: addrForm.label.trim() || 'Home' });
    setAddrForm({ label:'', fullName:'', phone:'', address:'', state:'', isDefault: false });
    setShowAddrForm(false);
    setAddrErr('');
  };

  const handleLogout = () => { logout(); onClose(); };

  const statusColor = (s: Order['status']) =>
    s === 'Delivered' ? '#10b981' : s === 'Shipped' ? '#1a6bff' : '#f59e0b';

  if (!open) return null;


  

  const iconUser   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  const iconLock   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  const iconMail   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const iconPin    = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const iconOrders = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>;
  const iconLogout = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(4px)' }} />

      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:700, width:'420px', maxWidth:'95vw', background:'#fff', borderRadius:'16px', boxShadow:'0 24px 60px rgba(0,0,0,0.18)', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column' }}>

        {/* ── LOGIN ── */}
        {!user && view === 'login' && (
          <div style={{ padding:'36px', overflowY:'auto', position:'relative' }}>
            <CloseBtn onClose={onClose} />
            <Logo />
            <h2 style={{ fontSize:'1.4rem', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'6px' }}>Login</h2>
            <p style={{ fontSize:'0.82rem', color:'var(--muted)', marginBottom:'24px', lineHeight:1.6 }}>Sign in to your Voltex account to track orders and manage your profile.</p>
            {lErr && <ErrBox msg={lErr} />}
            <Field icon={iconMail} type="email" placeholder="Email address" value={lEmail} onChange={setLEmail} />
            <Field icon={iconLock} type="password" placeholder="Password" value={lPass} onChange={setLPass} />
            <div style={{ textAlign:'right', marginBottom:'18px' }}>
              <span style={{ fontSize:'0.8rem', color:'var(--blue)', fontWeight:500, cursor:'pointer' }}>Forgotten Password?</span>
            </div>
            <PrimaryBtn onClick={handleLogin} loading={lLoading}>Login</PrimaryBtn>
            <GhostBtn onClick={onClose}>Continue as Guest</GhostBtn>
            <div style={{ textAlign:'center', marginTop:'6px' }}>
              <span style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Don't have an account? </span>
              <span onClick={() => { setView('register'); setLErr(''); }} style={{ fontSize:'0.82rem', color:'var(--blue)', fontWeight:600, cursor:'pointer' }}>Create account →</span>
            </div>
          </div>
        )}

        {/* ── REGISTER ── */}
        {!user && view === 'register' && (
          <div style={{ padding:'36px', overflowY:'auto', position:'relative' }}>
            <CloseBtn onClose={onClose} />
            <Logo />
            <h2 style={{ fontSize:'1.4rem', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'6px' }}>Create Account</h2>
            <p style={{ fontSize:'0.82rem', color:'var(--muted)', marginBottom:'24px' }}>Create an account to shop, track orders and manage your details.</p>
            {rErr && <ErrBox msg={rErr} />}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
              {[{ ph:'First Name', val:rFirst, set:setRFirst },{ ph:'Last Name', val:rLast, set:setRLast }].map(f => (
                <div key={f.ph} style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--muted)' }}>{iconUser}</div>
                  <input style={baseInput} type="text" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} onFocus={e => e.target.style.borderColor='var(--blue)'} onBlur={e => e.target.style.borderColor='#e8eaf0'} />
                </div>
              ))}
            </div>
            <Field icon={iconMail} type="email" placeholder="Email address" value={rEmail} onChange={setREmail} />
            <Field icon={iconLock} type="password" placeholder="Password (min. 6 characters)" value={rPass} onChange={setRPass} />
            <Field icon={iconLock} type="password" placeholder="Repeat Password" value={rRepeat} onChange={setRRepeat} />
            <PrimaryBtn onClick={handleRegister} loading={rLoading}>Create Account</PrimaryBtn>
            <div style={{ textAlign:'center', marginTop:'4px' }}>
              <span style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Already have an account? </span>
              <span onClick={() => { setView('login'); setRErr(''); }} style={{ fontSize:'0.82rem', color:'var(--blue)', fontWeight:600, cursor:'pointer' }}>Login →</span>
            </div>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {user && (
          <>
            {/* Header */}
            <div style={{ padding:'18px 22px 0', borderBottom:'1px solid var(--border)', background:'var(--surface)', flexShrink:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                <div>
                  <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em' }}>{user.firstName} {user.lastName}</div>
                  <div style={{ fontSize:'0.72rem', color:'var(--muted)', marginTop:'2px' }}>{user.email}</div>
                </div>
                {/* Close btn — top right, clearly separate from logout */}
                <button onClick={onClose} style={{ background:'#f0f2f5', border:'none', width:'30px', height:'30px', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mid)', cursor:'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              {/* Tabs row with logout at the end */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex' }}>
                  {([
                    { id:'profile' as Tab, label:'Profile',   icon: iconUser   },
                    { id:'address' as Tab, label:'Address',   icon: iconPin    },
                    { id:'orders'  as Tab, label:'My Orders', icon: iconOrders },
                  ]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                      padding:'10px 14px', background:'transparent',
                      color: tab === t.id ? 'var(--blue)' : 'var(--muted)',
                      borderBottom: tab === t.id ? '2px solid var(--blue)' : '2px solid transparent',
                      fontSize:'0.74rem', fontWeight: tab === t.id ? 700 : 400,
                      display:'flex', alignItems:'center', gap:'5px',
                      transition:'all 0.2s', marginBottom:'-1px', cursor:'pointer',
                    }}>{t.icon} {t.label}</button>
                  ))}
                </div>

                {/* Logout — clearly labeled, not overlapping anything */}
                <button onClick={handleLogout} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 12px', borderRadius:'7px', background:'#fef2f2', color:'var(--red)', fontSize:'0.72rem', fontWeight:600, border:'1px solid #fecaca', marginBottom:'2px', transition:'background 0.2s', cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#fee2e2'}
                  onMouseLeave={e => e.currentTarget.style.background='#fef2f2'}
                >{iconLogout} Logout</button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding:'22px', overflowY:'auto', flex:1 }}>

              {/* PROFILE */}
              {tab === 'profile' && (
                <div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:800, marginBottom:'4px' }}>Account Information</h3>
                  <p style={{ fontSize:'0.74rem', color:'var(--muted)', marginBottom:'16px' }}>Your personal details</p>
                  {[{ label:'First Name', value: user.firstName },{ label:'Last Name', value: user.lastName },{ label:'Email', value: user.email }].map(f => (
                    <div key={f.label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', padding:'12px 16px', marginBottom:'10px' }}>
                      <div style={{ fontSize:'0.6rem', color:'var(--muted)', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'3px' }}>{f.label}</div>
                      <div style={{ fontSize:'0.86rem', color:'var(--text)', fontWeight:500 }}>{f.value}</div>
                    </div>
                  ))}
                  <div style={{ borderTop:'1px solid var(--border)', paddingTop:'14px', marginTop:'6px' }}>
                    <h4 style={{ fontSize:'0.86rem', fontWeight:700, marginBottom:'10px' }}>Password Management</h4>
                    <button style={{ padding:'10px 18px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', fontSize:'0.8rem', fontWeight:500, color:'var(--mid)', cursor:'pointer', transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--blue)'; e.currentTarget.style.color='var(--blue)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--mid)'; }}
                    >Change Password</button>
                  </div>
                </div>
              )}

              {/* ADDRESS */}
              {tab === 'address' && (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                    <div>
                      <h3 style={{ fontSize:'0.95rem', fontWeight:800, marginBottom:'2px' }}>Delivery Addresses</h3>
                      <p style={{ fontSize:'0.72rem', color:'var(--muted)' }}>Manage your saved addresses</p>
                    </div>
                    {!showAddrForm && (
                      <button onClick={() => setShowAddrForm(true)} style={{ background:'var(--blue)', color:'#fff', fontSize:'0.72rem', fontWeight:600, padding:'8px 14px', borderRadius:'7px', cursor:'pointer', transition:'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background='var(--blue-dk)'}
                        onMouseLeave={e => e.currentTarget.style.background='var(--blue)'}
                      >+ Add Address</button>
                    )}
                  </div>

                  {showAddrForm && (
                    <div style={{ background:'var(--surface)', border:'1.5px solid var(--blue)', borderRadius:'12px', padding:'16px', marginBottom:'14px' }}>
                      <h4 style={{ fontSize:'0.86rem', fontWeight:700, marginBottom:'12px' }}>New Delivery Address</h4>
                      {addrErr && <ErrBox msg={addrErr} />}
                      {[
                        { ph:'Label (e.g. Home, Office)', key:'label', type:'text' },
                        { ph:'Full Name *', key:'fullName', type:'text' },
                        { ph:'Phone Number *', key:'phone', type:'tel' },
                        { ph:'Street Address *', key:'address', type:'text' },
                      ].map(f => (
                        <input key={f.key} type={f.type} placeholder={f.ph}
                          value={addrForm[f.key as keyof typeof addrForm] as string}
                          onChange={e => setAddrForm(a => ({ ...a, [f.key]: e.target.value }))}
                          style={{ ...baseInput, padding:'10px 12px', marginBottom:'8px' }}
                          onFocus={e => e.target.style.borderColor='var(--blue)'}
                          onBlur={e => e.target.style.borderColor='#e8eaf0'}
                        />
                      ))}
                      <select value={addrForm.state} onChange={e => setAddrForm(a => ({ ...a, state: e.target.value }))}
                        style={{ ...baseInput, padding:'10px 12px', marginBottom:'10px', appearance:'none' as any }}
                        onFocus={e => e.target.style.borderColor='var(--blue)'}
                        onBlur={e => e.target.style.borderColor='#e8eaf0'}
                      >
                        <option value="">Select State *</option>
                        {states.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <label style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.78rem', color:'var(--mid)', marginBottom:'12px', cursor:'pointer' }}>
                        <input type="checkbox" checked={addrForm.isDefault} onChange={e => setAddrForm(a => ({ ...a, isDefault: e.target.checked }))} />
                        Set as default address
                      </label>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button onClick={handleSaveAddress} style={{ flex:1, padding:'10px', background:'var(--blue)', color:'#fff', fontSize:'0.8rem', fontWeight:700, borderRadius:'8px', cursor:'pointer' }}>Save Address</button>
                        <button onClick={() => { setShowAddrForm(false); setAddrErr(''); }} style={{ flex:1, padding:'10px', background:'#f5f6f8', color:'var(--mid)', fontSize:'0.8rem', fontWeight:500, borderRadius:'8px', border:'1px solid var(--border)', cursor:'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  )}

                  {user.addresses.length === 0 && !showAddrForm ? (
                    <div style={{ background:'var(--surface)', border:'1.5px dashed var(--border)', borderRadius:'12px', padding:'32px', textAlign:'center' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ margin:'0 auto 10px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <div style={{ fontSize:'0.84rem', fontWeight:600, color:'var(--mid)', marginBottom:'4px' }}>No saved addresses</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--muted)' }}>Click "Add Address" to save a delivery address</div>
                    </div>
                  ) : user.addresses.map(addr => (
                    <div key={addr.id} style={{ background:'var(--surface)', border:`1.5px solid ${addr.isDefault ? 'var(--blue)' : 'var(--border)'}`, borderRadius:'10px', padding:'14px 16px', marginBottom:'10px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                        <div>
                          <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'5px' }}>
                            <span style={{ fontSize:'0.84rem', fontWeight:700, color:'var(--text)' }}>{addr.label}</span>
                            {addr.isDefault && <span style={{ background:'var(--blue-lt)', color:'var(--blue)', fontSize:'0.6rem', fontWeight:700, padding:'2px 7px', borderRadius:'4px' }}>Default</span>}
                          </div>
                          <div style={{ fontSize:'0.76rem', color:'var(--mid)', lineHeight:1.65 }}>{addr.fullName} · {addr.phone}<br />{addr.address}, {addr.state}</div>
                        </div>
                        <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
                          {!addr.isDefault && <button onClick={() => setDefaultAddress(addr.id)} style={{ fontSize:'0.65rem', color:'var(--blue)', background:'var(--blue-lt)', border:'none', padding:'4px 8px', borderRadius:'5px', cursor:'pointer', fontWeight:600 }}>Set default</button>}
                          <button onClick={() => deleteAddress(addr.id)} style={{ fontSize:'0.65rem', color:'var(--red)', background:'#fef2f2', border:'none', padding:'4px 8px', borderRadius:'5px', cursor:'pointer', fontWeight:600 }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ORDERS */}
              {tab === 'orders' && (
                <div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:800, marginBottom:'4px' }}>My Orders</h3>
                  <p style={{ fontSize:'0.72rem', color:'var(--muted)', marginBottom:'16px' }}>Your complete order history</p>
                  {user.orders.length === 0 ? (
                    <div style={{ background:'var(--surface)', border:'1.5px dashed var(--border)', borderRadius:'12px', padding:'36px', textAlign:'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ margin:'0 auto 12px' }}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>
                      <div style={{ fontSize:'0.86rem', fontWeight:600, color:'var(--mid)', marginBottom:'4px' }}>No orders yet</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--muted)' }}>Orders you place will appear here automatically after checkout</div>
                    </div>
                  ) : user.orders.map(order => (
                    <div key={order.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', padding:'14px 16px', marginBottom:'12px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                        <div>
                          <div style={{ fontSize:'0.82rem', fontWeight:700, color:'var(--text)' }}>#{order.id}</div>
                          <div style={{ fontSize:'0.7rem', color:'var(--muted)', marginTop:'2px' }}>{order.date}</div>
                        </div>
                        <span style={{ background: statusColor(order.status) + '18', color: statusColor(order.status), fontSize:'0.65rem', fontWeight:700, padding:'3px 10px', borderRadius:'20px', border:`1px solid ${statusColor(order.status)}30` }}>{order.status}</span>
                      </div>
                      {order.items.map((item, i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.76rem', color:'var(--mid)', marginBottom:'4px' }}>
                          <span>{item.name}{item.model ? ` (${item.model})` : ''} × {item.quantity}</span>
                          <span style={{ fontWeight:600, color:'var(--text)' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ borderTop:'1px solid var(--border)', marginTop:'10px', paddingTop:'10px', display:'flex', justifyContent:'space-between', fontSize:'0.82rem', fontWeight:800 }}>
                        <span>Total</span>
                        <span style={{ color:'var(--blue)' }}>₦{order.total.toLocaleString()}</span>
                      </div>
                      <div style={{ fontSize:'0.68rem', color:'var(--muted)', marginTop:'5px' }}>Delivering to: {order.deliveryAddress}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
      </div>
    </>
  );
};

export default AccountModal;