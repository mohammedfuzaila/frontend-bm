import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserCheck, Play, CheckCircle } from 'lucide-react';
import { fadeInLeft, fadeInRight, viewportConfig } from '../utils/animations';

const STATUS_STEPS = [
  { icon: Search, label: 'Searching for agent...', type: 'searching', color: '#F59E0B' },
  { icon: UserCheck, label: 'Agent Assigned', type: 'assigned', color: 'var(--primary)' },
  { icon: Play, label: 'Work in Progress', type: 'progress', color: '#0EA5E9' },
  { icon: CheckCircle, label: 'Completed!', type: 'done', color: 'var(--secondary)' },
];

const StatusPreview = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => (s + 1) % STATUS_STEPS.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-padding" style={{ background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>

        <motion.div style={{ flex: '1 1 400px' }} variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            Track Your Service in Real-Time
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Complete transparency from booking to completion. Watch progress live, with direct agent communication and instant status updates.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Live GPS Tracking', 'Instant Notifications', 'Direct Agent Chat'].map((item, i) => (
              <motion.li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.1 + 0.3 }}>
                <CheckCircle size={18} color="var(--secondary)" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div style={{ flex: '1 1 400px' }} variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <div style={{ background: 'white', borderRadius: 24, padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2rem' }}>Live Status</p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: '#E2E8F0', zIndex: 0 }}></div>

              {STATUS_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}
                  animate={{ opacity: i <= step ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    style={{ width: 40, height: 40, borderRadius: '50%', background: i <= step ? s.color : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i <= step ? 'white' : '#94A3B8', flexShrink: 0 }}
                    animate={i === step ? { boxShadow: [`0 0 0 0px ${s.color}33`, `0 0 0 8px ${s.color}00`] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <s.icon size={18} />
                  </motion.div>

                  <div style={{ paddingTop: 8 }}>
                    <h4 style={{ fontWeight: 700, margin: 0, marginBottom: '0.3rem', color: i === step ? s.color : i < step ? 'var(--text-main)' : 'var(--text-muted)', fontSize: '1rem' }}>
                      {s.label}
                      {i === 0 && step === 0 && (
                        <span style={{ marginLeft: '0.5rem' }}>
                          <span className="dot-anim" style={{ display: 'inline-block', width: 5, height: 5, background: s.color, borderRadius: '50%', marginRight: 3 }}></span>
                          <span className="dot-anim" style={{ display: 'inline-block', width: 5, height: 5, background: s.color, borderRadius: '50%', marginRight: 3 }}></span>
                          <span className="dot-anim" style={{ display: 'inline-block', width: 5, height: 5, background: s.color, borderRadius: '50%' }}></span>
                        </span>
                      )}
                    </h4>

                    {/* Progress bar for "In progress" */}
                    {i === 2 && step >= 2 && (
                      <div style={{ height: 4, background: '#E2E8F0', borderRadius: 9999, width: 160, overflow: 'hidden', marginTop: '0.5rem' }}>
                        <motion.div
                          className="progress-bar-fill"
                          style={{ height: '100%', background: '#0EA5E9', borderRadius: 9999 }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StatusPreview;
