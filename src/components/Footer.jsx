import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => (
  <footer style={{ background: 'var(--dark)', color: 'white', padding: '6rem 6% 3rem', marginTop: '6rem', position: 'relative', overflow: 'hidden' }}>
    {/* Footer Glow */}
    <div className="hide-mobile" style={{ position: 'absolute', top: '-20%', left: '30%', width: '40%', height: '100%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div className="page-wrapper">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '4rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 950, letterSpacing: '-0.05em', marginBottom: '1.5rem' }}>
            BachMates
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 280, fontSize: '0.95rem' }}>
            The ultimate lifestyle companion for modern bachelors. We simplify your daily routines so you can focus on what matters.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Instagram, href: '#' }
            ].map((s, i) => (
              <motion.a 
                key={i} href={s.href} 
                whileHover={{ y: -3, background: 'rgba(255,255,255,0.15)' }}
                style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.2s' }}
              >
                <s.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: '1.5rem', color: 'white', fontSize: '1.1rem' }}>Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Laundry Service', 'Home Cleaning', 'Electric Fix', 'Tech Support'].map((l, i) => (
              <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: '1.5rem', color: 'white', fontSize: '1.1rem' }}>Support</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Help Center', 'Safety & Trust', 'Terms of Use', 'Privacy Policy'].map((l, i) => (
              <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.95rem' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: '1.5rem', color: 'white', fontSize: '1.1rem' }}>Get in Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Mail size={18} color="var(--accent)" /> anaikarmohammedfuzail57@gmail.com</div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Phone size={18} color="var(--accent)" /> +91 88705 39407</div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><MapPin size={18} color="var(--accent)" /> Pernambut, Vellore Dist, Tamil Nadu</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', fontWeight: 600 }}>
        <div>© {new Date().getFullYear()} BachMates Marketplace. All rights reserved. Designed and managed by <a href="https://fuzailscript.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>fuzail</a></div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>Secure Payments</span>
          <span>Verified Agents</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
