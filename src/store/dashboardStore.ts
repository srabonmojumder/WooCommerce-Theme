import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardData, TodoItem, MoodData, QuoteData, JournalEntry, UserStats, Badge } from '@/types';
import { getThemeByMood, defaultTheme } from '@/utils/themes';
import { getMockWeatherData, getRandomQuote, getTimeBasedGreeting, getMockTodos } from '@/utils/mockData';

interface DashboardStore extends DashboardData {
  // Actions
  updateGreeting: () => void;
  updateWeather: (weather: Partial<DashboardData['weather']>) => void;
  updateTodos: (todos: TodoItem[]) => void;
  addTodo: (todo: Omit<TodoItem, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateMood: (mood: MoodData) => void;
  updateQuote: (quote: QuoteData) => void;
  toggleNightMode: () => void;
  
  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  
  // Favorites
  favoriteQuotes: QuoteData[];
  toggleQuoteFavorite: (quote: QuoteData) => void;
  
  // Gamification
  addPoints: (points: number) => void;
  unlockBadge: (badge: Badge) => void;
  incrementStreak: () => void;
  
  // Focus tracking
  focusTime: number;
  addFocusTime: (minutes: number) => void;
  
  // Settings
  preferences: {
    layout: 'grid' | 'list' | 'stacked';
    accentColor: string;
    fontStyle: string;
    soundEnabled: boolean;
    notificationsEnabled: boolean;
  };
  updatePreferences: (prefs: Partial<DashboardStore['preferences']>) => void;
}

const initialUserStats: UserStats = {
  totalTasks: 0,
  completedTasks: 0,
  focusTime: 0,
  currentStreak: 0,
  totalPoints: 0,
  level: 1,
  badges: []
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      greeting: getTimeBasedGreeting(),
      weather: getMockWeatherData(),
      todos: getMockTodos(),
      quote: getRandomQuote(),
      mood: null,
      theme: defaultTheme,
      isNightMode: false,
      userStats: initialUserStats,
      journalEntries: [],
      favoriteQuotes: [],
      focusTime: 0,
      preferences: {
        layout: 'grid',
        accentColor: '#3B82F6',
        fontStyle: 'Inter',
        soundEnabled: true,
        notificationsEnabled: true
      },

      // Actions
      updateGreeting: () => {
        set({ greeting: getTimeBasedGreeting() });
      },

      updateWeather: (weather) => {
        set((state) => ({
          weather: { ...state.weather, ...weather }
        }));
      },

      updateTodos: (todos) => {
        set({ todos });
      },

      addTodo: (todoData) => {
        const newTodo: TodoItem = {
          ...todoData,
          id: Date.now().toString(),
          createdAt: new Date()
        };
        
        set((state) => ({
          todos: [...state.todos, newTodo],
          userStats: {
            ...state.userStats,
            totalTasks: state.userStats.totalTasks + 1
          }
        }));
      },

      toggleTodo: (id) => {
        set((state) => {
          const updatedTodos = state.todos.map(todo => {
            if (todo.id === id) {
              const completed = !todo.completed;
              if (completed) {
                // Add points for completing a task
                get().addPoints(10);
              }
              return { ...todo, completed };
            }
            return todo;
          });

          const completedCount = updatedTodos.filter(t => t.completed).length;
          
          return {
            todos: updatedTodos,
            userStats: {
              ...state.userStats,
              completedTasks: completedCount
            }
          };
        });
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }));
      },

      updateMood: (mood) => {
        const newTheme = getThemeByMood(mood.mood);
        set({ 
          mood, 
          theme: newTheme
        });
      },

      updateQuote: (quote) => {
        set({ quote });
      },

      toggleNightMode: () => {
        set((state) => ({
          isNightMode: !state.isNightMode,
          theme: {
            ...state.theme,
            isDark: !state.isNightMode
          }
        }));
      },

      addJournalEntry: (entryData) => {
        const newEntry: JournalEntry = {
          ...entryData,
          id: Date.now().toString(),
          date: new Date()
        };
        
        set((state) => ({
          journalEntries: [newEntry, ...state.journalEntries]
        }));
      },

      toggleQuoteFavorite: (quote) => {
        set((state) => {
          const isFavorite = state.favoriteQuotes.some(fq => fq.id === quote.id);
          
          if (isFavorite) {
            return {
              favoriteQuotes: state.favoriteQuotes.filter(fq => fq.id !== quote.id)
            };
          } else {
            return {
              favoriteQuotes: [...state.favoriteQuotes, { ...quote, isFavorite: true }]
            };
          }
        });
      },

      addPoints: (points) => {
        set((state) => {
          const newTotalPoints = state.userStats.totalPoints + points;
          const newLevel = Math.floor(newTotalPoints / 100) + 1;
          
          return {
            userStats: {
              ...state.userStats,
              totalPoints: newTotalPoints,
              level: newLevel
            }
          };
        });
      },

      unlockBadge: (badge) => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            badges: [...state.userStats.badges, badge]
          }
        }));
      },

      incrementStreak: () => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            currentStreak: state.userStats.currentStreak + 1
          }
        }));
      },

      addFocusTime: (minutes) => {
        set((state) => ({
          focusTime: state.focusTime + minutes,
          userStats: {
            ...state.userStats,
            focusTime: state.userStats.focusTime + minutes
          }
        }));
      },

      updatePreferences: (prefs) => {
        set((state) => ({
          preferences: { ...state.preferences, ...prefs }
        }));
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        todos: state.todos,
        mood: state.mood,
        journalEntries: state.journalEntries,
        favoriteQuotes: state.favoriteQuotes,
        userStats: state.userStats,
        focusTime: state.focusTime,
        preferences: state.preferences,
        isNightMode: state.isNightMode
      })
    }
  )
);
