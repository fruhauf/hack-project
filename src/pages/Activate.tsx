import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import SegmentBadge from '../components/SegmentBadge';
import { mockCampaignLines, adFormats, audienceSegments } from '../data/mockData';

interface CampaignLine {
  id: string;
  name: string;
  format: string;
  formatName: string;
  segment: string;
  segmentName: string;
  budget: number;
  impressions: number;
}

const ActivatePage: React.FC = () => {
  const navigate = useNavigate();
  const [campaignLines, setCampaignLines] = useState<CampaignLine[]>(mockCampaignLines);
  const [editMode, setEditMode] = useState(false);
  
  const formatOptions = Object.values(adFormats).flat();
  
  const handleDelete = (id: string) => {
    setCampaignLines(campaignLines.filter(line => line.id !== id));
  };
  
  const handleAddLine = () => {
    const newLine: CampaignLine = {
      id: `line-${campaignLines.length + 1}`,
      name: `New Campaign Line ${campaignLines.length + 1}`,
      format: formatOptions[0].id,
      formatName: formatOptions[0].title,
      segment: audienceSegments[0].id,
      segmentName: audienceSegments[0].name,
      budget: 20000,
      impressions: 2000000
    };
    
    setCampaignLines([...campaignLines, newLine]);
  };
  
  const handleContinueToMeasure = () => {
    navigate('/measure');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Activation</h1>
            <p className="text-gray-500 mt-1">
              Review and assemble your campaign lines
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Done' : 'Edit Lines'}
            </Button>
            <Button icon={<PlusCircle className="h-4 w-4" />} onClick={handleAddLine}>
              Add Line
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Line
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Impressions
                </th>
                {editMode && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignLines.map((line) => (
                <tr key={line.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{line.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{line.formatName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SegmentBadge
                      label={line.segmentName}
                      color={(audienceSegments.find(s => s.id === line.segment)?.color || 'blue') as any}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${line.budget.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{line.impressions.toLocaleString()}</div>
                  </td>
                  {editMode && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(line.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Note</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>This is a prototype interface. In a real implementation, this would connect to your ad server for campaign line creation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinueToMeasure} icon={<ChevronRight className="h-4 w-4" />}>
          Continue to Measure
        </Button>
      </div>
    </div>
  );
};

export default ActivatePage;