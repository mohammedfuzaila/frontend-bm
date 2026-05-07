import React from 'react';
import { Download, CheckCircle } from 'lucide-react';

const AppPreview = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--secondary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(99, 91, 255, 0.4) 0%, rgba(255,255,255,0) 60%)', opacity: 0.5 }}></div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="fade-up-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            Built for scale. <br /> Designed for you.
          </h2>
          <p className="fade-up-2" style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Access our powerful APIs and booking engines directly from our native applications. Low latency, high reliability, and an interface that stays out of your way.
          </p>
          <div className="fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: 'white', color: 'var(--secondary)', fontWeight: 700 }}>
              <Download size={20} /> App Store
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Download size={20} /> Google Play
            </button>
          </div>
        </div>

        <div className="fade-up-2" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Mock Mobile UI - Stripe Inspired */}
          <div style={{ 
            width: '320px', height: '650px', background: '#FFFFFF', borderRadius: '48px',
            border: '12px solid #000000', padding: '1.5rem', position: 'relative', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
            overflow: 'hidden', color: 'var(--text-main)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '130px', height: '30px', background: 'black', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}></div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>Overview</h3>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)' }}></div>
            </div>

            <div style={{ marginTop: '2rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--accent)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Latest Transaction</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>$40.00</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#15803D' }}>
                <CheckCircle size={16} /> Authenticated
              </div>
            </div>

            <h4 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>Quick Actions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--accent)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(99, 91, 255, 0.1)', color: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>L</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Laundry</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--accent)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(99, 91, 255, 0.1)', color: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>R</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Repairs</span>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', height: '60px', background: '#0A2540', borderRadius: '9999px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
              <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></div>
              <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppPreview;
