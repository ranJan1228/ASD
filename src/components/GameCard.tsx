import React from 'react';
import { Play } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPlay: () => void;
}

export function GameCard({ title, description, imageUrl, onPlay }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          onClick={onPlay}
          className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Play size={20} className="mr-2" />
          Play Game
        </button>
      </div>
    </div>
  );
}