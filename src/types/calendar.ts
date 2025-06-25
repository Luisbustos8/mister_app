/** @format */

export type Match = {
  home_team: string;
  away_team: string;
  home_goals?: number;
  away_goals?: number;
};

export type Jornada = {
  matchday_number: number;
  match_date: string;
  matches: Match[];
  isEditable: boolean;
};
