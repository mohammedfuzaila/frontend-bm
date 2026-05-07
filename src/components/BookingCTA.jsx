import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem, viewportConfig, pulseAnimation } from '../utils/animations';

const BookingCTA = ({ onBookNow }) => (
  <section style={{ padding: '2rem 5%' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #818CF8 100%)', borderRadius: 28, padding: '5rem 4rem', textAlign: 'center', overflow: 'hidden', position: 'relative' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.7 }}
      >
        <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '50%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
        <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Need help right now?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Skip the wait. Get matched with a verified local agent instantly.
        </p>
        <motion.button
          className="btn"
          style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, padding: '1rem 2.5rem', fontSize: '1.05rem' }}
          variants={pulseAnimation}
          animate="animate"
          whileHover={{ scale: 1.06, boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onBookNow}
        >
          Book a Service in Seconds <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default BookingCTA;
