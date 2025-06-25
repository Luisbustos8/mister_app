/** @format */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/createClient";

export const useUserId = () =>
  useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) throw new Error("No se pudo obtener el usuario.");
      return user.id;
    },
  });
