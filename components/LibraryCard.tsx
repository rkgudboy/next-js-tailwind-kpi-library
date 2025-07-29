import React from "react";
import { AccessStatus, LibraryItem } from "../types";
import { IconForType } from "./modals/BaseModalComponents";
import {
  CheckCircleIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

interface LibraryCardProps {
  item: LibraryItem;
  onClick: (item: LibraryItem) => void;
  className?: string;
  accessStatus: AccessStatus;
}

export const LibraryCard = ({
  item,
  onClick,
  className,
  accessStatus,
}: LibraryCardProps) => {
  // Background colors for type indicators
  const typeColors = {
    kpi: "bg-blue-50",
    dataviz: "bg-purple-50",
    layout: "bg-green-50",
    storyboard: "bg-orange-50",
  };

  // Handle keyboard interaction for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(item);
    }
  };

  // Render access status chip based on status
  const renderAccessChip = (status: AccessStatus) => {
    switch (status) {
      case "granted":
        return <></>;
      // return (
      //   <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
      //     <CheckCircleIcon className="w-4 h-4 text-green-500" />
      //     <span className="text-xs font-medium text-green-700">
      //       Access Granted
      //     </span>
      //   </div>
      // );
      case "pending":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200">
            <ClockIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium text-yellow-700">
              Access Requested
            </span>
          </div>
        );
      case "none":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
            <LockClosedIcon className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">
              Request Access
            </span>
          </div>
        );
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}
      className={`
        group relative flex
        bg-white rounded-xl border border-gray-200 ${
          accessStatus === "granted" ? "" : "opacity-90"
        }
        hover:shadow-lg hover:border-indigo-500
        transition-all duration-200 ease-in-out
        cursor-pointer overflow-hidden
        ${className || ""}
      `}
      aria-label={`Open details for ${item.name}`}
    >
      {/* Left side - Icon Section */}
      <div className="w-1/4 bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="w-full aspect-square flex items-center justify-center">
          <IconForType type={item.type} h={10} w={10} />
        </div>
      </div>

      {/* Right side - Content Section */}
      <div className="w-3/4 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-base text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>
        <span className="text-sm text-gray-500">{item.date}</span>
      </div>

      {/* Access Status Chip */}
      <div className="absolute top-4 right-4">
        {renderAccessChip(accessStatus)}
      </div>

      {/* Interactive hover effect overlay */}
      <div
        className="
          absolute inset-0 transition-opacity
        "
        aria-hidden="true"
      />
    </div>
  );

  // return (
  //   <div
  //     role="button"
  //     tabIndex={0}
  //     onClick={() => onClick(item)}
  //     onKeyDown={handleKeyDown}
  //     className={`
  //       group relative flex
  //       bg-white rounded-lg border border-gray-200
  //       hover:shadow-md hover:border-gray-300
  //       transition-all duration-200 ease-in-out
  //       cursor-pointer overflow-hidden
  //       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
  //       ${className || ""}
  //       ${
  //         accessStatus === "granted"
  //           ? "hover:shadow-md cursor-pointer"
  //           : "opacity-75 cursor-not-allowed"
  //       }
  //     `}
  //     aria-label={`Open details for ${item.name}`}
  //   >
  //     {/* Left side - Icon Section taking 1/4 width */}
  //     <div className="w-1/4 bg-gray-50 flex items-center justify-center p-4">
  //       <div className="w-full aspect-square flex items-center justify-center">
  //         <IconForType type={item.type} />
  //       </div>
  //     </div>

  //     {/* Right side - Content Section taking 3/4 width */}
  //     <div className="w-3/4 p-4">
  //       <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-1">
  //         {item.name}
  //       </h3>
  //       <p className="text-sm text-gray-600 mb-2 line-clamp-2">
  //         {item.description}
  //       </p>
  //       <span className="text-xs text-gray-400">{item.date}</span>
  //     </div>

  //     {/* Access Status Chip */}
  //     <div className="absolute top-2 right-2">
  //       {renderAccessChip(accessStatus)}
  //     </div>

  //     {/* Interactive hover effect overlay */}
  //     <div
  //       className="
  //         absolute inset-0 bg-gray-900 opacity-0 
  //         group-hover:opacity-5 transition-opacity
  //       "
  //       aria-hidden="true"
  //     />
  //   </div>
  // );
};

// Optional helper types for stricter type-checking
export type LibraryCardRef = HTMLDivElement;
export type LibraryCardElement = React.ElementRef<typeof LibraryCard>;
