/** @format */

import { CirclePlus } from "lucide-react";

type Props = {
  notes: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSave: () => void;
  saving: boolean;
};

export const NoteForm = ({
  notes,
  onChange,
  onAdd,
  onRemove,
  onSave,
  saving,
}: Props) => (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-black">
      Añadir nuevas notas
    </h2>

    {notes.map((note, i) => (
      <div key={i} className="flex gap-2 mb-3">
        <input
          value={note}
          onChange={(e) => onChange(i, e.target.value)}
          placeholder={`Añadir nota`}
          className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={() => onRemove(i)}
          disabled={notes.length === 1}
          className="px-3 py-2 bg-red-600 text-white disabled:opacity-50 hover:bg-red-700 transition rounded-full size-10"
        >
          X
        </button>
      </div>
    ))}

    <button
      onClick={onAdd}
      type="button"
      className="border-2 mb-4 mt-4 justify-center p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
    >
      + Añadir nota
    </button>

    <div className="flex w-full items-end justify-end">
      <button
        onClick={onSave}
        disabled={saving}
        type="button"
        className="border-2 w-[50%] justify-center p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
      >
        <CirclePlus />
        {saving ? "Guardando..." : "Guardar notas"}
      </button>
    </div>
  </section>
);
