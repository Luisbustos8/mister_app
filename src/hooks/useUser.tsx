/** @format */

import { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setError("No se pudo obtener el usuario.");
        setUserId(null);
        return;
      }
      setUserId(data.user.id);
    }
    fetchUser();
  }, []);

  return { userId, error };
}
