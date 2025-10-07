'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { getMockWeatherData } from '@/utils/mockData';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

import GreetingCard from './GreetingCard';
import WeatherCard from './WeatherCard';
import QuoteCard from './QuoteCard';
import TodoCard from './TodoCard';
import MoodTracker from './MoodTracker';
import FocusTimer from './FocusTimer';
import MindfulMoment from './MindfulMoment';
import AISetupModal from './AISetupModal';

export default function Dashboard() {
  const {
    greeting,
    weather,
    todos,
    quote,
    mood,
    theme,
    isNightMode,
    userStats,
    favoriteQuotes,
    updateGreeting,
    updateWeather,
    updateTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateMood,
    updateQuote,
    toggleQuoteFavorite,
    addFocusTime,
    addPoints
  } = useDashboardStore();

  const showAISetup = false; // We'll implement this later

  // Update greeting every minute
  useEffect(() => {
    const interval = setInterval(() => {
      updateGreeting();
    }, 60000);

    return () => clearInterval(interval);
  }, [updateGreeting]);

  const handleWeatherRefresh = () => {
    const newWeather = getMockWeatherData();
    updateWeather(newWeather);
    toast.success('Weather updated!');
  };

  const handleTaskComplete = (taskId: string) => {
    toggleTodo(taskId);
    addPoints(15); // Bonus points for completing via timer
    toast.success('Task completed! +15 points');
  };

  const handleFocusTimeAdd = (minutes: number) => {
    addFocusTime(minutes);
    addPoints(minutes); // 1 point per minute focused
    toast.success(`Great focus session! +${minutes} points`);
  };

  const handleAIConfigSave = (config: { openaiKey?: string; huggingfaceKey?: string }) => {
    // Store API keys in localStorage (in production, use secure storage)
    if (config.openaiKey) {
      localStorage.setItem('openai_api_key', config.openaiKey);
    }
    if (config.huggingfaceKey) {
      localStorage.setItem('huggingface_api_key', config.huggingfaceKey);
    }

    toast.success('AI configuration saved successfully!');
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${theme.background} ${isNightMode ? 'dark' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.h1
              className={`text-2xl md:text-3xl font-bold ${theme.text}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              🧠 AI-Powered Daily Companion
            </motion.h1>

            {/* Stats Display */}
            <motion.div
              className={`${theme.surface} px-4 py-2 rounded-full shadow-lg`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 text-sm">
                <span className={`${theme.text} font-semibold`}>
                  Level {userStats.level}
                </span>
                <span className={`${theme.textSecondary}`}>
                  {userStats.totalPoints} pts
                </span>
                <span className={`${theme.accent} text-white px-2 py-1 rounded-full text-xs`}>
                  {userStats.currentStreak} day streak
                </span>
              </div>
            </motion.div>
          </div>
          <p className={`${theme.textSecondary} text-sm md:text-base`}>
            Your intelligent dashboard for productivity and wellness
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Greeting Card - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GreetingCard
                greeting={greeting}
                theme={theme}
              />
            </motion.div>

            {/* Weather and Quote Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <WeatherCard
                  weather={weather}
                  theme={theme}
                  onRefresh={handleWeatherRefresh}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuoteCard
                  quote={quote}
                  theme={theme}
                  onQuoteChange={updateQuote}
                  onToggleFavorite={toggleQuoteFavorite}
                  isFavorite={favoriteQuotes.some(fq => fq.id === quote.id)}
                />
              </motion.div>
            </div>

            {/* Todo List - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TodoCard
                todos={todos}
                theme={theme}
                onTodosChange={updateTodos}
              />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mood Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MoodTracker
                mood={mood}
                theme={theme}
                onMoodChange={updateMood}
              />
            </motion.div>

            {/* Focus Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FocusTimer
                theme={theme}
                todos={todos}
                onTaskComplete={handleTaskComplete}
                onFocusTimeAdd={handleFocusTimeAdd}
              />
            </motion.div>

            {/* Mindful Moment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <MindfulMoment theme={theme} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className={`${theme.surface} rounded-2xl p-6 shadow-lg`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className={`${theme.text} text-lg font-semibold mb-4`}>
                Today's Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`${theme.textSecondary} text-sm`}>
                    Tasks Completed
                  </span>
                  <span className={`${theme.text} font-semibold`}>
                    {todos.filter(t => t.completed).length}/{todos.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${theme.textSecondary} text-sm`}>
                    Focus Time
                  </span>
                  <span className={`${theme.text} font-semibold`}>
                    {userStats.focusTime}min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${theme.textSecondary} text-sm`}>
                    Current Mood
                  </span>
                  <span className={`${theme.text} font-semibold capitalize`}>
                    {mood?.mood || 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${theme.textSecondary} text-sm`}>
                    Weather
                  </span>
                  <span className={`${theme.text} font-semibold`}>
                    {weather.temperature}°F
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className={`${theme.textSecondary} text-sm`}>
            Powered by AI • Built with Next.js & Tailwind CSS • Enhanced with Framer Motion
          </p>
          <div className="mt-2 flex justify-center">
            <motion.div
              className={`w-12 h-1 ${theme.gradient} rounded-full`}
              animate={{
                width: [48, 64, 48],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.surface,
            color: theme.text,
            border: `1px solid ${theme.accent}`,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }
        }}
      />

      {/* AI Setup Modal */}
      {showAISetup && (
        <AISetupModal
          isOpen={showAISetup}
          onClose={() => {}}
          theme={theme}
          onSaveConfig={handleAIConfigSave}
        />
      )}
    </div>
  );
}
