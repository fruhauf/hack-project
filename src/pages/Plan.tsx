import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";
import EnvironmentSelection from "../components/EnvironmentSelection";
import AdFormatSelection from "../components/AdFormatSelection";
import SegmentRecommendations from "../components/SegmentRecommendations";
import PromptInput from "../components/PromptInput";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { PlanProvider, usePlan } from "../components/PlanContext";

const PlanContent: React.FC = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  const [promptInput, setPromptInput] = useState("");

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading, currentStep]);

  const handleEnvironmentSelect = (envId: string) => {
    setSelectedEnvironment(envId);
    addMessage({
      type: "user",
      content: `I want to advertise on ${getEnvironmentName(envId)}`,
    });

    setTimeout(() => {
      addMessage({
        type: "ai",
        content: `Great choice! ${getEnvironmentName(
          envId
        )} offers excellent opportunities for brand engagement. Now, tell me about your campaign goals. What are you promoting, and who is your target audience?`,
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

    const formatNames = selectedFormats
      .map((id) => getFormatName(id))
      .join(", ");

    addMessage({
      type: "user",
      content: `I'd like to use these formats: ${formatNames}`,
    });

    setTimeout(() => {
      addMessage({
        type: "ai",
        content:
          "Perfect! Your campaign planning is complete. You're ready to activate your campaign with the selected audience segments and ad formats.",
      });
      // Navigate directly to activate since this is now the final step
      navigate("/activate");
    }, 500);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setCampaignPrompt(promptInput);
    addMessage({
      type: "user",
      content: promptInput,
    });
    setPromptInput("");

    // Processing and response are handled by the effect in PlanContext
    // This will now trigger step 3 (segments) instead of step 4
  };

  const handleContinueToFormats = () => {
    addMessage({
      type: "ai",
      content: `Based on your audience segments, let's now choose the best ad formats for ${getEnvironmentName(
        selectedEnvironment || ""
      )} that will effectively reach your target audience.`,
    });
    setCurrentStep(4);
  };

  const progressSteps = [
    {
      id: "env",
      title: "Environment",
      isCompleted: currentStep > 1,
      isCurrent: currentStep === 1,
    },
    {
      id: "campaign",
      title: "Campaign Goal",
      isCompleted: currentStep > 2,
      isCurrent: currentStep === 2,
    },
    {
      id: "recommendations",
      title: "Recommendations",
      isCompleted: currentStep > 3,
      isCurrent: currentStep === 3,
    },
    {
      id: "format",
      title: "Ad Format",
      isCompleted: currentStep > 4,
      isCurrent: currentStep === 4,
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Planning</h1>
        <p className="text-gray-500 mt-1">
          Work with our AI assistant to plan your next high-impact campaign
        </p>
      </div>

      <ProgressSteps steps={progressSteps} />

      <div
        ref={scrollContainerRef}
        className="flex flex-1 flex-col min-h-0 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6 my-6"
      >
        <div>
          <div className="space-y-4 mb-4 pr-2">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                type={message.type}
                content={message.content}
              />
            ))}
            {isLoading && (
              <MessageBubble type="ai" content="" isLoading={true} />
            )}
          </div>

          {currentStep === 1 && (
            <EnvironmentSelection
              environments={environments}
              selectedEnvironment={selectedEnvironment}
              onEnvironmentSelect={handleEnvironmentSelect}
            />
          )}

          {currentStep === 2 && !isLoading && (
            <PromptInput
              promptInput={promptInput}
              setPromptInput={setPromptInput}
              onSubmit={handlePromptSubmit}
            />
          )}

          {currentStep >= 3 && (
            <SegmentRecommendations recommendedSegments={recommendedSegments} />
          )}
          
          {currentStep === 3 && (
            <div className="flex justify-end mt-6">
              <Button onClick={handleContinueToFormats} variant="primary">
                Continue to Ad Formats
              </Button>
            </div>
          )}

          {currentStep === 4 && selectedEnvironment && (
            <AdFormatSelection
              adFormats={adFormats[selectedEnvironment] || []}
              selectedFormats={selectedFormats}
              environmentName={getEnvironmentName(selectedEnvironment)}
              onFormatSelect={handleFormatSelect}
              onFormatConfirm={handleFormatConfirm}
            />
          )}
        </div>
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
