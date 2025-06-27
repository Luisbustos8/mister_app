/** @format */

import { useState } from "react";
import { supabase } from "../lib/createClient";

import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import type { positionOptions } from "../utils/consts";
import { useTeam } from "./useTeam";

export type NewPlayerData = {
  name: string;
  position: positionOptions;
};

export const UseAddPlayer = () => {
  const { user } = useAuth();
  const { team } = useTeam(user?.id);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addPlayer = async (playerData: NewPlayerData) => {
    setError("");
    setLoading(true);
    console.log(user?.id);

    // if (user?.id) {
    //   setError("Usuario no autenticado");
    //   setLoading(false);
    //   return;
    // }

    // if (!team?.id) {
    //   setError("No se pudo encontrar el equipo");
    //   setLoading(false);
    //   return;
    // }

    const { error } = await supabase
      .from("players")
      .insert([
        {
          team_id: team.id,
          name: playerData.name,
          position: playerData.position,
          matches_played: 0,
          starts: 0,
          substitute_appearances: 0,
          minutes_played: 0,
          yellow_cards: 0,
          red_cards: 0,
          goals: 0,
          assists: 0,
          goals_conceded: 0,
        },
      ])
      .select();

    if (error) {
      setError(error.message);
      toast.error(`Error al añadir jugador: ${error.message}`);
    } else {
      toast.success("Jugador añadido correctamente");
    }

    setLoading(false);
  };

  return { addPlayer, loading, error };
};
