import React from 'react';
import { Send } from 'lucide-react';
import Button from './Button';

interface PromptInputProps {
  promptInput: string;
  setPromptInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  promptInput,
  setPromptInput,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-4">
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
  );
};

export default PromptInput; 