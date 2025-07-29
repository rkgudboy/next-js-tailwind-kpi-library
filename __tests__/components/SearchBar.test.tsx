import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '@/components/SearchBar';

// Mock lodash debounce
jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Type to search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Search components..." />);
    
    const input = screen.getByPlaceholderText('Search components...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when typing', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Type to search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(input.value).toBe('new value');
  });

  it('shows search icon', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    // The SVG icon has aria-hidden="true", so we'll check for it by its container
    const iconContainer = screen.getByPlaceholderText('Type to search...').previousElementSibling;
    const searchIcon = iconContainer?.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass('h-5 w-5 text-gray-400');
  });

  it('does not show recent searches initially', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.queryByText('Recent Searches')).not.toBeInTheDocument();
  });

  it('shows recent searches when input is focused after a search', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Type to search...');
    
    // Perform a search
    fireEvent.change(input, { target: { value: 'test search' } });
    
    // Focus the input again
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText('Recent Searches')).toBeInTheDocument();
      expect(screen.getByText('test search')).toBeInTheDocument();
    });
  });
});