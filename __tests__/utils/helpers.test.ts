import { filterItemsByQuery, groupItemsByType, formatDate, daysSince } from '@/utils/helpers';
import { LibraryItem } from '@/types';

describe('helpers', () => {
  describe('filterItemsByQuery', () => {
    const mockItems: LibraryItem[] = [
      {
        id: '1',
        type: 'kpi',
        name: 'Revenue Dashboard',
        description: 'Track company revenue metrics',
        date: '2024-01-15',
        tags: ['finance', 'revenue', 'monthly'],
      },
      {
        id: '2',
        type: 'dataviz',
        name: 'Sales Chart',
        description: 'Visualize sales performance',
        date: '2024-01-16',
        tags: ['sales', 'performance'],
      },
      {
        id: '3',
        type: 'layout',
        name: 'Executive Layout',
        description: 'Layout for executive dashboards',
        date: '2024-01-17',
        tags: ['executive', 'leadership'],
      },
    ];

    it('returns all items when query is empty', () => {
      expect(filterItemsByQuery(mockItems, '')).toEqual(mockItems);
      expect(filterItemsByQuery(mockItems, '  ')).toEqual(mockItems);
    });

    it('filters by name', () => {
      const result = filterItemsByQuery(mockItems, 'revenue');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Revenue Dashboard');
    });

    it('filters by description', () => {
      const result = filterItemsByQuery(mockItems, 'performance');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Sales Chart');
    });

    it('filters by tags', () => {
      const result = filterItemsByQuery(mockItems, 'finance');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Revenue Dashboard');
    });

    it('is case insensitive', () => {
      const result = filterItemsByQuery(mockItems, 'REVENUE');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Revenue Dashboard');
    });

    it('returns multiple matches', () => {
      const result = filterItemsByQuery(mockItems, 'dashboard');
      expect(result).toHaveLength(2); // Revenue Dashboard and Executive Layout (in description)
    });

    it('returns empty array when no matches', () => {
      const result = filterItemsByQuery(mockItems, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('groupItemsByType', () => {
    const mockItems: LibraryItem[] = [
      { id: '1', type: 'kpi', name: 'KPI 1', description: 'Test', date: '2024-01-15' },
      { id: '2', type: 'kpi', name: 'KPI 2', description: 'Test', date: '2024-01-16' },
      { id: '3', type: 'dataviz', name: 'Chart 1', description: 'Test', date: '2024-01-17' },
      { id: '4', type: 'layout', name: 'Layout 1', description: 'Test', date: '2024-01-18' },
    ];

    it('groups items by type correctly', () => {
      const grouped = groupItemsByType(mockItems);
      
      expect(grouped.kpi).toHaveLength(2);
      expect(grouped.dataviz).toHaveLength(1);
      expect(grouped.layout).toHaveLength(1);
      expect(grouped.storyboard).toBeUndefined();
    });

    it('returns empty object for empty array', () => {
      const grouped = groupItemsByType([]);
      expect(grouped).toEqual({});
    });

    it('handles single type', () => {
      const singleTypeItems = [
        { id: '1', type: 'kpi', name: 'KPI 1', description: 'Test', date: '2024-01-15' },
        { id: '2', type: 'kpi', name: 'KPI 2', description: 'Test', date: '2024-01-16' },
      ];
      
      const grouped = groupItemsByType(singleTypeItems);
      expect(Object.keys(grouped)).toHaveLength(1);
      expect(grouped.kpi).toHaveLength(2);
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      expect(formatDate('2024-01-15')).toBe('January 15, 2024');
      expect(formatDate('2023-12-25')).toBe('December 25, 2023');
      expect(formatDate('2024-07-04')).toBe('July 4, 2024');
    });

    it('handles different date formats', () => {
      expect(formatDate('2024-01-15T00:00:00Z')).toBe('January 15, 2024');
      expect(formatDate('2024-01-15T12:30:45.000Z')).toBe('January 15, 2024');
    });
  });

  describe('daysSince', () => {
    beforeEach(() => {
      // Mock current date to ensure consistent test results
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-20'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('calculates days correctly', () => {
      expect(daysSince('2024-01-19')).toBe(1);
      expect(daysSince('2024-01-10')).toBe(10);
      expect(daysSince('2023-12-21')).toBe(30);
    });

    it('returns 0 for same day', () => {
      expect(daysSince('2024-01-20')).toBe(0);
    });

    it('handles future dates', () => {
      expect(daysSince('2024-01-25')).toBe(5);
    });
  });
});