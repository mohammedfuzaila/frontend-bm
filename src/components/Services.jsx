import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportConfig } from '../utils/animations';
import { ShoppingBag } from 'lucide-react';

const Services = ({ services, loading, onBook }) => {
  return (
    <section id="services" className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2 className="section-title" variants={staggerItem}>
            Services Designed for Your Everyday Needs
          </motion.h2>
          <motion.p className="section-subtitle" variants={staggerItem}>
            Everything from quick tasks to complex home projects, handled by verified professionals.
          </motion.p>
        </motion.div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '2rem' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: '#F1F5F9', borderRadius: 16, height: 380, animation: 'pulse 1.5s ease infinite' }} />
            ))}
          </div>
        ) : (
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: '2.5rem' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {services.map(service => (
              <motion.div
                key={service.id}
                className="glass-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', background: 'white', border: '1px solid #E2E8F0', borderRadius: 20 }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <motion.img
                    src={service.image_url}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.9rem', borderRadius: 9999, fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    ${service.price}
                  </div>
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.65rem' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', flexGrow: 1, fontSize: '0.95rem', lineHeight: 1.6 }}>{service.description}</p>
                  <motion.button
                    className="btn btn-primary"
                    style={{ width: '100%', borderRadius: 12 }}
                    whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-primary)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onBook(service)}
                  >
                    <ShoppingBag size={16} /> Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
