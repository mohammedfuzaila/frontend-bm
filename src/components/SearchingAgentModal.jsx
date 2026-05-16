import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, UserCircle, Loader2, MapPin, Navigation, User, MessageSquare, CreditCard, Smartphone, Banknote, ShieldCheck, PartyPopper } from 'lucide-react';

const MockMap = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', background: '#0F172A', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
      {/* Map Grid Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #94A3B8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Dotted Path */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        <motion.path
          d="M 50 180 Q 200 150 350 40"
          fill="none"
          stroke="rgba(99,102,241,0.3)"
          strokeWidth="3"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      </svg>

      {/* User Location */}
      <div style={{ position: 'absolute', top: '40px', right: '40px', textAlign: 'center' }}>
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '8px', borderRadius: '50%', marginBottom: '4px' }}>
          <MapPin size={20} color="#EF4444" />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8' }}>YOU</span>
      </div>

      {/* Agent Marker (Simulated Movement) */}
      <motion.div
        style={{ position: 'absolute', zIndex: 2 }}
        animate={{ 
          x: [50, 150, 310], 
          y: [180, 140, 40] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '50%', boxShadow: '0 0 20px rgba(99,102,241,0.6)', border: '2px solid white' }}>
          <Navigation size={18} color="white" style={{ transform: 'rotate(45deg)' }} />
        </div>
      </motion.div>

      {/* Map Label */}
      <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, color: 'white', letterSpacing: '0.05em' }}>LIVE TRACKING ACTIVE</span>
      </div>
    </div>
  );
};

