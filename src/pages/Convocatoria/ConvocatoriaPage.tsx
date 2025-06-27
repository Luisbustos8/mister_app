/** @format */
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePlayers } from "../../services/queries/addPlayers";
import { getPositionLabel } from "../../utils/consts";

type MatchData = {
  id: string;
  rivalName: string;
  match_date: string;
  location?: string;
  address?: string;
  logo_url?: string;
};

type Player = {
  id: string;
  name: string;
  position: string;
};

export default function ConvocatoriaPage() {
  const { state } = useLocation();
  const teamId = state?.teamId;
  const match: MatchData = state?.match;

  const { players } = usePlayers(teamId);

  console.log(players);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [matchTime, setMatchTime] = useState("");
  const [matchDateInput, setMatchDateInput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePlayer = (player: Player) => {
    const isSelected = selectedPlayers.some((p) => p.id === player.id);
    if (isSelected) {
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
    } else if (selectedPlayers.length < 18) {
      setSelectedPlayers((prev) => [...prev, player]);
    }
  };

  const groupedPlayers = useMemo(() => {
    const groups: Record<string, Player[]> = {
      Porteros: [],
      Defensas: [],
      Medios: [],
      Delanteros: [],
    };

    players.forEach((player: Player) => {
      switch (player.position) {
        case "goalkeeper":
          groups.Porteros.push(player);
          break;
        case "defensa_central":
        case "right_back":
        case "left_back":
          groups.Defensas.push(player);
          break;
        case "defensive_midfielder":
        case "central_midfielder":
          groups.Medios.push(player);
          break;
        case "right_winger":
        case "left_winger":
        case "striker":
          groups.Delanteros.push(player);
          break;
        default:
          break;
      }
    });

    return groups;
  }, [players]);

  const groupCounts = useMemo(() => {
    return {
      Porteros: selectedPlayers.filter((p) => p.position === "goalkeeper")
        .length,
      Defensas: selectedPlayers.filter((p) =>
        ["defensa_central", "right_back", "left_back"].includes(p.position)
      ).length,
      Medios: selectedPlayers.filter((p) =>
        ["defensive_midfielder", "central_midfielder"].includes(p.position)
      ).length,
      Delanteros: selectedPlayers.filter((p) =>
        ["right_winger", "left_winger", "striker"].includes(p.position)
      ).length,
    };
  }, [selectedPlayers]);

  const convocadosList = selectedPlayers
    .map((p, i) => `${i + 1}. ${p.name}`)
    .join("\n");

  const formattedMessage = useMemo(() => {
    if (!matchDateInput || !matchTime) return "";

    const [year, month, day] = matchDateInput.split("-");
    const [hour, minute] = matchTime.split(":");
    const matchDate = new Date(+year, +month - 1, +day, +hour, +minute);

    const arrivalTime = new Date(matchDate);
    arrivalTime.setHours(arrivalTime.getHours() - 1);

    const locationName = match.location || match.rivalName;
    const rawAddress = match.address || locationName;

    const mapsLink = rawAddress.includes("http")
      ? rawAddress
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          rawAddress
        )}`;

    return `Buenas tardes, jugamos el ${matchDate.toLocaleDateString()} a las ${matchDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    )} en el campo:
      📍 ${locationName}
      ${mapsLink}
      
      Quedamos allí a las ${arrivalTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}.
      
      Los jugadores convocados son los siguientes:
      ${convocadosList}`;
  }, [matchDateInput, matchTime, selectedPlayers]);

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">
        Convocatoria vs {match?.rivalName}
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <label>
          Fecha del partido:
          <input
            type="date"
            value={matchDateInput}
            onChange={(e) => setMatchDateInput(e.target.value)}
            className="border px-2 py-1 ml-2"
          />
        </label>
        <label>
          Hora del partido:
          <input
            type="time"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            className="border px-2 py-1 ml-2"
          />
        </label>
      </div>

      <h2 className="text-lg font-semibold mb-2">
        Total convocados: {selectedPlayers.length} / 18
      </h2>

      {Object.entries(groupedPlayers).map(([groupName, players]) => (
        <div key={groupName} className="mb-4">
          <h3 className="text-md font-bold mb-2">
            {groupName} (
            {groupCounts[groupName as keyof typeof groupCounts] || 0})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {players.map((player) => {
              const isSelected = selectedPlayers.some(
                (p) => p.id === player.id
              );
              return (
                <label
                  key={player.id}
                  className={`border p-2 rounded cursor-pointer flex gap-4 ${
                    isSelected ? "bg-green-200" : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => togglePlayer(player)}
                    className="mr-2"
                  />
                  {player.name}
                  <p className="font-bold italic">
                    ({getPositionLabel(player.position)})
                  </p>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {selectedPlayers.length > 18 && (
        <p className="text-red-500 mb-2">
          No puedes convocar más de 18 jugadores.
        </p>
      )}

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={selectedPlayers.length !== 18}
        onClick={() => {
          console.log("Convocatoria confirmada", selectedPlayers);
        }}
      >
        Confirmar convocatoria
      </button>

      {formattedMessage && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Mensaje para enviar</h2>
          <textarea
            className="w-full border p-2 h-60"
            value={formattedMessage}
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText(formattedMessage)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Copiar mensaje
          </button>
        </div>
      )}
    </div>
  );
}
