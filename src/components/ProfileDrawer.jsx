import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL, ADMIN_CONSOLE_URL } from '../apiConfig';
import { AuthContext } from '../context/AuthContext';
import { X, ShoppingBag, Clock, User, LogOut, RefreshCw, ChevronRight, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

const ProfileDrawer = ({ isOpen, onClose }) => {
  const { user, logout, login } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      fetchBookings();
      setEditForm({
        full_name: user.full_name,
        email: user.email,
        phone: user.phone || '',
        location: user.location || ''
      });
    }
  }, [user, isOpen]);

  const handleUpdateProfile = async () => {
    setEditLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/update-profile/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user); // Update global auth context
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert(data.error || 'Failed to update');
      }
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setEditLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'WAITING': return '#F5A623';
      case 'ACCEPTED': return '#5C62F1';
      case 'COMPLETED': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const activeOrders = bookings.filter(b => b.status === 'WAITING' || b.status === 'ACCEPTED');
  const historyOrders = bookings.filter(b => b.status === 'COMPLETED');


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(14,22,41,0.4)',
          backdropFilter: 'blur(8px)', zIndex: 1100
        }}
      />
        <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(100%, 440px)', background: 'white',
          zIndex: 1200, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: 'clamp(1rem, 4vw, 1.5rem)', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to right, #F8FAFF, #FFFFFF)', flexShrink: 0 }}>
          <h3 style={{ fontWeight: 950, fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', margin: 0, letterSpacing: '-0.02em' }}>My Account</h3>
          <button onClick={onClose} style={{ background: '#F1F5F9', color: '#6B7280', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1rem, 4vw, 1.5rem)', WebkitOverflowScrolling: 'touch' }}>
          
          {/* 1. PROFILE INFO SECTION */}
          <div style={{ marginBottom: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: 'clamp(48px, 10vw, 64px)', height: 'clamp(48px, 10vw, 64px)', borderRadius: '16px', background: 'linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 20px rgba(92,98,241,0.2)', flexShrink: 0 }}>
                      <User size={28} />
                   </div>
                   <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontWeight: 950, fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', margin: '0 0 0.2rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.full_name || 'Guest User'}</h4>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', background: '#F0F2FF', color: 'var(--primary)', borderRadius: '50px', display: 'inline-block' }}>{user?.isAdmin ? 'ADMINISTRATOR' : 'PREMIUM MEMBER'}</span>
                   </div>
                </div>
                {!isEditing && (
                   <button onClick={() => setIsEditing(true)} style={{ background: '#F8FAFC', color: 'var(--primary)', borderRadius: '12px', padding: '0.6rem', border: '1px solid #E2E8F0', marginLeft: 'auto' }}>
                      <RefreshCw size={18} />
                   </button>
                )}
             </div>
             
             {isEditing ? (
                /* ── EDIT FORM ── */
                <div style={{ background: '#F8FAFC', borderRadius: '24px', padding: 'clamp(1rem, 4vw, 1.5rem)', border: '1px solid var(--primary)' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { label: 'Full Name', key: 'full_name', type: 'text' },
                        { label: 'Email', key: 'email', type: 'email' },
                        { label: 'Phone', key: 'phone', type: 'tel' },
                        { label: 'Location', key: 'location', type: 'text' }
                      ].map(field => (
                        <div key={field.key}>
                           <label style={{ fontSize: '0.7rem', fontWeight: 850, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</label>
                           <input 
                              type={field.type}
                              value={editForm[field.key]} 
                              onChange={e => setEditForm({...editForm, [field.key]: e.target.value})}
                              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.4rem', fontWeight: 600, fontSize: '0.95rem', background: 'white' }}
                           />
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                         <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', background: 'white', border: '1px solid #E2E8F0', fontWeight: 800, fontSize: '0.9rem' }}>Cancel</button>
                         <button onClick={handleUpdateProfile} disabled={editLoading} style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
                            {editLoading ? 'Saving...' : 'Save'}
                         </button>
                      </div>
                   </div>
                </div>
             ) : (
                /* ── VIEW MODE ── */
                <div style={{ background: '#F8FAFC', borderRadius: '24px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B', minWidth: 0 }}>
                       <Mail size={16} style={{ flexShrink: 0 }} />
                       <span style={{ fontSize: '0.9rem', fontWeight: 650, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user?.isAdmin ? 'Admin Account' : user?.email}
                       </span>
                    </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B' }}>
                      <Phone size={16} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 650 }}>{user?.phone || 'Not provided'}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B' }}>
                      <MapPin size={16} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 650 }}>{user?.location || 'Not provided'}</span>
                   </div>
                </div>
             )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
             <h4 style={{ fontWeight: 900, fontSize: '0.95rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8' }}>My Activity</h4>
             <button onClick={fetchBookings} style={{ background: 'none', color: 'var(--primary)', padding: '0.5rem' }}>
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
             </button>
          </div>

          {/* 2. ACTIVE ORDERS SECTION */}
          <div style={{ marginBottom: '2.5rem' }}>
             <p style={{ fontWeight: 850, fontSize: '0.9rem', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5A623' }} /> Active Bookings
             </p>
             {activeOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                   {activeOrders.map(b => (
                      <div key={b.id} style={{ padding: '1.1rem', borderRadius: '20px', background: 'white', border: '1px solid #F1F5F9', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ width: 44, height: 44, borderRadius: '12px', background: getStatusColor(b.status) + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <ShoppingBag size={20} color={getStatusColor(b.status)} />
                         </div>
                         <div style={{ flex: 1, minWidth: 0 }}>
                            <h5 style={{ fontWeight: 900, margin: '0 0 0.2rem 0', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.service_title}</h5>
                            <span style={{ fontSize: '0.7rem', fontWeight: 850, color: getStatusColor(b.status), textTransform: 'uppercase', letterSpacing: '0.02em' }}>{b.status}</span>
                         </div>
                         <ChevronRight size={18} color="#CBD5E1" style={{ flexShrink: 0 }} />
                      </div>
                   ))}
                </div>
             ) : (
                <div style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '24px', border: '1px dashed #E2E8F0' }}>
                   <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 700 }}>No active services right now</p>
                </div>
             )}
          </div>

          {/* 3. HISTORY SECTION */}
          <div>
             <p style={{ fontWeight: 850, fontSize: '0.9rem', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="#64748B" /> Order History
             </p>
             {historyOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                   {historyOrders.map(b => (
                      <div key={b.id} style={{ padding: '1.1rem', borderRadius: '20px', background: 'white', border: '1px solid #F1F5F9', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Clock size={18} color="#94A3B8" />
                         </div>
                         <div style={{ flex: 1, minWidth: 0 }}>
                            <h5 style={{ fontWeight: 800, margin: '0 0 0.1rem 0', fontSize: '0.9rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.service_title}</h5>
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{new Date(b.created_at).toLocaleDateString()}</span>
                         </div>
                         <div style={{ color: '#22C55E', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.02em', flexShrink: 0 }}>PAID</div>
                      </div>
                   ))}
                </div>
             ) : (
                <div style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '24px', border: '1px dashed #E2E8F0' }}>
                   <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 700 }}>No past services yet</p>
                </div>
             )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: 'clamp(1rem, 4vw, 1.5rem)', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', flexShrink: 0 }}>
          {user?.isAdmin && (
            <button 
              onClick={() => window.open(ADMIN_CONSOLE_URL, '_blank')}
              style={{ 
                width: '100%', padding: '1.1rem', borderRadius: '16px', 
                background: '#0F172A', color: 'white', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                marginBottom: '0.75rem', boxShadow: '0 4px 12px rgba(15,23,42,0.2)', fontSize: '0.95rem'
              }}
            >
              <ShieldCheck size={18} /> Admin Console
            </button>
          )}
          <button 
            onClick={() => { logout(); onClose(); }}
            style={{ 
              width: '100%', padding: '1.1rem', borderRadius: '16px', 
              background: '#FFF1F2', color: '#E11D48', fontWeight: 900,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              border: '1px solid rgba(225,29,72,0.1)', fontSize: '0.95rem'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileDrawer;
