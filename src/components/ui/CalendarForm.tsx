/** @format */

import { useEffect } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import type { Jornada } from "../../types/calendar";
import { CalendarMatchEditor } from "./CalendarMatchEditor";

export function CalendarForm({
  teams,
  initialData = [],
  onSave,
}: {
  teams: string[];
  initialData?: Jornada[];
  onSave: (jornadas: Jornada[]) => void;
}) {
  const { jornadas, setJornadas } = useCalendar();

  const totalJornadas = (teams.length - 1) * 2;
  const mitad = totalJornadas / 2;
  const partidosPorJornada = teams.length / 2;

  useEffect(() => {
    if (jornadas.length === 0 && initialData.length === 0) {
      const initial = Array.from({ length: totalJornadas }, (_, i) => ({
        matchday_number: i + 1,
        match_date: "",
        matches: Array.from({ length: partidosPorJornada }, () => ({
          home_team: "",
          away_team: "",
        })),
        isEditable: i < mitad,
      }));
      setJornadas(initial);
    } else if (jornadas.length === 0 && initialData.length > 0) {
      setJornadas(initialData);
    }
  }, [teams, initialData]);

  const updateMatch = (
    jornadaIdx: number,
    matchIdx: number,
    match: { home_team: string; away_team: string }
  ) => {
    const updated = [...jornadas];
    updated[jornadaIdx].matches[matchIdx] = match;

    if (jornadaIdx < mitad) {
      const espejoIdx = jornadaIdx + mitad;
      updated[espejoIdx].matches[matchIdx] = {
        home_team: match.away_team,
        away_team: match.home_team,
      };
    }

    setJornadas(updated);
  };

  const updateDate = (jornadaIdx: number, date: string) => {
    const updated = [...jornadas];
    updated[jornadaIdx].match_date = date;
    setJornadas(updated);
  };

  const getAvailableTeams = (
    jornada: Jornada,
    matchIndex: number,
    role: "home" | "away"
  ): string[] => {
    const usedTeams = jornada.matches
      .filter((_, i) => i !== matchIndex)
      .flatMap((m) => [m.home_team, m.away_team])
      .filter(Boolean);

    const currentMatch = jornada.matches[matchIndex];
    const excluded =
      role === "home" ? currentMatch.away_team : currentMatch.home_team;

    return teams.filter(
      (team) => !usedTeams.includes(team) && team !== excluded
    );
  };

  return (
    <form
      onSubmit={(e) => {
        console.log("guardo");
        e.preventDefault();
        onSave(jornadas);
        console.log("he llamado al onsave,", jornadas);
      }}
      className="space-y-6 "
    >
      {jornadas.map((jornada, i) => (
        <div key={i} className="p-4 border rounded-xl bg-gray-500">
          <h3 className="font-bold mb-2">Jornada {jornada.matchday_number}</h3>
          <input
            type="date"
            value={jornada.match_date}
            onChange={(e) => updateDate(i, e.target.value)}
            className="mb-2 block"
          />
          {jornada.matches.map((match, mi) => (
            <CalendarMatchEditor
              key={mi}
              value={match}
              onChange={(val) => updateMatch(i, mi, val)}
              homeOptions={getAvailableTeams(jornada, mi, "home")}
              awayOptions={getAvailableTeams(jornada, mi, "away")}
              disabled={!jornada.isEditable}
            />
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar calendario
      </button>
    </form>
  );
}
