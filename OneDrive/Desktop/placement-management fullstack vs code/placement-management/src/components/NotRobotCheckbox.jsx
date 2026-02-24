import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { getRandomQuestions, verifyAnswer } from '../utils/VerificationQuestions';

const NotRobotCheckbox = ({ onVerified, roleType = 'Student' }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'error', null
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleCheckboxClick = (e) => {
    e.preventDefault();
    if (isVerified) {
      setIsChecked(false);
      setIsVerified(false);
      setVerificationStatus(null);
      setCurrentQuestion(null);
      if (onVerified) onVerified(false);
      return;
    }

    setIsChecked(true);
    setAttempts(0);
    setVerificationStatus(null);
    setUserAnswer('');

    // Role-specific questions
    if (roleType === 'Student') {
      const qList = getRandomQuestions(1);
      setCurrentQuestion(qList[0]);
    } else {
      setCurrentQuestion({
        question: "How is your health?",
        isHealthCheck: true
      });
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    if (!userAnswer.trim()) {
      setVerificationStatus('error');
      return;
    }

    let isCorrect = false;
    if (currentQuestion.isHealthCheck) {
      // For health check, any non-empty answer is fine
      isCorrect = true;
    } else {
      isCorrect = verifyAnswer(userAnswer, currentQuestion.answer);
    }

    if (isCorrect) {
      setVerificationStatus('success');
      setIsVerified(true);
      setIsChecked(true);
      setUserAnswer('');

      // Immediately notify parent component of successful verification
      if (onVerified) {
        onVerified(true);
      }

      // Verification success dialog box as requested
      setTimeout(() => {
        alert("Verification Success!");
      }, 100);

    } else {
      setAttempts(attempts + 1);
      setVerificationStatus('error');

      // Generate new question for retry
      setTimeout(() => {
        if (roleType === 'Student') {
          const newQuestions = getRandomQuestions(1);
          setCurrentQuestion(newQuestions[0]);
        } else {
          // Keep health question
          setCurrentQuestion({
            question: "How is your health?",
            isHealthCheck: true
          });
        }
        setUserAnswer('');
        setVerificationStatus(null);
      }, 1500);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Checkbox */}
      <div
        onClick={handleCheckboxClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          marginBottom: isChecked && !isVerified ? '1rem' : '0',
          cursor: 'pointer'
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            border: `2px solid ${isVerified ? '#22c55e' : 'rgba(255,255,255,0.3)'}`,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isVerified ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
            transition: 'all 0.3s',
          }}
        >
          {isVerified && <Check size={16} style={{ color: '#22c55e' }} />}
        </div>
        <label style={{ color: 'var(--text-gray)', fontSize: '0.95rem', cursor: 'pointer', userSelect: 'none' }}>
          I am not a robot
        </label>
      </div>

      {/* Inline Verification Section (All roles) */}
      {isChecked && !isVerified && currentQuestion && (
        <div className="glass" style={{
          marginTop: '1rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 107, 53, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 107, 53, 0.2)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Verification Question (Attempt {attempts + 1}):
          </p>

          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            borderRadius: '8px',
            marginBottom: '1.2rem',
            border: '1px solid rgba(255, 107, 53, 0.3)'
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>
              {currentQuestion.question}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAnswerSubmit(e);
                }
              }}
              placeholder="Type your answer here..."
              className="form-input"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderColor: verificationStatus === 'error' ? '#ef4444' : 'rgba(255,255,255,0.1)',
                fontSize: '0.95rem',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
              autoFocus
              disabled={verificationStatus === 'success'}
            />

            {/* Status Messages */}
            {verificationStatus === 'success' && (
              <div style={{ padding: '0.8rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#22c55e', fontSize: '0.9rem' }}>
                <Check size={18} />
                <span>Verification successful!</span>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div style={{ padding: '0.8rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ef4444', fontSize: '0.9rem' }}>
                <AlertCircle size={18} />
                <span>Incorrect answer. Retrying...</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleAnswerSubmit}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                background: '#FF6B35',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'opacity 0.2s'
              }}
              disabled={verificationStatus === 'success'}
            >
              {verificationStatus === 'success' ? 'Verified' : 'Verify Answer'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotRobotCheckbox;
