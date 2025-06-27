/** @format */

export type Match = {
  id: string;
  home_team: string;
  away_team: string;
  home_goals?: number;
  away_goals?: number;
};

export type Jornada = {
  id: string;
  matchday_number: number;
  match_date: string;
  matches: Match[];
  isEditable?: boolean;
};
