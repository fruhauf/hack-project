import React from 'react';
import { ExternalLink } from 'lucide-react';
import Button from './Button';
import { SegmentRecommendationResponse } from '../types';

interface SegmentRecommendationsProps {
  recommendedSegments: SegmentRecommendationResponse | null;
  onContinueToActivate: () => void;
}

const SegmentRecommendations: React.FC<SegmentRecommendationsProps> = ({
  recommendedSegments,
  onContinueToActivate,
}) => {
  if (!recommendedSegments || !recommendedSegments.urls || recommendedSegments.urls.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Created audience segments
      </h3>
      
      {/* Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800 font-medium">Audience description</p>
        <p className="text-blue-600 text-sm mt-1">
          {recommendedSegments.description}
        </p>
      </div>

      {/* URL List */}
      <div className="space-y-3">
        {recommendedSegments.urls.map((urlMatch, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <a
                    href={urlMatch.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm truncate flex items-center space-x-1"
                  >
                    <span className="truncate">{urlMatch.URL}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </div>
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Similarity Score:</span>
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${urlMatch.SIMILARITY_SCORE * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {(urlMatch.SIMILARITY_SCORE * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={onContinueToActivate} variant="primary">
          Continue to Activate
        </Button>
      </div>
    </div>
  );
};

export default SegmentRecommendations; 