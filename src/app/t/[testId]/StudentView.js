'use client';

import { useState, useEffect } from 'react';
import { Play, ShieldAlert } from 'lucide-react';
import { submitTest } from '../submission-actions';
import Proctoring from './Proctoring';
import { useRouter } from 'next/navigation';

export default function StudentView({ test, testId }) {
  const [step, setStep] = useState('welcome'); // welcome, taking, reviewing
  const [studentInfo, setStudentInfo] = useState({ name: '', identifier: '', passcode: '' });
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [violations, setViolations] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (step !== 'taking') return;

    const preventDefault = (e) => e.preventDefault();
    
    if (test.settings.browser?.disableRightClick) {
      document.addEventListener('contextmenu', preventDefault);
    }
    
    if (test.settings.browser?.disableCopyPaste) {
      document.addEventListener('copy', preventDefault);
      document.addEventListener('cut', preventDefault);
      document.addEventListener('paste', preventDefault);
    }

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('paste', preventDefault);
    };
  }, [step, test.settings.browser]);

  const handleStart = () => {
    if (test.settings.access.mode === 'passcode' && studentInfo.passcode !== test.settings.access.passcode) {
      alert('Incorrect passcode!');
      return;
    }
    if (!studentInfo.name) {
      alert('Please enter your name');
      return;
    }
    setStep('taking');
    setStartTime(new Date());
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const executeSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitTest(testId, { ...studentInfo, startTime, violations }, answers);
      if (result?.success) {
        router.push(`/t/${testId}/review/${result.submissionId}`);
      } else {
        setSubmitError(result?.error || 'Failed to submit test. Please try again.');
        setIsSubmitting(false);
        setShowConfirm(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || 'An unexpected error occurred during submission.');
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  const handleSubmitClick = () => {
    setShowConfirm(true);
  };

  if (step === 'welcome') {
    return (
      <div className="welcome-step card glass">
        <div className="introduction">
          <p>{test.introduction || 'Welcome to this test. Please enter your name below to begin.'}</p>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={studentInfo.name}
              onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
              required 
            />
          </div>
          
          {test.settings.access.mode === 'passcode' && (
            <div className="input-group">
              <label>Passcode</label>
              <input 
                type="password" 
                placeholder="Enter passcode" 
                value={studentInfo.passcode}
                onChange={(e) => setStudentInfo({...studentInfo, passcode: e.target.value})}
                required 
              />
            </div>
          )}
          
          <button onClick={handleStart} className="btn-primary start-btn">
            <Play size={20} />
            Start Test
          </button>
        </div>

        <style jsx>{`
          .welcome-step { padding: 4rem; max-width: 600px; margin: 0 auto; text-align: center; }
          .introduction { margin-bottom: 3rem; font-size: 1.25rem; color: #444; }
          .login-form { display: flex; flex-direction: column; gap: 1.5rem; text-align: left; }
          .start-btn { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 2rem; font-size: 1.2rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="taking-step">
      {test.settings.browser?.proctoring && (
        <Proctoring onViolation={(count) => setViolations(count)} />
      )}
      <div className="test-header">
        <div className="timer">
          {/* Simple timer component could go here */}
        </div>
      </div>
      
      <div className="questions-list">
        {test.questions.map((q, index) => (
          <div key={q._id} className="question-card card">
            <div className="q-label">Question {index + 1}</div>
            <div className="q-text">{q.text}</div>
            
            <div className="q-options">
              {q.type === 'multiple-choice' && q.options.map((opt, i) => (
                <label key={i} className="opt-label">
                  <input 
                    type="radio" 
                    name={`q-${q._id}`} 
                    checked={answers[q._id] === opt}
                    onChange={() => setAnswers({...answers, [q._id]: opt})}
                  />
                  {opt}
                </label>
              ))}
              
              {q.type === 'true-false' && (
                <>
                  <label className="opt-label">
                    <input type="radio" name={`q-${q._id}`} checked={answers[q._id] === 'true'} onChange={() => setAnswers({...answers, [q._id]: 'true'})} /> True
                  </label>
                  <label className="opt-label">
                    <input type="radio" name={`q-${q._id}`} checked={answers[q._id] === 'false'} onChange={() => setAnswers({...answers, [q._id]: 'false'})} /> False
                  </label>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="test-actions">
        {submitError && (
          <div className="submit-error" style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', fontWeight: '500' }}>
            <ShieldAlert size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
            {submitError}
          </div>
        )}
        
        {!showConfirm ? (
          <button 
            onClick={handleSubmitClick} 
            className="btn-primary submit-btn" 
          >
            Submit Test
          </button>
        ) : (
          <div className="confirm-container card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Ready to submit?</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Make sure you have answered all questions. You cannot change your answers after submission.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowConfirm(false)} 
                className="btn-secondary"
                disabled={isSubmitting}
                style={{ background: '#E2E8F0', padding: '12px 24px', borderRadius: '10px', color: '#475569', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button 
                onClick={executeSubmit} 
                className="btn-primary" 
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer', padding: '12px 32px' }}
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .taking-step { max-width: 800px; margin: 0 auto; }
        .questions-list { display: flex; flex-direction: column; gap: 2rem; }
        .question-card { padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(0,0,0,0.02); }
        .q-label { font-weight: 800; color: #94A3B8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.85rem; }
        .q-text { font-size: 1.25rem; font-weight: 600; color: var(--text-dark); margin-bottom: 2rem; line-height: 1.6; }
        .q-options { display: flex; flex-direction: column; gap: 1rem; }
        .opt-label { display: flex; align-items: center; gap: 1rem; padding: 16px 20px; border: 1px solid var(--border-color); border-radius: 12px; cursor: pointer; transition: all 0.2s; background: white; font-weight: 500; color: #475569; }
        .opt-label:hover { border-color: var(--primary); background: #F5F3FF; }
        .opt-label input { width: 20px; height: 20px; accent-color: var(--primary); }
        .test-actions { margin-top: 4rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-bottom: 4rem; text-align: center; }
        .submit-btn { padding: 16px 64px; font-size: 1.25rem; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.25); }
        .confirm-container { border: 2px solid var(--primary); max-width: 500px; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
