import React, { useState } from 'react';
import { Palette, Image, Users, ArrowRight, Check, RefreshCcw, X } from 'lucide-react';
import Button from '../components/Button';
import FormatCard from '../components/FormatCard';
import MessageBubble from '../components/MessageBubble';
import { adFormats, audienceSegments } from '../data/mockData';

interface CreativePreview {
  id: string;
  imageUrl: string;
  name?: string;
}

const CreatePage: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [creativePrompt, setCreativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useSegment, setUseSegment] = useState<boolean | null>(null);
  const [creativePreview, setCreativePreview] = useState<CreativePreview | null>(null);
  const [showNaming, setShowNaming] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string }>>([
    {
      type: 'ai',
      content: 'Welcome to the Creative Studio! Select an ad format to begin creating your asset.',
    },
  ]);

  // Flatten all formats into a single array
  const allFormats = Object.values(adFormats.openweb).flat();

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
    setCreativePreview(null);
    setShowNaming(false);
    const format = allFormats.find(f => f.id === formatId);
    
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: `I want to create a ${format?.title} ad`,
      },
      {
        type: 'ai',
        content: 'Great choice! Would you like to select a target audience segment or describe your creative vision?',
      },
    ]);
  };

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    const segment = audienceSegments.find(s => s.id === segmentId);
    
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: `Target audience: ${segment?.name}`,
      },
    ]);
    handleGenerateCreative(segmentId);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creativePrompt.trim()) return;
    handleGenerateCreative(null, creativePrompt);
  };

  const generateMockCreative = (format: typeof allFormats[0]) => {
    // For demo purposes, use the format's sample image
    return {
      id: `creative-${Date.now()}`,
      imageUrl: format.imageUrl,
    };
  };

  const handleGenerateCreative = async (segmentId?: string | null, prompt?: string) => {
    setIsGenerating(true);
    setCreativePreview(null);
    
    if (prompt) {
      setMessages(prev => [
        ...prev,
        {
          type: 'user',
          content: prompt,
        },
      ]);
    }

    // Simulate AI generation
    setTimeout(() => {
      const format = allFormats.find(f => f.id === selectedFormat);
      const segment = segmentId ? audienceSegments.find(s => s.id === segmentId) : null;
      
      if (format) {
        const preview = generateMockCreative(format);
        setCreativePreview(preview);
        
        const response = segment
          ? `I've generated a ${format.title} creative optimized for ${segment.name}. How does this look?`
          : `I've generated a ${format.title} creative based on your description. How does this look?`;
        
        setMessages(prev => [
          ...prev,
          {
            type: 'ai',
            content: response,
          },
        ]);
      }
      
      setIsGenerating(false);
    }, 3000);
  };

  const handleAcceptCreative = () => {
    setShowNaming(true);
    setMessages(prev => [
      ...prev,
      {
        type: 'ai',
        content: 'Great! Please provide a name for your creative asset.',
      },
    ]);
  };

  const handleModifyCreative = () => {
    handleGenerateCreative(selectedSegment || null, creativePrompt || undefined);
  };

  const handleSaveCreative = () => {
    if (!assetName.trim() || !creativePreview) return;

    const savedCreative = {
      ...creativePreview,
      name: assetName,
    };

    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: `Name: ${assetName}`,
      },
      {
        type: 'ai',
        content: `Perfect! Your creative "${assetName}" has been saved with ID: ${savedCreative.id}. You can now use this in your campaigns.`,
      },
    ]);

    // Reset the form
    setSelectedFormat(null);
    setSelectedSegment(null);
    setCreativePrompt('');
    setUseSegment(null);
    setCreativePreview(null);
    setShowNaming(false);
    setAssetName('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Creative Studio</h1>
        <p className="text-gray-500 mt-1">
          Generate AI-powered creative assets for your campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <Palette className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Select Format</h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            {allFormats.map((format) => (
              <div key={format.id} className="flex-1 min-w-0">
                <FormatCard
                  title={format.title}
                  description={format.description}
                  imageUrl={format.imageUrl}
                  isSelected={selectedFormat === format.id}
                  onClick={() => handleFormatSelect(format.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Image className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Creative Generation</h2>
          </div>

          <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                type={message.type}
                content={message.content}
                isLoading={index === messages.length - 1 && isGenerating}
              />
            ))}
          </div>

          {selectedFormat && useSegment === null && (
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setUseSegment(true)}
                icon={<Users className="h-4 w-4" />}
              >
                Select Target Audience
              </Button>
              <Button
                variant="outline"
                onClick={() => setUseSegment(false)}
                icon={<Image className="h-4 w-4" />}
              >
                Describe Creative
              </Button>
            </div>
          )}

          {selectedFormat && useSegment === true && !creativePreview && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Users className="h-4 w-4 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium">Select Target Audience</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {audienceSegments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => handleSegmentSelect(segment.id)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  >
                    {segment.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedFormat && useSegment === false && !creativePreview && (
            <form onSubmit={handlePromptSubmit} className="space-y-4">
              <textarea
                value={creativePrompt}
                onChange={(e) => setCreativePrompt(e.target.value)}
                placeholder="Describe your creative vision (e.g., A modern, minimalist design featuring our new product with bold typography)"
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!creativePrompt.trim() || isGenerating}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Generate Creative
                </Button>
              </div>
            </form>
          )}

          {creativePreview && !showNaming && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="aspect-video relative mb-4">
                <img
                  src={creativePreview.imageUrl}
                  alt="Creative Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleModifyCreative}
                  icon={<RefreshCcw className="h-4 w-4" />}
                >
                  Generate Another
                </Button>
                <Button
                  onClick={handleAcceptCreative}
                  icon={<Check className="h-4 w-4" />}
                >
                  Accept Creative
                </Button>
              </div>
            </div>
          )}

          {showNaming && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Name
                </label>
                <input
                  type="text"
                  id="assetName"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Enter a name for your creative asset"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNaming(false)}
                  icon={<X className="h-4 w-4" />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCreative}
                  disabled={!assetName.trim()}
                  icon={<Check className="h-4 w-4" />}
                >
                  Save Creative
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;