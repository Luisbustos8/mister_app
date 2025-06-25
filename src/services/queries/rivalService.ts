/** @format */

import { supabase } from "../../lib/createClient";

export const getRivalById = async (id: string) => {
  return await supabase
    .from("rivals")
    .select("id, name, logo_url")
    .eq("id", id)
    .single();
};

export const getRivalNotes = async (rivalId: string) => {
  return await supabase.from("rival_notes").select("*").eq("rival_id", rivalId);
};

export const saveRivalNote = async (rivalId: string, note: string) => {
  return await supabase.from("rival_notes").insert({ rival_id: rivalId, note });
};
