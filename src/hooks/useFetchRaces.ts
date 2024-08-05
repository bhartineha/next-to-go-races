import { useState, useEffect } from 'react';
import axios from 'axios';
import { RaceSummary, ApiResponse } from '../components/Race/Race.types';

const useFetchRaces = () => {
  const [races, setRaces] = useState<RaceSummary[]>([]);

  const fetchRaces = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10',
      );
      const raceSummaries = Object.values(response.data.data.race_summaries);
      setRaces(raceSummaries);
    } catch (error) {
      console.error('Error fetching races', error);
    }
  };

  useEffect(() => {
    fetchRaces();
    const interval = setInterval(fetchRaces, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return races;
};

export default useFetchRaces;
