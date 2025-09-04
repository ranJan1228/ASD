import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmotionGame = () => {
  const location = useLocation();
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    try {
      setError(null);
      setIsRunning(true);

      // Send request to Flask server to start emotion recognition
      const response = await fetch("http://127.0.0.1:5002/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script: "emotion_game.py" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start the game.");
      }

      console.log("Emotion game started!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start the game");
      setIsRunning(false);
    }
  }, []);

  const gameLoopRef = useRef<number>();
  const lastRenderRef = useRef<number>(0);
  const FPS = 60;
  const frameDelay = 1000 / FPS;

  const gameLoop = useCallback((timestamp: number) => {
    if (!lastRenderRef.current || timestamp - lastRenderRef.current >= frameDelay) {
      // Update game state here
      lastRenderRef.current = timestamp;
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, []);

  // Auto-start logic
  useEffect(() => {
    if (location.state?.autoStart) {
      startGame();
    } else {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  // ... rest of game implementation

  return (
    <div className="emotion-game">
        <h1 className="text-2xl font-bold">Emotion Game</h1>
        {error && <p className="text-red-500">{error}</p>}
        <p>{isRunning ? "Game is running..." : "Click Play to start"}</p>
        {!isRunning && (
          <button
            onClick={startGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Play
          </button>
        )}
    </div>
  );
};

export default EmotionGame;