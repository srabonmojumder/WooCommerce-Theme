'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/types';

interface AISetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  onSaveConfig: (config: { openaiKey?: string; huggingfaceKey?: string }) => void;
}

export default function AISetupModal({ isOpen, onClose, theme, onSaveConfig }: AISetupModalProps) {
  const [openaiKey, setOpenaiKey] = useState('');
  const [huggingfaceKey, setHuggingfaceKey] = useState('');
  const [activeTab, setActiveTab] = useState<'openai' | 'huggingface'>('openai');

  if (!isOpen) return null;

  const handleSave = () => {
    const config: { openaiKey?: string; huggingfaceKey?: string } = {};
    
    if (openaiKey.trim()) {
      config.openaiKey = openaiKey.trim();
    }
    
    if (huggingfaceKey.trim()) {
      config.huggingfaceKey = huggingfaceKey.trim();
    }
    
    onSaveConfig(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${theme.surface} rounded-2xl p-6 w-full max-w-md shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`${theme.text} text-xl font-semibold`}>
            🧠 AI Configuration
          </h2>
          <button
            onClick={onClose}
            className={`${theme.textSecondary} hover:${theme.text} text-2xl font-light`}
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('openai')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'openai'
                ? `${theme.accent} text-white`
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            OpenAI
          </button>
          <button
            onClick={() => setActiveTab('huggingface')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'huggingface'
                ? `${theme.accent} text-white`
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            HuggingFace
          </button>
        </div>

        {/* OpenAI Tab */}
        {activeTab === 'openai' && (
          <div className="space-y-4">
            <div>
              <label className={`${theme.text} text-sm font-medium mb-2 block`}>
                OpenAI API Key
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white"
              />
              <p className={`${theme.textSecondary} text-xs mt-1`}>
                Used for advanced mood analysis and quote generation
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-blue-800 font-medium text-sm mb-1">Features:</h4>
              <ul className="text-blue-700 text-xs space-y-1">
                <li>• Advanced mood analysis from text</li>
                <li>• Personalized quote generation</li>
                <li>• Context-aware responses</li>
              </ul>
            </div>
          </div>
        )}

        {/* HuggingFace Tab */}
        {activeTab === 'huggingface' && (
          <div className="space-y-4">
            <div>
              <label className={`${theme.text} text-sm font-medium mb-2 block`}>
                HuggingFace API Key
              </label>
              <input
                type="password"
                value={huggingfaceKey}
                onChange={(e) => setHuggingfaceKey(e.target.value)}
                placeholder="hf_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white"
              />
              <p className={`${theme.textSecondary} text-xs mt-1`}>
                Used for sentiment analysis and emotion detection
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="text-green-800 font-medium text-sm mb-1">Features:</h4>
              <ul className="text-green-700 text-xs space-y-1">
                <li>• Real-time sentiment analysis</li>
                <li>• Emotion detection from text</li>
                <li>• Free tier available</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 ${theme.accent} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Save Config
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className={`${theme.textSecondary} text-xs text-center`}>
            API keys are stored locally and never sent to our servers
          </p>
        </div>
      </div>
    </div>
  );
}
