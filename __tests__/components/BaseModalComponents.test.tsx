import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetadataItem, Section, TagList, MetadataGrid } from '@/components/modals/BaseModalComponents';

describe('BaseModalComponents', () => {
  describe('MetadataItem', () => {
    it('renders label and value correctly', () => {
      render(<MetadataItem label="Test Label" value="Test Value" />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('renders with number value', () => {
      render(<MetadataItem label="Count" value={42} />);
      
      expect(screen.getByText('Count')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      render(<MetadataItem label="Style Test" value="Value" />);
      
      const label = screen.getByText('Style Test');
      const value = screen.getByText('Value');
      
      expect(label).toHaveClass('text-sm', 'text-gray-500');
      expect(value).toHaveClass('font-medium', 'text-gray-900');
    });
  });

  describe('Section', () => {
    it('renders title and children', () => {
      render(
        <Section title="Test Section">
          <div>Child Content</div>
        </Section>
      );
      
      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('renders with multiple children', () => {
      render(
        <Section title="Multi Child Section">
          <div>First Child</div>
          <div>Second Child</div>
        </Section>
      );
      
      expect(screen.getByText('Multi Child Section')).toBeInTheDocument();
      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
    });

    it('applies correct heading styles', () => {
      render(
        <Section title="Styled Section">
          <div>Content</div>
        </Section>
      );
      
      const heading = screen.getByText('Styled Section');
      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-gray-900', 'mb-3');
    });
  });

  describe('TagList', () => {
    it('renders all tags', () => {
      const tags = ['react', 'typescript', 'testing'];
      render(<TagList tags={tags} />);
      
      expect(screen.getByText('#react')).toBeInTheDocument();
      expect(screen.getByText('#typescript')).toBeInTheDocument();
      expect(screen.getByText('#testing')).toBeInTheDocument();
    });

    it('renders empty when no tags provided', () => {
      const { container } = render(<TagList tags={[]} />);
      
      const tagContainer = container.querySelector('.flex.flex-wrap.gap-2');
      expect(tagContainer).toBeInTheDocument();
      expect(tagContainer?.children).toHaveLength(0);
    });

    it('applies correct tag styles', () => {
      render(<TagList tags={['styled-tag']} />);
      
      const tag = screen.getByText('#styled-tag');
      expect(tag).toHaveClass(
        'px-3',
        'py-1',
        'bg-gray-100',
        'text-gray-600',
        'rounded-full',
        'text-sm'
      );
    });
  });

  describe('MetadataGrid', () => {
    it('renders all metadata items', () => {
      const items = [
        { label: 'Version', value: '1.0.0' },
        { label: 'Size', value: '2MB' },
        { label: 'Count', value: 42 },
      ];
      
      render(<MetadataGrid items={items} />);
      
      expect(screen.getByText('Version')).toBeInTheDocument();
      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByText('2MB')).toBeInTheDocument();
      expect(screen.getByText('Count')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders empty grid when no items provided', () => {
      render(<MetadataGrid items={[]} />);
      
      // The grid should still be rendered but with no items
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });
  });
});