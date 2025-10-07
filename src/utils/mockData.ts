import { WeatherData, QuoteData, TodoItem } from '@/types';

// Enhanced weather data with dynamic backgrounds
export const getMockWeatherData = (): WeatherData => {
  const conditions = [
    {
      condition: 'Sunny',
      icon: '☀️',
      temp: 75,
      description: 'Clear skies with bright sunshine',
      backgroundGradient: 'from-yellow-400 via-orange-400 to-red-400'
    },
    {
      condition: 'Partly Cloudy',
      icon: '⛅',
      temp: 68,
      description: 'Mix of sun and clouds',
      backgroundGradient: 'from-blue-400 via-blue-300 to-yellow-300'
    },
    {
      condition: 'Cloudy',
      icon: '☁️',
      temp: 62,
      description: 'Overcast with gray clouds',
      backgroundGradient: 'from-gray-400 via-gray-300 to-blue-300'
    },
    {
      condition: 'Rainy',
      icon: '🌧️',
      temp: 58,
      description: 'Light rain showers',
      backgroundGradient: 'from-blue-600 via-blue-500 to-gray-500'
    },
    {
      condition: 'Snowy',
      icon: '❄️',
      temp: 32,
      description: 'Light snow falling',
      backgroundGradient: 'from-blue-200 via-white to-gray-300'
    },
    {
      condition: 'Thunderstorm',
      icon: '⛈️',
      temp: 65,
      description: 'Thunder and lightning',
      backgroundGradient: 'from-gray-800 via-purple-600 to-blue-600'
    }
  ];

  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    temperature: randomCondition.temp,
    condition: randomCondition.condition,
    location: 'Your City',
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 mph
    icon: randomCondition.icon,
    feelsLike: randomCondition.temp + Math.floor(Math.random() * 10) - 5,
    description: randomCondition.description,
    backgroundGradient: randomCondition.backgroundGradient
  };
};

// Enhanced quotes database with categories and styles
export const quotes: QuoteData[] = [
  // Motivational Quotes
  {
    id: "1",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivational",
    style: "inspirational"
  },
  {
    id: "2",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivational",
    style: "powerful"
  },
  {
    id: "3",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivational",
    style: "uplifting"
  },

  // Productivity Quotes
  {
    id: "4",
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
    category: "productivity",
    style: "practical"
  },
  {
    id: "5",
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "productivity",
    style: "actionable"
  },
  {
    id: "6",
    text: "Productivity is never an accident. It is always the result of a commitment to excellence.",
    author: "Paul J. Meyer",
    category: "productivity",
    style: "insightful"
  },

  // Wisdom Quotes
  {
    id: "7",
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "wisdom",
    style: "philosophical"
  },
  {
    id: "8",
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "wisdom",
    style: "profound"
  },
  {
    id: "9",
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "wisdom",
    style: "timeless"
  },

  // Funny Quotes
  {
    id: "10",
    text: "I'm not lazy, I'm on energy saving mode.",
    author: "Anonymous",
    category: "funny",
    style: "witty"
  },
  {
    id: "11",
    text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    author: "Anonymous",
    category: "funny",
    style: "punny"
  },
  {
    id: "12",
    text: "The early bird might get the worm, but the second mouse gets the cheese.",
    author: "Anonymous",
    category: "funny",
    style: "clever"
  }
];

// Get random quote
export const getRandomQuote = (): QuoteData => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Get quote by category
export const getQuoteByCategory = (category: QuoteData['category']): QuoteData => {
  const categoryQuotes = quotes.filter(q => q.category === category);
  return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)] || getRandomQuote();
};

// Get daily quote (same quote for the same day)
export const getDailyQuote = (): QuoteData => {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % quotes.length;
  return quotes[index];
};

// Generate greeting based on time
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  const name = "Friend"; // Could be personalized
  
  if (hour < 12) {
    return `Good morning, ${name}! ☀️`;
  } else if (hour < 17) {
    return `Good afternoon, ${name}! 🌤️`;
  } else if (hour < 21) {
    return `Good evening, ${name}! 🌅`;
  } else {
    return `Good night, ${name}! 🌙`;
  }
};

// Mock todo items
export const getMockTodos = (): TodoItem[] => {
  return [
    {
      id: '1',
      text: 'Review project proposals',
      completed: false,
      priority: 'high',
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'Call team meeting',
      completed: true,
      priority: 'medium',
      createdAt: new Date()
    },
    {
      id: '3',
      text: 'Update portfolio website',
      completed: false,
      priority: 'low',
      createdAt: new Date()
    },
    {
      id: '4',
      text: 'Read industry news',
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    }
  ];
};
