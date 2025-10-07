'use client';

import { TimerState, ThemeConfig, TodoItem } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target, Volume2, VolumeX, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusTimerProps {
  theme: ThemeConfig;
  todos?: TodoItem[];
  onTaskComplete?: (taskId: string) => void;
  onFocusTimeAdd?: (minutes: number) => void;
}

export default function FocusTimer({ theme, todos = [], onTaskComplete, onFocusTimeAdd }: FocusTimerProps) {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    isBreak: false,
    completedSessions: 0
  });

  const [selectedDuration, setSelectedDuration] = useState(25);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Timer finished
            if (soundEnabled) {
              playNotificationSound();
            }

            // Add focus time and complete session
            const sessionMinutes = prev.isBreak ? 5 : selectedDuration;
            if (onFocusTimeAdd && !prev.isBreak) {
              onFocusTimeAdd(sessionMinutes);
            }

            // Mark task as complete if it was selected
            if (selectedTask && onTaskComplete && !prev.isBreak) {
              onTaskComplete(selectedTask);
            }

            return {
              ...prev,
              isRunning: false,
              isBreak: !prev.isBreak,
              minutes: prev.isBreak ? selectedDuration : 5,
              seconds: 0,
              completedSessions: prev.isBreak ? prev.completedSessions : prev.completedSessions + 1
            };
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, selectedDuration, selectedTask, soundEnabled, onFocusTimeAdd, onTaskComplete]);

  const playNotificationSound = () => {
    try {
      // Create a more pleasant notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create a sequence of tones
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const startTime = audioContext.currentTime + (index * 0.2);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const startTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: true }));
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimer(prev => ({
      minutes: selectedDuration,
      seconds: 0,
      isRunning: false,
      isBreak: false,
      completedSessions: prev.completedSessions
    }));
  };

  const skipSession = () => {
    setTimer(prev => ({
      ...prev,
      isRunning: false,
      isBreak: !prev.isBreak,
      minutes: prev.isBreak ? selectedDuration : 5,
      seconds: 0
    }));
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalSeconds = (timer.isBreak ? 5 : selectedDuration) * 60;
  const currentSeconds = timer.minutes * 60 + timer.seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const durations = [15, 25, 30, 45, 60];

  const getSessionTypeInfo = () => {
    if (timer.isBreak) {
      return {
        title: 'Break Time',
        icon: Coffee,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        title: 'Focus Session',
        icon: Target,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      };
    }
  };

  const sessionInfo = getSessionTypeInfo();

  return (
    <motion.div
      className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full ${sessionInfo.color === 'text-green-500' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'}`}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <sessionInfo.icon className={`w-5 h-5 ${sessionInfo.color}`} />
          <h2 className={`${theme.text} text-xl font-semibold`}>Pomodoro Timer</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition-colors ${soundEnabled ? sessionInfo.color : theme.textSecondary} hover:bg-gray-100`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>

          <motion.button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${theme.textSecondary} hover:${theme.text} hover:bg-gray-100`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Session Type Badge */}
      <motion.div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${sessionInfo.bgColor} ${sessionInfo.borderColor} border mb-4 relative z-10`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <sessionInfo.icon className={`w-4 h-4 ${sessionInfo.color}`} />
        <span className={`text-sm font-medium ${sessionInfo.color}`}>
          {sessionInfo.title} {timer.completedSessions > 0 && `• Session ${timer.completedSessions + 1}`}
        </span>
      </motion.div>

      {/* Timer Display */}
      <div className="text-center mb-6 relative z-10">
        {/* Progress Circle */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${timer.isBreak ? 'text-green-500' : 'text-blue-500'} transition-colors duration-500`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {/* Pulse Ring */}
            {timer.isRunning && (
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className={`${timer.isBreak ? 'text-green-300' : 'text-blue-300'} opacity-50`}
                animate={{
                  r: [54, 58, 54],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </svg>

          {/* Timer Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className={`${theme.text} text-3xl md:text-4xl font-mono font-bold`}
              key={`${timer.minutes}:${timer.seconds}`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {formatTime(timer.minutes, timer.seconds)}
            </motion.div>
            <span className={`${theme.textSecondary} text-xs font-medium mt-1`}>
              {Math.round(progress)}% complete
            </span>
          </div>
        </div>
      </div>

      {/* Task Selection */}
      {!timer.isRunning && !timer.isBreak && activeTodos.length > 0 && (
        <div className="mb-4 relative z-10">
          <label className={`${theme.textSecondary} text-sm font-medium mb-2 block`}>
            Focus on a task (optional)
          </label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${theme.text} bg-white/70 backdrop-blur-sm`}
          >
            <option value="">Select a task...</option>
            {activeTodos.map(todo => (
              <option key={todo.id} value={todo.id}>
                {todo.text} ({todo.priority} priority)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && !timer.isRunning && (
          <motion.div
            className="mb-4 p-4 bg-white/50 rounded-lg border border-gray-200/50 backdrop-blur-sm relative z-10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className={`${theme.textSecondary} text-sm font-medium mb-2 block`}>
              Focus Duration (minutes)
            </label>
            <div className="flex gap-2 flex-wrap mb-3">
              {durations.map(duration => (
                <motion.button
                  key={duration}
                  onClick={() => {
                    setSelectedDuration(duration);
                    setTimer(prev => ({ ...prev, minutes: duration, seconds: 0 }));
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDuration === duration
                      ? `${theme.accent} text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {duration}m
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className={`${theme.textSecondary} text-sm`}>Sound notifications</span>
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                } relative`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                  animate={{ x: soundEnabled ? 26 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-3 mb-4 relative z-10">
        {!timer.isRunning ? (
          <motion.button
            onClick={startTimer}
            className={`flex-1 ${theme.accent} text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            Start {timer.isBreak ? 'Break' : 'Focus'}
          </motion.button>
        ) : (
          <motion.button
            onClick={pauseTimer}
            className={`flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Pause className="w-5 h-5" />
            Pause
          </motion.button>
        )}

        <motion.button
          onClick={resetTimer}
          className={`px-4 py-3 bg-gray-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>

        {timer.isRunning && (
          <motion.button
            onClick={skipSession}
            className={`px-4 py-3 bg-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Skip Session"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ⏭️
          </motion.button>
        )}
      </div>

      {/* Status Message */}
      <motion.div
        className="pt-4 border-t border-gray-200/50 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <p className={`${theme.textSecondary} text-sm mb-2`}>
            {timer.isRunning
              ? (timer.isBreak ? 'Take a well-deserved break! 🌟' : 'Stay focused and productive! 💪')
              : 'Ready to start your focus session?'
            }
          </p>

          {timer.completedSessions > 0 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`${theme.textSecondary} text-xs`}>
                Completed sessions:
              </span>
              <div className="flex gap-1">
                {[...Array(timer.completedSessions)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-green-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedTask && !timer.isBreak && (
            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-700 text-xs">
                🎯 Focusing on: {activeTodos.find(t => t.id === selectedTask)?.text}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
