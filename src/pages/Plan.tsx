import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Tv, Users, ArrowRight, Send } from 'lucide-react';
import MessageBubble from '../components/MessageBubble';
import OptionCard from '../components/OptionCard';
import FormatCard from '../components/FormatCard';
import Button from '../components/Button';
import ProgressSteps from '../components/ProgressSteps';
import SegmentBadge from '../components/SegmentBadge';
import { PlanProvider, usePlan } from '../context/PlanContext';
import { environments, adFormats } from '../data/mockData';

const PlanContent: React.FC = () => {
  const navigate = useNavigate();
  const {
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
  } = usePlan();

  const [promptInput, setPromptInput] = useState('');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return <Tv className="h-5 w-5" />;
      case 'Globe':
        return <Globe className="h-5 w-5" />;
      case 'Users':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

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
          {isLoading && <MessageBubble type="ai\" content="\" isLoading={true} />}
        </div>

        {currentStep === 1 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Select an environment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {environments.map((env) => (
                <OptionCard
                  key={env.id}
                  title={env.title}
                  description={env.description}
                  icon={getIconComponent(env.icon)}
                  isSelected={selectedEnvironment === env.id}
                  onClick={() => handleEnvironmentSelect(env.id)}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && selectedEnvironment && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Select ad formats for {getEnvironmentName(selectedEnvironment)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {adFormats[selectedEnvironment as keyof typeof adFormats].map((format) => (
                <FormatCard
                  key={format.id}
                  title={format.title}
                  description={format.description}
                  imageUrl={format.imageUrl}
                  isSelected={selectedFormats.includes(format.id)}
                  onClick={() => handleFormatSelect(format.id)}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleFormatConfirm}
                disabled={selectedFormats.length === 0}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Continue
              </Button>
            </div>
          </div>
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

        {currentStep === 4 && recommendedSegments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Recommended audience segments</h3>
            <div className="space-y-4">
              {recommendedSegments.map((segment) => (
                <div key={segment.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{segment.name}</h4>
                        <SegmentBadge
                          label={segment.name}
                          color={segment.color as any}
                          className="ml-2"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{segment.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleContinueToActivate} variant="primary">
                Continue to Activate
              </Button>
            </div>
          </div>
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