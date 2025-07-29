import React, { useEffect, useState, useCallback } from "react";
import { LibraryItem } from "@/types";
import { KPIModalContent } from "./KPIModal";
import { DataVizModalContent } from "./DataVizModal";
import { LayoutModalContent } from "./LayoutModal";
import { StoryboardModalContent } from "./StoryboardModal";
import {
  LinkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { IconForType } from "./BaseModalComponents";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem;
  onSearchFocus?: () => void;
  isFavorite: boolean;
  onToggleFavorite: (item: LibraryItem) => void;
}

export const BaseModal = ({
  isOpen,
  onClose,
  item,
  onSearchFocus,
  isFavorite,
  onToggleFavorite,
}: BaseModalProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const renderModalContent = useCallback(() => {
    switch (item.type) {
      case "kpi":
        return <KPIModalContent item={item} />;
      case "dataviz":
        return <DataVizModalContent item={item} />;
      case "layout":
        return <LayoutModalContent item={item} />;
      case "storyboard":
        return <StoryboardModalContent item={item} />;
      default:
        return null;
    }
  }, [item]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(item);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          bg-white rounded-lg shadow-xl overflow-hidden z-10 flex flex-col
          ${isExpanded ? "max-h-full h-full w-full" : "max-h-[90vh] w-full max-w-4xl mx-auto"}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <IconForType type={item.type} />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider">
                {item.type}
              </div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <button
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={toggleExpanded}
              aria-label={isExpanded ? "Collapse view" : "Expand view"}
            >
              {isExpanded ? (
                <ArrowsPointingInIcon className="h-5 w-5" />
              ) : (
                <ArrowsPointingOutIcon className="h-5 w-5" />
              )}
            </button>
            <button
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              aria-label="Copy link"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
            <button
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className={`${isExpanded ? "max-w-6xl mx-auto" : ""}`}>
            {renderModalContent()}
          </div>
        </div>
        <div className="sticky bottom-0 divide-y divide-gray-200">
          {/* Top row - Search message (only visible when expanded) */}
          {isExpanded && (
            <div className="p-4" onClick={onClose}>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-blue-900">
                  Not seeing what you&apos;re looking for?
                </h3>
                <p className="text-blue-700 mt-1">
                  Try searching our complete library
                </p>
              </div>
            </div>
          )}
          <div className="bg-gray-50 p-3 justify-items-center">
            <button
              className={`
                w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center
                ${
                  isFavorite
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }
              `}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <BookmarkSlashIcon className="h-5 w-5 mr-2" />
              ) : (
                <BookmarkIcon className="h-5 w-5 mr-2" />
              )}
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
