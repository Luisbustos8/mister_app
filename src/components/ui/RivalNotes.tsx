/** @format */

import { useState } from "react";
import {
  useAddRivalNote,
  useRivalNotes,
} from "../../services/queries/useRivalNotes";

type RivalNotesProps = {
  rivalId: string;
};

export function RivalNotes({ rivalId }: RivalNotesProps) {
  const { data: notes, isLoading, isError } = useRivalNotes(rivalId);
  const addNoteMutation = useAddRivalNote();

  const [newNote, setNewNote] = useState("");

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await addNoteMutation.mutateAsync({ rivalId, note: newNote });
      setNewNote("");
    } catch (error) {
      alert("Error al añadir nota");
    }
  };

  if (isLoading) return <p>Cargando notas...</p>;
  if (isError) return <p>Error al cargar las notas</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Notas</h2>
      <ul>
        {notes?.map((note) => (
          <li key={note.id} className="mb-1 border-b pb-1">
            {note.note}
          </li>
        ))}
      </ul>
      <textarea
        className="border p-2 w-full mt-4"
        rows={3}
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Añadir nueva nota..."
      />
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAddNote}
        disabled={addNoteMutation.isLoading}
      >
        {addNoteMutation.isLoading ? "Guardando..." : "Guardar nota"}
      </button>
    </div>
  );
}
