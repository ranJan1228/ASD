export interface GameScore {
  gameId: string;
  score: number;
  metrics: GameMetrics;
  timestamp: number;
}

export interface GameMetrics {
  responseTime: number[];
  accuracy: number;
  eyeContactDuration?: number;
  emotionRecognitionAccuracy?: number;
  socialInteractionScore?: number;
  repetitiveBehaviorCount?: number;
  attentionSpanDuration?: number;
}

export const calculateAutismIndicators = (scores: GameScore[]): {
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  recommendations: string[];
} => {
  const indicators: string[] = [];
  let riskPoints = 0;

  // Analyze eye contact
  const eyeContactScores = scores.filter(s => s.metrics.eyeContactDuration);
  if (eyeContactScores.length > 0) {
    const avgEyeContact = eyeContactScores.reduce((acc, curr) => 
      acc + (curr.metrics.eyeContactDuration || 0), 0) / eyeContactScores.length;
    if (avgEyeContact < 0.3) {
      indicators.push('Limited eye contact detected');
      riskPoints += 2;
    }
  }

  // Analyze emotion recognition
  const emotionScores = scores.filter(s => s.metrics.emotionRecognitionAccuracy);
  if (emotionScores.length > 0) {
    const avgEmotionAccuracy = emotionScores.reduce((acc, curr) => 
      acc + (curr.metrics.emotionRecognitionAccuracy || 0), 0) / emotionScores.length;
    if (avgEmotionAccuracy < 0.5) {
      indicators.push('Difficulty in emotion recognition');
      riskPoints += 2;
    }
  }

  // Calculate risk level
  const riskLevel = riskPoints <= 2 ? 'low' : riskPoints <= 4 ? 'medium' : 'high';

  return {
    riskLevel,
    indicators,
    recommendations: generateRecommendations(indicators)
  };
}; 