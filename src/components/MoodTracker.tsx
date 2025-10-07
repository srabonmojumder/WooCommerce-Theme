'use client';

import { MoodData, ThemeConfig } from '@/types';
import { useState } from 'react';
import { analyzeMoodFromText } from '@/utils/themes';

interface MoodTrackerProps {
  mood: MoodData | null;
  theme: ThemeConfig;
  onMoodChange: (mood: MoodData) => void;
}

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  calm: '😌',
  stressed: '😰',
  motivated: '💪',
  tired: '😴'
};

const moodColors = {
  happy: 'bg-yellow-500',
  sad: 'bg-blue-500',
  excited: 'bg-pink-500',
  calm: 'bg-green-500',
  stressed: 'bg-red-500',
  motivated: 'bg-purple-500',
  tired: 'bg-gray-500'
};

export default function MoodTracker({ mood, theme, onMoodChange }: MoodTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [moodNote, setMoodNote] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMoodSubmit = async () => {
    if (!moodNote.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const analyzedMood = await analyzeMoodFromText(moodNote);
      const newMood: MoodData = {
        mood: analyzedMood as any,
        note: moodNote,
        timestamp: new Date()
      };
      
      onMoodChange(newMood);
      setMoodNote('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error analyzing mood:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const quickMoodSelect = (selectedMood: keyof typeof moodEmojis) => {
    const newMood: MoodData = {
      mood: selectedMood,
      note: `Feeling ${selectedMood}`,
      timestamp: new Date()
    };
    onMoodChange(newMood);
  };

  return (
    <div className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${theme.text} text-xl font-semibold`}>Mood Tracker</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${theme.accent} text-white px-3 py-1 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Current Mood Display */}
      {mood && (
        <div className="mb-4 p-4 bg-white/50 rounded-lg border border-gray-200/50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{moodEmojis[mood.mood]}</span>
            <div>
              <span className={`${theme.text} font-semibold capitalize`}>{mood.mood}</span>
              <p className={`${theme.textSecondary} text-sm`}>
                {mood.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <p className={`${theme.textSecondary} text-sm italic`}>"{mood.note}"</p>
        </div>
      )}

      {/* Quick Mood Selection */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {Object.entries(moodEmojis).map(([moodKey, emoji]) => (
          <button
            key={moodKey}
            onClick={() => quickMoodSelect(moodKey as keyof typeof moodEmojis)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              mood?.mood === moodKey 
                ? `${moodColors[moodKey as keyof typeof moodColors]} border-transparent text-white` 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            title={`Feel ${moodKey}`}
          >
            <div className="text-lg">{emoji}</div>
            <div className="text-xs font-medium capitalize mt-1">{moodKey}</div>
          </button>
        ))}
      </div>

      {/* Expanded Mood Input */}
      {isExpanded && (
        <div className="space-y-3 border-t border-gray-200/50 pt-4">
          <textarea
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            placeholder="How are you feeling today? Describe your mood..."
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.text} bg-white/50 resize-none`}
            rows={3}
          />
          <button
            onClick={handleMoodSubmit}
            disabled={!moodNote.trim() || isAnalyzing}
            className={`w-full ${theme.accent} text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50`}
          >
            {isAnalyzing ? 'Analyzing Mood...' : 'Update Mood 🧠'}
          </button>
        </div>
      )}

      {/* AI Analysis Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className={`${theme.textSecondary} text-xs`}>
            AI-powered mood analysis
          </span>
        </div>
      </div>
    </div>
  );
}
