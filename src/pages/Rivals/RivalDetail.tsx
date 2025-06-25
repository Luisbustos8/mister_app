/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { NoteForm } from "../../components/ui/NoteForm";
import { NoteList } from "../../components/ui/NoteList";
import { RivalDetailCard } from "../../components/ui/RivalDetailCard";
import { useRivalDetail } from "../../hooks/useRivalDetail";

export function RivalDetail() {
  const { id } = useParams();
  const { rival, notes, loading, saving, saveNotes } = useRivalDetail(id);
  const [newNotes, setNewNotes] = useState([""]);

  if (loading) return <div className="text-center p-6">Cargando datos...</div>;

  return (
    <div className="mx-auto  p-6 bg-white rounded-xl shadow-lg">
      {rival && <RivalDetailCard name={rival.name} logoUrl={rival.logo_url} />}
      <NoteList notes={notes} />
      <NoteForm
        notes={newNotes}
        onChange={(i, v) =>
          setNewNotes((prev) => {
            const copy = [...prev];
            copy[i] = v;
            return copy;
          })
        }
        onAdd={() => setNewNotes((prev) => [...prev, ""])}
        onRemove={(i) =>
          setNewNotes((prev) => prev.filter((_, idx) => idx !== i))
        }
        onSave={() => {
          saveNotes(newNotes);
          setNewNotes([""]);
        }}
        saving={saving}
      />
    </div>
  );
}
