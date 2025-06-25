/** @format */

import { useEffect, useState } from "react";
import { supabase } from "../../lib/createClient";

export type Rival = {
  id: string;
  team_id: string;
  name: string;
  logo_url?: string;
  address?: string;
  name_address?: string;
};

export const useRivals = (teamId: string | undefined) => {
  const [rivals, setRivals] = useState<Rival[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!teamId) {
      setRivals([]);
      setError("No hemos encotrado equipo");
      setLoading(false);
      return;
    }

    const fetchRivals = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("rivals")
        .select("*")
        .eq("team_id", teamId);

      console.log(data, "buse");
      if (error) {
        console.error("Error fetching rivals:", error);
        setError(error.message);
        setRivals([]);
      } else {
        setRivals(data || []);
      }

      setLoading(false);
    };

    fetchRivals();
  }, [teamId]);

  return { rivals, loading, error };
};
