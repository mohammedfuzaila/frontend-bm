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
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.span className="overline" variants={staggerItem} style={{ justifyContent: 'center' }}>Available Services</motion.span>
          <motion.h2 className="h2" variants={staggerItem}>
            Solutions for <span className="text-gradient">Everyday Needs</span>
          </motion.h2>
          <motion.p className="body-lg" variants={staggerItem} style={{ maxWidth: 600, margin: '1rem auto 0' }}>
            From quick tasks to complex home projects, our verified professionals are ready to help.
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
                className="card glow"
                variants={staggerItem}
                style={{ 
                   display: 'flex', flexDirection: 'column', cursor: 'pointer', 
                   padding: 0, overflow: 'hidden', border: '1px solid var(--border)' 
                }}
              >
                <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                  <motion.img
                    src={service.image_url}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '0.5rem 1.2rem', borderRadius: '14px', fontWeight: 900, color: 'var(--primary)', fontSize: '0.95rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    ₹{service.price}
                  </div>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{service.title}</h3>
                  <p style={{ color: 'var(--muted)', marginBottom: '2rem', flexGrow: 1, fontSize: '0.95rem', lineHeight: 1.7 }}>{service.description}</p>
                  <motion.button
                    className="btn btn-primary"
                    style={{ width: '100%', borderRadius: '14px', padding: '1rem' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onBook(service)}
                  >
                    <ShoppingBag size={18} /> Book This Service
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
