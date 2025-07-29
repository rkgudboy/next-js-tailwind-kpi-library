import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { OnboardingModalProps } from "@/types";

export const OnboardingModal = ({ isOpen, onClose, onStart }: OnboardingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                Welcome to the Library!
              </h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Let&apos;s take a quick tour to help you get the most out of our platform. 
                  We&apos;ll show you how to:
                </p>
                <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">1</span>
                    Browse and search for assets
                  </li>
                  <li className="flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">2</span>
                    Save your favorite items
                  </li>
                  <li className="flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">3</span>
                    Request access to restricted content
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-600 hover:bg-blue-500 sm:col-start-2"
              onClick={onStart}
            >
              Start Tour
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={onClose}
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};