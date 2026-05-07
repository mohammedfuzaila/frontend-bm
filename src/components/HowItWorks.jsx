import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, UserCheck, ShieldCheck } from 'lucide-react';
import { staggerContainer, staggerItem, viewportConfig } from '../utils/animations';

const steps = [
  { icon: MousePointerClick, title: 'Choose Your Service', desc: 'Select from a wide range of daily services.' },
  { icon: CalendarCheck, title: 'Request Booking', desc: 'Submit your request in just one tap.' },
  { icon: UserCheck, title: 'Agent Accepts', desc: 'A nearby vetted professional picks it up instantly.' },
  { icon: ShieldCheck, title: 'Service Completed', desc: 'Track progress and verify completion easily.' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <motion.h2 className="section-title" variants={staggerItem}>How BachMates Works</motion.h2>
          <motion.p className="section-subtitle" variants={staggerItem}>
            Four simple steps to get back your free time.
          </motion.p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <motion.div
            style={{ position: 'absolute', top: 40, left: '8%', right: '8%', height: 2, background: 'linear-gradient(to right, var(--primary), var(--secondary))', zIndex: 0, originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{ textAlign: 'center', padding: '1rem' }}
              >
                <motion.div
                  style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', border: '2.5px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 1.5rem', boxShadow: '0 4px 14px rgba(79,70,229,0.15)', position: 'relative', zIndex: 2 }}
                  whileHover={{ scale: 1.1, boxShadow: '0 8px 24px rgba(79,70,229,0.25)' }}
                  transition={{ type: 'spring', stiffness: 350 }}
                >
                  <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring' }}>
                    <step.icon size={28} />
                  </motion.div>
                </motion.div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.65rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
