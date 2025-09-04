import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameLauncher: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'eye-tracking',
      title: 'Eye Contact Game',
      description: 'Tests eye contact and social attention',
      path: '/eye-tracking',
      ageRange: '3-12',
      duration: '1-2 minutes'
    },
    {
      id: 'emotion-mimic',
      title: 'Emotion Mimic Game',
      description: 'Practice recognizing and copying emotions',
      path: '/emotion-mimic',
      ageRange: '4-12',
      duration: '2-3 minutes'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Autism Assessment Games</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <div 
            key={game.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Age Range: {game.ageRange}</p>
              <p>Duration: {game.duration}</p>
            </div>
            <button
              onClick={() => navigate(game.path, { state: { autoStart: true } })
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Start Game
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLauncher; 