'use client';

import { ThemeConfig } from '@/types';

interface GreetingCardProps {
  greeting: string;
  theme: ThemeConfig;
}

export default function GreetingCard({ greeting, theme }: GreetingCardProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`${theme.surface} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="text-center">
        <div className={`inline-block ${theme.gradient} bg-clip-text text-transparent mb-2`}>
          <h1 className="text-3xl md:text-4xl font-bold">
            {greeting}
          </h1>
        </div>
        <p className={`${theme.textSecondary} text-sm md:text-base font-medium`}>
          {currentDate}
        </p>
        <div className="mt-4 flex justify-center">
          <div className={`w-16 h-1 ${theme.gradient} rounded-full`}></div>
        </div>
      </div>
    </div>
  );
}
