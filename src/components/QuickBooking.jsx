import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const QuickBooking = ({ services, onBook }) => {
  const [selectedService, setSelectedService] = useState('');
  const [location, setLocation] = useState('');

  const handleQuickBook = (e) => {
    e.preventDefault();
    if (!selectedService) return alert("Please select a service first.");
    const serviceObj = services.find(s => s.id.toString() === selectedService);
    if (serviceObj) {
      onBook(serviceObj);
    }
  };

  return (
    <div style={{ padding: '0 5%', marginTop: '-3rem', position: 'relative', zIndex: 20 }}>
      <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 2rem', background: 'white' }}>
        <form onSubmit={handleQuickBook} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div className="form-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={16} color="var(--primary)" /> Select Service
            </label>
            <select 
              value={selectedService} 
              onChange={e => setSelectedService(e.target.value)}
              required
            >
              <option value="" disabled>What do you need help with?</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} color="var(--primary)" /> Your Location (Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g. Downtown 4th Street" 
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ height: '56px', padding: '0 2rem', flex: '0 1 auto' }}>
            Book Instantly
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickBooking;
