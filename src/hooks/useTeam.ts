/** @format */

import { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";

type Team = {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  rivals?: string[];
  created_at?: string;
};

export function useTeam(userId: string | undefined) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchTeam = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("team")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        setError(error.message);
      } else if (data) {
        setTeam(data);
      }

      setLoading(false);
    };

    fetchTeam();
  }, [userId]);

  return { team, loading, error };
}
