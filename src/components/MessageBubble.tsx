import React from 'react';
import { Loader2 } from 'lucide-react';

type MessageType = 'ai' | 'user';

interface MessageBubbleProps {
  type: MessageType;
  content: React.ReactNode;
  isLoading?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ type, content, isLoading = false }) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] p-4 rounded-lg ${
          type === 'user'
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white border border-gray-200 shadow-sm rounded-bl-none'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        ) : (
          <div className="text-sm">{content}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;