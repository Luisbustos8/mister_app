/** @format */

import { useState } from "react";

export function DynamicNotesInput({
  onSave,
}: {
  onSave: (notes: string[]) => void;
}) {
  const [notes, setNotes] = useState([""]);

  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const addNote = () => {
    setNotes([...notes, ""]);
  };

  const removeNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleSave = () => {
    const filteredNotes = notes
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    onSave(filteredNotes);
  };

  return (
    <div>
      <label>Notas:</label>
      {notes.map((note, i) => (
        <div key={i} className="flex mb-2">
          <input
            type="text"
            value={note}
            onChange={(e) => updateNote(i, e.target.value)}
            className="border p-1 rounded flex-grow"
            placeholder={`Añadir nota`}
          />
          <button
            onClick={() => removeNote(i)}
            className="ml-2 px-2 bg-red-600 text-white rounded"
            disabled={notes.length === 1}
          >
            X
          </button>
        </div>
      ))}

      <button
        onClick={addNote}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Añadir nota
      </button>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar notas
      </button>
    </div>
  );
}
