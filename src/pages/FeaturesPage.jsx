import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { Zap, Shield, BadgeCheck, CreditCard, Smartphone, Clock } from 'lucide-react';

const si = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }
});

const feats = [
  { icon: '⚡', color: 'rgba(92,98,241,0.1)', title: 'Fast Response', desc: 'Get matched with verified agents within seconds of placing your request.' },
  { icon: '🔒', color: 'rgba(245,166,35,0.1)', title: 'Secure Booking', desc: 'Safe, encrypted bookings with end-to-end payment protection.' },
  { icon: '✅', color: 'rgba(34,197,94,0.1)', title: 'Verified Agents', desc: 'Every agent is background-checked, trained, and identity-verified.' },
  { icon: '💳', color: 'rgba(14,165,233,0.1)', title: 'Flexible Payment', desc: 'Pay online, in cash, or via UPI—whatever suits you.' },
  { icon: '📱', color: 'rgba(239,68,68,0.1)', title: 'Real-Time Updates', desc: 'Track your service from booking to completion, live on-screen.' },
  { icon: '🕐', color: 'rgba(168,85,247,0.1)', title: '24/7 Availability', desc: 'Round-the-clock support so you\'re never left stranded.' },
];

const steps = [
  { num: '01', title: 'Choose Service', desc: 'Browse our range of daily services.' },
  { num: '02', title: 'Request Booking', desc: 'Submit your request with one tap.' },
  { num: '03', title: 'Agent Accepts', desc: 'A local professional picks it up instantly.' },
  { num: '04', title: 'Service Done ✅', desc: 'Track, verify, and complete with ease.' },
];

const FeaturesPage = ({ onOpenAuth }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/services');
    } else {
      onOpenAuth('register');
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '2rem', background: 'linear-gradient(180deg, var(--surface2) 0%, transparent 100%)' }}>
        <div className="page-wrapper" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.span className="overline" {...si(0)} style={{ justifyContent: 'center' }}>PLATFORM FEATURES</motion.span>
          <motion.h1 className="h1" {...si(0.1)} style={{ textAlign: 'center' }}>Why <span className="text-gradient">BachMates?</span></motion.h1>
          <motion.p className="body-lg" {...si(0.2)} style={{ maxWidth: 560, margin: '1rem auto 0', textAlign: 'center' }}>
            Powerful infrastructure disguised as a simple app. Everything you need to solve daily living.
          </motion.p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="page-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {feats.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(92,98,241,0.12)' }}
                style={{ background: 'white', borderRadius: 24, padding: '2rem', border: '1px solid rgba(92,98,241,0.09)' }}
              >
                <motion.div
                  style={{ width: 56, height: 56, borderRadius: 16, background: f.color, fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}
                  whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
                >
                  {f.icon}
                </motion.div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: 'rgba(92,98,241,0.04)' }}>
        <div className="page-wrapper">
          <motion.span className="overline" {...si()} style={{ display: 'block', textAlign: 'center' }}>STEP-BY-STEP</motion.span>
          <motion.h2 className="h2" {...si(0.1)} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            How <span style={{ color: 'var(--primary)' }}>It Works</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem', position: 'relative' }}>
            {/* connector line */}
            <motion.div
              style={{ position: 'absolute', top: 38, left: '8%', right: '8%', height: 3, background: 'var(--gradient-p)', originX: 0, zIndex: 0 }}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 }}
            />
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
              >
                <motion.div
                  style={{ width: 76, height: 76, borderRadius: '50%', background: i === 3 ? 'var(--gradient-p)' : 'white', border: '2.5px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 900, fontSize: '1.2rem', color: i === 3 ? 'white' : 'var(--primary)', boxShadow: '0 4px 20px rgba(92,98,241,0.15)' }}
                  whileHover={{ scale: 1.1, boxShadow: '0 8px 28px rgba(92,98,241,0.25)' }}
                >
                  {s.num}
                </motion.div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use / Modern Experience Section */}
      <section className="section" style={{ background: 'var(--dark)', color: 'white', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15), transparent 70%)', pointerEvents: 'none' }}></div>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.span className="overline" {...si()} style={{ color: '#A5B4FC', display: 'block' }}>MODERN EXPERIENCE</motion.span>
            <motion.h2 className="h2" {...si(0.1)} style={{ color: 'white', fontWeight: 950, marginBottom: '1.5rem' }}>
              How can we use <span className="text-gradient">this app?</span>
            </motion.h2>
            <motion.p {...si(0.2)} style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
              BachMates is designed for the modern lifestyle. Fast, transparent, and completely digital.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Visual Card 1 */}
            <motion.div {...si(0.3)} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 32, padding: '3rem', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 140, height: 140, background: 'rgba(92,98,241,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(92,98,241,0.4)' }}>
                <Smartphone size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: 'white' }}>One-Tap Booking</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1rem' }}>
                Simply open the app, pick your service category, and tap book. Our algorithm finds the best-rated agent near you in milliseconds.
              </p>
            </motion.div>

            {/* Visual Card 2 */}
            <motion.div {...si(0.4)} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 32, padding: '3rem', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 140, height: 140, background: 'rgba(34,197,94,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(34,197,94,0.4)' }}>
                <CreditCard size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: 'white' }}>Digital Transparency</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1rem' }}>
                See upfront pricing with zero hidden costs. Pay securely via UPI, Cards or Cash only after the job is finished to your satisfaction.
              </p>
            </motion.div>

            {/* Visual Card 3 */}
            <motion.div {...si(0.5)} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 32, padding: '3rem', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 140, height: 140, background: 'rgba(245,166,35,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(245,166,35,0.4)' }}>
                <Zap size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: 'white' }}>Live Tracking</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1rem' }}>
                Watch your service professional arrive on the map in real-time. Chat with them directly for instructions or coordination.
              </p>
            </motion.div>

          </div>

          {/* Visual Callout */}
          <motion.div 
            {...si(0.6)}
            style={{ 
              marginTop: '5rem', background: 'linear-gradient(90deg, var(--primary), var(--accent))', 
              borderRadius: 32, padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' 
            }}
          >
            <div style={{ flex: '1 1 400px' }}>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 950, color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>Ready to simplify <br/>your life?</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>Join 12,000+ users who have upgraded their daily routine.</p>
            </div>
            <button 
              className="btn" 
              style={{ background: 'white', color: 'var(--primary)', padding: '1.2rem 2.5rem', borderRadius: 20, fontSize: '1.1rem', fontWeight: 900 }}
              onClick={handleGetStarted}
            >
              {user ? 'Explore Services' : 'Get Started Now'}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
