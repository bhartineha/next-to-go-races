import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Race from './Race';
import { RaceProps } from './Race.types';
import moment from 'moment';

// Mock the Timer component
jest.mock('../Timer/Timer', () => {
  const MockTimer = () => <div>Mock Timer</div>;
  MockTimer.displayName = 'MockTimer'; // Adding display name
  return MockTimer;
});

describe('Race Component', () => {
  const defaultProps: RaceProps = {
    meetingName: 'Meeting 1',
    raceNumber: '1',
    advertisedStart: moment().add(10, 'minutes').toISOString(),
  };

  test('renders Race component with correct props', () => {
    render(<Race {...defaultProps} />);

    expect(screen.getByText('Meeting 1')).toBeInTheDocument();
    expect(screen.getByText('Race Number: 1')).toBeInTheDocument();
    expect(screen.getByText('Starts In: Mock Timer')).toBeInTheDocument();
  });

  test('parses advertisedStart correctly as string', () => {
    render(<Race {...defaultProps} />);

    expect(screen.getByText('Starts In: Mock Timer')).toBeInTheDocument();
  });

  test('parses advertisedStart correctly as object with seconds property', () => {
    const timestampProps: RaceProps = {
      ...defaultProps,
      advertisedStart: { seconds: moment().add(10, 'minutes').unix() },
    };

    render(<Race {...timestampProps} />);

    expect(screen.getByText('Starts In: Mock Timer')).toBeInTheDocument();
  });
});
