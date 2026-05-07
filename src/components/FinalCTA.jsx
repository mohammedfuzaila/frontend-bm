import React from 'react';
import { motion } from 'framer-motion';
import { pulseAnimation, viewportConfig } from '../utils/animations';

const FinalCTA = ({ onOpenAuth }) => (
  <section className="section-padding">
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <motion.h2
        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.7 }}
      >
        Ready to Make Life <span style={{ color: 'var(--primary)' }}>Easier?</span>
      </motion.h2>
      <motion.p
        style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        Join thousands of happy users who rely on BachMates every single day.
      </motion.p>
      <motion.button
        className="btn btn-primary"
        style={{ padding: '1.1rem 3rem', fontSize: '1.1rem' }}
        variants={pulseAnimation}
        animate="animate"
        whileHover={{ scale: 1.07, boxShadow: '0 16px 40px rgba(79,70,229,0.55)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpenAuth}
      >
        Start Booking Now
      </motion.button>
    </div>
  </section>
);

export default FinalCTA;
