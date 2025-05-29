import React from 'react';
import { X } from 'lucide-react';

interface SegmentBadgeProps {
  label: string;
  onRemove?: () => void;
  color?: 'blue' | 'teal' | 'amber' | 'purple' | 'pink';
}

const SegmentBadge: React.FC<SegmentBadgeProps> = ({
  label,
  onRemove,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    teal: 'bg-teal-100 text-teal-800',
    amber: 'bg-amber-100 text-amber-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default SegmentBadge;