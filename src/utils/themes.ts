import { ThemeConfig } from '@/types';

// Mood-based theme configurations
export const moodThemes: Record<string, ThemeConfig> = {
  happy: {
    primary: 'from-yellow-400 to-orange-500',
    secondary: 'from-orange-300 to-pink-400',
    accent: 'bg-yellow-500',
    background: 'bg-gradient-to-br from-yellow-50 to-orange-100',
    surface: 'bg-white/80 backdrop-blur-sm border border-yellow-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500'
  },
  sad: {
    primary: 'from-blue-400 to-indigo-600',
    secondary: 'from-slate-400 to-blue-500',
    accent: 'bg-blue-500',
    background: 'bg-gradient-to-br from-slate-100 to-blue-200',
    surface: 'bg-white/70 backdrop-blur-sm border border-blue-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-slate-400 via-blue-500 to-indigo-600'
  },
  excited: {
    primary: 'from-pink-500 to-rose-600',
    secondary: 'from-purple-400 to-pink-500',
    accent: 'bg-pink-500',
    background: 'bg-gradient-to-br from-pink-100 to-rose-200',
    surface: 'bg-white/80 backdrop-blur-sm border border-pink-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600'
  },
  calm: {
    primary: 'from-green-400 to-teal-500',
    secondary: 'from-emerald-300 to-green-400',
    accent: 'bg-green-500',
    background: 'bg-gradient-to-br from-green-50 to-teal-100',
    surface: 'bg-white/75 backdrop-blur-sm border border-green-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600'
  },
  stressed: {
    primary: 'from-red-400 to-orange-600',
    secondary: 'from-amber-400 to-red-500',
    accent: 'bg-red-500',
    background: 'bg-gradient-to-br from-red-50 to-orange-100',
    surface: 'bg-white/70 backdrop-blur-sm border border-red-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-amber-500 via-red-500 to-orange-600'
  },
  motivated: {
    primary: 'from-purple-500 to-indigo-600',
    secondary: 'from-blue-400 to-purple-500',
    accent: 'bg-purple-500',
    background: 'bg-gradient-to-br from-purple-100 to-indigo-200',
    surface: 'bg-white/80 backdrop-blur-sm border border-purple-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600'
  },
  tired: {
    primary: 'from-gray-400 to-slate-600',
    secondary: 'from-stone-400 to-gray-500',
    accent: 'bg-gray-500',
    background: 'bg-gradient-to-br from-gray-100 to-slate-200',
    surface: 'bg-white/60 backdrop-blur-sm border border-gray-200/50',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-stone-400 via-gray-500 to-slate-600'
  }
};

// Default theme
export const defaultTheme: ThemeConfig = moodThemes.calm;

// Get theme based on mood
export const getThemeByMood = (mood: string): ThemeConfig => {
  return moodThemes[mood] || defaultTheme;
};

// Analyze mood from text (placeholder for AI integration)
export const analyzeMoodFromText = async (text: string): Promise<string> => {
  // This is a placeholder - in real implementation, you would call OpenAI/HuggingFace API
  const moodKeywords = {
    happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'wonderful', 'amazing'],
    sad: ['sad', 'down', 'depressed', 'upset', 'disappointed', 'blue'],
    excited: ['excited', 'thrilled', 'pumped', 'energetic', 'enthusiastic'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'zen'],
    stressed: ['stressed', 'anxious', 'worried', 'overwhelmed', 'pressure'],
    motivated: ['motivated', 'determined', 'focused', 'driven', 'ambitious'],
    tired: ['tired', 'exhausted', 'sleepy', 'drained', 'weary']
  };

  const lowerText = text.toLowerCase();
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return mood;
    }
  }
  
  return 'calm'; // default mood
};
