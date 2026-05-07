import React, { useContext, useEffect, useState } from 'react';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { ArrowRight, Zap, Play, Star, ShieldCheck, CheckCircle2, Plus, ArrowUpRight, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

const si = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }
});

const HomePage = ({ onOpenAuth, onBookAction, onBookingCreated }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredServices, setFeaturedServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [latestService, setLatestService] = useState({ title: 'Laundry', status: 'Finished' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => res.json())
      .then(data => {
        const services = data.services || [];
        setFeaturedServices(services.filter(s => s.is_featured));
      })
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/categories/`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
      })
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/latest-finished/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.service_title) {
          setLatestService({ title: data.service_title, status: data.status });
        }
      })
      .catch(err => console.error(err));
  }, []);

  const executeBooking = async (serviceId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/book/`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // Trigger the global SearchingAgentModal
      if (onBookingCreated) {
        onBookingCreated(data.booking_id);
      }
    } catch (err) { 
      alert('Booking failed: ' + err.message); 
    }
  };

  const handleBookNow = (service) => {
    onBookAction(() => executeBooking(service.id));
  };

  return (
    <div style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="page-blob-1" style={{ opacity: 0.4 }} />
      
      {/* Creative Background Elements */}
      <div className="floating" style={{ position: 'absolute', top: '15%', left: '10%', width: 120, height: 120, background: 'var(--gradient-p)', opacity: 0.05, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', filter: 'blur(40px)', zIndex: 0 }}></div>
      <div className="spinning" style={{ position: 'absolute', bottom: '20%', right: '15%', width: 180, height: 180, background: 'var(--gradient-p)', opacity: 0.03, borderRadius: '40%', filter: 'blur(50px)', zIndex: 0 }}></div>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
        <div className="page-wrapper" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 540px' }}>
            <motion.div {...si(0)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--surface)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--border)', width: 'fit-content', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.05em' }}>NEW UPDATE</span>
              <span style={{ width: 1, height: 12, background: 'var(--border)' }}></span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>Tracking is now live</span>
            </motion.div>

            <motion.h1 className="display" {...si(0.1)} style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 950, letterSpacing: '-0.06em', lineHeight: 0.9 }}>
              Your Daily <br/>Life, <span className="hl">Optimized</span>.
            </motion.h1>

            <motion.p className="body-lg" style={{ marginTop: '1.8rem', marginBottom: '2.8rem', maxWidth: 520, fontSize: '1.25rem', color: 'var(--muted)', fontWeight: 500 }} {...si(0.2)}>
              The all-in-one service platform for bachelors and students. Book anything, track everything.
            </motion.p>

            <motion.div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }} {...si(0.3)}>
              <motion.button 
                className="btn btn-primary" 
                style={{ borderRadius: '18px', padding: '1.2rem 2.4rem', fontSize: '1.1rem', fontWeight: 800, boxShadow: '0 12px 30px rgba(92,98,241,0.3)' }} 
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(92,98,241,0.4)' }} 
                whileTap={{ scale: 0.97 }} 
                onClick={() => navigate('/services')}
              >
                Start Booking <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
              </motion.button>
              
              <button 
                style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.2rem 1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 800, color: 'var(--dark)' }}
                onClick={() => navigate('/about')}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={14} fill="var(--dark)" />
                </div>
                How it works
              </button>
            </motion.div>

            {/* Micro proof */}
            <motion.div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '3.5rem' }} {...si(0.4)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <div style={{ display: 'flex', color: 'var(--accent)' }}>
                   {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="var(--accent)" />)}
                 </div>
                 <span style={{ fontWeight: 900, color: 'var(--dark)' }}>4.9</span>
              </div>
              <span style={{ color: '#E2E8F0' }}>|</span>
              <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>Verified by 12,000+ Students</span>
            </motion.div>
          </div>

          {/* Right Bento Hero */}
          <motion.div 
            style={{ flex: '1 1 450px', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.div 
                  whileHover={{ y: -5 }} className="glow"
                  style={{ background: 'var(--surface)', borderRadius: '24px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
                >
                   <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Zap size={20} color="var(--primary)" />
                   </div>
                   <h4 style={{ fontWeight: 800, margin: '0 0 0.5rem 0' }}>60 Min Fix</h4>
                   <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>Rapid response for urgent hostel needs.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  style={{ background: 'var(--primary)', color: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: 'var(--shadow-primary)', position: 'relative', overflow: 'hidden' }}
                >
                   <div className="spinning" style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: 'rgba(255,255,255,0.1)', borderRadius: '40%' }}></div>
                   <h4 style={{ fontWeight: 800, fontSize: '1.5rem', margin: '0 0 0.5rem 0', position: 'relative' }}>15k+</h4>
                   <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, position: 'relative' }}>Orders fulfilled this month across India.</p>
                </motion.div>
             </div>
             <div style={{ paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.div 
                  whileHover={{ y: -5 }} className="glow"
                  style={{ background: 'var(--surface)', borderRadius: '24px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
                >
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <ShieldCheck size={20} color="#22C55E" />
                      <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>TRUSTED</span>
                   </div>
                   <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>100% Secure payments & verified agents.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  style={{ background: 'var(--dark)', color: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                   <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>RECENT ACTIVITY</p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                       <div className="dot-anim" style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }}></div>
                       <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{latestService.title || 'Ready'} - {latestService.status || 'Live'}</span>
                    </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOP CATEGORIES ENHANCED ──────────────── */}
      <section className="section" style={{ background: 'white', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="page-wrapper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <motion.div {...si()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                 <TrendingUp size={16} /> POPULAR NOW
              </div>
              <h2 className="h2" style={{ fontWeight: 950, letterSpacing: '-0.04em', margin: 0 }}>Explore <span style={{ color: 'var(--primary)' }}>Top Categories</span></h2>
            </motion.div>
            <motion.button 
              {...si(0.1)} 
              onClick={() => navigate('/services')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
               View All Services <ArrowUpRight size={18} />
            </motion.button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
             {categories.map((cat, idx) => (
                <motion.div 
                  key={cat.id} 
                  {...si(0.1 + idx * 0.1)} 
                  className="card" 
                  style={{ 
                    borderRadius: '28px', padding: '2rem', cursor: 'pointer', border: '1px solid #F1F5F9',
                    background: idx === 0 ? 'var(--primary-light)' : 'white',
                    display: 'flex', flexDirection: 'column', height: '240px', justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden'
                  }} 
                  onClick={() => navigate('/services')}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                >
                   <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.03, transform: 'scale(5)' }}>
                      <Zap size={20} />
                   </div>
                   <div>
                      <div style={{ width: 48, height: 48, borderRadius: '14px', background: idx === 0 ? 'white' : '#F8F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: idx === 0 ? '0 8px 20px rgba(92,98,241,0.1)' : 'none' }}>
                         <Zap size={22} color="var(--primary)" />
                      </div>
                      <h3 style={{ fontWeight: 900, fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>{cat.name}</h3>
                      <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>The highest rated {cat.name.toLowerCase()} experts in town.</p>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.85rem' }}>
                      Browse Catalog <ArrowRight size={14} />
                   </div>
                </motion.div>
             ))}
             {/* Custom Request Placeholder */}
             <motion.div 
               {...si(0.5)} 
               className="card" 
               style={{ 
                 borderRadius: '28px', padding: '2rem', border: '2px dashed #E2E8F0', background: 'transparent',
                 display: 'flex', flexDirection: 'column', height: '240px', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
               }}
             >
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#64748B' }}>
                   <Plus size={24} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#64748B', margin: '0 0 0.4rem 0' }}>Custom Request</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0 }}>Can't find what you need? Tell us.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES STICKY VERTICAL ────────── */}
      {featuredServices.length > 0 && (
        <section className="section" style={{ background: '#F8F9FF', paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="page-wrapper" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            
            {/* Sticky Title */}
            <div className="sticky-desktop" style={{ flex: '1 1 300px', height: 'fit-content' }}>
              <motion.div {...si()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F5A623', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                 <Sparkles size={16} fill="#F5A623" /> TOP RATED PICKS
              </motion.div>
              <motion.h2 className="h2" {...si(0.1)} style={{ fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 1.1, fontSize: '3rem' }}>
                Featured <br/><span style={{ color: 'var(--primary)' }}>Daily Essentials</span>
              </motion.h2>
              <motion.p {...si(0.2)} style={{ color: 'var(--muted)', marginTop: '1.5rem', fontSize: '1.1rem', maxWidth: '280px' }}>
                Hand-picked services verified for quality and speed.
              </motion.p>
            </div>

            {/* Vertical Scroll Effect Cards */}
            <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {featuredServices.map((service, idx) => (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    background: 'white', borderRadius: '40px', overflow: 'hidden', 
                    boxShadow: '0 30px 70px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9',
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '320px'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div style={{ flex: '1 1 300px', height: '320px', overflow: 'hidden' }}>
                    <img src={service.image_url} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: '1 1 300px', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h3 style={{ fontWeight: 950, fontSize: '1.6rem', margin: 0, letterSpacing: '-0.02em' }}>{service.title}</h3>
                      <div style={{ fontWeight: 950, color: 'var(--primary)', fontSize: '1.4rem' }}>₹{service.price}</div>
                    </div>
                    <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>{service.description}</p>
                    <motion.button 
                      className="btn btn-primary" 
                      style={{ width: 'fit-content', borderRadius: '18px', padding: '1.1rem 2rem', fontWeight: 900 }}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookNow(service)}
                    >
                      Book Now <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LIVE TRACKING PREVIEW ─────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 1, paddingBottom: '8rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#0E1629', borderRadius: '40px', padding: '5rem 4rem', color: 'white', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(92,98,241,0.2), transparent 60%)' }}></div>
          <motion.h2 className="h2" {...si()} style={{ color: 'white', fontWeight: 900, marginBottom: '1.5rem' }}>Experience <span style={{ color: 'var(--accent)' }}>Real-Time</span> Magic</motion.h2>
          <motion.p {...si(0.1)} style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 640, margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>No more guessing where your help is. Live GPS tracking and instant chat with your assigned agent for every single order.</motion.p>
          
          <motion.div {...si(0.2)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                <p style={{ fontWeight: 800 }}>Live GPS</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
                <p style={{ fontWeight: 800 }}>Instant Chat</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏰</div>
                <p style={{ fontWeight: 800 }}>On-Time Guarantee</p>
             </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
