/** @format */

import { usePlayers } from "../../services/queries/addPlayers";
import { formatStatLabel } from "../../utils/stats";

type TopPlayersByStatProps = {
  teamId: string;
  stat: "goals" | "assists" | "matches_played";
  title: string;
};

export default function TopPlayersByStat({
  teamId,
  stat,
  title,
}: TopPlayersByStatProps) {
  const { players, loading, error } = usePlayers(teamId);

  if (loading) return <p>Cargando jugadores...</p>;
  if (error) return <p>Error: {error}</p>;
  if (players.length === 0) return <p>No hay jugadores disponibles.</p>;

  const allZero = players.every((p) => p[stat] === 0);

  const topPlayers = [...players]
    .sort((a, b) => {
      if (allZero) {
        return a.name.localeCompare(b.name);
      }
      return b[stat] - a[stat];
    })
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-bold mb-2 text-black">{title}</h2>
      <ul className="space-y-1">
        {topPlayers.map((player) => (
          <li key={player.id} className="flex justify-between text-black">
            <span>{player.name}</span>
            <span className="font-semibold">
              {player[stat] ?? 0} {formatStatLabel(stat, player[stat] ?? 0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
