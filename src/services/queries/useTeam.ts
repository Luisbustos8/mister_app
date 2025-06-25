/** @format */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/createClient";

export const useTeam = (userId?: string) =>
  useQuery({
    queryKey: ["team", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay ID de usuario.");
      const { data, error } = await supabase.from("team").select("*").single();

      if (error && error.code !== "PGRST116") throw new Error(error.message);
      return data ?? null;
    },
    enabled: !!userId,
  });
