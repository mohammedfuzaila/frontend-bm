import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { Mail, MessageCircle, Phone, MapPin, Send, MessageSquare, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const si = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }
});

const ContactPage = () => {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      <div className="page-blob-1" style={{ opacity: 0.3 }} />
      
      {/* Header */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="page-wrapper" style={{ textAlign: 'center' }}>
          <motion.div {...si(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface2)', padding: '0.4rem 1.2rem', borderRadius: '50px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
            <MessageSquare size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.02em' }}>WE'RE ALWAYS LISTENING</span>
          </motion.div>
          <motion.h1 className="h1" {...si(0.1)} style={{ fontWeight: 950, letterSpacing: '-0.05em', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            How can we <span className="text-gradient">help you?</span>
          </motion.h1>
          <motion.p className="body-lg" {...si(0.2)} style={{ maxWidth: 600, margin: '1.2rem auto 0' }}>
            Whether you're a bachelor needing help or a partner looking to join our network, our dedicated support team is just a message away.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="page-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem' }}>
          
          {/* Left: Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div {...si(0.1)} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '16px', background: 'var(--gradient-p)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Email Address</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>anaikarmohammedfuzail57@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...si(0.2)} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '16px', background: 'var(--gradient-p)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Phone Number</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>+91 88705 39407</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...si(0.3)} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '16px', background: 'var(--gradient-p)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Headquarters</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Pernambut, Vellore Dist, Tamil Nadu</p>
                </div>
              </div>
            </motion.div>
            
            {/* Visual Socials */}
            <motion.div {...si(0.4)} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
               {[
                 { icon: Instagram, label: 'Instagram' },
                 { icon: Twitter, label: 'Twitter' },
                 { icon: Linkedin, label: 'LinkedIn' }
               ].map((s, i) => (
                 <div key={i} style={{ width: 48, height: 48, background: '#EDF1F7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', cursor: 'pointer', transition: 'all 0.2s' }}>
                   <s.icon size={20} />
                 </div>
               ))}
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div 
            {...si(0.2)} 
            style={{ 
              background: 'white', borderRadius: 'clamp(24px, 5vw, 40px)', padding: 'clamp(1.5rem, 5vw, 3.5rem)', 
              boxShadow: '0 30px 60px rgba(92,98,241,0.06)', border: '1px solid #F1F5F9' 
            }}
          >
            <h3 style={{ fontWeight: 900, fontSize: '1.8rem', marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>Send a message</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon.") }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: '#64748B', fontWeight: 800 }}>Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ borderRadius: '16px', background: '#F8FAFC', padding: '1.1rem' }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#64748B', fontWeight: 800 }}>Email Address</label>
                    <input type="email" placeholder="john@work.com" style={{ borderRadius: '16px', background: '#F8FAFC', padding: '1.1rem' }} required />
                  </div>
               </div>
               <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ color: '#64748B', fontWeight: 800 }}>Reason for Contact</label>
                  <select style={{ borderRadius: '16px', background: '#F8FAFC', padding: '1.1rem' }}>
                     <option>General Support</option>
                     <option>Booking Issue</option>
                     <option>Become a Partner</option>
                     <option>Report an Agent</option>
                     <option>Other</option>
                  </select>
               </div>
               <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                  <label style={{ color: '#64748B', fontWeight: 800 }}>Message</label>
                  <textarea rows="4" placeholder="Tell us how we can help..." style={{ borderRadius: '16px', background: '#F8FAFC', padding: '1.1rem', resize: 'none' }} required></textarea>
               </div>
               
               <motion.button 
                 className="btn btn-primary" 
                 style={{ width: '100%', borderRadius: '18px', padding: '1.3rem', fontWeight: 900, fontSize: '1.1rem', boxShadow: '0 12px 25px rgba(92,98,241,0.2)' }}
                 whileHover={{ scale: 1.02, boxShadow: '0 15px 35px rgba(92,98,241,0.3)' }}
                 whileTap={{ scale: 0.98 }}
                 type="submit"
               >
                 Send Message <Send size={20} style={{ marginLeft: '0.6rem' }} />
               </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="section" style={{ paddingBottom: '8rem' }}>
        <div className="page-wrapper dark-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
           <div style={{ maxWidth: 460, margin: '0 auto' }}>
              <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '1rem', letterSpacing: '-0.03em', color: 'white' }}>Got questions? <br/>We have <span className="text-gradient">answers.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Check out our Frequently Asked Questions to get quick help on common topics.</p>
           </div>
           <button className="btn" style={{ background: 'var(--accent)', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '20px', fontWeight: 900, fontSize: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(245,158,11,0.3)', margin: '0 auto' }}>
             Browse FAQs
           </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
