import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const emotions = ['happy', 'sad', 'angry', 'surprised'];

const EmotionMimicGame: React.FC = () => {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>('');
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [emotionDetections, setEmotionDetections] = useState<string[]>([]);

  useEffect(() => {
    if (location.state?.autoStart && !isPlaying) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
    };
    loadModels();
  }, []);

  const startGame = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsPlaying(true);
      nextEmotion();
      startDetection();
    }
  };

  const startDetection = () => {
    const detectEmotions = async () => {
      if (videoRef.current && isPlaying) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const detectedEmotion = Object.entries(expressions)
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
          
          setEmotionDetections(prev => [...prev, detectedEmotion]);
        }

        if (isPlaying) {
          requestAnimationFrame(detectEmotions);
        }
      }
    };

    detectEmotions();
  };

  const nextEmotion = () => {
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(emotion);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }

    const emotionScore = calculateEmotionScore(emotionDetections);
    
    saveGameResults({
      gameId: 'emotion-mimic',
      score: emotionScore,
      metrics: {
        emotionRecognitionAccuracy: emotionScore,
        responseTime: [],
        accuracy: emotionScore
      },
      timestamp: Date.now()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emotion Mimic Game</h1>
      
      {currentEmotion && (
        <div className="text-xl mb-4">
          Please show a {currentEmotion} expression
        </div>
      )}

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex gap-4">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={endGame}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            End Game
          </button>
        )}
      </div>
    </div>
  );
};

export default EmotionMimicGame; 