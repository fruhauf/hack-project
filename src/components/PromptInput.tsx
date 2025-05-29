import React from 'react';
import { Send } from 'lucide-react';

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
    <form onSubmit={onSubmit} className="mt-6 w-full">
      <div className="relative w-full bg-white">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Describe your campaign goal (e.g., Launch summer sneaker collection to Gen Z)"
          className="w-full p-3 px-4 pr-14 rounded-lg border border-gray-300 shadow-sm focus:ring-primary"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary hover:bg-blue-800 text-white rounded-full transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default PromptInput; 