/** @format */

import { useEffect, useState } from "react";
import { supabase } from "../../lib/createClient";

export type Player = {
  id: string;
  team_id: string;
  name: string;
  position: string;
  matches_played: number;
  starts: number;
  substitute_appearances: number;
  minutes_played: number;
  yellow_cards: number;
  red_cards: number;
  goals: number;
  assists: number;
  goals_conceded: number;
};

export const usePlayers = (teamId: string | undefined) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!teamId) {
      setPlayers([]);
      return;
    }

    const fetchPlayers = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("team_id", teamId);

      if (error) {
        setError(error.message);
        setPlayers([]);
      } else {
        setPlayers(data || []);
      }

      setLoading(false);
    };

    fetchPlayers();
  }, [teamId]);

  return { players, loading, error };
};
