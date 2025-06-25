/** @format */

import { supabase } from "../../lib/createClient";

export type Rival = {
  id: string;
  team_id: string;
  name: string;
  logo_url?: string;
  address?: string;
  name_address?: string;
};

export const insertRival = async (rivalData: {
  team_id: string;
  name: string;
  logo_url?: string;
  address?: string;
  name_address?: string;
}): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.from("rivals").insert({
    team_id: rivalData.team_id,
    name: rivalData.name,
    logo_url: rivalData.logo_url,
    address: rivalData.address,
    name_address: rivalData.name_address,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
