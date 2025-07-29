import { LibraryItem } from "@/types";
import { useMemo } from "react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LibraryItem[];
  selectedItems: Set<string>;
  onToggleSelect: (itemId: string) => void;
  onSubmit: () => void;
}

export const RequestAccessModal = ({
  isOpen,
  onClose,
  items,
  selectedItems,
  onToggleSelect,
  onSubmit,
}: RequestAccessModalProps) => {
  // Group items by type for organized display
  const groupedItems = useMemo(() => {
    const grouped = {
      kpi: items.filter((item) => item.type === "kpi"),
      dataviz: items.filter((item) => item.type === "dataviz"),
      layout: items.filter((item) => item.type === "layout"),
      storyboard: items.filter((item) => item.type === "storyboard"),
    };
    return grouped;
  }, [items]);

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform rounded-lg bg-white w-full max-w-3xl shadow-xl transition-all">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Request Access
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Select items you need access to
              </p>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              {/* Sections for each type */}
              {Object.entries(groupedItems).map(
                ([type, typeItems]) =>
                  typeItems.length > 0 && (
                    <div key={type} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium capitalize text-gray-900">
                          {type}
                        </h3>
                        <button
                          onClick={() => {
                            // Toggle all items of this type
                            typeItems.forEach((item) =>
                              onToggleSelect(item.id)
                            );
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Select all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {typeItems.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedItems.has(item.id)}
                              onChange={() => onToggleSelect(item.id)}
                              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
              )}

              {/* Empty state */}
              {items.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No items available for access request
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {selectedItems.size} items selected
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSubmit}
                    disabled={selectedItems.size === 0}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-lg
                      ${
                        selectedItems.size === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }
                    `}
                  >
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
