import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../data/apiClient';
import { Environment, AdFormat, SegmentRecommendationResponse } from '../types';

interface PlanContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedEnvironment: string | null;
  setSelectedEnvironment: (env: string | null) => void;
  selectedFormats: string[];
  setSelectedFormats: (formats: string[]) => void;
  campaignPrompt: string;
  setCampaignPrompt: (prompt: string) => void;
  recommendedSegments: SegmentRecommendationResponse | null;
  isLoading: boolean;
  messages: Array<{ type: 'ai' | 'user'; content: string }>;
  addMessage: (message: { type: 'ai' | 'user'; content: string }) => void;
  getEnvironmentName: (id: string) => string;
  getFormatName: (id: string) => string;
  resetPlan: () => void;
  // Data from API
  environments: Environment[];
  adFormats: { [key: string]: AdFormat[] };
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [recommendedSegments, setRecommendedSegments] = useState<SegmentRecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string }>>([
    {
      type: 'ai',
      content: 'Hi there! I\'m your Kargo AI assistant. I\'ll help you plan your advertising campaign. Let\'s start by selecting an environment for your ads.',
    },
  ]);

  // Data from API
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [adFormats, setAdFormats] = useState<{ [key: string]: AdFormat[] }>({});

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [envData, formatsData] = await Promise.all([
          apiClient.getEnvironments(),
          apiClient.getAdFormats(),
        ]);
        
        setEnvironments(envData);
        setAdFormats(formatsData as { [key: string]: AdFormat[] });
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

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
      
      // Get segments from API based on campaign prompt
      const fetchSegments = async () => {
        try {
          const segmentResponse = await apiClient.getSegments(campaignPrompt, 5);
          setRecommendedSegments(segmentResponse);
          
          // Add AI response message
          addMessage({
            type: 'ai',
            content: `Based on your campaign for "${campaignPrompt}", I created ${segmentResponse?.count || 0} audience segments for your ${getEnvironmentName(selectedEnvironment)} using ${selectedFormats.map(f => getFormatName(f)).join(' and ')}:`,
          });
          
          setCurrentStep(4);
        } catch (error) {
          console.error('Failed to get segments:', error);
          // Fallback to showing no segments
          setRecommendedSegments(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSegments();
    }
  }, [campaignPrompt, selectedEnvironment, selectedFormats, environments, adFormats]);

  const resetPlan = () => {
    setCurrentStep(1);
    setSelectedEnvironment(null);
    setSelectedFormats([]);
    setCampaignPrompt('');
    setRecommendedSegments(null);
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
        environments,
        adFormats,
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