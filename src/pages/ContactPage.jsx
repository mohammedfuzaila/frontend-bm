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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <div className="page-blob-1" style={{ opacity: 0.3 }} />
      
      {/* Header */}
      <section className="section" style={{ paddingTop: 'clamp(3rem, 10vw, 5rem)', paddingBottom: '3rem' }}>
        <div className="page-wrapper" style={{ textAlign: 'center' }}>
          <motion.span className="overline" {...si(0)} style={{ justifyContent: 'center' }}>
            WE'RE ALWAYS LISTENING
          </motion.span>
          <motion.h1 className="h1" {...si(0.1)} style={{ fontWeight: 950, letterSpacing: '-0.05em', fontSize: 'clamp(2rem, 8vw, 4rem)' }}>
            How can we <span className="text-gradient">help you?</span>
          </motion.h1>
          <motion.p className="body-lg" {...si(0.2)} style={{ maxWidth: 600, margin: '1.2rem auto 0', fontSize: 'clamp(1rem, 3vw, 1.15rem)' }}>
            Whether you're a bachelor needing help or a partner looking to join our network, our dedicated support team is just a message away.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="page-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          
          {/* Left: Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: Mail, title: 'Email Address', val: 'anaikarmohammedfuzail57@gmail.com' },
              { icon: Phone, title: 'Phone Number', val: '+91 88705 39407' },
              { icon: MapPin, title: 'Headquarters', val: 'Pernambut, Vellore Dist, Tamil Nadu' }
            ].map((item, i) => (
              <motion.div key={i} {...si(i * 0.1)} className="card" style={{ padding: 'clamp(1.2rem, 4vw, 2rem)' }}>
                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--gradient-p)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)', flexShrink: 0 }}>
                    <item.icon size={22} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1rem', margin: '0 0 0.2rem 0' }}>{item.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', wordBreak: 'break-word' }}>{item.val}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Visual Socials */}
            <motion.div {...si(0.4)} style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
               {[
                 { icon: Instagram, label: 'Instagram' },
                 { icon: Twitter, label: 'Twitter' },
                 { icon: Linkedin, label: 'LinkedIn' }
               ].map((s, i) => (
                 <motion.div key={i} whileHover={{ y: -3 }} style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.8)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', cursor: 'pointer', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                   <s.icon size={18} />
                 </motion.div>
               ))}
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div 
            {...si(0.2)} 
            style={{ 
              background: 'white', borderRadius: 'clamp(24px, 5vw, 40px)', padding: 'clamp(1.5rem, 5vw, 3rem)', 
              boxShadow: '0 30px 60px rgba(92,98,241,0.06)', border: '1px solid #F1F5F9' 
            }}
          >
            <h3 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', marginBottom: '2rem', letterSpacing: '-0.04em' }}>Send a message</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon.") }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label style={{ color: '#64748B', fontWeight: 800, fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ borderRadius: '14px', background: '#F8FAFC', padding: '1rem' }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#64748B', fontWeight: 800, fontSize: '0.9rem' }}>Email Address</label>
                    <input type="email" placeholder="john@work.com" style={{ borderRadius: '14px', background: '#F8FAFC', padding: '1rem' }} required />
                  </div>
               </div>
               <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: '#64748B', fontWeight: 800, fontSize: '0.9rem' }}>Reason</label>
                  <select style={{ borderRadius: '14px', background: '#F8FAFC', padding: '1rem' }}>
                     <option>General Support</option>
                     <option>Booking Issue</option>
                     <option>Become a Partner</option>
                     <option>Report an Agent</option>
                     <option>Other</option>
                  </select>
               </div>
               <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ color: '#64748B', fontWeight: 800, fontSize: '0.9rem' }}>Message</label>
                  <textarea rows="4" placeholder="Tell us how we can help..." style={{ borderRadius: '14px', background: '#F8FAFC', padding: '1rem', resize: 'none' }} required></textarea>
               </div>
               
               <motion.button 
                 className="btn btn-primary" 
                 style={{ width: '100%', borderRadius: '16px', padding: '1.2rem', fontWeight: 900, fontSize: '1.05rem', boxShadow: '0 12px 25px rgba(92,98,241,0.2)' }}
                 whileHover={{ scale: 1.01, boxShadow: '0 15px 35px rgba(92,98,241,0.3)' }}
                 whileTap={{ scale: 0.99 }}
                 type="submit"
               >
                 Send Message <Send size={18} style={{ marginLeft: '0.6rem' }} />
               </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="section" style={{ paddingBottom: 'clamp(4rem, 15vw, 8rem)' }}>
        <div className="page-wrapper dark-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '3rem', textAlign: 'center', flexDirection: 'column' }}>
           <div style={{ maxWidth: 500 }}>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '-0.03em', color: 'white' }}>Got questions? <br/>We have <span className="text-gradient">answers.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500, fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>Check out our Frequently Asked Questions to get quick help on common topics.</p>
           </div>
           <button className="btn" style={{ background: 'var(--accent)', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '20px', fontWeight: 900, fontSize: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(245,158,11,0.3)' }}>
             Browse FAQs
           </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
