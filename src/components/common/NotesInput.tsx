/** @format */

import { useState } from "react";

export function NotesInput({ onSave }: { onSave: (notes: string[]) => void }) {
  const [text, setText] = useState("");

  const handleSave = () => {
    // Dividir texto por líneas y filtrar líneas vacías
    const notesArray = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    onSave(notesArray);
  };

  return (
    <div>
      <label htmlFor="notes">Notas (una por línea):</label>
      <textarea
        id="notes"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Escribe una nota por línea"
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar notas
      </button>
    </div>
  );
}
