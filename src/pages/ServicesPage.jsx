import React, { useState, useEffect, useContext } from 'react';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { ShoppingBag, Star, Shield, ArrowRight, Zap, Droplets, Wrench, Smartphone, Grid, CheckCircle } from 'lucide-react';

const si = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }
});

const categoryIcons = {
  'Laundry': <Droplets size={20} />,
  'Cleaning': <Shield size={20} />,
  'Electric Service': <Zap size={20} />,
  'Tech Support': <Smartphone size={20} />,
  'Daily Needs': <Grid size={20} />
};

const ServicesPage = ({ onOpenAuth, onBookAction, onBookingCreated }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categorizedServices, setCategorizedServices] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [serRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/services/`),
          fetch(`${API_BASE_URL}/api/categories/`)
        ]);
        const serData = await serRes.json();
        const catData = await catRes.json();
        
        const services = serData.services || [];
        const cats = catData.categories || [];
        setCategories(cats);

        const grouped = services.reduce((acc, s) => {
          const catName = s.category_name || 'Other';
          if (!acc[catName]) acc[catName] = [];
          acc[catName].push(s);
          return acc;
        }, {});
        setCategorizedServices(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const executeBooking = async (service) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/book/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: service.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Booking failed. Please try again.');
      }
      
      // Booking created — show the "Searching for Agent" live modal
      if (onBookingCreated) {
        onBookingCreated(data.booking_id);
      }
    } catch (err) {
      // Show friendly error to user
      alert('Could not create booking: ' + err.message);
    }
  };

  const handleBookingClick = (service) => {
    // onBookAction checks if user is logged in;
    // if not, opens auth modal first, then re-runs the action after login
    onBookAction(() => executeBooking(service));
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Header */}
      <section className="section" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0 3rem', background: 'linear-gradient(180deg, var(--surface2) 0%, transparent 100%)' }}>
        <div className="page-wrapper" style={{ textAlign: 'center' }}>
          <motion.div {...si(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', marginBottom: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <ShoppingBag size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.05em' }}>BROWSE CATALOG</span>
          </motion.div>
          <motion.h1 className="h1" {...si(0.1)} style={{ fontWeight: 950, letterSpacing: '-0.05em', fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.1 }}>
            Our <span className="text-gradient">Service</span> Catalog
          </motion.h1>
          <motion.p className="body-lg" {...si(0.2)} style={{ maxWidth: 600, margin: '1.2rem auto 0', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            Professional help for every aspect of your daily life. Trusted by thousands of bachelors.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="page-wrapper" style={{ paddingBottom: '8rem', position: 'relative', zIndex: 1 }}>
        {loading ? (
          <div style={{ display: 'grid', gap: '4rem' }}>
            {[1, 2].map(i => (
              <div key={i}>
                <div style={{ width: 'min(100%, 220px)', height: 32, background: 'white', borderRadius: 12, marginBottom: '1.5rem', animation: 'pulse 1.5s infinite' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2rem' }}>
                  {[1, 2, 3].map(j => <div key={j} style={{ height: 420, background: 'white', borderRadius: 28, animation: 'pulse 1.5s infinite' }} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          categories.map((cat, catIdx) => {
            const services = categorizedServices[cat.name];
            if (!services || services.length === 0) return null;

            return (
              <section key={cat.id} style={{ marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 1.5rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)', flexWrap: 'wrap' }}>
                  <div style={{ width: 'clamp(48px, 8vw, 64px)', height: 'clamp(48px, 8vw, 64px)', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(92,98,241,0.1)', border: '1px solid var(--border)', color: 'var(--primary)', flexShrink: 0 }}>
                    {categoryIcons[cat.name] || <Grid size={24} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.5rem, 4vw, 2rem)', letterSpacing: '-0.04em', margin: 0, color: 'var(--dark)' }}>{cat.name}</h2>
                    <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{services.length} Premium Options</p>
                  </div>
                  {window.innerWidth > 600 && <div style={{ flex: 1, height: 2, background: 'var(--border)', marginLeft: '1.5rem', opacity: 0.3, borderRadius: 2 }} />}
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                  {services.map((s, idx) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="card glow"
                      whileHover={{ y: -8 }}
                      style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: '28px' }}
                    >
                      <div style={{ height: window.innerWidth < 480 ? 180 : 230, overflow: 'hidden', position: 'relative' }}>
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          src={s.image_url} alt={s.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                        />
                        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.95)', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 950, fontSize: '0.9rem', color: 'var(--dark)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 2 }}>
                          ₹{s.price}
                        </div>
                      </div>
                      <div style={{ padding: 'clamp(1.2rem, 4vw, 1.5rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 className="h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{s.title}</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>{s.description}</p>
                        
                        <motion.button
                          className="btn btn-primary glow"
                          style={{ width: '100%', borderRadius: '16px', padding: '1.2rem', fontWeight: 900 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBookingClick(s)}
                        >
                          Book Service Now
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
