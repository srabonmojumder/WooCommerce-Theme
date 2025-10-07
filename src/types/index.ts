// Types for the AI-Powered Daily Companion Dashboard

export interface MoodData {
  mood: 'happy' | 'sad' | 'excited' | 'calm' | 'stressed' | 'motivated' | 'tired' | 'anxious' | 'hopeful' | 'focused';
  note: string;
  timestamp: Date;
  intensity: number; // 1-10 scale
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  description: string;
  backgroundGradient: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  estimatedTime?: number; // in minutes
  category?: string;
  inProgress?: boolean;
}

export interface QuoteData {
  text: string;
  author: string;
  category: 'motivational' | 'funny' | 'wisdom' | 'productivity';
  style: string;
  isFavorite?: boolean;
  id: string;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  gradient: string;
  name: string;
  isDark: boolean;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isBreak: boolean;
  currentTask?: string;
  completedSessions: number;
}

export interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  aiSummary?: string;
  mood?: string;
  tags: string[];
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  focusTime: number; // in minutes
  currentStreak: number;
  totalPoints: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface MoodChart {
  date: string;
  mood: string;
  intensity: number;
}

export interface ProductivityChart {
  date: string;
  tasksCompleted: number;
  focusTime: number;
  mood: number;
}

export interface DashboardData {
  greeting: string;
  weather: WeatherData;
  todos: TodoItem[];
  quote: QuoteData;
  mood: MoodData | null;
  theme: ThemeConfig;
  isNightMode: boolean;
  userStats: UserStats;
}
