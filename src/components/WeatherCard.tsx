'use client';

import { WeatherData, ThemeConfig } from '@/types';
import { MapPin, Thermometer, Droplets, Wind, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface WeatherCardProps {
  weather: WeatherData;
  theme: ThemeConfig;
  onRefresh?: () => void;
}

export default function WeatherCard({ weather, theme, onRefresh }: WeatherCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setIsRefreshing(true);
    setTimeout(() => {
      onRefresh();
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <motion.div
      className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Dynamic Weather Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${weather.backgroundGradient} opacity-10`}></div>

      {/* Animated Weather Pattern */}
      <div className="absolute inset-0 opacity-5">
        {weather.condition === 'Rainy' && (
          <div className="rain-animation">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`
                }}
                animate={{
                  y: [0, 300],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        {weather.condition === 'Snowy' && (
          <div className="snow-animation">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`
                }}
                animate={{
                  y: [0, 300],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Thermometer className={`w-5 h-5 ${theme.text}`} />
          <h2 className={`${theme.text} text-xl font-semibold`}>Weather</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            className="text-3xl"
            animate={{
              rotate: weather.condition === 'Sunny' ? [0, 360] : 0,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            {weather.icon}
          </motion.span>

          {onRefresh && (
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`p-2 rounded-lg ${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 transition-colors disabled:opacity-50`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Temperature Display */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.span
            className={`${theme.text} text-4xl font-bold`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {weather.temperature}°F
          </motion.span>

          <div className="text-right">
            <div className={`${theme.textSecondary} text-sm font-medium flex items-center gap-1`}>
              <MapPin className="w-3 h-3" />
              {weather.location}
            </div>
            <div className={`${theme.textSecondary} text-xs`}>
              Feels like {weather.feelsLike}°F
            </div>
          </div>
        </div>

        <div className={`${theme.text} text-lg font-medium`}>
          {weather.condition}
        </div>

        <div className={`${theme.textSecondary} text-sm italic`}>
          {weather.description}
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200/50">
          <motion.div
            className="text-center p-3 bg-white/30 rounded-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Droplets className={`w-4 h-4 ${theme.textSecondary}`} />
              <div className={`${theme.textSecondary} text-xs uppercase tracking-wide`}>
                Humidity
              </div>
            </div>
            <div className={`${theme.text} text-lg font-semibold`}>
              {weather.humidity}%
            </div>
          </motion.div>

          <motion.div
            className="text-center p-3 bg-white/30 rounded-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wind className={`w-4 h-4 ${theme.textSecondary}`} />
              <div className={`${theme.textSecondary} text-xs uppercase tracking-wide`}>
                Wind
              </div>
            </div>
            <div className={`${theme.text} text-lg font-semibold`}>
              {weather.windSpeed} mph
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
