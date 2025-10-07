// AI Integration utilities for OpenAI and HuggingFace APIs
// This file contains placeholder functions that can be connected to real AI services

export interface AIConfig {
  openaiApiKey?: string;
  huggingfaceApiKey?: string;
  model?: string;
}

// OpenAI Integration for mood analysis and quote generation
export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeMood(text: string): Promise<string> {
    try {
      // Placeholder for OpenAI API call
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a mood analyzer. Analyze the given text and return only one word from: happy, sad, excited, calm, stressed, motivated, tired'
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 10,
          temperature: 0.3
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content?.toLowerCase().trim() || 'calm';
    } catch (error) {
      console.error('OpenAI mood analysis error:', error);
      return 'calm';
    }
  }

  async generateQuote(mood: string): Promise<{ text: string; author: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Generate an inspirational quote that matches the mood: ${mood}. Return in format: "Quote text" - Author Name`
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      const parts = content.split(' - ');
      
      return {
        text: parts[0]?.replace(/"/g, '') || 'Stay positive and keep moving forward.',
        author: parts[1] || 'Unknown'
      };
    } catch (error) {
      console.error('OpenAI quote generation error:', error);
      return {
        text: 'Stay positive and keep moving forward.',
        author: 'AI Companion'
      };
    }
  }
}

// HuggingFace Integration for sentiment analysis
export class HuggingFaceService {
  private apiKey: string;
  private baseUrl = 'https://api-inference.huggingface.co/models';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeSentiment(text: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/cardiffnlp/twitter-roberta-base-sentiment-latest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text
        })
      });

      const data = await response.json();
      const sentiment = data[0]?.label?.toLowerCase();
      
      // Map HuggingFace sentiment to our mood system
      switch (sentiment) {
        case 'positive': return 'happy';
        case 'negative': return 'sad';
        case 'neutral': return 'calm';
        default: return 'calm';
      }
    } catch (error) {
      console.error('HuggingFace sentiment analysis error:', error);
      return 'calm';
    }
  }
}

// Factory function to create AI service based on configuration
export function createAIService(config: AIConfig) {
  if (config.openaiApiKey) {
    return new OpenAIService(config.openaiApiKey);
  }
  
  if (config.huggingfaceApiKey) {
    return new HuggingFaceService(config.huggingfaceApiKey);
  }
  
  return null;
}

// Environment variable helpers
export function getAIConfig(): AIConfig {
  return {
    openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    huggingfaceApiKey: process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY,
  };
}

// Usage example:
/*
const aiConfig = getAIConfig();
const aiService = createAIService(aiConfig);

if (aiService instanceof OpenAIService) {
  const mood = await aiService.analyzeMood("I'm feeling great today!");
  const quote = await aiService.generateQuote(mood);
}
*/
