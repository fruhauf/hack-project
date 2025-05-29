import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  isSelected = false,
  isDisabled = false,
  onClick,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <div
      className={`relative p-4 border rounded-lg transition-all duration-200 ${
        isDisabled
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
          : isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 cursor-pointer'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md cursor-pointer'
      }`}
      onClick={handleClick}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="h-5 w-5 text-blue-500" />
        </div>
      )}
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className={`p-2 rounded-lg ${
            isDisabled 
              ? 'bg-gray-100 text-gray-400' 
              : isSelected 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className={`font-medium ${
            isDisabled 
              ? 'text-gray-400' 
              : isSelected 
              ? 'text-blue-700' 
              : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;