import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CoachMarkProps } from "@/types";

export const CoachMark = ({
  target,
  title,
  description,
  step,
  totalSteps,
  onNext,
  onPrevious,
  onClose,
}: CoachMarkProps) => {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const targetElement = document.querySelector(`[data-coach="${target}"]`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX,
      });
    }
  }, [target]);

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Step {step} of {totalSteps}
        </div>
        <div className="flex space-x-2">
          {step > 1 && (
            <button
              onClick={onPrevious}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={onNext}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-500"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
