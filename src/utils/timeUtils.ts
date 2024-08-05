import moment, { Moment } from 'moment';
import { AdvertisedStart } from './types/TimeUtils.types';

// Function to parse advertised start
export const parseAdvertisedStart = (
  advertisedStart: AdvertisedStart,
): Moment => {
  return typeof advertisedStart === 'string'
    ? moment(advertisedStart)
    : moment(advertisedStart.seconds * 1000);
};

export const isTimeValid = (advertisedStart: moment.Moment) => {
  const oneMinutePastStart = advertisedStart.clone().add(1, 'minute');
  return moment().isBefore(oneMinutePastStart);
};

export const formatDuration = (duration: moment.Duration | null) => {
  if (!duration) return 'Invalid date';
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
};
