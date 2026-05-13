import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Star, CheckCircle } from 'lucide-react';
import { fadeInLeft, fadeInRight, floatAnimation, floatAnimation2 } from '../utils/animations';

const Hero = ({ onExplore, onBookNow }) => {
  return (
    <section id="home" className="section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', position: 'relative', overflow: 'hidden' }}>
      {/* Modern Background Mesh */}
      <div className="page-blob-1" style={{ opacity: 0.2 }} />
      <div className="page-blob-2" style={{ opacity: 0.15 }} />
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(100px)' }} />

      <div className="page-wrapper hero-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5rem', width: '100%', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>

        {/* Left Content */}
        <motion.div
          style={{ flex: '1 1 500px' }}
          className="hero-content"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="tag"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem', 
              marginBottom: '2.5rem', padding: '0.5rem 1.5rem',
              fontSize: '0.85rem'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Star size={16} fill="var(--primary)" />
            <span>Trusted by 12,000+ Students</span>
          </motion.div>

          <h1 className="display" style={{ marginBottom: '2.5rem', lineHeight: 1.1 }}>
            Your Daily Life, <br/><span className="hl">Optimized.</span>
          </h1>

          <p className="body-lg" style={{ marginBottom: '4rem', maxWidth: 540, lineHeight: 1.7 }}>
            The all-in-one service marketplace for students. <br className="hide-mobile" /> Book, track, and manage everything with one tap.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.button
              className="btn btn-primary glow"
              style={{ fontSize: '1.1rem', padding: '1.25rem 2.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookNow}
            >
              Start Booking Now <ArrowRight size={22} />
            </motion.button>
            <motion.button
              className="btn btn-secondary glass"
              style={{ fontSize: '1.1rem', padding: '1.25rem 2rem', borderRadius: '20px' }}
              whileHover={{ y: -4, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onExplore}
            >
              Learn How It Works
            </motion.button>
          </div>

          {/* Review Proof */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[1,2,3,4].map((i) => (
                <div key={i} style={{ 
                  width: 44, height: 44, borderRadius: '14px', border: '3px solid white', 
                  marginLeft: i === 1 ? 0 : -16, overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  position: 'relative', zIndex: 5 - i
                }}>
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '1rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--dark)', fontWeight: 950 }}>4.9/5 Rating</span> <br className="show-mobile" /> from verified users
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual Bento - Hidden on Mobile to prevent stacking/overlap */}
        <motion.div
          className="hide-mobile"
          style={{ flex: '1 1 420px', position: 'relative', minHeight: 520, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
        >
          {/* Floating Card 1 */}
          <motion.div
            variants={floatAnimation}
            animate="animate"
            className="glass"
            style={{
              position: 'absolute', top: '2%', right: '2%',
              borderRadius: 28, padding: '1.75rem',
              boxShadow: '0 30px 60px -12px rgba(99,102,241,0.15)', width: 280, zIndex: 2,
              border: '1px solid rgba(255,255,255,0.4)'
            }}
          >
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: 52, height: 52, background: 'var(--gradient-p)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)' }}>
                 <CheckCircle size={26} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontWeight: 900, margin: 0, fontSize: '1.05rem', color: 'var(--dark)' }}>Laundry Done</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6, fontWeight: 700 }}>Ready for pickup</p>
              </div>
            </div>
            <div style={{ height: 8, background: 'rgba(99,102,241,0.05)', borderRadius: 10, overflow: 'hidden' }}>
               <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} style={{ height: '100%', background: 'var(--primary)' }} />
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            variants={floatAnimation2}
            animate="animate"
            className="glass"
            style={{
              position: 'absolute', bottom: '12%', left: '-2%',
              borderRadius: 28, padding: '1.75rem',
              boxShadow: '0 30px 60px -12px rgba(16,185,129,0.12)', width: 260, zIndex: 2,
              border: '1px solid rgba(255,255,255,0.4)'
            }}
          >
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: 52, height: 52, background: 'rgba(16,185,129,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                 <Star size={26} fill="#10B981" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontWeight: 900, margin: 0, fontSize: '1.05rem', color: 'var(--dark)' }}>Expert Matched</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6, fontWeight: 700 }}>Top-rated agent</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10B981', fontSize: '0.9rem', fontWeight: 900 }}>
               <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 12px #10B981' }} className="pulse" />
               Agent on the way
            </div>
          </motion.div>

          {/* Large decorative orb */}
          <div style={{ width: 340, height: 340, background: 'var(--gradient-p)', borderRadius: '50%', opacity: 0.05, filter: 'blur(3px)' }}></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
