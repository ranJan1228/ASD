import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ShapeGame() {
  const location = useLocation();
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const startGame = async () => {
    try {
      setError(null);
      setIsRunning(true);

      // Send request to Flask server to start gesture recognition
      const response = await fetch("http://127.0.0.1:5001/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script: "gesture.py" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start the game.");
      }

      console.log("Gesture game started!");
    } catch (err) {
      setError(err.message);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (location.state?.autoStart && !isRunning) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Gesture Recognition Game
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Click "Play" to start the Gesture Recognition Game.
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
}
