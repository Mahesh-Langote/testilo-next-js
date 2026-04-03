'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Proctoring({ onViolation }) {
  const [switches, setSwitches] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitches(s => {
          const newS = s + 1;
          if (onViolation) onViolation(newS);
          setShowPopup(true);
          return newS;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onViolation]);

  if (!showPopup) return null;

  return (
    <div className="proctoring-overlay">
      <div className="proctoring-modal card glass">
        <ShieldAlert color="var(--error)" size={48} />
        <h2>Warning: Activity Detected!</h2>
        <p>You have left the test environment or switched tabs <strong>({switches})</strong> times.</p>
        <p className="subtext">Your instructor is being notified of this activity. Continuing to do so may result in your test being invalidated.</p>
        <button className="btn-primary" onClick={() => setShowPopup(false)}>
          I Understand, Return to Test
        </button>
      </div>
      
      <style jsx>{`
        .proctoring-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
        }
        .proctoring-modal {
          background: white;
          padding: 3rem;
          max-width: 500px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          border-top: 6px solid var(--error);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        h2 { margin: 0; color: var(--error); }
        p { margin: 0; font-size: 1.1rem; line-height: 1.5; color: #333; }
        .subtext { font-size: 0.95rem; color: #666; }
        button {
          margin-top: 1rem;
          padding: 1rem 2rem;
          font-weight: 600;
          background-color: var(--error);
          border: none;
        }
        button:hover { background-color: #c92a2a; }
      `}</style>
    </div>
  );
}
