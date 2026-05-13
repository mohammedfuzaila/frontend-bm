import React from 'react';
import { Star } from 'lucide-react';

const Featured = ({ services, onBook }) => {
  // Take first two services as featured
  const featured = services.slice(0, 2);
  if (featured.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title">Popular Services Near You</h2>
        <p className="section-subtitle">Our most booked daily solutions, trusted by thousands of users in your area.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2.5rem' }}>
          {featured.map(service => (
            <div key={service.id} className="glass-card featured-card" style={{ border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <img src={service.image_url} alt={service.title} style={{ width: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{service.title}</h3>
                  <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>Most Booked</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.25rem', color: '#F59E0B', marginBottom: '1rem' }}>
                  <Star size={16} fill="#F59E0B" /><Star size={16} fill="#F59E0B" /><Star size={16} fill="#F59E0B" /><Star size={16} fill="#F59E0B" /><Star size={16} opacity={0.3} fill="#F59E0B" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>(1.2k)</span>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{service.description.substring(0,60)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>${service.price}</span>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => onBook(service)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
