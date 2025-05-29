import React from "react";
import { NavLink } from "react-router-dom";
import {
  Layers,
  Palette,
  PieChart,
  PlayCircle,
  HelpCircle,
  BarChart3,
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-blue-900 text-white">
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-teal-400" />
          <span className="text-xl font-semibold tracking-tight">Kargo AI</span>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive
                ? "bg-blue-800 text-white"
                : "text-blue-100 hover:bg-blue-800 hover:text-white"
            } transition-colors`
          }
          end
        >
          <PlayCircle className="h-5 w-5 mr-3" />
          <span>Plan</span>
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive
                ? "bg-blue-800 text-white"
                : "text-blue-100 hover:bg-blue-800 hover:text-white"
            } transition-colors`
          }
        >
          <Palette className="h-5 w-5 mr-3" />
          <span>Create</span>
        </NavLink>
        <NavLink
          to="/activate"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive
                ? "bg-blue-800 text-white"
                : "text-blue-100 hover:bg-blue-800 hover:text-white"
            } transition-colors`
          }
        >
          <BarChart3 className="h-5 w-5 mr-3" />
          <span>Activate</span>
        </NavLink>
        <NavLink
          to="/measure"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive
                ? "bg-blue-800 text-white"
                : "text-blue-100 hover:bg-blue-800 hover:text-white"
            } transition-colors`
          }
        >
          <PieChart className="h-5 w-5 mr-3" />
          <span>Measure</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center px-4 py-3 text-sm text-blue-100 rounded-lg hover:bg-blue-800 hover:text-white transition-colors">
          <HelpCircle className="h-5 w-5 mr-3" />
          <span>Help & Resources</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
