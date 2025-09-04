export const GAME_CONFIG = {
  eyeTracking: {
    duration: 60000, // 1 minute per session
    minEyeContactThreshold: 0.3,
    calibrationTime: 3000,
  },
  emotionMimic: {
    emotions: ['happy', 'sad', 'surprised', 'angry'],
    timePerEmotion: 10000,
    totalRounds: 5,
  },
  scoring: {
    thresholds: {
      low: 0.3,
      medium: 0.6,
      high: 0.8,
    }
  }
}; 