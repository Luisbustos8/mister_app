/** @format */

// src/hooks/useLeagueTable.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";

export type LeagueTeam = {
  team: string;
  matches_played: number;
  points: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
};

export const useLeagueTable = () => {
  const [table, setTable] = useState<LeagueTeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTable = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("league_table") // ← Esto es la VISTA
      .select("*");

    if (error) {
      setError(error.message);
    } else {
      setTable(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTable();
  }, []);

  return { table, loading, error };
};
