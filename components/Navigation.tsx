import React from "react";
import { NavigationProps } from "@/types";
import { 
  SparklesIcon, 
  ChartBarIcon, 
  DocumentChartBarIcon,
  Squares2X2Icon,
  PresentationChartLineIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

// Define the tabs array with their configurations
const TABS = [
  {
    id: "Featured" as const,
    icon: SparklesIcon,
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: "KPI" as const,
    icon: ChartBarIcon,
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    id: "Data Visualization" as const,
    icon: DocumentChartBarIcon,
    gradient: "from-purple-600 to-violet-600"
  },
  {
    id: "Layout" as const,
    icon: Squares2X2Icon,
    gradient: "from-violet-600 to-fuchsia-600"
  },
  {
    id: "Storyboard" as const,
    icon: PresentationChartLineIcon,
    gradient: "from-fuchsia-600 to-pink-600"
  },
  {
    id: "My Favorites" as const,
    icon: BookmarkIcon,
    gradient: "from-fuchsia-600 to-pink-600"
  }
];

export const Navigation = ({
  activeTab,
  onTabChange,
}: NavigationProps) => {
  return (
    <div className="relative mb-8">
      <div className="flex flex-wrap gap-2 p-2 bg-white rounded-xl shadow-sm border border-gray-200">
        {TABS.map(({ id, icon: Icon }) => {
          const isActive = id === activeTab;
          
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`
                relative flex items-center gap-2
                px-4 py-2 rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? "text-white" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {/* Active state background */}
              {isActive && (
                <span 
                  className={`
                    absolute inset-0 rounded-lg
                    bg-gradient-to-r from-blue-600 to-indigo-600
                  `} 
                  aria-hidden="true"
                />
              )}
              
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{id}</span>
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Bottom line decoration */}
      <div 
        className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

// Optional: Export a custom hook for managing tab state
export const useNavigation = (initialTab = "Featured") => {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  const handleTabChange = React.useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    handleTabChange,
  };
};
