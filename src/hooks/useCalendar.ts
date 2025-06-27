/** @format */

import { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";
import type { Jornada } from "../types/calendar";

export function useCalendar(teamId: string | undefined) {
  const [jornadas, setJornadas] = useState<Jornada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendar = async () => {
    if (!teamId) return;

    setLoading(true);

    const { data, error } = await supabase.from("matchdays").select(`
        id,
        matchday_number,
        match_date,
        matches (
          id,
          home_team,
          away_team,
          home_goals,
          away_goals
        )
      `);

    if (error) {
      console.log("algo ocurrio en mi bota ", error.message);
      setError(error.message);
    } else {
      const formatted = data.map((md) => ({
        id: md.id,
        matchday_number: md.matchday_number,
        match_date: md.match_date,
        matches: md.matches.map((m) => ({
          id: m.id,
          home_team: m.home_team,
          away_team: m.away_team,
          home_goals: m.home_goals,
          away_goals: m.away_goals,
        })),
        isEditable: true,
      }));
      setJornadas(formatted);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCalendar();
  }, [teamId]);

  return {
    jornadas,
    loading,
    error,
    refetch: fetchCalendar,
    setJornadas,
  };
}
