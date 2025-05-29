import React from 'react';
import { ArrowRight } from 'lucide-react';
import FormatCard from './FormatCard';
import Button from './Button';
import { AdFormat } from '../types';

interface AdFormatSelectionProps {
  adFormats: AdFormat[];
  selectedFormats: string[];
  environmentName: string;
  onFormatSelect: (formatId: string) => void;
  onFormatConfirm: () => void;
}

const AdFormatSelection: React.FC<AdFormatSelectionProps> = ({
  adFormats,
  selectedFormats,
  environmentName,
  onFormatSelect,
  onFormatConfirm,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Select ad formats for {environmentName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {adFormats.map((format) => (
          <FormatCard
            key={format.id}
            title={format.title}
            description={format.description}
            imageUrl={format.imageUrl}
            isSelected={selectedFormats.includes(format.id)}
            onClick={() => onFormatSelect(format.id)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onFormatConfirm}
          disabled={selectedFormats.length === 0}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Activate Campaign
        </Button>
      </div>
    </div>
  );
};

export default AdFormatSelection; 