const SearchingAgentModal = ({ bookingId, onCancel }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [status, setStatus] = useState('WAITING');
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [acceptedSecondsElapsed, setAcceptedSecondsElapsed] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  const totalPayable = (bookingDetails?.amount || 0) + tipAmount;

  const handleUPIPayment = () => {
    // Standard UPI Intent Link
    // pa: Payee VPA (Placeholder, should be agent's UPI ID)
    // pn: Payee Name
    // am: Amount
    // tn: Transaction Note (Booking ID)
    // cu: Currency
    const upiId = "bachmates.services@okicici"; // Placeholder VPA
    const payeeName = bookingDetails?.assigned_agent || "BachMates Professional";
    const transactionNote = `Payment for Booking #${bookingId}`;
    
    const upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${totalPayable}&tn=${transactionNote}&cu=INR`;
    
    window.location.href = upiUrl;
  };

  useEffect(() => {
    let timer;
    if (status === 'WAITING' && !isTimeout) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => {
          if (prev >= 600) { // 10 minutes
            setIsTimeout(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    if (status === 'ACCEPTED') {
      timer = setInterval(() => {
        setAcceptedSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, isTimeout]);

  useEffect(() => {
    if (!bookingId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/booking/${bookingId}/`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch booking details');
        }

        setBookingDetails(data);
        setStatus(data.status);

        // Auto-expand if agent found or completed
        if (['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(data.status) && isMinimized) {
          setIsMinimized(false);
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    // Initial check
    checkStatus();

    // Poll every 3 seconds if status is WAITING or ACCEPTED
    let intervalId;
    if (status === 'WAITING' || status === 'ACCEPTED') {
      intervalId = setInterval(checkStatus, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [bookingId, status, isMinimized]);

  const handleCancel = async () => {
    if (!bookingId) return;
    setIsCancelling(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/booking/${bookingId}/cancel/`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        if (onCancel) onCancel();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to cancel");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCancelling(false);
    }
  };

  if (error) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(14,22,41,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflowY: 'auto', padding: '2rem' }} className="no-scrollbar">
        <div style={{ background: '#1E293B', padding: '2rem', borderRadius: '24px', textAlign: 'center', maxWidth: 400 }}>
          <h3 style={{ color: '#EF4444', marginBottom: '1rem' }}>Error Occurred</h3>
          <p>{error}</p>
          <button 
            onClick={() => onCancel?.()}
            style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isFound = status === 'ACCEPTED' || status === 'IN_PROGRESS' || status === 'COMPLETED';
  const isCompleted = status === 'COMPLETED';

  // Floating Minimized State
  if (isMinimized && !isCompleted) {
    return (
      <motion.div 
        initial={{ y: 100, scale: 0.8 }} 
        animate={{ y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 15px 40px rgba(99,102,241,0.5)', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)' }}
        onClick={() => setIsMinimized(false)}
      >
        <Navigation size={20} className="pulse" />
        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Agent is Coming ({bookingDetails?.assigned_agent || 'Assigned'})</span>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999, 
          background: 'rgba(14,22,41,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', padding: '2rem 1.5rem',
          overflowY: 'auto'
        }}
        className="no-scrollbar"
      >
        <motion.div
          layout
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'clamp(24px, 6vw, 40px)',
              padding: 'clamp(1.5rem, 6vw, 3.5rem) clamp(1rem, 5vw, 2.5rem)',
              maxWidth: '440px',
              width: '100%',
              maxHeight: '94vh',
              overflowY: 'auto',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
            className="no-scrollbar"
        >
          {/* Decorative Animated Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ position: 'absolute', top: '-20%', left: '-20%', width: '60%', height: '60%', background: isCompleted ? 'rgba(34, 197, 94, 0.15)' : 'rgba(99,102,241,0.15)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }} 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245,158,11,0.1)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} 
          />

           <motion.div 
             key={status}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             style={{ position: 'relative', zIndex: 1 }}
           >
            {isTimeout ? (
              <>
                <div style={{ width: 'clamp(70px, 15vw, 90px)', height: 'clamp(70px, 15vw, 90px)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '24px', margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(239, 68, 68, 0.2)' }}>
                  <Search size={32} color="#EF4444" />
                </div>
                <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.75rem, 5vw, 2.2rem)', marginBottom: '1rem', color: '#EF4444', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Connection Timeout</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                  No professionals were able to accept your request at this moment. Please try again later.
                </p>
                <button 
                  onClick={onCancel}
                  style={{ 
                    width: '100%', background: '#EF4444', color: 'white', border: 'none', 
                    padding: '1.2rem', borderRadius: '18px', fontSize: '1rem', 
                    fontWeight: 900, cursor: 'pointer', boxShadow: '0 15px 35px rgba(239,68,68,0.4)'
                  }}
                >
                  Close & Try Again
                </button>
              </>
            ) : !isFound ? (
              <>
                {/* Searching Animation */}
                <div style={{ position: 'relative', width: 'clamp(100px, 20vw, 120px)', height: 'clamp(100px, 20vw, 120px)', margin: '0 auto 2.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.6, 2.2], opacity: [0.6, 0.3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'rgba(99,102,241,0.2)' }}
                  />
                  <div style={{ width: 'clamp(64px, 15vw, 80px)', height: 'clamp(64px, 15vw, 80px)', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(99,102,241,0.5)', border: '4px solid rgba(255,255,255,0.1)' }}>
                    <Search size={28} color="white" />
                  </div>
                </div>

                <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.75rem, 5vw, 2.1rem)', marginBottom: '0.8rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Broadcasting Request
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '300px', margin: '0 auto 2.5rem auto' }}>
                  Alerting our top-rated professionals near you. This usually takes less than 60 seconds.
                </p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.06)', padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Loader2 size={16} className="spin" color="var(--primary)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 850, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>LIVE SEARCHING</span>
                  </div>
                </motion.div>

                <div style={{ marginTop: '3.5rem' }}>
                   <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handleCancel}
                     disabled={isCancelling}
                     style={{ 
                       background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                       color: 'rgba(255,255,255,0.5)', padding: '0.9rem 2rem', borderRadius: '16px', 
                       fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer'
                     }}
                   >
                     {isCancelling ? 'Processing...' : 'Cancel Request'}
                   </motion.button>
                </div>
              </>
            ) : isCompleted ? (
              <>
                {!isPaymentConfirmed ? (
                  <motion.div key="payment-selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      style={{ width: 'clamp(64px, 15vw, 80px)', height: 'clamp(64px, 15vw, 80px)', background: '#22C55E', borderRadius: '24px', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(34,197,94,0.3)' }}
                    >
                      <CheckCircle size={32} color="white" />
                    </motion.div>

                    <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.75rem, 5vw, 2.2rem)', marginBottom: '0.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>Service Done!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      Job finished by <strong>{bookingDetails?.assigned_agent}</strong>.
                    </p>

                    {/* Reward the Agent Section */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>Appreciation Tip</p>
                      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[20, 50, 100].map(amount => (
                          <motion.button
                            key={amount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTipAmount(tipAmount === amount ? 0 : amount)}
                            style={{
                              background: tipAmount === amount ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${tipAmount === amount ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                              color: tipAmount === amount ? 'white' : 'rgba(255,255,255,0.8)',
                              padding: '0.6rem 1rem', borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem'
                            }}
                          >
                            ₹{amount}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Breakdown Card */}
                    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '24px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Service Fee</span>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{bookingDetails?.amount}</span>
                       </div>
                       {tipAmount > 0 && (
                         <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                            <span style={{ fontSize: '0.85rem' }}>Agent Tip</span>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{tipAmount}</span>
                         </motion.div>
                       )}
                       <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem', marginTop: '0.4rem', alignItems: 'center' }}>
                          <span style={{ fontWeight: 850, color: '#22C55E', fontSize: '0.95rem' }}>To Pay</span>
                          <span style={{ fontWeight: 950, color: '#22C55E', fontSize: 'clamp(1.4rem, 4vw, 1.8rem)' }}>₹{totalPayable}</span>
                       </div>
                    </div>

                    {/* Secure Payment Methods */}
                    <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 850, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '0.8rem', textAlign: 'center', letterSpacing: '0.05em' }}>Choose Payment Method</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                        {[
                          { id: 'upi', icon: <Smartphone size={18} />, label: 'UPI' },
                          { id: 'card', icon: <CreditCard size={18} />, label: 'Card' },
                          { id: 'cash', icon: <Banknote size={18} />, label: 'Cash' },
                          { id: 'net', icon: <Smartphone size={18} />, label: 'Bank' }
                        ].map(method => (
                          <motion.button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem',
                              background: paymentMethod === method.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${paymentMethod === method.id ? 'var(--primary)' : 'rgba(255,255,255,0.08)'}`,
                              borderRadius: '14px', color: paymentMethod === method.id ? 'white' : 'rgba(255,255,255,0.6)',
                              fontWeight: 800, fontSize: '0.8rem'
                            }}
                          >
                            {method.icon} {method.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'upi' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleUPIPayment}
                          style={{
                            width: '100%', background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '1.1rem', borderRadius: '16px', fontWeight: 900, fontSize: '0.95rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                            boxShadow: '0 10px 25px rgba(99,102,241,0.3)', marginBottom: '1rem'
                          }}
                        >
                          <Smartphone size={20} />
                          Pay with UPI App
                        </motion.button>
                        
                        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>OR SCAN CODE</p>
                        
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '24px', display: 'inline-block', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                          <img src="/payment_qr_code.png" alt="Payment QR" style={{ width: 120, height: 120, display: 'block' }} />
                        </div>
                      </motion.div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#22C55E' }}>
                      <ShieldCheck size={14} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secure Transaction</span>
                    </div>

                    <button 
                      onClick={() => setIsPaymentConfirmed(true)}
                      style={{ 
                        width: '100%', background: '#22C55E', color: 'white', border: 'none', 
                        padding: '1.2rem', borderRadius: '18px', fontSize: '1rem', 
                        fontWeight: 950, cursor: 'pointer', boxShadow: '0 15px 35px rgba(34,197,94,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                      }}
                    >
                      Confirm Payment
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="celebration" 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', padding: '1rem 0' }}
                  >
                    {/* Joyful Animated Header */}
                    <div style={{ position: 'relative', width: 'clamp(100px, 20vw, 120px)', height: 'clamp(100px, 20vw, 120px)', margin: '0 auto 2rem auto' }}>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                        style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(34,197,94,0.4)', position: 'relative', zIndex: 2 }}
                      >
                        <CheckCircle size={56} color="white" strokeWidth={3} />
                      </motion.div>
                      
                      {/* Floating Particles/Confetti */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [-20, -100], 
                            x: [0, (i % 2 === 0 ? 50 : -50)], 
                            opacity: [1, 0],
                            scale: [1, 0]
                          }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          style={{ position: 'absolute', top: '50%', left: '50%', width: 8, height: 8, background: i % 2 === 0 ? '#F59E0B' : '#6366F1', borderRadius: '2px' }}
                        />
                      ))}
                    </div>

                    <h2 style={{ fontWeight: 950, fontSize: 'clamp(2rem, 6vw, 2.8rem)', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>Success!</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: '#22C55E' }}>
                      <PartyPopper size={22} />
                      <span style={{ fontWeight: 850, fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Payment Received</span>
                    </div>
                    
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '300px', margin: '0 auto 2.5rem auto' }}>
                      Thank you for choosing **BachMates**. Your professional has been paid!
                    </p>

                    <motion.button 
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onCancel?.()}
                      style={{ 
                        width: '100%', background: 'white', color: '#0F172A', border: 'none', 
                        padding: '1.3rem', borderRadius: '20px', fontSize: '1.1rem', 
                        fontWeight: 950, cursor: 'pointer', boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
                      }}
                    >
                      Return Home
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  style={{ width: 'clamp(70px, 15vw, 90px)', height: 'clamp(70px, 15vw, 90px)', background: '#22C55E', borderRadius: '24px', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(34,197,94,0.3)' }}
                >
                  <UserCircle size={40} color="white" />
                </motion.div>

                <h2 style={{ fontWeight: 950, fontSize: 'clamp(1.75rem, 5vw, 2.2rem)', marginBottom: '0.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Agent Found!
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Your professional is on the way.</p>

                {/* Simulated Live Map Tracking */}
                <MockMap />
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 50, height: 50, background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)', flexShrink: 0 }}>
                      <User size={24} color="var(--primary)" />
                    </div>
                    <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontWeight: 900, fontSize: '1.05rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bookingDetails?.assigned_agent || 'Professional'}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px' }}>
                        <motion.div 
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} 
                        />
                        <span style={{ fontSize: '0.75rem', color: '#22C55E', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>On the way</span>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ background: 'var(--primary)', color: 'white', width: 40, height: 40, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      <MessageSquare size={18} />
                    </motion.button>
                  </div>
                </motion.div>

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                   <motion.button 
                     whileHover={{ y: -3 }}
                     onClick={() => setIsMinimized(true)}
                     style={{ 
                       width: '100%', background: 'white', color: '#0F172A', border: 'none', 
                       padding: '1.2rem', borderRadius: '18px', fontSize: '1rem', 
                       fontWeight: 950, cursor: 'pointer', boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
                     }}
                   >
                     Track Order
                   </motion.button>

                   {acceptedSecondsElapsed < 300 && (
                     <button 
                       onClick={handleCancel}
                       disabled={isCancelling}
                       style={{ 
                         width: '100%', background: 'transparent', border: 'none', 
                         color: 'rgba(255,255,255,0.4)', padding: '0.8rem', 
                         fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer'
                       }}
                     >
                       {isCancelling ? 'Processing...' : 'Cancel Booking'}
                     </button>
                   )}
                </div>
              </>
            )}
           </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchingAgentModal;
