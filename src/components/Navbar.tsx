import React from 'react';
import { Bell, Settings, User, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 rounded-lg text-sm text-gray-900 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search campaigns..."
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={20} />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;