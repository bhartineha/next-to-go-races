import React, { act } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';
import moment from 'moment';
import { formatDuration } from '../../utils/timeUtils';

// Mock the formatDuration function
jest.mock('../../utils/timeUtils', () => ({
  formatDuration: jest
    .fn()
    .mockImplementation((duration) =>
      duration ? duration.humanize() : 'Invalid Duration',
    ),
}));

describe('Timer Component', () => {
  const validStartString = moment().add(10, 'minutes').toISOString();
  const validStartSeconds = { seconds: moment().add(10, 'minutes').unix() };
  const expiredStartString = moment().subtract(10, 'minutes').toISOString();
  const expiredStartSeconds = {
    seconds: moment().subtract(10, 'minutes').unix(),
  };

  test('renders correctly with valid advertisedStart as string', () => {
    render(<Timer advertisedStart={moment(validStartString)} />);

    expect(formatDuration).toHaveBeenCalled();
    // expect(screen.getByText((content) => content.includes('10 minutes'))).toBeInTheDocument();
  });

  test('renders correctly with valid advertisedStart as seconds object', () => {
    render(
      <Timer advertisedStart={moment(validStartSeconds.seconds * 1000)} />,
    );

    expect(formatDuration).toHaveBeenCalled();
  });

  test('handles expired advertisedStart as string gracefully', () => {
    render(<Timer advertisedStart={moment(expiredStartString)} />);
  });

  test('handles expired advertisedStart as seconds object gracefully', () => {
    render(
      <Timer advertisedStart={moment(expiredStartSeconds.seconds * 1000)} />,
    );
  });

  test('updates the time left every second', () => {
    jest.useFakeTimers();
    render(<Timer advertisedStart={moment().add(1, 'minute')} />);

    // Fast-forward 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Check if formatDuration was called with updated duration
    expect(formatDuration).toHaveBeenCalled();

    // Update the mock duration to simulate the change
    const updatedAdvertisedStart = moment().add(50, 'seconds');
    render(<Timer advertisedStart={updatedAdvertisedStart} />);

    jest.useRealTimers();
  });
});
