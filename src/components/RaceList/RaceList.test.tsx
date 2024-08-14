import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RaceList from './RaceList';
import moment from 'moment';
import useFetchRaces from '../../hooks/useFetchRaces';
import { parseAdvertisedStart, isTimeValid } from '../../utils/timeUtils';

// Mock the useFetchRaces hook
jest.mock('../../hooks/useFetchRaces');
const mockUseFetchRaces = useFetchRaces as jest.MockedFunction<
  typeof useFetchRaces
>;

// Mock the utility functions
jest.mock('../../utils/timeUtils', () => ({
  parseAdvertisedStart: jest.fn(),
  isTimeValid: jest.fn(),
}));

describe('RaceList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders RaceList component with races', async () => {
    // Arrange
    const mockRaces = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: '1',
        advertised_start: '2024-08-01T22:00:00Z',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      },
      {
        race_id: '2',
        meeting_name: 'Meeting 2',
        race_number: '2',
        advertised_start: { seconds: moment().add(10, 'minutes').unix() },
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      },
    ];

    mockUseFetchRaces.mockReturnValue(mockRaces);
    (parseAdvertisedStart as jest.Mock).mockImplementation((date) =>
      typeof date === 'string' ? new Date(date) : new Date(date.seconds * 1000),
    );
    (isTimeValid as jest.Mock).mockReturnValue(true);

    // Act
    render(<RaceList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Meeting 1')).toBeInTheDocument();
      expect(screen.getByText('Race 1')).toBeInTheDocument();
      expect(screen.getByText('Meeting 2')).toBeInTheDocument();
      expect(screen.getByText('Race 2')).toBeInTheDocument();
    });
  });

  test('displays "No races available" when there are no races', async () => {
    // Arrange
    mockUseFetchRaces.mockReturnValue([]);
    (parseAdvertisedStart as jest.Mock).mockImplementation((date) =>
      typeof date === 'string' ? new Date(date) : new Date(date.seconds * 1000),
    );
    (isTimeValid as jest.Mock).mockReturnValue(true);

    // Act
    render(<RaceList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('No races available.')).toBeInTheDocument();
    });
  });

  test('filters races by category', async () => {
    // Arrange
    const mockRaces = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: '1',
        advertised_start: '2024-08-01T22:00:00Z',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      },
      {
        race_id: '2',
        meeting_name: 'Meeting 2',
        race_number: '2',
        advertised_start: { seconds: moment().add(10, 'minutes').unix() },
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      },
    ];

    mockUseFetchRaces.mockReturnValue(mockRaces);
    (parseAdvertisedStart as jest.Mock).mockImplementation((date) =>
      typeof date === 'string' ? new Date(date) : new Date(date.seconds * 1000),
    );
    (isTimeValid as jest.Mock).mockReturnValue(true);

    // Act
    render(<RaceList />);

    // Simulate category change
    fireEvent.click(screen.getByText('Greyhound Racing'));

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Meeting 1')).not.toBeInTheDocument();
      expect(screen.getByText('Meeting 2')).toBeInTheDocument();
    });
  });

  test('clears filtered races on category change', async () => {
    // Arrange
    const mockRaces = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: '1',
        advertised_start: '2024-08-01T22:00:00Z',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      },
      {
        race_id: '2',
        meeting_name: 'Meeting 2',
        race_number: '2',
        advertised_start: { seconds: moment().add(10, 'minutes').unix() },
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      },
    ];

    mockUseFetchRaces.mockReturnValue(mockRaces);
    (parseAdvertisedStart as jest.Mock).mockImplementation((date) =>
      typeof date === 'string' ? new Date(date) : new Date(date.seconds * 1000),
    );
    (isTimeValid as jest.Mock).mockReturnValue(true);

    // Act
    render(<RaceList />);

    // Simulate category change
    fireEvent.click(screen.getByText('Greyhound Racing'));

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Meeting 1')).not.toBeInTheDocument();
      expect(screen.getByText('Meeting 2')).toBeInTheDocument();
    });
  });
});
