import React, { useState } from 'react';
import { BarChart, Code, Send } from 'lucide-react';
import Button from '../components/Button';
import { mockPerformanceData, mockDomainPerformance } from '../data/mockData';

const MeasurePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sqlResult, setSqlResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      let result = '';
      
      if (query.toLowerCase().includes('ctr > 2')) {
        if (query.toLowerCase().includes('domain')) {
          result = `SELECT domain, impressions, ctr, spend 
FROM domains 
WHERE ctr > 2.0
ORDER BY ctr DESC;

-- Results:
-- fashion-blog.net | 950000 | 3.2 | 12000
-- premium-news.com | 1200000 | 2.8 | 15000
-- lifestyle-magazine.com | 750000 | 2.4 | 9000`;
        } else {
          result = `SELECT name, format, segment, impressions, ctr, spend 
FROM campaigns 
WHERE ctr > 2.0
ORDER BY ctr DESC;

-- Results:
-- Summer Collection - Millennials | Runway | Millennials | 3200000 | 2.7 | 35000
-- Summer Collection - Gen Z | Social Canvas | Gen Z | 2500000 | 2.3 | 25000`;
        }
      } else if (query.toLowerCase().includes('spend') && query.toLowerCase().includes('domain')) {
        result = `SELECT domain, spend 
FROM domains 
ORDER BY spend DESC
LIMIT 3;

-- Results:
-- premium-news.com | 15000
-- fashion-blog.net | 12000
-- tech-review.org | 10000`;
      } else {
        result = `-- Query parsed as:
SELECT * 
FROM campaigns 
WHERE 1=1
LIMIT 10;

-- Results:
-- Summer Collection - Gen Z | Social Canvas | Gen Z | 2500000 | 2.3 | 25000
-- Summer Collection - Millennials | Runway | Millennials | 3200000 | 2.7 | 35000`;
      }
      
      setSqlResult(result);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Measurement</h1>
        <p className="text-gray-500 mt-1">
          View performance metrics and query campaign data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Impressions</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{mockPerformanceData.impressions.toLocaleString()}</p>
          <div className="mt-1 text-sm text-green-600">+12% vs. previous</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">CTR</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{mockPerformanceData.ctr}%</p>
          <div className="mt-1 text-sm text-green-600">+0.5% vs. benchmark</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Conversions</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{mockPerformanceData.conversions.toLocaleString()}</p>
          <div className="mt-1 text-sm text-green-600">+8% vs. goal</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Spend</h3>
          </div>
          <p className="text-2xl font-bold mt-2">${mockPerformanceData.spend.toLocaleString()}</p>
          <div className="mt-1 text-sm text-gray-600">100% of budget</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-8">
        <div className="flex items-center mb-4">
          <BarChart className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium">Top Performing Domains</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDomainPerformance.map((domain, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{domain.domain}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{domain.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{domain.ctr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${domain.spend.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex items-center mb-4">
          <Code className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium">Natural Language Query</h2>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Ask questions about your campaign data in plain English. Try "Show me campaigns with CTR {'>'} 2%" or "Show me domains with CTR {'>'} 2%"
        </p>
        
        <form onSubmit={handleQuerySubmit} className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about your campaign data..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
              icon={isLoading ? <span className="animate-spin">⏳</span> : <Send className="h-4 w-4" />}
            >
              Query
            </Button>
          </div>
        </form>
        
        {sqlResult && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">SQL Query & Results:</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {sqlResult}
            </pre>
          </div>
        )}
        
        <div className="mt-8 mb-2">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Prototype Note</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>This is a demo of natural language to SQL conversion. In a production version, this would connect to your campaign database.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurePage;