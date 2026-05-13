import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, ShoppingBag, PhoneCall } from 'lucide-react';

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
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Features', to: '/features' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          position: 'sticky', top: 0, zIndex: 1000,
          padding: scrolled ? '0.8rem 6%' : '1.2rem 6%',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}
      >
        <Link to="/" className="nav-brand text-gradient" style={{ fontWeight: 950, fontSize: '1.75rem', letterSpacing: '-0.05em' }}>
          BachMates
        </Link>

        {/* Desktop Navigation */}
        <div className="hide-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map(l => (
            <NavLink 
              key={l.to} 
              to={l.to} 
              end={l.to === '/'} 
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={({ isActive }) => ({ 
                fontWeight: 800, fontSize: '0.95rem', position: 'relative', transition: '0.2s',
                color: isActive ? 'transparent' : (scrolled ? 'white' : 'var(--dark)'),
                background: isActive ? 'var(--gradient-p)' : 'none',
                WebkitBackgroundClip: isActive ? 'text' : 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      style={{ 
                        position: 'absolute', bottom: -6, left: 0, right: 0, height: 3, 
                        background: 'var(--gradient-p)', borderRadius: 2 
                      }} 
                    />
                  )}
                </>
              )}
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
                width: 46, height: 46, borderRadius: '16px', 
                background: 'var(--gradient-p)',
                padding: '2px', cursor: 'pointer', border: 'none',
                boxShadow: '0 10px 20px rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '14px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <User size={22} strokeWidth={2.5} />
              </div>
            </motion.button>
          ) : (
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <button 
                className="nav-link" 
                onClick={() => onOpenAuth('login')} 
                style={{ background: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', color: scrolled ? 'white' : 'var(--dark)' }}
              >
                Login
              </button>
              <motion.button 
                className="btn btn-primary" 
                style={{ borderRadius: '14px', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }} 
                whileHover={{ y: -2, boxShadow: '0 12px 25px rgba(99,102,241,0.3)' }} 
                whileTap={{ scale: 0.96 }} 
                onClick={() => onOpenAuth('register')}
              >
                Get Started
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="show-mobile"
          style={{ background: 'transparent', padding: '0.5rem', border: 'none' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={28} color={scrolled ? "white" : "var(--dark)"} />
        </motion.button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(14,22,41,0.4)', backdropFilter: 'blur(8px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: 320, background: 'white', padding: '2.5rem', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <span className="nav-brand" style={{ fontWeight: 950, fontSize: '1.5rem' }}>Bach<span style={{ color: 'var(--primary)' }}>Mates</span></span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none' }}><X size={32} /></motion.button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {links.map((l) => (
                  <Link key={l.to} to={l.to} className="nav-link" style={{ fontSize: '1.3rem', fontWeight: 900 }} onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}>
                {user ? (
                   <motion.button className="btn btn-primary" style={{ width: '100%', borderRadius: '14px' }} onClick={() => { onOpenProfile(); setMobileOpen(false); }}>
                     View Profile
                   </motion.button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <motion.button className="btn btn-dark" style={{ width: '100%', borderRadius: '14px' }} onClick={() => { onOpenAuth('login'); setMobileOpen(false); }}>
                      Login
                    </motion.button>
                    <motion.button className="btn btn-primary" style={{ width: '100%', borderRadius: '14px' }} onClick={() => { onOpenAuth('register'); setMobileOpen(false); }}>
                      Register
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
