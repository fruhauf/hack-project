import React from 'react';
import Button from './Button';
import SegmentBadge from './SegmentBadge';
import { audienceSegments } from '../data/mockData';

interface SegmentRecommendationsProps {
  recommendedSegments: typeof audienceSegments;
  onContinueToActivate: () => void;
}

const SegmentRecommendations: React.FC<SegmentRecommendationsProps> = ({
  recommendedSegments,
  onContinueToActivate,
}) => {
  if (recommendedSegments.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Recommended audience segments</h3>
      <div className="space-y-4">
        {recommendedSegments.map((segment) => (
          <div key={segment.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">{segment.name}</h4>
                  <SegmentBadge
                    label={segment.name}
                    color={segment.color as 'blue' | 'teal' | 'amber' | 'purple' | 'pink'}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">{segment.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={onContinueToActivate} variant="primary">
          Continue to Activate
        </Button>
      </div>
    </div>
  );
};

export default SegmentRecommendations; 