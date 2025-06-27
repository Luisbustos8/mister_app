/** @format */

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CalendarForm } from "../../components/ui/CalendarForm";
import { useAuth } from "../../context/AuthContext";
import { useTeam } from "../../hooks/useTeam";
import { useRivals } from "../../services/queries/getRivals";
import { saveCalendar } from "../../services/queries/saveCalendar";
import type { Jornada } from "../../types/calendar";

export default function CreateCalendarPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { team, loading: loadingTeam } = useTeam(user?.id);
  const { rivals, loading: rivalsLoading } = useRivals(team?.id);

  if (loadingTeam || rivalsLoading) return <div>Cargando...</div>;
  if (!team) {
    navigate("/");
    return null;
  }

  const teams = [team.name, ...rivals.map((r) => r.name)];

  const handleSave = async (matchdays: Jornada[]) => {
    try {
      await saveCalendar(matchdays);
      toast.success("✅ Calendario guardado correctamente.");
    } catch (err) {
      console.error("❌ Error al guardar:", err);
      toast.error("❌ Error al guardar calendario.");
    }
  };

  return (
    <div>
      <h1 className="text-black text-3xl mb-2">Crear Calendario</h1>
      <CalendarForm teams={teams} onSave={handleSave} />
    </div>
  );
}
