/** @format */

import { useEffect, useState } from "react";
import type { Jornada } from "../types/calendar";

export function useCalendar() {
  const [jornadas, setJornadasState] = useState<Jornada[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("calendar");
    if (saved) {
      setJornadasState(JSON.parse(saved));
    }
  }, []);

  const setJornadas = (newJornadas: Jornada[]) => {
    setJornadasState(newJornadas);
    localStorage.setItem("calendar", JSON.stringify(newJornadas));
  };

  const resetCalendar = () => {
    localStorage.removeItem("calendar");
    setJornadasState([]);
  };

  return {
    jornadas,
    setJornadas,
    resetCalendar,
  };
}
