import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const si = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }
});

const AboutPage = () => (
  <div style={{ overflowX: 'hidden' }}>
    {/* Header */}
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--surface2) 0%, transparent 100%)', paddingBottom: 'clamp(2rem, 8vw, 4rem)' }}>
      <div className="page-wrapper" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.span className="overline" {...si()} style={{ justifyContent: 'center' }}>OUR STORY</motion.span>
        <motion.h1 className="h1" {...si(0.1)} style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>About <span className="text-gradient">BachMates</span></motion.h1>
        <motion.p className="body-lg" {...si(0.2)} style={{ maxWidth: 580, margin: '1.5rem auto 0', textAlign: 'center', fontSize: 'clamp(1rem, 3vw, 1.15rem)' }}>
          We know the struggles of hostel life and shared apartments. BachMates was built from the inside out to solve those real everyday problems.
        </motion.p>
      </div>
    </section>

    {/* Mission */}
    <section className="section" style={{ paddingTop: 'clamp(2rem, 6vw, 4rem)' }}>
      <div className="page-wrapper" style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 5rem)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div style={{ flex: '1 1 min(100%, 420px)', position: 'relative' }} {...si()}>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" alt="Team" style={{ borderRadius: 32, width: '100%', boxShadow: '0 30px 60px rgba(99,102,241,0.15)', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 32, border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}></div>
        </motion.div>
        <motion.div style={{ flex: '1 1 320px' }} {...si(0.1)}>
          <span className="overline" style={{ marginBottom: '1.5rem' }}>OUR MISSION</span>
          <h2 className="h2" style={{ marginBottom: '1.5rem', lineHeight: 1.1, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>Making daily life <br/><span style={{ color: 'var(--primary)' }}>effortless.</span></h2>
          <p style={{ color: '#64748B', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>
            BachMates started as a simple idea — what if you could fix any hostel problem in under 60 minutes? No calls to wardens, no waiting lists, just instant help.
          </p>
          <p style={{ color: '#64748B', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>
            Today we serve thousands of bachelors across India, connecting them with our network of verified agents who handle everything with precision.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="section" style={{ background: 'rgba(92,98,241,0.04)' }}>
      <div className="page-wrapper">
        <motion.h2 className="h2" {...si()} style={{ textAlign: 'center', marginBottom: '3rem', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
          What We <span style={{ color: 'var(--primary)' }}>Stand For</span>
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 240px), 1fr))', gap: '1.25rem' }}>
          {[
            { emoji: '🤝', title: 'Trust First', desc: 'Every agent is vetted, verified, and trained before joining our network.' },
            { emoji: '⚡', title: 'Speed Always', desc: 'We measure success in minutes, not days. Fast is our default.' },
            { emoji: '💬', title: 'Transparency', desc: 'No hidden fees, no fine print. What you see is what you pay.' },
            { emoji: '🌱', title: 'Growth Together', desc: 'We create income opportunities for local agents while serving our users.' },
          ].map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: 'white', borderRadius: 24, padding: '2rem', border: '1px solid rgba(92,98,241,0.1)' }}
              whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(92,98,241,0.1)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.emoji}</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{v.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Leadership Team */}
    <section className="section" style={{ background: 'white', paddingTop: 'clamp(3rem, 8vw, 6rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
      <div className="page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span className="overline" {...si()} style={{ justifyContent: 'center' }}>OUR LEADERSHIP</motion.span>
          <motion.h2 className="h2" {...si(0.1)} style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>The Minds Behind <span className="text-gradient">BachMates</span></motion.h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
          {[
            { 
              name: 'Anaikar Mohammed Fuzail', 
              role: 'Founder', 
              img: '/images/founder_fuzail.jpg',
              bio: 'Visionary behind the BachMates ecosystem, focused on revolutionizing hostel living.' 
            },
            { 
              name: 'Faraz Tahmi', 
              role: 'Co-Founder', 
              img: '/images/cofounder_faraz.jpg',
              bio: 'Strategic lead ensuring operational excellence and platform scalability across India.' 
            },
            { 
              name: 'Sarah Mitchell', 
              role: 'Managing Director', 
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
              bio: 'Expert in service management, driving growth and customer satisfaction.' 
            }
          ].map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card glow"
              whileHover={{ y: -8 }}
              style={{ padding: 0, borderRadius: '32px', border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: 'clamp(250px, 40vw, 320px)', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={m.img} 
                  alt={m.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', textAlign: 'left' }}>
                  <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>{m.role}</p>
                  <h3 style={{ color: 'white', fontWeight: 900, fontSize: '1.4rem', margin: 0, letterSpacing: '-0.02em' }}>{m.name}</h3>
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact */}
    <section className="section" style={{ paddingBottom: 'clamp(4rem, 10vw, 6rem)' }}>
      <div className="page-wrapper">
        <motion.h2 className="h2" {...si()} style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>Get in <span style={{ color: 'var(--primary)' }}>Touch</span></motion.h2>
        <div style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div {...si(0.1)} style={{ flex: '1 1 min(100%, 300px)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[{ icon: Mail, label: 'Email', val: 'anaikarmohammedfuzail57@gmail.com' }, { icon: Phone, label: 'Phone', val: '+91 88705 39407' }, { icon: MapPin, label: 'HQ', val: 'Pernambut, Vellore Dist, Tamil Nadu' }].map(({ icon: Icon, label, val }, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(92,98,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={20} color="var(--primary)" /></div>
                <div style={{ overflow: 'hidden' }}><p style={{ fontWeight: 800, marginBottom: '0.15rem', fontSize: '1rem' }}>{label}</p><p style={{ color: 'var(--muted)', fontSize: '0.9rem', wordBreak: 'break-word', margin: 0 }}>{val}</p></div>
              </div>
            ))}
          </motion.div>
          <motion.div {...si(0.2)} style={{ flex: '1 1 min(100%, 340px)', maxWidth: '600px', background: 'white', borderRadius: '28px', padding: 'clamp(1.5rem, 5vw, 2.5rem)', border: '1px solid rgba(92,98,241,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <form onSubmit={e => e.preventDefault()}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div className="form-group" style={{ flex: '1 1 min(100%, 200px)' }}><label style={{ fontWeight: 800 }}>Name</label><input type="text" placeholder="Your name" style={{ borderRadius: '12px' }} /></div>
                <div className="form-group" style={{ flex: '1 1 min(100%, 200px)' }}><label style={{ fontWeight: 800 }}>Email</label><input type="email" placeholder="your@email.com" style={{ borderRadius: '12px' }} /></div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}><label style={{ fontWeight: 800 }}>Message</label><textarea rows="4" placeholder="How can we help?" style={{ resize: 'none', borderRadius: '12px' }}></textarea></div>
              <motion.button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: 14, padding: '1.1rem', fontWeight: 900 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Send Message</motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
