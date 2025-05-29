import React from 'react';
import MessageBubble from './MessageBubble';
import EnvironmentSelection from './EnvironmentSelection';
import PromptInput from './PromptInput';
import SegmentRecommendations from './SegmentRecommendations';
import AdFormatSelection from './AdFormatSelection';
import Button from './Button';
import { ConversationItem, Environment, AdFormat, SegmentRecommendationResponse } from '../types';

interface ConversationThreadProps {
  conversationItems: ConversationItem[];
  // Environment selection props
  environments: Environment[];
  selectedEnvironment: string | null;
  onEnvironmentSelect: (envId: string) => void;
  // Prompt input props
  promptInput: string;
  setPromptInput: (value: string) => void;
  onPromptSubmit: (e: React.FormEvent) => void;
  // Segment recommendations props
  recommendedSegments: SegmentRecommendationResponse | null;
  onContinueToFormats: () => void;
  // Ad format selection props
  adFormats: AdFormat[];
  selectedFormats: string[];
  environmentName: string;
  onFormatSelect: (formatId: string) => void;
  onFormatConfirm: () => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({
  conversationItems,
  environments,
  selectedEnvironment,
  onEnvironmentSelect,
  promptInput,
  setPromptInput,
  onPromptSubmit,
  recommendedSegments,
  onContinueToFormats,
  adFormats,
  selectedFormats,
  environmentName,
  onFormatSelect,
  onFormatConfirm,
}) => {
  const renderConversationItem = (item: ConversationItem) => {
    switch (item.type) {
      case 'message':
        return (
          <MessageBubble
            key={item.id}
            type={item.messageType}
            content={item.content}
          />
        );
      
      case 'loading':
        return (
          <MessageBubble
            key={item.id}
            type="ai"
            content=""
            isLoading={true}
          />
        );
      
      case 'environment-selection':
        return (
          <div key={item.id} className="my-4">
            <EnvironmentSelection
              environments={environments}
              selectedEnvironment={selectedEnvironment}
              onEnvironmentSelect={onEnvironmentSelect}
            />
          </div>
        );
      
      case 'prompt-input':
        return (
          <div key={item.id} className="my-4">
            <PromptInput
              promptInput={promptInput}
              setPromptInput={setPromptInput}
              onSubmit={onPromptSubmit}
            />
          </div>
        );
      
      case 'segment-recommendations':
        return (
          <div key={item.id} className="my-4">
            <SegmentRecommendations recommendedSegments={recommendedSegments} />
            <div className="flex justify-end mt-6">
              <Button onClick={onContinueToFormats} variant="primary">
                Continue to Ad Formats
              </Button>
            </div>
          </div>
        );
      
      case 'ad-format-selection':
        return (
          <div key={item.id} className="my-4">
            <AdFormatSelection
              adFormats={adFormats}
              selectedFormats={selectedFormats}
              environmentName={environmentName}
              onFormatSelect={onFormatSelect}
              onFormatConfirm={onFormatConfirm}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mb-4 pr-2">
      {conversationItems.map(renderConversationItem)}
    </div>
  );
};

export default ConversationThread; 