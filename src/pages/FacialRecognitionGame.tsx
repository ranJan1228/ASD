import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EmotionData {
  id: number;
  emotion: string;
  imageUrl: string;
  description: string;
}

const FacialRecognitionGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [responses, setResponses] = useState<Array<{emotion: string, response: string, correct: boolean}>>([]);
  
  const emotions: EmotionData[] = [
    {
      id: 1,
      emotion: 'happy',
      imageUrl: '/emotions/happy.png',
      description: 'This person is feeling happy'
    },
    // Add more emotions (sad, angry, surprised, scared, etc.)
  ];

  const handleEmotionSelect = (selectedEmotion: string) => {
    if (currentEmotion) {
      const correct = selectedEmotion === currentEmotion.emotion;
      setScore(prev => correct ? prev + 1 : prev);
      setResponses(prev => [...prev, {
        emotion: currentEmotion.emotion,
        response: selectedEmotion,
        correct
      }]);
      
      // Track response time and accuracy for assessment
      logBehaviorMetrics({
        gameType: 'facial-recognition',
        correct,
        responseTime: Date.now() - gameStartTime,
        emotion: currentEmotion.emotion
      });
    }
    nextEmotion();
  };

  const [gameStartTime, setGameStartTime] = useState(Date.now());
  
  const nextEmotion = () => {
    const nextEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(nextEmotion);
    setGameStartTime(Date.now());
  };

  const logBehaviorMetrics = (metrics: {
    gameType: string;
    correct: boolean;
    responseTime: number;
    emotion: string;
  }) => {
    // Send metrics to backend for analysis
    // This data can be used to detect patterns indicative of autism
  };

  useEffect(() => {
    nextEmotion();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emotion Recognition Game</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {currentEmotion && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <img 
                src={currentEmotion.imageUrl} 
                alt="Emotion to recognize"
                className="w-64 h-64 mx-auto rounded-lg"
              />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              {emotions.map(emotion => (
                <button
                  key={emotion.id}
                  onClick={() => handleEmotionSelect(emotion.emotion)}
                  className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {emotion.emotion}
                </button>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-4">
          <p className="text-xl">Score: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognitionGame; 