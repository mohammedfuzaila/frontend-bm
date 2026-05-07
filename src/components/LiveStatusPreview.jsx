import React from 'react';
import { Clock, UserCheck, PlayCircle, CheckCircle2 } from 'lucide-react';

const LiveStatusPreview = () => {
  return (
    <section className="section-padding" style={{ background: '#F7F9FC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>
        
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="section-title fade-up-1" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Real-time telemetry <br /> for your tasks.
          </h2>
          <p className="fade-up-2" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Get pinpoint accuracy on task status via our optimized routing infrastructure. See task progression programmatically from acknowledgment to completion.
          </p>
          <ul className="fade-up-3" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--secondary)' }}><CheckCircle2 color="var(--primary)" size={20} /> Asynchronous Status Webhooks</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--secondary)' }}><CheckCircle2 color="var(--primary)" size={20} /> Point-to-Point Encryption</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--secondary)' }}><CheckCircle2 color="var(--primary)" size={20} /> Verified State Mutations</li>
          </ul>
        </div>

        <div style={{ flex: '1 1 400px' }} className="fade-up-3">
          <div className="glass-card" style={{ padding: '3rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, marginBottom: '2.5rem', color: 'var(--text-muted)' }}>Event Log</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '15px', top: '20px', bottom: '20px', width: '2px', background: 'var(--accent)', zIndex: 0 }}></div>
              
              <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: 0.6 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={14} /></div>
                <div><h4 style={{ fontWeight: 600, color: 'var(--secondary)' }}>req_queued</h4><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>10:42:01 AM</span></div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 6px rgba(99, 91, 255, 0.15)' }}><UserCheck size={14} /></div>
                <div><h4 style={{ fontWeight: 700, color: 'var(--primary)' }}>agent_assigned</h4><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>John D. accepted payload</span></div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: 0.6 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayCircle size={14} /></div>
                <div><h4 style={{ fontWeight: 600, color: 'var(--secondary)' }}>execution_started</h4></div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: 0.6 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={14} /></div>
                <div><h4 style={{ fontWeight: 600, color: 'var(--secondary)' }}>status_resolved</h4></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LiveStatusPreview;
