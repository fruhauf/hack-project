import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConversationThread from "../components/ConversationThread";
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
    conversationItems,
    addMessage,
    addConversationItem,
    getEnvironmentName,
    getFormatName,
    environments,
    adFormats,
  } = usePlan();

  const [promptInput, setPromptInput] = useState("");

  // Auto-scroll to bottom when conversation changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [conversationItems]);

  const handleEnvironmentSelect = (envId: string) => {
    setSelectedEnvironment(envId);
    addMessage("user", `I want to advertise on ${getEnvironmentName(envId)}`);

    setTimeout(() => {
      addMessage("ai", `Great choice! ${getEnvironmentName(
        envId
      )} offers excellent opportunities for brand engagement. Now, tell me about your campaign goals. What are you promoting, and who is your target audience?`);
      
      // Add prompt input component to conversation
      addConversationItem({ type: 'prompt-input' });
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

    addMessage("user", `I'd like to use these formats: ${formatNames}`);

    setTimeout(() => {
      addMessage("ai", "Perfect! Your campaign planning is complete. You're ready to activate your campaign with the selected audience segments and ad formats.");
      navigate("/activate");
    }, 500);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setCampaignPrompt(promptInput);
    addMessage("user", promptInput);
    setPromptInput("");

    // Processing and response are handled by the effect in PlanContext
  };

  const handleContinueToFormats = () => {
    addMessage("ai", `Based on your audience segments, let's now choose the best ad formats for ${getEnvironmentName(
      selectedEnvironment || ""
    )} that will effectively reach your target audience.`);
    
    // Add ad format selection component to conversation
    addConversationItem({ type: 'ad-format-selection' });
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
        <ConversationThread
          conversationItems={conversationItems}
          environments={environments}
          selectedEnvironment={selectedEnvironment}
          onEnvironmentSelect={handleEnvironmentSelect}
          promptInput={promptInput}
          setPromptInput={setPromptInput}
          onPromptSubmit={handlePromptSubmit}
          recommendedSegments={recommendedSegments}
          onContinueToFormats={handleContinueToFormats}
          adFormats={adFormats[selectedEnvironment || ''] || []}
          selectedFormats={selectedFormats}
          environmentName={getEnvironmentName(selectedEnvironment || '')}
          onFormatSelect={handleFormatSelect}
          onFormatConfirm={handleFormatConfirm}
        />
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
