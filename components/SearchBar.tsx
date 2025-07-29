import React, { useState, useCallback, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Type to search...",
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      onSearch(query);
      if (query.trim()) {
        setRecentSearches((prev) => {
          const newSearches = [query, ...prev.filter((s) => s !== query)].slice(
            0,
            5
          );
          return newSearches;
        });
      }
    }, 900),
    [onSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleRecentSearchClick = (search: string) => {
    setInputValue(search);
    onSearch(search);
    setIsInputFocused(false);
  };

  const removeRecentSearch = (searchToRemove: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRecentSearches((prev) =>
      prev.filter((search) => search !== searchToRemove)
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => {
            // Delay hiding the recent searches to allow for clicks
            setTimeout(() => setIsInputFocused(false), 200);
          }}
        />
      </div>

      {/* Recent Searches Dropdown */}
      {isInputFocused && recentSearches.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-500">
              Recent Searches
            </div>
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRecentSearchClick(search)}
              >
                <ClockIcon className="h-4 w-4 text-gray-400 mr-3" />
                <span className="flex-grow">{search}</span>
                <button
                  onClick={(e) => removeRecentSearch(search, e)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
