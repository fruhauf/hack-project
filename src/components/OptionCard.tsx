import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="h-5 w-5 text-blue-500" />
        </div>
      )}
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;