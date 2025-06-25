/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/createClient";

export function useRivalNotes(rivalId: string) {
  return useQuery(
    ["rivalNotes", rivalId],
    async () => {
      const { data, error } = await supabase
        .from("rival_notes")
        .select("*")
        .eq("rival_id", rivalId);
      if (error) throw error;
      return data;
    },
    { enabled: !!rivalId }
  );
}

export function useAddRivalNote() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ rivalId, note }: { rivalId: string; note: string }) => {
      const { data, error } = await supabase.from("rival_notes").insert({
        rival_id: rivalId,
        note,
      });
      if (error) throw error;
      return data;
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(["rivalNotes", variables.rivalId]);
      },
    }
  );
}
