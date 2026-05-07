import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BadgeCheck, CreditCard, Smartphone } from 'lucide-react';
import { staggerContainer, staggerItem, viewportConfig } from '../utils/animations';

const feats = [
  { icon: Zap, color: 'var(--primary)', bg: 'rgba(79,70,229,0.08)', title: 'Fast Response', desc: 'Get matched with agents within seconds of placing your request.' },
  { icon: Shield, color: 'var(--secondary)', bg: 'rgba(34,197,94,0.08)', title: 'Secure Booking', desc: 'Safe, encrypted, and reliable service experience guaranteed.' },
  { icon: BadgeCheck, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', title: 'Verified Agents', desc: 'Every agent is background-checked and identity-verified.' },
  { icon: CreditCard, color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)', title: 'Flexible Payment', desc: 'Pay online or in cash, with transparent pricing.' },
  { icon: Smartphone, color: '#EF4444', bg: 'rgba(239,68,68,0.08)', title: 'Real-Time Updates', desc: 'Track your service from booking to completion, live.' },
];

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <motion.h2 className="section-title" variants={staggerItem}>Why Choose BachMates?</motion.h2>
          <motion.p className="section-subtitle" variants={staggerItem}>
            We're committed to delivering the highest quality experience, every single time.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {feats.map((feat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              style={{
                background: 'white', border: '1px solid #E2E8F0', borderRadius: 20,
                padding: '2rem', textAlign: 'left', cursor: 'default',
                transition: 'border-color 0.3s'
              }}
            >
              <motion.div
                style={{ width: 52, height: 52, borderRadius: 14, background: feat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feat.icon size={26} color={feat.color} />
              </motion.div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
