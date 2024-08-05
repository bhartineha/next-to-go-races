import React, { useState } from 'react';
import useFetchRaces from '../../hooks/useFetchRaces';
import Race from '../Race/Race';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import { parseAdvertisedStart, isTimeValid } from '../../utils/timeUtils';

const RaceList: React.FC = () => {
  const races = useFetchRaces();
  const [category, setCategory] = useState<string | null>(null);

  const filteredRaces = races
    .filter((race) => {
      const isCategoryMatch = !category || race.category_id === category;
      const advertisedStart = parseAdvertisedStart(race.advertised_start);
      const validTime = isTimeValid(advertisedStart);
      return isCategoryMatch && validTime;
    })
    .sort((a, b) => {
      const startA = parseAdvertisedStart(a.advertised_start);
      const startB = parseAdvertisedStart(b.advertised_start);
      return startA.diff(startB);
    })
    .slice(0, 5);

  return (
    <div>
      <CategoryTabs setCategory={setCategory} />
      {filteredRaces.length > 0 ? (
        filteredRaces.map((race) => (
          <Race
            key={race.race_id}
            meetingName={race.meeting_name}
            raceNumber={race.race_number}
            advertisedStart={race.advertised_start}
          />
        ))
      ) : (
        <p>No races available.</p>
      )}
    </div>
  );
};

export default RaceList;
