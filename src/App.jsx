import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ProfileDrawer from './components/ProfileDrawer';
import SearchingAgentModal from './components/SearchingAgentModal';

import HomePage from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Sub-component to handle Navbar visibility
function Layout() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const [authModalOpen, setAuthModalOpen] = useState(false); // false | 'login' | 'register'
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [activeBookingId, setActiveBookingId] = useState(null);

  // Streamlined Global Action Handler
  const handleGlobalBook = (action) => {
    if (!user) {
      setPendingAction(() => action); 
      setAuthModalOpen('login');
    } else if (action) {
      action();
    }
  };

  // Auto-execute pending actions after login
  useEffect(() => {
    if (user && pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [user, pendingAction]);

  return (
    <>
      <Navbar 
        onOpenAuth={(mode) => setAuthModalOpen(mode || 'login')} 
        onOpenProfile={() => setProfileOpen(true)} 
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage 
                onOpenAuth={(mode) => !user && setAuthModalOpen(mode || 'login')} 
                onBookAction={handleGlobalBook} 
                onBookingCreated={(id) => setActiveBookingId(id)}
              />
            </PageTransition>
          } />
          <Route path="/services" element={
            <PageTransition>
              <ServicesPage 
                onOpenAuth={(mode) => !user && setAuthModalOpen(mode || 'login')} 
                onBookAction={handleGlobalBook} 
                onBookingCreated={(id) => setActiveBookingId(id)}
              />
            </PageTransition>
          } />
          <Route path="/features" element={
            <PageTransition>
              <FeaturesPage onOpenAuth={(mode) => !user && setAuthModalOpen(mode || 'login')} onBookAction={handleGlobalBook} />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          } />

          <Route path="/dashboard" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {authModalOpen && <AuthModal initialMode={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
        {profileOpen && <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />}
        {activeBookingId && (
          <SearchingAgentModal 
            bookingId={activeBookingId} 
            onCancel={() => setActiveBookingId(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
