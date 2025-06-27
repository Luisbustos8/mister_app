/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../lib/createClient";
import type { Jornada, Match } from "../../types/calendar";

export default function EditJornadaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jornada, setJornada] = useState<Jornada | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJornada = async () => {
      const { data, error } = await supabase
        .from("matchdays")
        .select("*, matches(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching jornada:", error.message);
      } else {
        const formatted: Jornada = {
          id: data.id,
          matchday_number: data.matchday_number,
          match_date: data.match_date,
          matches: data.matches.map((m: Match) => ({
            id: m.id,
            home_team: m.home_team,
            away_team: m.away_team,
            home_goals: m.home_goals,
            away_goals: m.away_goals,
          })),
        };
        setJornada(formatted);
      }

      setLoading(false);
    };

    fetchJornada();
  }, [id]);

  const handleMatchChange = (
    i: number,
    key: string,
    value: string | number
  ) => {
    if (!jornada) return;
    const updated = [...jornada.matches];
    updated[i] = { ...updated[i], [key]: value };
    setJornada({ ...jornada, matches: updated });
  };

  const handleSave = async () => {
    if (!jornada) return;
    setSaving(true);

    const { error: dateError } = await supabase
      .from("matchdays")
      .update({ match_date: jornada.match_date })
      .eq("id", jornada.id);

    const updatePromises = jornada.matches.map((match) =>
      supabase
        .from("matches")
        .update({
          home_goals: match.home_goals,
          away_goals: match.away_goals,
        })
        .eq("id", match.id)
    );

    const results = await Promise.all(updatePromises);
    const errors = results.filter((r) => r.error);

    setSaving(false);

    if (dateError || errors.length > 0) {
      toast.error("Error al guardar cambios.");
    } else {
      toast.success("Jornada actualizada.");
      navigate("/dashboard/calendario");
    }
  };

  if (loading) return <p>Cargando jornada...</p>;
  if (!jornada) return <p>No se encontró la jornada.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        Editar Jornada {jornada.matchday_number}
      </h2>

      <div className="space-y-4">
        {jornada.matches.map((match, i) => (
          <div
            key={match.id}
            className="border p-2 rounded-3xl bg-white text-black flex items-center px-10"
          >
            <div className="flex w-[45%]">{match.home_team}</div>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={match.home_goals ?? ""}
                onChange={(e) =>
                  handleMatchChange(i, "home_goals", Number(e.target.value))
                }
                className="w-16 border px-2"
                placeholder="Goles local"
              />
              <input
                type="number"
                value={match.away_goals ?? ""}
                onChange={(e) =>
                  handleMatchChange(i, "away_goals", Number(e.target.value))
                }
                className="w-16 border p-1"
                placeholder="Goles visitante"
              />
            </div>
            <div className="flex w-[45%] justify-end">{match.away_team}</div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={saving}
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
