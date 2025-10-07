'use client';

import { QuoteData, ThemeConfig } from '@/types';
import { useState } from 'react';
import { getRandomQuote, getQuoteByCategory, getDailyQuote } from '@/utils/mockData';
import { Heart, RefreshCw, Sparkles, Lightbulb, Smile, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteCardProps {
  quote: QuoteData;
  theme: ThemeConfig;
  onQuoteChange: (newQuote: QuoteData) => void;
  onToggleFavorite: (quote: QuoteData) => void;
  isFavorite: boolean;
}

const categoryIcons = {
  motivational: Sparkles,
  productivity: Target,
  wisdom: Lightbulb,
  funny: Smile
};

export default function QuoteCard({ quote, theme, onQuoteChange, onToggleFavorite, isFavorite }: QuoteCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuoteData['category'] | 'daily' | 'random'>('daily');

  const handleNewQuote = async (category?: QuoteData['category'] | 'daily' | 'random') => {
    setIsLoading(true);

    setTimeout(() => {
      let newQuote: QuoteData;

      if (category === 'daily') {
        newQuote = getDailyQuote();
      } else if (category && category !== 'random') {
        newQuote = getQuoteByCategory(category);
      } else {
        newQuote = getRandomQuote();
      }

      onQuoteChange(newQuote);
      setIsLoading(false);
    }, 800);
  };

  const CategoryIcon = categoryIcons[quote.category] || Sparkles;

  return (
    <motion.div
      className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full ${theme.gradient}`} style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)'
        }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <CategoryIcon className={`w-5 h-5 ${theme.text}`} />
          <h2 className={`${theme.text} text-xl font-semibold`}>Daily Inspiration</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => onToggleFavorite(quote)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-100`
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            onClick={() => handleNewQuote(selectedCategory)}
            disabled={isLoading}
            className={`${theme.accent} text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Loading...' : 'New Quote'}
          </motion.button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex gap-2 mb-4 relative z-10">
        {(['daily', 'motivational', 'productivity', 'wisdom', 'funny'] as const).map((category) => (
          <motion.button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              handleNewQuote(category);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === category
                ? `${theme.accent} text-white`
                : `${theme.textSecondary} hover:${theme.text} bg-gray-100 hover:bg-gray-200`
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === 'daily' ? '✨ Daily' : category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Quote Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 relative z-10"
        >
          <blockquote className={`${theme.text} text-lg font-medium leading-relaxed italic relative`}>
            <span className={`text-4xl ${theme.gradient} bg-clip-text text-transparent absolute -top-2 -left-2 opacity-50`}>"</span>
            <span className="relative z-10">{quote.text}</span>
            <span className={`text-4xl ${theme.gradient} bg-clip-text text-transparent absolute -bottom-4 -right-2 opacity-50`}>"</span>
          </blockquote>

          <div className="flex items-center justify-between">
            <cite className={`${theme.textSecondary} text-sm font-semibold not-italic flex items-center gap-2`}>
              <span>— {quote.author}</span>
            </cite>
            <div className="flex items-center gap-2">
              <span className={`${theme.accent} text-white px-2 py-1 rounded-full text-xs font-medium capitalize`}>
                {quote.category}
              </span>
              <span className={`${theme.textSecondary} text-xs px-2 py-1 bg-gray-100 rounded-full`}>
                {quote.style}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200/50 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${theme.gradient} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
