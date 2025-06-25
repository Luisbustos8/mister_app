/** @format */

import { useNavigate } from "react-router-dom";
import { CalendarForm } from "../../components/ui/CalendarForm";
import { useAuth } from "../../context/AuthContext";
import { useCalendar } from "../../hooks/useCalendar";
import { useTeam } from "../../hooks/useTeam";
import { useRivals } from "../../services/queries/getRivals";
import type { Jornada } from "../../types/calendar";
export default function CreateCalendarPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { team, loading: loadingTeam } = useTeam(user?.id);
  const { rivals, loading: rivalsLoading } = useRivals(team?.id);
  const { setJornadas } = useCalendar();

  if (loadingTeam || rivalsLoading) return <div>Cargando...</div>;
  if (!team) {
    navigate("/");
    return null;
  }

  const teams = [team.name, ...rivals.map((r) => r.name)];

  const handleSave = (jornadas: Jornada[]) => {
    console.log("entro");
    setJornadas(jornadas);
    console.log(jornadas);
    alert("Calendario guardado");
    navigate("/calendario");
  };

  return (
    <div>
      <h1>Crear Calendario</h1>
      <CalendarForm teams={teams} onSave={handleSave} />
    </div>
  );
}
