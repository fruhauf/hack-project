import React, { createContext, useContext, useState, useEffect } from 'react';
import { environments, adFormats, audienceSegments } from '../data/mockData';

interface PlanContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedEnvironment: string | null;
  setSelectedEnvironment: (env: string | null) => void;
  selectedFormats: string[];
  setSelectedFormats: (formats: string[]) => void;
  campaignPrompt: string;
  setCampaignPrompt: (prompt: string) => void;
  recommendedSegments: typeof audienceSegments;
  isLoading: boolean;
  messages: Array<{ type: 'ai' | 'user'; content: string }>;
  addMessage: (message: { type: 'ai' | 'user'; content: string }) => void;
  getEnvironmentName: (id: string) => string;
  getFormatName: (id: string) => string;
  resetPlan: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [recommendedSegments, setRecommendedSegments] = useState<typeof audienceSegments>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string }>>([
    {
      type: 'ai',
      content: 'Hi there! I\'m your Kargo AI assistant. I\'ll help you plan your advertising campaign. Let\'s start by selecting an environment for your ads.',
    },
  ]);

  const addMessage = (message: { type: 'ai' | 'user'; content: string }) => {
    setMessages((prev) => [...prev, message]);
  };

  const getEnvironmentName = (id: string): string => {
    const env = environments.find((e) => e.id === id);
    return env ? env.title : '';
  };

  const getFormatName = (id: string): string => {
    let formatName = '';
    Object.values(adFormats).forEach((formats) => {
      const format = formats.find((f) => f.id === id);
      if (format) formatName = format.title;
    });
    return formatName;
  };

  useEffect(() => {
    if (campaignPrompt && selectedEnvironment && selectedFormats.length > 0) {
      setIsLoading(true);
      
      // Simulate AI processing
      setTimeout(() => {
        // Simple logic to recommend segments based on prompt keywords
        const prompt = campaignPrompt.toLowerCase();
        let recommended: typeof audienceSegments = [];
        
        if (prompt.includes('gen z') || prompt.includes('young') || prompt.includes('youth') || prompt.includes('college')) {
          recommended.push(audienceSegments.find(s => s.id === 'gen-z')!);
        }
        
        if (prompt.includes('millennial') || prompt.includes('young adult') || prompt.includes('professionals')) {
          recommended.push(audienceSegments.find(s => s.id === 'millennials')!);
        }
        
        if (prompt.includes('parent') || prompt.includes('family') || prompt.includes('kid') || prompt.includes('child')) {
          recommended.push(audienceSegments.find(s => s.id === 'parents')!);
        }
        
        if (prompt.includes('luxury') || prompt.includes('premium') || prompt.includes('high-end') || prompt.includes('exclusive')) {
          recommended.push(audienceSegments.find(s => s.id === 'luxury-shoppers')!);
        }
        
        if (prompt.includes('tech') || prompt.includes('gadget') || prompt.includes('innovation') || prompt.includes('digital')) {
          recommended.push(audienceSegments.find(s => s.id === 'tech-enthusiasts')!);
        }
        
        // If no matches, recommend based on selected environment
        if (recommended.length === 0) {
          if (selectedEnvironment === 'social') {
            recommended.push(audienceSegments.find(s => s.id === 'gen-z')!);
            recommended.push(audienceSegments.find(s => s.id === 'millennials')!);
          } else if (selectedEnvironment === 'ctv') {
            recommended.push(audienceSegments.find(s => s.id === 'parents')!);
            recommended.push(audienceSegments.find(s => s.id === 'luxury-shoppers')!);
          } else {
            recommended.push(audienceSegments.find(s => s.id === 'millennials')!);
            recommended.push(audienceSegments.find(s => s.id === 'tech-enthusiasts')!);
          }
        }
        
        setRecommendedSegments(recommended);
        setIsLoading(false);
        
        // Add AI response message
        addMessage({
          type: 'ai',
          content: `Based on your campaign for "${campaignPrompt}", I recommend the following audience segments for your ${getEnvironmentName(selectedEnvironment)} campaign using ${selectedFormats.map(f => getFormatName(f)).join(' and ')}:`,
        });
        
        setCurrentStep(4);
      }, 2000);
    }
  }, [campaignPrompt, selectedEnvironment, selectedFormats]);

  const resetPlan = () => {
    setCurrentStep(1);
    setSelectedEnvironment(null);
    setSelectedFormats([]);
    setCampaignPrompt('');
    setRecommendedSegments([]);
    setMessages([
      {
        type: 'ai',
        content: 'Hi there! I\'m your Kargo AI assistant. I\'ll help you plan your advertising campaign. Let\'s start by selecting an environment for your ads.',
      },
    ]);
  };

  return (
    <PlanContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedEnvironment,
        setSelectedEnvironment,
        selectedFormats,
        setSelectedFormats,
        campaignPrompt,
        setCampaignPrompt,
        recommendedSegments,
        isLoading,
        messages,
        addMessage,
        getEnvironmentName,
        getFormatName,
        resetPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};