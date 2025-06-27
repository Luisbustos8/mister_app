/** @format */

import { useNavigate } from "react-router-dom";
import type { Jornada } from "../../types/calendar";

export default function JornadaItem({ jornada }: { jornada: Jornada }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/calendario/editar-jornada/${jornada.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 border rounded mb-4 cursor-pointer bg-white rounded-xl"
    >
      <h3 className="font-bold mb-2 text-black text-xl">
        Jornada {jornada.matchday_number}
      </h3>
      <p className="text-sm text-gray-600 mb-2">Fecha: {jornada.match_date}</p>

      <ul className="space-y-1">
        {jornada.matches.map((match, i) => (
          <li
            key={i}
            className="text-sm text-black flex border border-gray-400 p-2"
          >
            <p className="w-[50%] flex justify-start">{match.home_team}</p>{" "}
            <div className="flex  w-[5%] items-center text-sm justify-between">
              {match.home_goals !== null && match.away_goals !== null
                ? `${match.home_goals} - ${match.away_goals}`
                : "VS"}
            </div>
            <p className="w-[50%] flex justify-end">{match.away_team ?? ""}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
