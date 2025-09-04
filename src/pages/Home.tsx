import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { BrainCircuit } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <BrainCircuit size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Autism Assessment Platform</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GameCard
            title="Emotion Detection Game"
            description="Test your ability to recognize and understand different emotional expressions."
            imageUrl="/emotion.png"
            onPlay={() => navigate('/emotion-game', { state: { autoStart: true } })}
          />
          <GameCard
            title="Gesture Recognition Game"
            description="Challenge your gesture recognition skills with various gestures."
            imageUrl="/gesture.png"
            onPlay={() => navigate('/shape-game', { state: { autoStart: true } })}
          />
          <GameCard
            title="Color Identification Game"
            description="Improve your ability to identify and distinguish different colors."
            imageUrl="/colour.png"
            onPlay={() => navigate('/color-game', { state: { autoStart: true } })}
          />
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Autism Test"
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Autism Assessment Test</h3>
              <p className="text-gray-600 mb-4">Take our comprehensive autism assessment test to better understand yourself.</p>
              <button
                onClick={() => navigate('/test')}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Test
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
