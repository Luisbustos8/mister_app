/** @format */

type Props = {
  notes: { id: string; note: string }[];
};

export const NoteList = ({ notes }: Props) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-black">
      Notas existentes
    </h2>
    {notes.length === 0 ? (
      <p className="text-gray-500 italic">No hay notas aún.</p>
    ) : (
      <ul className="list-disc list-inside space-y-2 max-h-52 overflow-y-auto text-gray-700 text-base">
        {notes.map((n, i) => (
          <li key={n.id}>
            <strong>{i + 1}</strong> - {n.note}
          </li>
        ))}
      </ul>
    )}
  </section>
);
