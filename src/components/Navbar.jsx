import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, Home, Layout, Zap, Info, Phone, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenAuth, onOpenProfile }) => {
  const { user } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Home', to: '/', icon: <Home size={18} /> },
    { label: 'Services', to: '/services', icon: <Layout size={18} /> },
    { label: 'Features', to: '/features', icon: <Zap size={18} /> },
    { label: 'About', to: '/about', icon: <Info size={18} /> },
    { label: 'Contact', to: '/contact', icon: <Phone size={18} /> },
  ];

  // Animation variants
  const drawerVariants = {
    closed: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
    opened: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: i => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 + 0.2 } })
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          position: 'sticky', top: 0, zIndex: 1000,
          padding: scrolled ? '0.7rem 6%' : '1.2rem 6%',
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="nav-brand text-gradient" style={{ fontWeight: 950, fontSize: '1.8rem', letterSpacing: '-0.06em' }}>
            BachMates
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hide-mobile" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', background: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
          {links.map(l => (
            <NavLink 
              key={l.to} 
              to={l.to} 
              end={l.to === '/'} 
              style={({ isActive }) => ({ 
                fontWeight: 800, fontSize: '0.9rem', position: 'relative', transition: '0.3s',
                padding: '0.6rem 1.2rem', borderRadius: '14px',
                color: isActive ? 'white' : 'var(--dark)',
                background: isActive ? 'var(--gradient-p)' : 'transparent',
                boxShadow: isActive ? '0 8px 20px rgba(99,102,241,0.25)' : 'none',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hide-mobile" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <motion.button 
              onClick={onOpenProfile}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                width: 44, height: 44, borderRadius: '14px', 
                background: 'var(--gradient-p)',
                padding: '2px', cursor: 'pointer', border: 'none',
                boxShadow: '0 10px 25px rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <User size={20} strokeWidth={2.5} />
              </div>
            </motion.button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => onOpenAuth('login')} 
                style={{ background: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', color: 'var(--dark)', padding: '0.6rem 1rem' }}
              >
                Login
              </button>
              <motion.button 
                className="btn btn-primary" 
                style={{ borderRadius: '14px', padding: '0.7rem 1.5rem', fontSize: '0.9rem', fontWeight: 900 }} 
                whileHover={{ y: -2, boxShadow: '0 12px 25px rgba(99,102,241,0.3)' }} 
                whileTap={{ scale: 0.96 }} 
                onClick={() => onOpenAuth('register')}
              >
                Join Now
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="show-mobile"
          style={{ background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', padding: '0.6rem', border: 'none', borderRadius: '12px' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} color="var(--dark)" />
        </motion.button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(14,22,41,0.6)', backdropFilter: 'blur(12px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div 
              variants={drawerVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: 320, background: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '-15px 0 50px rgba(0,0,0,0.3)', borderLeft: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
                <span className="nav-brand text-gradient" style={{ fontWeight: 950, fontSize: '1.7rem' }}>BachMates</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(false)} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', width: 44, height: 44, borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></motion.button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {links.map((l, i) => (
                  <motion.div key={l.to} custom={i} variants={itemVariants}>
                    <NavLink 
                      to={l.to} 
                      end={l.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({ 
                        fontSize: '1.1rem', fontWeight: 800, padding: '1.1rem 1.4rem', borderRadius: '18px',
                        display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s',
                        background: isActive ? 'var(--gradient-p)' : 'transparent',
                        color: isActive ? 'white' : 'var(--dark)',
                        boxShadow: isActive ? '0 10px 25px rgba(99,102,241,0.25)' : 'none',
                        border: isActive ? 'none' : '1px solid transparent'
                      })}
                    >
                      <span style={{ opacity: 0.8 }}>{l.icon}</span>
                      <span style={{ flex: 1 }}>{l.label}</span>
                      <ChevronRight size={18} style={{ opacity: 0.4 }} />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  {user ? (
                    <button className="btn btn-primary" style={{ width: '100%', borderRadius: '18px', padding: '1.3rem', fontSize: '1.1rem' }} onClick={() => { onOpenProfile(); setMobileOpen(false); }}>
                      Go to Profile
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <button className="btn btn-dark" style={{ width: '100%', borderRadius: '18px', padding: '1.15rem' }} onClick={() => { onOpenAuth('login'); setMobileOpen(false); }}>
                        Sign In
                      </button>
                      <button className="btn btn-primary" style={{ width: '100%', borderRadius: '18px', padding: '1.15rem' }} onClick={() => { onOpenAuth('register'); setMobileOpen(false); }}>
                        Join Now
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
