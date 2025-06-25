/** @format */

import { CirclePlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/common/SearchBar";
import { PlayerCard } from "../../components/ui/PlayerCards";
import { PositionFilter } from "../../components/ui/PositionFilter";
import { useAuth } from "../../context/AuthContext";
import { useTeam } from "../../hooks/useTeam";
import { usePlayers } from "../../services/queries/addPlayers";
import { getPositionLabel, positionOptions } from "../../utils/consts";

const ITEMS_PER_PAGE = 6;

export function TeamPage() {
  const { user } = useAuth();
  const { team } = useTeam(user?.id);
  const { players, loading, error } = usePlayers(team?.id);

  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [page, setPage] = useState(1);

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((player) => (position ? player.position === position : true));
  }, [players, search, position]);

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const paginatedPlayers = filteredPlayers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const uniquePositions = Array.from(
    new Set(players.map((p) => p.position))
  ).filter((pos) => positionOptions.some((opt) => opt.value === pos));

  if (loading) return <p>Cargando jugadores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl text-black font-bold mb-8">Plantilla:</h1>
        <Link
          className="border-2 p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
          to="/dashboard/plantilla/add-player"
        >
          <CirclePlus />
          Añadir jugador
        </Link>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nombre..."
      />
      <PositionFilter
        value={position}
        onChange={setPosition}
        options={uniquePositions.map((pos) => ({
          value: pos,
          label: getPositionLabel(pos),
        }))}
      />
      <ul className="space-y-4">
        {paginatedPlayers.map((player) => (
          <li key={player.id}>
            <PlayerCard player={player} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`px-3 py-1 border rounded ${
              page === num ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
