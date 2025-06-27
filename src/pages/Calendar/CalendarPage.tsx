/** @format */

import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import JornadaItem from "../../components/ui/JornadaItem";
import { useAuth } from "../../context/AuthContext";
import { useCalendar } from "../../hooks/useCalendar";
import { useTeam } from "../../hooks/useTeam";

export default function CalendarPage() {
  const { user } = useAuth();
  const { team } = useTeam(user?.id);
  const { jornadas } = useCalendar(team?.id);

  if (!jornadas || jornadas.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-black text-3xl">Calendario</h1>
        {!jornadas && (
          <Link
            className="border-2 p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
            to="/dashboard/plantilla/add-player"
          >
            <CirclePlus />
            Crear calendario
          </Link>
        )}
      </div>
      {[...jornadas]
        .sort((a, b) => a.matchday_number - b.matchday_number)
        .map((jornada, i) => (
          <JornadaItem key={jornada.id ?? i} jornada={jornada} />
        ))}
    </div>
  );
}
