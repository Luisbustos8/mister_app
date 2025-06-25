/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import type { Jornada } from "../types/calendar";

type CalendarContextType = {
  jornadas: Jornada[];
  setJornadas: (jornadas: Jornada[]) => void;
  resetCalendar: () => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <CalendarContext.Provider value={{ jornadas, setJornadas, resetCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
