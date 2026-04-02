'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Proctoring({ onViolation }) {
  const [switches, setSwitches] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitches(s => {
          const newS = s + 1;
          if (onViolation) onViolation(newS);
          return newS;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onViolation]);

  if (switches === 0) return null;

  return (
    <div className="proctoring-warning card glass">
      <ShieldAlert color="var(--error)" />
      <div>
        <p><strong>Warning:</strong> Tab switching detected ({switches})</p>
        <p className="subtext">Your instructor has been notified of this activity.</p>
      </div>
      
      <style jsx>{`
        .proctoring-warning {
          position: fixed;
          top: 1rem;
          right: 1rem;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.95);
          border-left: 5px solid var(--error);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        p { margin: 0; font-size: 0.9rem; }
        .subtext { font-size: 0.75rem; color: #888; }
      `}</style>
    </div>
  );
}
