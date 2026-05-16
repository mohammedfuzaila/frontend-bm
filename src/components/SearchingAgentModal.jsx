import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, UserCircle, Loader2 } from 'lucide-react';

const SearchingAgentModal = ({ bookingId, onCancel }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [status, setStatus] = useState('WAITING');
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [acceptedSecondsElapsed, setAcceptedSecondsElapsed] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

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
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(14,22,41,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
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
  const isFailed = status === 'FAILED';
  const isEmailFailed = status === 'EMAIL_FAILED';
  const isCompleted = status === 'COMPLETED';

  // Floating Minimized State
  if (isMinimized && !isCompleted) {
    return (
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 15px 30px rgba(92,98,241,0.4)', cursor: 'pointer' }}
        onClick={() => setIsMinimized(false)}
      >
        <Loader2 size={20} className="spin" />
        <span style={{ fontWeight: 800 }}>Agent Coming ({bookingDetails?.assigned_agent || 'Assigned Agent'})</span>
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
          background: 'rgba(14,22,41,0.98)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', padding: '1.5rem'
        }}
      >
        <motion.div
          layout
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '32px',
            padding: '3rem 2rem',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, height: 200, background: isCompleted ? 'rgba(34, 197, 94, 0.2)' : isFound ? 'rgba(92, 98, 241, 0.2)' : 'rgba(92, 98, 241, 0.1)', filter: 'blur(60px)', borderRadius: '50%', zIndex: 0 }}></div>

           <motion.div 
             key={status}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             style={{ position: 'relative', zIndex: 1 }}
           >
            {isTimeout ? (
              <>
                <div style={{ width: 80, height: 80, background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #EF4444' }}>
                  <Search size={32} color="#EF4444" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: '1rem', color: '#EF4444' }}>Timeout</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                  Some error occurred, please try again. No agents accepted the request within the time limit.
                </p>
                <button 
                  onClick={onCancel}
                  style={{ 
                    width: '100%', background: '#EF4444', color: 'white', border: 'none', 
                    padding: '1.2rem', borderRadius: '18px', fontSize: '1rem', 
                    fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 25px rgba(239,68,68,0.3)'
                  }}
                >
                  Close & Try Again
                </button>
              </>
            ) : !isFound ? (
              <>
                {/* Searching Animation */}
                <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid var(--primary)' }}
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1.5], opacity: [0.8, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid var(--primary)' }}
                  />
                  <div style={{ width: 60, height: 60, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(92,98,241,0.5)' }}>
                    <Search size={28} color="white" />
                  </div>
                </div>

                <h2 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  Searching for Agent
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                  We are broadcasting your {bookingDetails ? bookingDetails.service_title : 'service'} request to available professionals nearby. Please wait...
                </p>

                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '50px' }}>
                    <Loader2 size={16} className="spin" color="var(--primary)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Waiting for response</span>
                  </div>
                  
                  {bookingDetails?.rejection_count > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ color: '#F5A623', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(245,166,35,0.1)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(245,166,35,0.2)' }}
                    >
                      Waiting... Please wait more time
                    </motion.div>
                  )}
                </div>

                <div style={{ marginTop: '3rem' }}>
                   <button 
                     onClick={handleCancel}
                     disabled={isCancelling}
                     style={{ 
                       background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', 
                       color: 'rgba(255,255,255,0.5)', padding: '0.8rem 2rem', borderRadius: '14px', 
                       fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s'
                     }}
                     onMouseEnter={(e) => e.target.style.color = '#EF4444'}
                     onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
                   >
                     {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                   </button>
                </div>
              </>
            ) : isCompleted ? (
              <>
                {/* Completion & Payment UI */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ width: 64, height: 64, background: '#22C55E', borderRadius: '50%', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CheckCircle size={32} color="white" />
                </motion.div>

                <h2 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.5rem' }}>Work Completed!</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  {bookingDetails?.assigned_agent} has finished the task. Please scan the QR code to pay.
                </p>

                <div style={{ background: 'white', padding: '1rem', borderRadius: '24px', display: 'inline-block', marginBottom: '1.5rem' }}>
                   <img 
                     src="/payment_qr_code.png" 
                     alt="Payment QR" 
                     style={{ width: 180, height: 180, display: 'block' }} 
                   />
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.2rem', marginBottom: '2rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Service Amount</span>
                      <span style={{ fontWeight: 800 }}>₹{bookingDetails?.amount}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#22C55E' }}>Total Payable</span>
                      <span style={{ fontWeight: 900, color: '#22C55E', fontSize: '1.2rem' }}>₹{bookingDetails?.amount}</span>
                   </div>
                </div>

                <button 
                  onClick={() => onCancel?.()}
                  style={{ 
                    width: '100%', background: '#22C55E', color: 'white', border: 'none', 
                    padding: '1.2rem', borderRadius: '18px', fontSize: '1rem', 
                    fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 25px rgba(34,197,94,0.3)'
                  }}
                >
                  Payment Successful
                </button>
              </>
            ) : (
              <>
                {/* Agent Found Animation */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  style={{ width: 80, height: 80, background: '#22C55E', borderRadius: '50%', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(34,197,94,0.4)' }}
                >
                  <CheckCircle size={40} color="white" />
                </motion.div>

                <h2 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  Agent Found!
                </h2>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '20px', padding: '1.5rem', marginTop: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Assigned Professional</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCircle size={32} color="white" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem' }}>{bookingDetails?.assigned_agent || 'Professional'}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{bookingDetails?.assigned_agent_email}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }}></div>
                        <span style={{ fontSize: '0.75rem', color: '#22C55E', fontWeight: 700 }}>Coming to you now</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <button 
                     onClick={() => setIsMinimized(true)}
                     style={{ 
                       width: '100%', background: 'var(--primary)', color: 'white', border: 'none', 
                       padding: '1.1rem', borderRadius: '18px', fontSize: '1.05rem', 
                       fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 25px rgba(92,98,241,0.3)'
                     }}
                   >
                     Continue to Dashboard
                   </button>

                   {acceptedSecondsElapsed < 300 ? (
                     <button 
                       onClick={handleCancel}
                       disabled={isCancelling}
                       style={{ 
                         width: '100%', background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', 
                         color: '#EF4444', padding: '1rem', borderRadius: '18px', 
                         fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s'
                       }}
                       onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.05)'}
                       onMouseLeave={(e) => e.target.style.background = 'transparent'}
                     >
                       {isCancelling ? 'Cancelling...' : `Cancel Booking (${Math.ceil((300 - acceptedSecondsElapsed) / 60)}m left)`}
                     </button>
                   ) : (
                     <div 
                       title="Cancellation is no longer available after 5 minutes of agent acceptance."
                       style={{ 
                         width: '100%', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', 
                         padding: '1rem', borderRadius: '18px', fontSize: '0.95rem', 
                         fontWeight: 700, cursor: 'not-allowed', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)'
                       }}
                     >
                       Cancellation period expired
                     </div>
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
