/** @format */

import { useMemo } from "react";
import { useCalendar } from "../../hooks/useCalendar"; // Supongo que te da matchdays con partidos
import { useLeagueTable } from "../../hooks/useLeagueTable";

type Props = {
  teamId: string;
  range?: number;
  team: any;
  className?: string;
};

export default function NearbyMatches({
  team,
  range = 1,
  className = "",
}: Props) {
  const { jornadas, loading: loadingMatches } = useCalendar(team.id);
  const { table: leagueTable, loading: loadingTable } = useLeagueTable();

  const teamName = team?.name;

  const { upcomingMatches } = useMemo(() => {
    if (!teamName || !leagueTable.length || !jornadas.length)
      return { upcomingMatches: [], nextMatchday: null };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedJornadas = [...jornadas].sort(
      (a, b) =>
        new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
    );

    let nextMatchday = sortedJornadas.find((j) => {
      const matchDate = new Date(j.match_date);
      matchDate.setHours(0, 0, 0, 0);
      return matchDate >= today;
    });

    if (!nextMatchday) {
      nextMatchday = sortedJornadas[sortedJornadas.length - 1];
    }

    const currentIndex = leagueTable.findIndex((t) => t.team === teamName);
    if (currentIndex === -1) return { upcomingMatches: [], nextMatchday };

    const nearbyTeams = leagueTable
      .slice(
        Math.max(currentIndex - range, 0),
        Math.min(currentIndex + range + 1, leagueTable.length)
      )
      .map((t) => t.team);

    const matches = nextMatchday.matches.filter(
      (m) =>
        nearbyTeams.includes(m.home_team) || nearbyTeams.includes(m.away_team)
    );

    const seen = new Set<string>();
    const uniqueMatches = [];

    for (const match of matches) {
      const key = [match.home_team, match.away_team].sort().join("-");
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(match);
      }
    }

    return { upcomingMatches: uniqueMatches, nextMatchday };
  }, [teamName, leagueTable, jornadas, range]);

  if (loadingMatches || loadingTable) {
    return <div className="text-white">Cargando partidos cercanos...</div>;
  }

  if (!upcomingMatches.length) return <div>No hay partidos próximos</div>;

  return (
    <div className={`p-4 bg-white rounded-xl shadow-md mb-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-black">
        Próximos partidos de equipos cercanos en la clasificación
      </h3>
      <ul className="text-sm space-y-4 text-black">
        {upcomingMatches.map((match) => {
          const isMyTeamInMatch =
            match.home_team === teamName || match.away_team === teamName;

          return (
            <li
              key={match.id}
              className={`flex justify-between border p-4  rounded ${
                isMyTeamInMatch ? "bg-blue-100 text-black font-semibold" : ""
              }`}
            >
              <span className="w-[50%]">{match.home_team}</span>
              <span className="text-gray-500">vs</span>
              <span className="w-[50%] flex justify-end">
                {match.away_team}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
