import React from "react";
import { NavLink } from "react-router-dom";
import {
  Palette,
  PieChart,
  PlayCircle,
  HelpCircle,
  BarChart3,
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-neutral text-white">
      <div className="p-4 border-b border-neutral">
        <div className="flex items-center space-x-2">
           <img
            src="assets/images/kargo-logo.svg"
            alt="Kargo Logo"
            className="w-auto"
          />
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-blue-800 hover:text-white"
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
                ? "bg-primary text-white"
                : "hover:bg-blue-800 hover:text-white"
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
                ? "bg-primary text-white"
                : "hover:bg-blue-800 hover:text-white"
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
                ? "bg-primary text-white"
                : "hover:bg-blue-800 hover:text-white"
            } transition-colors`
          }
        >
          <PieChart className="h-5 w-5 mr-3" />
          <span>Measure</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-neutral">
        <div className="flex items-center px-4 py-3 text-sm rounded-lg hover:bg-blue-800 hover:text-white transition-colors">
          <HelpCircle className="h-5 w-5 mr-3" />
          <span>Help & Resources</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
