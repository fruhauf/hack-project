import React from 'react';

interface FormatCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isSelected?: boolean;
  onClick: () => void;
}

const FormatCard: React.FC<FormatCardProps> = ({
  title,
  description,
  imageUrl,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className={`overflow-hidden border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
      <div className={`h-1 w-full ${isSelected ? 'bg-blue-500' : 'bg-transparent'}`}></div>
    </div>
  );
};

export default FormatCard;