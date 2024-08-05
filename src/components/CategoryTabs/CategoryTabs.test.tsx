import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryTabs from './CategoryTabs';
import { CategoryTabsProps } from './CategoryTabs.types';

// Mock the props for the CategoryTabs component
const mockSetCategory = jest.fn();

// Mock data for categories
const categories = [
  { id: null, label: 'All', iconSrc: '/images/all.png' },
  {
    id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
    label: 'Horse Racing',
    iconSrc: '/images/horse.png',
  },
  {
    id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    label: 'Greyhound Racing',
    iconSrc: '/images/grayhound.png',
  },
  {
    id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
    label: 'Harness Racing',
    iconSrc: '/images/harness.png',
  },
];

// Helper function to render the component
const renderComponent = (props: Partial<CategoryTabsProps> = {}) => {
  return render(<CategoryTabs setCategory={mockSetCategory} {...props} />);
};

describe('CategoryTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with all categories', () => {
    renderComponent();

    categories.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
      expect(screen.getByAltText(category.label)).toHaveAttribute(
        'src',
        category.iconSrc,
      );
    });
  });

  test('calls setCategory when a tab is clicked', () => {
    renderComponent();

    const greyhoundTab = screen.getByText('Greyhound Racing');
    fireEvent.click(greyhoundTab);

    expect(mockSetCategory).toHaveBeenCalledWith(
      '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    );
  });

  test('applies selected class to the clicked tab', () => {
    renderComponent();

    const greyhoundTab = screen.getByText('Greyhound Racing');
    fireEvent.click(greyhoundTab);

    expect(greyhoundTab).toHaveClass('selected');
  });

  test('removes selected class from previously selected tab', () => {
    renderComponent();

    const greyhoundTab = screen.getByText('Greyhound Racing');
    const harnessTab = screen.getByText('Harness Racing');

    fireEvent.click(greyhoundTab);
    expect(greyhoundTab).toHaveClass('selected');

    fireEvent.click(harnessTab);
    expect(greyhoundTab).not.toHaveClass('selected');
    expect(harnessTab).toHaveClass('selected');
  });

  test('renders with the correct initial state', () => {
    renderComponent();

    categories.forEach((category) => {
      const tab = screen.getByText(category.label);
      expect(tab).not.toHaveClass('selected');
    });
  });

  test('updates selected tab correctly', () => {
    renderComponent();

    const allTab = screen.getByText('All');
    fireEvent.click(allTab);

    expect(mockSetCategory).toHaveBeenCalledWith(null);
  });
});
