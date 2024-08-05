import moment, { Moment } from 'moment';

export type AdvertisedStart = string | { seconds: number };

// Function to parse advertised start
export const parseAdvertisedStart = (advertisedStart: AdvertisedStart): Moment => {
  return typeof advertisedStart === 'string'
    ? moment(advertisedStart)
    : moment(advertisedStart.seconds * 1000);
};