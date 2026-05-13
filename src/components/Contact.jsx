import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Reach out to our support team for any inquiries or custom service requests.</p>
        
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Mail size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>anaikarmohammedfuzail57@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Phone size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>+91 88705 39407</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Headquarters</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Pernambut, Vellore Dist, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ flex: '2 1 400px', padding: '3rem', background: '#F8FAFC', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <form onSubmit={e => e.preventDefault()}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="How can we help?" style={{ resize: 'vertical' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
