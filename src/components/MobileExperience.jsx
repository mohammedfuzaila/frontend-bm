import React from 'react';
import { Smartphone } from 'lucide-react';

const MobileExperience = () => {
  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="section-title" style={{ textAlign: 'left' }}>Access BachMates Anywhere</h2>
          <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '2rem' }}>
            Enjoy a seamless experience across all your devices. Book your daily services on the go.
          </p>
          <button className="btn btn-primary"><Smartphone size={20} /> View Desktop / Mobile UI</button>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '280px', height: '560px', borderRadius: '32px', border: '8px solid #0F172A', background: '#F8FAFC', padding: '1rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', background: '#0F172A', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}></div>
            <div style={{ marginTop: '2rem' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem', borderRadius: '16px' }}>
                 <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Active Order</h4>
                 <p style={{ margin: '0.25rem 0 0 0', opacity: 0.8, fontSize: '0.85rem' }}>House Cleaning</p>
              </div>
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'white', height: '100px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>Laundry</div>
                <div style={{ background: 'white', height: '100px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>Repairs</div>
              </div>
            </div>
            
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', height: '50px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '50%' }}></div>
              <div style={{ width: '20px', height: '20px', background: '#E2E8F0', borderRadius: '50%' }}></div>
              <div style={{ width: '20px', height: '20px', background: '#E2E8F0', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileExperience;
