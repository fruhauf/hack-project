import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import MessageBubble from '../components/MessageBubble';
import EnvironmentSelection from '../components/EnvironmentSelection';
import AdFormatSelection from '../components/AdFormatSelection';
import SegmentRecommendations from '../components/SegmentRecommendations';
import Button from '../components/Button';
import ProgressSteps from '../components/ProgressSteps';
import { PlanProvider, usePlan } from '../components/PlanContext';

const PlanContent: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    setCurrentStep,
    selectedEnvironment,
    setSelectedEnvironment,
    selectedFormats,
    setSelectedFormats,
    setCampaignPrompt,
    recommendedSegments,
    isLoading,
    messages,
    addMessage,
    getEnvironmentName,
    getFormatName,
    environments,
    adFormats,
  } = usePlan();

  const [promptInput, setPromptInput] = useState('');

  const handleEnvironmentSelect = (envId: string) => {
    setSelectedEnvironment(envId);
    addMessage({
      type: 'user',
      content: `I want to advertise on ${getEnvironmentName(envId)}`,
    });

    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: `Great choice! ${getEnvironmentName(envId)} offers excellent opportunities for brand engagement. Now, let's select ad formats that work best for ${getEnvironmentName(envId)}.`,
      });
      setCurrentStep(2);
    }, 500);
  };

  const handleFormatSelect = (formatId: string) => {
    const newSelectedFormats = selectedFormats.includes(formatId)
      ? selectedFormats.filter((id) => id !== formatId)
      : [...selectedFormats, formatId];
    
    setSelectedFormats(newSelectedFormats);
  };

  const handleFormatConfirm = () => {
    if (selectedFormats.length === 0) return;
    
    const formatNames = selectedFormats.map(id => getFormatName(id)).join(', ');
    
    addMessage({
      type: 'user',
      content: `I'd like to use these formats: ${formatNames}`,
    });

    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: 'Excellent choices! Now, tell me about your campaign goals. What are you promoting, and who is your target audience?',
      });
      setCurrentStep(3);
    }, 500);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    
    setCampaignPrompt(promptInput);
    addMessage({
      type: 'user',
      content: promptInput,
    });
    setPromptInput('');
    
    // Processing and response are handled by the effect in PlanContext
  };

  const handleContinueToActivate = () => {
    navigate('/activate');
  };

  const progressSteps = [
    {
      id: 'env',
      title: 'Environment',
      isCompleted: currentStep > 1,
      isCurrent: currentStep === 1,
    },
    {
      id: 'format',
      title: 'Ad Format',
      isCompleted: currentStep > 2,
      isCurrent: currentStep === 2,
    },
    {
      id: 'campaign',
      title: 'Campaign Goal',
      isCompleted: currentStep > 3,
      isCurrent: currentStep === 3,
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      isCompleted: false,
      isCurrent: currentStep === 4,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Planning</h1>
        <p className="text-gray-500 mt-1">
          Work with our AI assistant to plan your next high-impact campaign
        </p>
      </div>

      <ProgressSteps steps={progressSteps} />

      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6 mt-6">
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4 pr-2">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              type={message.type}
              content={message.content}
            />
          ))}
          {isLoading && <MessageBubble type="ai" content="" isLoading={true} />}
        </div>

        {currentStep === 1 && (
          <EnvironmentSelection
            environments={environments}
            selectedEnvironment={selectedEnvironment}
            onEnvironmentSelect={handleEnvironmentSelect}
          />
        )}

        {currentStep === 2 && selectedEnvironment && (
          <AdFormatSelection
            adFormats={adFormats[selectedEnvironment] || []}
            selectedFormats={selectedFormats}
            environmentName={getEnvironmentName(selectedEnvironment)}
            onFormatSelect={handleFormatSelect}
            onFormatConfirm={handleFormatConfirm}
          />
        )}

        {currentStep === 3 && (
          <form onSubmit={handlePromptSubmit} className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your campaign goal (e.g., Launch summer sneaker collection to Gen Z)"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <Button type="submit" icon={<Send className="h-4 w-4" />}>
                Send
              </Button>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <SegmentRecommendations
            recommendedSegments={recommendedSegments}
            onContinueToActivate={handleContinueToActivate}
          />
        )}
      </div>
    </div>
  );
};

const PlanPage: React.FC = () => {
  return (
    <PlanProvider>
      <PlanContent />
    </PlanProvider>
  );
};

export default PlanPage;