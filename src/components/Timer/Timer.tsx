import React, { useEffect, useState } from 'react';
import moment, { Duration } from 'moment';
import { TimerProps } from './Timer.types';
import { formatDuration } from '../../utils/timeUtils';

const Timer: React.FC<TimerProps> = ({ advertisedStart }) => {
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = moment();
      const diff = moment.duration(advertisedStart.diff(now));
      setTimeLeft(diff);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [advertisedStart]);

  return <span>{formatDuration(timeLeft)}</span>;
};

export default Timer;
