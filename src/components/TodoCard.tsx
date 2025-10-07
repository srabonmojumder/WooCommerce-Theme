'use client';

import { TodoItem, ThemeConfig } from '@/types';
import { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Clock, Target, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoCardProps {
  todos: TodoItem[];
  theme: ThemeConfig;
  onTodosChange: (newTodos: TodoItem[]) => void;
}

// AI-powered focus suggestions based on tasks
const generateDailyFocus = (todos: TodoItem[]): string => {
  const incompleteTasks = todos.filter(t => !t.completed);
  const highPriorityTasks = incompleteTasks.filter(t => t.priority === 'high');

  if (highPriorityTasks.length > 0) {
    return `Focus on ${highPriorityTasks.length} high-priority task${highPriorityTasks.length > 1 ? 's' : ''} today`;
  } else if (incompleteTasks.length > 3) {
    return "Break down your tasks into smaller chunks for better focus";
  } else if (incompleteTasks.length > 0) {
    return `Complete ${incompleteTasks.length} remaining task${incompleteTasks.length > 1 ? 's' : ''} to finish strong`;
  } else {
    return "Great job! All tasks completed. Time to plan tomorrow";
  }
};

export default function TodoCard({ todos, theme, onTodosChange }: TodoCardProps) {
  const [newTodo, setNewTodo] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dailyFocus, setDailyFocus] = useState('');

  useEffect(() => {
    setDailyFocus(generateDailyFocus(todos));
  }, [todos]);

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed, inProgress: false } : todo
    );
    onTodosChange(updatedTodos);
  };

  const setTaskInProgress = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, inProgress: !todo.inProgress, completed: false } : todo
    );
    onTodosChange(updatedTodos);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: newTodoPriority,
        createdAt: new Date(),
        estimatedTime: 30, // default 30 minutes
        category: 'general'
      };
      onTodosChange([...todos, todo]);
      setNewTodo('');
      setNewTodoPriority('medium');
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    onTodosChange(updatedTodos);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-200' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'low': return { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-200' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return Target;
      default: return Circle;
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const inProgressCount = todos.filter(todo => todo.inProgress).length;
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <motion.div
      className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full ${theme.gradient}`} style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)'
        }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-5 h-5 ${theme.text}`} />
          <h2 className={`${theme.text} text-xl font-semibold`}>Smart Tasks</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${theme.textSecondary} text-sm font-medium`}>
            {completedCount}/{todos.length}
          </span>
          {inProgressCount > 0 && (
            <span className={`${theme.accent} text-white px-2 py-1 rounded-full text-xs font-medium`}>
              {inProgressCount} active
            </span>
          )}
        </div>
      </div>

      {/* AI Daily Focus */}
      <motion.div
        className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-blue-800 font-medium text-sm">AI Daily Focus</span>
        </div>
        <p className="text-blue-700 text-sm">{dailyFocus}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-4 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className={`${theme.textSecondary} text-sm`}>Progress</span>
          <span className={`${theme.textSecondary} text-sm font-medium`}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-3 ${theme.gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Add New Todo */}
      <div className="space-y-3 mb-4 relative z-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${theme.text} bg-white/70 backdrop-blur-sm`}
          />
          <motion.button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className={`${theme.accent} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Add
          </motion.button>
        </div>

        {/* Priority Selection */}
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((priority) => {
            const colors = getPriorityColor(priority);
            const PriorityIcon = getPriorityIcon(priority);
            return (
              <motion.button
                key={priority}
                onClick={() => setNewTodoPriority(priority)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  newTodoPriority === priority
                    ? `${colors.bg} text-white`
                    : `${colors.text} bg-gray-100 hover:bg-gray-200`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PriorityIcon className="w-3 h-3" />
                {priority}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3 max-h-80 overflow-y-auto relative z-10">
        <AnimatePresence>
          {todos.map((todo, index) => {
            const colors = getPriorityColor(todo.priority);
            const PriorityIcon = getPriorityIcon(todo.priority);

            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                  todo.completed
                    ? 'bg-gray-50/80 border-gray-200 opacity-75'
                    : todo.inProgress
                    ? `bg-blue-50/80 ${colors.border} border-2`
                    : `bg-white/80 ${colors.border} hover:shadow-md backdrop-blur-sm`
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Completion Toggle */}
                <motion.button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? `${theme.accent} border-transparent text-white`
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {todo.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </motion.button>

                {/* Priority Indicator */}
                <div className="flex items-center gap-2">
                  <PriorityIcon className={`w-4 h-4 ${colors.text}`} />
                  <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                </div>

                {/* Task Content */}
                <div className="flex-1">
                  <span className={`block ${todo.completed ? 'line-through text-gray-500' : theme.text} font-medium`}>
                    {todo.text}
                  </span>
                  {todo.estimatedTime && (
                    <span className={`text-xs ${theme.textSecondary} flex items-center gap-1 mt-1`}>
                      <Clock className="w-3 h-3" />
                      {todo.estimatedTime}min
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  {!todo.completed && (
                    <motion.button
                      onClick={() => setTaskInProgress(todo.id)}
                      className={`p-1 rounded-lg text-xs font-medium transition-colors ${
                        todo.inProgress
                          ? 'bg-blue-500 text-white'
                          : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-100`
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={todo.inProgress ? 'In Progress' : 'Start Task'}
                    >
                      <Target className="w-3 h-3" />
                    </motion.button>
                  )}

                  <motion.button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {todos.length === 0 && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Target className={`w-12 h-12 ${theme.textSecondary} mx-auto mb-2 opacity-50`} />
            <p className={`${theme.textSecondary} text-sm`}>
              No tasks yet. Add your first task to get started!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
