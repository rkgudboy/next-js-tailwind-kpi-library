import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LibraryCard } from '@/components/LibraryCard';
import { LibraryItem } from '@/types';

describe('LibraryCard', () => {
  const mockItem: LibraryItem = {
    id: '1',
    name: 'Test KPI Card',
    description: 'This is a test description for the KPI card',
    date: '2024-01-15',
    type: 'kpi',
    owner: 'Test Owner',
    dimensions: '1920x1080',
    metrics: ['Revenue', 'Growth'],
    tags: ['finance', 'performance'],
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders card with item details', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    expect(screen.getByText('Test KPI Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the KPI card')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockItem);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events - Enter key', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledWith(mockItem);
  });

  it('handles keyboard events - Space key', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledWith(mockItem);
  });

  it('does not call onClick for other keys', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Tab' });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('displays "Request Access" chip when access status is none', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="none"
      />
    );

    expect(screen.getByText('Request Access')).toBeInTheDocument();
  });

  it('displays "Access Requested" chip when access status is pending', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="pending"
      />
    );

    expect(screen.getByText('Access Requested')).toBeInTheDocument();
  });

  it('does not display any chip when access status is granted', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    expect(screen.queryByText('Access Granted')).not.toBeInTheDocument();
    expect(screen.queryByText('Request Access')).not.toBeInTheDocument();
    expect(screen.queryByText('Access Requested')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
        className="custom-class"
      />
    );

    const card = screen.getByRole('button');
    expect(card).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'Open details for Test KPI Card');
  });

  it('applies opacity when access is not granted', () => {
    const { rerender } = render(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="none"
      />
    );

    let card = screen.getByRole('button');
    expect(card).toHaveClass('opacity-90');

    rerender(
      <LibraryCard
        item={mockItem}
        onClick={mockOnClick}
        accessStatus="granted"
      />
    );

    card = screen.getByRole('button');
    expect(card).not.toHaveClass('opacity-90');
  });
});