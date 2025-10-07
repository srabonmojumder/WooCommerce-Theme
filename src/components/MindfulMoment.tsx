'use client';

import { useState, useEffect, useRef } from 'react';
import { ThemeConfig } from '@/types';
import { Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Waves, Wind, TreePine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MindfulMomentProps {
  theme: ThemeConfig;
}

const breathingPatterns = {
  '4-7-8': { inhale: 4, hold: 7, exhale: 8, name: '4-7-8 Relaxing' },
  '4-4-4': { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing' },
  '6-2-6': { inhale: 6, hold: 2, exhale: 6, name: 'Calm Focus' }
};

const ambientSounds = [
  { id: 'rain', name: 'Rain', icon: '🌧️', color: 'text-blue-500' },
  { id: 'forest', name: 'Forest', icon: '🌲', color: 'text-green-500' },
  { id: 'ocean', name: 'Ocean', icon: '🌊', color: 'text-cyan-500' },
  { id: 'wind', name: 'Wind', icon: '💨', color: 'text-gray-500' }
];

export default function MindfulMoment({ theme }: MindfulMomentProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState<keyof typeof breathingPatterns>('4-7-8');
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pattern = breathingPatterns[selectedPattern];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeLeft(pattern.hold);
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeLeft(pattern.exhale);
      } else {
        setCurrentPhase('inhale');
        setTimeLeft(pattern.inhale);
        setCompletedCycles(prev => prev + 1);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, currentPhase, pattern]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeLeft(pattern.inhale);
    setCompletedCycles(0);
    
    if (selectedSound && soundEnabled) {
      playAmbientSound();
    }
  };

  const pauseBreathing = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(0);
    setCompletedCycles(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playAmbientSound = () => {
    if (!selectedSound || !soundEnabled) return;
    
    // In a real app, you would load actual audio files
    // For demo purposes, we'll create a simple tone
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different sounds
      const frequencies = {
        rain: 200,
        forest: 150,
        ocean: 100,
        wind: 300
      };
      
      oscillator.frequency.value = frequencies[selectedSound as keyof typeof frequencies] || 200;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start();
      
      // Stop after breathing session
      setTimeout(() => {
        oscillator.stop();
      }, 60000); // 1 minute
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Breathe out gently...';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'text-blue-500';
      case 'hold': return 'text-purple-500';
      case 'exhale': return 'text-green-500';
    }
  };

  const getCircleScale = () => {
    switch (currentPhase) {
      case 'inhale': return 1.3;
      case 'hold': return 1.3;
      case 'exhale': return 0.8;
    }
  };

  return (
    <motion.div 
      className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Heart className={`w-5 h-5 text-pink-500`} />
          <h2 className={`${theme.text} text-xl font-semibold`}>Mindful Moment</h2>
        </div>
        
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'text-pink-500' : theme.textSecondary} hover:bg-gray-100`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Breathing Pattern Selection */}
      {!isActive && (
        <div className="mb-6 relative z-10">
          <label className={`${theme.textSecondary} text-sm font-medium mb-2 block`}>
            Breathing Pattern
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(breathingPatterns).map(([key, pattern]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPattern(key as keyof typeof breathingPatterns)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedPattern === key
                    ? 'bg-pink-100 border-2 border-pink-300 text-pink-800'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{pattern.name}</div>
                <div className="text-xs text-gray-600">
                  Inhale {pattern.inhale}s • Hold {pattern.hold}s • Exhale {pattern.exhale}s
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Ambient Sound Selection */}
      {!isActive && (
        <div className="mb-6 relative z-10">
          <label className={`${theme.textSecondary} text-sm font-medium mb-2 block`}>
            Ambient Sound (Optional)
          </label>
          <div className="flex gap-2 flex-wrap">
            <motion.button
              onClick={() => setSelectedSound(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSound === null
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔇 Silent
            </motion.button>
            {ambientSounds.map(sound => (
              <motion.button
                key={sound.id}
                onClick={() => setSelectedSound(sound.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSound === sound.id
                    ? `bg-pink-500 text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sound.icon} {sound.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Breathing Circle */}
      <div className="text-center mb-6 relative z-10">
        <div className="relative w-40 h-40 mx-auto mb-4">
          <motion.div
            className={`w-full h-full rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 opacity-80`}
            animate={{ 
              scale: isActive ? getCircleScale() : 1,
            }}
            transition={{ 
              duration: isActive ? timeLeft : 2,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner circle with timer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              className={`text-3xl font-bold ${getPhaseColor()}`}
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isActive ? timeLeft : '•'}
            </motion.div>
            {isActive && (
              <motion.div 
                className={`text-sm font-medium ${getPhaseColor()} mt-1`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentPhase.toUpperCase()}
              </motion.div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentPhase}
            className={`${theme.text} text-lg font-medium mb-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isActive ? getPhaseInstructions() : 'Ready to breathe mindfully?'}
          </motion.p>
        </AnimatePresence>

        {completedCycles > 0 && (
          <motion.p 
            className={`${theme.textSecondary} text-sm`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Completed cycles: {completedCycles}
          </motion.p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 relative z-10">
        {!isActive ? (
          <motion.button
            onClick={startBreathing}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            Start Breathing
          </motion.button>
        ) : (
          <motion.button
            onClick={pauseBreathing}
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Pause className="w-5 h-5" />
            Pause
          </motion.button>
        )}
        
        <motion.button
          onClick={resetBreathing}
          className="px-4 py-3 bg-gray-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
