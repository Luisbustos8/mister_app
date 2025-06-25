/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JornadaItem from "../../components/ui/JornadaItem";
import { useCalendar } from "../../hooks/useCalendar";

export default function CalendarPage() {
  const { jornadas } = useCalendar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jornadas || jornadas.length === 0) {
      navigate("/dashboard/calendario/add-calendar");
    }
  }, [jornadas, navigate]);

  if (!jornadas || jornadas.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Calendario</h1>
      {jornadas.map((jornada, i) => (
        <JornadaItem key={i} jornada={jornada} jornadaIndex={i} />
      ))}
    </div>
  );
}
