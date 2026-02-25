import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const CustomCaptcha = ({ onVerify, onClose }) => {
  const questions = [
    { question: "What is the default port for React dev?", answer: "3000" },
    { question: "Which symbol is used for IDs in CSS?", answer: "#" },
    { question: "What is the 'M' in MERN stack?", answer: "MongoDB" },
    { question: "What does 'C' in CSS stand for?", answer: "Cascading" },
    { question: "What does 'A' in API stand for?", answer: "Application" },
    { question: "What tag is used for links in HTML?", answer: "a" },
    { question: "Which JS keyword is used for constants?", answer: "const" }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Select a random question when component mounts
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentQuestion || !userAnswer.trim()) {
      return;
    }

    // Case-insensitive validation
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    // Auto close and notify parent after showing result
    setTimeout(() => {
      if (correct) {
        onVerify(true);
      }
      setShowResult(false);
      if (!correct) {
        // Reset for retry
        setUserAnswer('');
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
      }
    }, 2000);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="glass" style={{
        width: '90%',
        maxWidth: '500px',
        padding: '2rem',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-gray)',
            padding: '0.5rem'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          Full Stack Challenge
        </h2>

        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <div style={{
              padding: '1.5rem',
              background: 'rgba(99, 102, 241, 0.05)',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: '1px solid var(--glass-border)'
            }}>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {currentQuestion.question}
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="form-input"
                placeholder="Enter your answer"
                autoFocus
                required
                style={{
                  textAlign: 'center',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              Submit Answer
            </button>
          </form>
        ) : (
          <div style={{
            padding: '2rem',
            textAlign: 'center'
          }}>
            {isCorrect ? (
              <>
                <CheckCircle
                  size={64}
                  style={{
                    color: '#10b981',
                    margin: '0 auto 1rem'
                  }}
                />
                <h3 style={{
                  color: '#10b981',
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  Verification Success!
                </h3>
                <p style={{ color: 'var(--text-gray)' }}>
                  You can now proceed with login
                </p>
              </>
            ) : (
              <>
                <XCircle
                  size={64}
                  style={{
                    color: '#ef4444',
                    margin: '0 auto 1rem'
                  }}
                />
                <h3 style={{
                  color: '#ef4444',
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  Incorrect Answer
                </h3>
                <p style={{ color: 'var(--text-gray)' }}>
                  Please try again with a new question
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCaptcha;
