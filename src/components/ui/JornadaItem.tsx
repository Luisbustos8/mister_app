/** @format */

import { useState } from "react";

import { useCalendar } from "../../context/CalendarFormContext";
import type { Jornada } from "../../types/calendar";
import { CalendarMatchEditor } from "./CalendarMatchEditor";

export default function JornadaItem({
  jornada,
  jornadaIndex,
}: {
  jornada: Jornada;
  jornadaIndex: number;
}) {
  const { jornadas, setJornadas } = useCalendar();
  const [date, setDate] = useState(jornada.match_date);

  const updateMatch = (
    matchIdx: number,
    match: { home_team: string; away_team: string }
  ) => {
    const updated = [...jornadas];
    updated[jornadaIndex].matches[matchIdx] = match;
    setJornadas(updated);
  };

  const updateDate = (newDate: string) => {
    setDate(newDate);
    const updated = [...jornadas];
    updated[jornadaIndex].match_date = newDate;
    setJornadas(updated);
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="font-bold mb-2">Jornada {jornada.matchday_number}</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => updateDate(e.target.value)}
        className="mb-2 block"
      />
      {jornada.matches.map((match, mi) => (
        <CalendarMatchEditor
          key={mi}
          value={match}
          onChange={(val) => updateMatch(mi, val)}
          homeOptions={[]}
          awayOptions={[]}
          disabled={false}
        />
      ))}
    </div>
  );
}
