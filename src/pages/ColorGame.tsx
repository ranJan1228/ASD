import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const ColorGame = () => {
  const location = useLocation();
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    try {
      setError(null);
      setIsRunning(true);

      // Send request to Flask server to start color recognition
      const response = await fetch("http://127.0.0.1:5003/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script: "colour.py" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start the game.");
      }

      console.log("Color game started!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start the game");
      setIsRunning(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Color Identification Game
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Click "Play" to start the Color Identification Game.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <button
            className={`px-6 py-3 rounded-lg font-semibold ${
              isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            } text-white`}
            onClick={startGame}
            disabled={isRunning}
          >
            {isRunning ? "Game Running..." : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorGame; 