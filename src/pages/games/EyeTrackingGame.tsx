import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import { checkSystemRequirements } from '../../utils/setupChecks';

const EyeTrackingGame: React.FC = () => {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (location.state?.autoStart && !isPlaying) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [eyeContactData, setEyeContactData] = useState<number[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      ]);
    };
    loadModels();
  }, []);

  useEffect(() => {
    const checkRequirements = async () => {
      const { canProceed } = await checkSystemRequirements();
      if (!canProceed) {
        alert('Please ensure you have a working webcam and are using a modern browser.');
        navigate('/games');
      }
    };
    
    checkRequirements();
  }, []);

  const startGame = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsPlaying(true);
      startTracking();
    }
  };

  const startTracking = () => {
    const checkEyeContact = async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks();

        if (detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const eyePoints = landmarks.getLeftEye().concat(landmarks.getRightEye());
          const isLookingAtCamera = calculateEyeDirection(eyePoints);
          
          setEyeContactData(prev => [...prev, isLookingAtCamera ? 1 : 0]);
        }
      }
      
      if (isPlaying) {
        requestAnimationFrame(checkEyeContact);
      }
    };

    checkEyeContact();
  };

  const calculateEyeDirection = (eyePoints: any[]): boolean => {
    // Complex eye direction calculation logic
    // Returns true if looking at camera, false otherwise
    return true; // Simplified for example
  };

  const endGame = () => {
    setIsPlaying(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }

    // Calculate final score
    const eyeContactScore = calculateEyeContactScore(eyeContactData);
    
    // Save to backend
    saveGameResults({
      gameId: 'eye-tracking',
      score: eyeContactScore,
      metrics: {
        eyeContactDuration: eyeContactScore,
        responseTime: [],
        accuracy: eyeContactScore
      },
      timestamp: Date.now()
    });
  };

  const calculateEyeContactScore = (data: number[]): number => {
    const totalFrames = data.length;
    const framesWithEyeContact = data.filter(v => v === 1).length;
    return framesWithEyeContact / totalFrames;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eye Contact Game</h1>
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full rounded-lg"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
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

export default EyeTrackingGame; 