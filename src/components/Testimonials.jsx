import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { viewportConfig } from '../utils/animations';

const reviews = [
  { text: "BachMates saved me so much time! Booking laundry was super easy and the agent arrived in 20 minutes.", author: "Rahul K.", role: "Software Engineer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=60&h=60&fit=crop" },
  { text: "Quick response and reliable service. The repair guy knew exactly what he was doing. Highly recommended!", author: "Aisha M.", role: "Medical Resident", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" },
  { text: "The cleaning service was exceptional. My apartment has never been this spotless. Worth every penny!", author: "David S.", role: "University Student", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % reviews.length);
    }, 4000);
  };

  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setCurrent(i);
    start();
  };

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ duration: 0.6 }}>
          What Our Users Say
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ duration: 0.6, delay: 0.15 }}>
          Real experiences from students, professionals, and roommates.
        </motion.p>

        <div style={{ position: 'relative', overflow: 'hidden' }}
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={start}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 24, padding: '3rem 2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#F59E0B" />)}
              </div>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.65, marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-main)' }}>
                "{reviews[current].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                <img src={reviews[current].img} alt={reviews[current].author} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0' }} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontWeight: 700, margin: 0 }}>{reviews[current].author}</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{reviews[current].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.75rem' }}>
          {reviews.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 9999, background: i === current ? 'var(--primary)' : '#CBD5E1', border: 'none', cursor: 'pointer', padding: 0 }}
              animate={{ width: i === current ? 28 : 8, background: i === current ? 'var(--primary)' : '#CBD5E1' }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
