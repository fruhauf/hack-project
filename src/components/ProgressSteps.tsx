import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps }) => {
  return (
    <div className="py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li 
            key={step.id}
            className={`flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}
          >
            <div className="flex items-center justify-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  step.isCompleted 
                    ? 'bg-blue-600 text-white' 
                    : step.isCurrent 
                      ? 'border-2 border-blue-600 text-blue-600'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
            </div>
            <span 
              className={`ml-2 text-sm font-medium whitespace-nowrap ${
                step.isCompleted || step.isCurrent ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step.isCompleted ? 'bg-blue-600' : 'bg-gray-200'
              }`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressSteps;