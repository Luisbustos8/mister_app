/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { uploadImage } from "../../hooks/useImageUpdload";
import { supabase } from "../../lib/createClient";

type CreateTeamParams = {
  name: string;
  logo: File;
};

export const useCreateTeam = (resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, logo }: CreateTeamParams) => {
      const logoUrl = await uploadImage(logo);
      const { error } = await supabase.from("team").insert([
        {
          name,
          logo_url: logoUrl,
          squad: [],
          rivals: [],
        },
      ]);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Equipo creado con éxito!");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Error al crear el equipo");
    },
  });
};
