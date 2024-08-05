export interface RaceProps {
  meetingName: string;
  raceNumber: string;
  advertisedStart: string | { seconds: number };
}

export interface RaceSummary {
  race_id: string;
  race_number: string;
  meeting_name: string;
  category_id: string;
  advertised_start:
    | {
        seconds: number;
      }
    | string;
}

export interface RaceData {
  race_summaries: Record<string, RaceSummary>;
}

export interface ApiResponse {
  data: RaceData;
}
