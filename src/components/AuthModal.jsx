import React, { useState, useContext } from 'react';
import { API_BASE_URL, ADMIN_CONSOLE_URL } from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { X, Mail, KeyRound, Loader2, User, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose, initialMode = 'login' }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/login/' : '/api/register/';
    
    let body = isLogin 
      ? { email, password }
      : { email, password, full_name: fullName, phone, location };
    
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      
      if (data.user.isAdmin) {
        setError('This is an administrator account. Please login through the Admin Console.');
        setLoading(false);
        return;
      }
      
      login(data.user);
      onClose();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
          <motion.div
            className="modal-content auth-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            style={{ 
              width: '100%', maxWidth: isLogin ? '440px' : '560px', 
              borderRadius: 'clamp(24px, 5vw, 32px)', maxHeight: '92vh', overflowY: 'auto',
              msOverflowStyle: 'none', scrollbarWidth: 'none',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)'
            }}
          >
            <motion.button className="close-btn" onClick={onClose} whileTap={{ scale: 0.9 }} style={{ top: '1.25rem', right: '1.25rem' }}>
              <X size={22} />
            </motion.button>

            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '14px', padding: '0.4rem', marginBottom: '1.5rem' }}>
               <button 
                  onClick={() => setIsLogin(true)}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.8rem', background: isLogin ? 'white' : 'transparent', color: isLogin ? 'var(--primary)' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: isLogin ? '0 4px 10px rgba(0,0,0,0.05)' : 'none' }}
               >
                  <User size={15} /> Customer
               </button>
               <button 
                  onClick={() => {
                     window.open(`${ADMIN_CONSOLE_URL}`, '_blank');
                  }}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.8rem', background: 'transparent', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
               >
                  <ShieldCheck size={15} /> Admin Console
               </button>
            </div>

            <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '0.6rem', letterSpacing: '-0.04em', textAlign: 'center', lineHeight: 1.1 }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: '#64748B', marginBottom: '2rem', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', textAlign: 'center', lineHeight: 1.5 }}>
              {isLogin ? 'Access your dashboard and active services.' : 'Join the fastest growing student network.'}
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ background: '#FFF1F2', color: '#E11D48', borderRadius: 12, padding: '0.85rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.85rem', border: '1px solid rgba(225,29,72,0.1)', fontWeight: 600 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isLogin ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                
                {!isLogin && (
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Full Name</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <User size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="form-group">
                      <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Mobile No</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+91 ..." style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Location</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <MapPin size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} required placeholder="City" style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group" style={{ gridColumn: isLogin ? 'span 1' : '1 / -1' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <KeyRound size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                  </div>
                </div>

                {!isLogin && (
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Confirm Password</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <KeyRound size={18} style={{ position: 'absolute', left: '1rem', color: '#94A3B8' }} />
                      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 12, background: '#F8FAFC', border: '2px solid #F1F5F9', fontSize: '0.95rem' }} />
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', borderRadius: 14, padding: '1.1rem', fontWeight: 900, fontSize: '1rem' }}
                whileHover={{ y: -2, boxShadow: '0 12px 30px rgba(92,98,241,0.3)' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? <Loader2 size={22} className="spin" /> : isLogin ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ background: 'none', color: 'var(--primary)', fontWeight: 800, padding: 0 }}
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
