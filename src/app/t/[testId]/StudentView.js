'use client';

import { useState } from 'react';
import { Play, ShieldAlert } from 'lucide-react';
import { submitTest } from '../submission-actions';
import Proctoring from './Proctoring';

export default function StudentView({ test, testId }) {
  const [step, setStep] = useState('welcome'); // welcome, taking, reviewing
  const [studentInfo, setStudentInfo] = useState({ name: '', identifier: '', passcode: '' });
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [violations, setViolations] = useState(0);

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

  const handleSubmit = async () => {
    if (confirm('Are you sure you want to submit your test?')) {
      await submitTest(testId, { ...studentInfo, startTime, violations }, answers);
    }
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
      <Proctoring onViolation={(count) => setViolations(count)} />
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
        <button onClick={handleSubmit} className="btn-primary submit-btn">Submit Test</button>
      </div>

      <style jsx>{`
        .taking-step { max-width: 800px; margin: 0 auto; }
        .questions-list { display: flex; flex-direction: column; gap: 2rem; }
        .question-card { padding: 2rem; }
        .q-label { font-weight: 800; color: #888; margin-bottom: 0.5rem; }
        .q-text { font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem; }
        .q-options { display: flex; flex-direction: column; gap: 1rem; }
        .opt-label { display: flex; align-items: center; gap: 0.75rem; padding: 12px; border: 1px solid #eee; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .opt-label:hover { background: #f9f9f9; }
        .opt-label input { width: 18px; height: 18px; }
        .test-actions { margin-top: 3rem; display: flex; justify-content: center; }
        .submit-btn { padding: 15px 50px; font-size: 1.25rem; }
      `}</style>
    </div>
  );
}
