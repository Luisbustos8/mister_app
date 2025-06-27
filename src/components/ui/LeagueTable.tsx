/** @format */

import { useLeagueTable } from "../../hooks/useLeagueTable";

type LeagueTableProps = {
  size: "big" | "small";
  teamName: string;
};

export default function LeagueTable({ size, teamName }: LeagueTableProps) {
  const { table, loading, error } = useLeagueTable();

  if (loading) return <p>Cargando clasificación...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!table.length) return <p>No hay datos de clasificación.</p>;

  const teamIndex = table.findIndex((t) => t.team === teamName);

  let visibleTeams = table;

  if (size === "small") {
    const start = Math.max(0, teamIndex - 1);
    const end = Math.min(table.length, start + 5);
    const adjustedStart = Math.max(0, end - 5);
    visibleTeams = table.slice(adjustedStart, end);
  }

  return (
    <div className="overflow-auto bg-white p-4 rounded-3xl shadow ">
      <h2 className="text-xl font-bold mb-4">
        Clasificación {size === "small" && "parcial"}
      </h2>
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2"></th>
            <th className="p-2">Equipo</th>
            {size === "big" ? (
              <>
                <th className="p-2">PJ</th>
                <th className="p-2">GF</th>
                <th className="p-2">GC</th>
                <th className="p-2">DG</th>
                <th className="p-2">Pts</th>
              </>
            ) : (
              <th className="p-2">Pts</th>
            )}
          </tr>
        </thead>
        <tbody>
          {visibleTeams.map((team) => {
            const position = table.findIndex((t) => t.team === team.team) + 1;
            const isUserTeam = team.team === teamName;

            return (
              <tr
                key={team.team}
                className={`border-t ${
                  isUserTeam ? "bg-yellow-100 font-bold" : ""
                }`}
              >
                <td className="p-2">{position}</td>
                <td className="p-2">{team.team}</td>
                {size === "big" ? (
                  <>
                    <td className="p-2">{team.matches_played}</td>
                    <td className="p-2">{team.goals_for}</td>
                    <td className="p-2">{team.goals_against}</td>
                    <td className="p-2">{team.goal_difference}</td>
                    <td className="p-2 font-bold">{team.points}</td>
                  </>
                ) : (
                  <td className="p-2 font-bold">{team.points}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
