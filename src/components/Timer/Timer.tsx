import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { formatDuration } from '../../utils/timeUtils';
import { TimerProps } from './Timer.types';

const Timer: React.FC<TimerProps> = ({ advertisedStart }) => {
  const [timeLeft, setTimeLeft] = useState<moment.Duration | null>(null);

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
