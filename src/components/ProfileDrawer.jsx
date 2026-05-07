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
          width: '100%', maxWidth: '440px', background: 'white',
          zIndex: 1200, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to right, #F8FAFF, #FFFFFF)' }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.2rem', margin: 0, letterSpacing: '-0.02em' }}>My Account</h3>
          <button onClick={onClose} style={{ background: '#F1F5F9', color: '#6B7280', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {/* 1. PROFILE INFO SECTION */}
          <div style={{ marginBottom: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                   <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 20px rgba(92,98,241,0.2)' }}>
                      <User size={32} />
                   </div>
                   <div>
                      <h4 style={{ fontWeight: 900, fontSize: '1.25rem', margin: '0 0 0.2rem 0' }}>{user?.full_name || 'Guest User'}</h4>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', background: '#F0F2FF', color: 'var(--primary)', borderRadius: '50px' }}>{user?.isAdmin ? 'ADMINISTRATOR' : 'PREMIUM MEMBER'}</span>
                   </div>
                </div>
                {!isEditing && (
                   <button onClick={() => setIsEditing(true)} style={{ background: '#F8FAFC', color: 'var(--primary)', borderRadius: '12px', padding: '0.6rem', border: '1px solid #E2E8F0' }}>
                      <RefreshCw size={18} />
                   </button>
                )}
             </div>
             
             {isEditing ? (
                /* ── EDIT FORM ── */
                <div style={{ background: '#F8FAFC', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--primary)' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                         <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Full Name</label>
                         <input 
                            value={editForm.full_name} 
                            onChange={e => setEditForm({...editForm, full_name: e.target.value})}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.4rem', fontWeight: 600 }}
                         />
                      </div>
                      <div>
                         <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Email</label>
                         <input 
                            value={editForm.email} 
                            onChange={e => setEditForm({...editForm, email: e.target.value})}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.4rem', fontWeight: 600 }}
                         />
                      </div>
                      <div>
                         <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Phone</label>
                         <input 
                            value={editForm.phone} 
                            onChange={e => setEditForm({...editForm, phone: e.target.value})}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.4rem', fontWeight: 600 }}
                         />
                      </div>
                      <div>
                         <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Location</label>
                         <input 
                            value={editForm.location} 
                            onChange={e => setEditForm({...editForm, location: e.target.value})}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.4rem', fontWeight: 600 }}
                         />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                         <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: 'white', border: '1px solid #E2E8F0', fontWeight: 700 }}>Cancel</button>
                         <button onClick={handleUpdateProfile} disabled={editLoading} style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', fontWeight: 700 }}>
                            {editLoading ? 'Saving...' : 'Save Changes'}
                         </button>
                      </div>
                   </div>
                </div>
             ) : (
                /* ── VIEW MODE ── */
                <div style={{ background: '#F8FAFC', borderRadius: '20px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B' }}>
                       <Mail size={16} />
                       <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                          {user?.isAdmin ? 'Admin' : user?.email}
                       </span>
                    </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B' }}>
                      <Phone size={16} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.phone || 'Not provided'}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#64748B' }}>
                      <MapPin size={16} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.location || 'Not provided'}</span>
                   </div>
                </div>
             )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
             <h4 style={{ fontWeight: 900, fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8' }}>Your Services</h4>
             <button onClick={fetchBookings} style={{ background: 'none', color: 'var(--primary)' }}>
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
             </button>
          </div>

          {/* 2. ACTIVE ORDERS SECTION */}
          <div style={{ marginBottom: '2.5rem' }}>
             <p style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5A623' }} /> Active Bookings
             </p>
             {activeOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   {activeOrders.map(b => (
                      <div key={b.id} style={{ padding: '1rem', borderRadius: '18px', background: 'white', border: '1px solid #F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ width: 44, height: 44, borderRadius: '12px', background: getStatusColor(b.status) + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShoppingBag size={20} color={getStatusColor(b.status)} />
                         </div>
                         <div style={{ flex: 1 }}>
                            <h5 style={{ fontWeight: 800, margin: '0 0 0.2rem 0', fontSize: '0.95rem' }}>{b.service_title}</h5>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: getStatusColor(b.status), textTransform: 'uppercase' }}>{b.status}</span>
                         </div>
                         <ChevronRight size={18} color="#CBD5E1" />
                      </div>
                   ))}
                </div>
             ) : (
                <div style={{ padding: '1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '18px', border: '1px dashed #E2E8F0' }}>
                   <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>No active services right now</p>
                </div>
             )}
          </div>

          {/* 3. HISTORY SECTION */}
          <div>
             <p style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="#64748B" /> Order History
             </p>
             {historyOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   {historyOrders.map(b => (
                      <div key={b.id} style={{ padding: '1rem', borderRadius: '18px', background: 'white', border: '1px solid #F1F5F9', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock size={18} color="#94A3B8" />
                         </div>
                         <div style={{ flex: 1 }}>
                            <h5 style={{ fontWeight: 700, margin: '0 0 0.1rem 0', fontSize: '0.9rem', color: '#64748B' }}>{b.service_title}</h5>
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(b.created_at).toLocaleDateString()}</span>
                         </div>
                         <div style={{ color: '#22C55E', fontWeight: 800, fontSize: '0.75rem' }}>PAID</div>
                      </div>
                   ))}
                </div>
             ) : (
                <div style={{ padding: '1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '18px', border: '1px dashed #E2E8F0' }}>
                   <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>No past services yet</p>
                </div>
             )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid #F1F5F9', background: '#FFFFFF' }}>
          {user?.isAdmin && (
            <button 
              onClick={() => window.open(ADMIN_CONSOLE_URL, '_blank')}
              style={{ 
                width: '100%', padding: '1rem', borderRadius: '14px', 
                background: '#0F172A', color: 'white', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                marginBottom: '1rem', boxShadow: '0 4px 12px rgba(15,23,42,0.2)'
              }}
            >
              <ShieldCheck size={18} /> Open Admin Panel
            </button>
          )}
          <button 
            onClick={() => { logout(); onClose(); }}
            style={{ 
              width: '100%', padding: '1rem', borderRadius: '14px', 
              background: '#FEE2E2', color: '#DC2626', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              border: '1px solid #FECACA'
            }}
          >
            <LogOut size={18} /> Logout Account
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileDrawer;
