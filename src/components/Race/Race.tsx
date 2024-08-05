import React from 'react';
import moment from 'moment';
import Timer from '../Timer/Timer';
import { RaceProps } from './Race.types';
import styles from './Race.module.css';

const Race: React.FC<RaceProps> = ({
  meetingName,
  raceNumber,
  advertisedStart,
}) => {
  // Ensure advertisedStart is always a moment object
  const start =
    typeof advertisedStart === 'string'
      ? moment(advertisedStart)
      : moment(advertisedStart.seconds * 1000);

  return (
    <div className={styles.race}>
      <h2>{meetingName}</h2>
      <p>Race Number: {raceNumber}</p>
      <p>
        Starts In: <Timer advertisedStart={start} />
      </p>
    </div>
  );
};

export default Race;
