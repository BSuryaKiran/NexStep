// Question database for "I am not a robot" verification
// Questions are case-insensitive for validation

export const verificationQuestions = [
  {
    id: 1,
    question: "What is the default port for React dev server?",
    answer: "3000",
    alternatives: ["THREE THOUSAND", "three thousand"]
  },
  {
    id: 2,
    question: "Which symbol is used for IDs in CSS?",
    answer: "#",
    alternatives: ["hash", "HASH", "hashtag", "HASHTAG"]
  },
  {
    id: 3,
    question: "What is the 'M' in MERN stack?",
    answer: "mongodb",
    alternatives: ["MONGODB", "MongoDB"]
  },
  {
    id: 4,
    question: "What does CSS stand for?",
    answer: "cascading style sheets",
    alternatives: ["CASCADING STYLE SHEETS", "Cascading Style Sheets"]
  },
  {
    id: 5,
    question: "What does API stand for?",
    answer: "application programming interface",
    alternatives: ["APPLICATION PROGRAMMING INTERFACE", "Application Programming Interface"]
  },
  {
    id: 6,
    question: "What tag is used for links in HTML?",
    answer: "a",
    alternatives: ["anchor", "ANCHOR", "<a>", "<a>"]
  },
  {
    id: 7,
    question: "Which JS keyword is used for constants?",
    answer: "const",
    alternatives: ["CONST", "Const"]
  }
];

/**
 * Get random questions for verification
 * @param {number} count - Number of questions to return
 * @returns {Array} Array of random questions
 */
export const getRandomQuestions = (count = 1) => {
  const shuffled = [...verificationQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Verify an answer against the question
 * @param {string} userAnswer - User's answer
 * @param {string} correctAnswer - Correct answer
 * @returns {boolean} True if answer is correct (case-insensitive)
 */
export const verifyAnswer = (userAnswer, correctAnswer) => {
  const normalized = userAnswer.trim().toLowerCase();
  const correct = correctAnswer.toLowerCase();
  
  return normalized === correct;
};
