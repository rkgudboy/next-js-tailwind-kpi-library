import { LibraryItem } from "@/types";

/**
 * Filters library items based on search query
 * @param items - Array of library items to filter
 * @param query - Search query string
 * @returns Filtered array of library items
 */
export const filterItemsByQuery = (items: LibraryItem[], query: string): LibraryItem[] => {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Groups library items by type
 * @param items - Array of library items
 * @returns Object with items grouped by type
 */
export const groupItemsByType = (items: LibraryItem[]): Record<string, LibraryItem[]> => {
  return items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, LibraryItem[]>);
};

/**
 * Formats a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Calculates days since a given date
 * @param dateString - ISO date string
 * @returns Number of days since the date
 */
export const daysSince = (dateString: string): number => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};