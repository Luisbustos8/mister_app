/** @format */

import { supabase } from "../lib/createClient";

export async function uploadImage(file: File): Promise<string> {
  const filePath = `logos/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("logos").upload(filePath, file);

  if (error) throw new Error("Error al subir el logo");

  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(filePath);

  return publicUrl;
}
