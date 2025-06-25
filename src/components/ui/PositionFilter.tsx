/** @format */

interface PositionOption {
  value: string;
  label: string;
}

interface PositionFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: PositionOption[];
}

export const PositionFilter: React.FC<PositionFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select
      className="border border-black text-black p-2 rounded-md mb-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Todas las posiciones</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
