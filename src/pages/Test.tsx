import React, { useState } from 'react';
import { autismQuestions } from '../data/questions';

export function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < autismQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      // Score calculation based on answers
      // Higher scores indicate more autistic traits
      const question = autismQuestions.find(q => q.id === parseInt(questionId));
      if (question) {
        if (
          [1, 2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20].includes(question.id)
        ) {
          // Questions where "Definitely agree" indicates autistic traits
          score += answer === "Definitely agree" ? 2 :
                  answer === "Slightly agree" ? 1 :
                  answer === "Slightly disagree" ? 0 : 0;
        } else {
          // Questions where "Definitely disagree" indicates autistic traits
          score += answer === "Definitely disagree" ? 2 :
                  answer === "Slightly disagree" ? 1 :
                  answer === "Slightly agree" ? 0 : 0;
        }
      }
    });
    return score;
  };

  const getResultMessage = (score: number) => {
    if (score >= 32) {
      return "Your responses suggest a high likelihood of autism spectrum traits. We recommend consulting with a healthcare professional for a thorough evaluation.";
    } else if (score >= 25) {
      return "Your responses indicate moderate autism spectrum traits. Consider discussing these results with a healthcare provider.";
    } else if (score >= 15) {
      return "Your responses show some autism spectrum traits. If you have concerns, consider discussing them with a healthcare professional.";
    } else {
      return "Your responses indicate few or no autism spectrum traits. However, if you have concerns, always feel free to discuss them with a healthcare provider.";
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Your Results</h2>
            
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(score / 40) * 100}%` }}
                ></div>
              </div>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-blue-600">{score}</span>
                <span className="text-gray-600"> / 40</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-800">
                {getResultMessage(score)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Note: This test is for screening purposes only and is not a diagnostic tool.
                A proper diagnosis can only be made by qualified healthcare professionals.
              </p>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Test Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = autismQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / autismQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Question {currentQuestion + 1} of {autismQuestions.length}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.text}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}