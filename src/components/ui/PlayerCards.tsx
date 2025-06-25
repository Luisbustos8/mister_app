/** @format */

import React from "react";
import {
  FaExclamationTriangle,
  FaFutbol,
  FaHandsHelping,
  FaMedal,
  FaShieldAlt,
  FaStopwatch,
  FaTimesCircle,
  FaUserPlus,
} from "react-icons/fa";

type PlayerCardProps = {
  player: {
    id: string;
    name: string;
    position: string;
    matches_played: number;
    starts: number;
    substitute_appearances: number;
    minutes_played: number;
    yellow_cards: number;
    red_cards: number;
    goals: number;
    assists: number;
    goals_conceded: number;
  };
};

const positionLabels: Record<string, string> = {
  goalkeeper: "Portero",
  defensa_central: "Defensa Central",
  right_back: "Lateral Derecho",
  left_back: "Lateral Izquierdo",
  defensive_midfielder: "Mediocentro Defensivo",
  central_midfielder: "Mediocentro",
  striker: "Delantero",
  right_winger: "Extremo Derecho",
  left_winger: "Extremo Izquierdo",
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="max-w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 text-black">{player.name}</h2>
      <p className="text-gray-600 mb-4 italic">
        {positionLabels[player.position] || player.position}
      </p>

      <ul className="grid grid-cols-3 gap-4 text-gray-700">
        <li className="flex items-center gap-2">
          <FaFutbol className="text-green-500" />
          Partidos jugados: <strong>{player.matches_played}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaUserPlus className="text-blue-500" />
          Partidos como titular: <strong>{player.starts}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaStopwatch className="text-yellow-500" />
          Partidos como suplente:{" "}
          <strong>{player.substitute_appearances}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaMedal className="text-purple-500" />
          Minutos jugados: <strong>{player.minutes_played}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-400" />
          Tarjetas amarillas: <strong>{player.yellow_cards}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaTimesCircle className="text-red-600" />
          Tarjetas rojas: <strong>{player.red_cards}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaFutbol className="text-red-500" />
          Goles: <strong>{player.goals}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaHandsHelping className="text-teal-500" />
          Asistencias: <strong>{player.assists}</strong>
        </li>
        <li className="flex items-center gap-2">
          <FaShieldAlt className="text-gray-600" />
          Goles encajados: <strong>{player.goals_conceded}</strong>
        </li>
      </ul>
    </div>
  );
};
