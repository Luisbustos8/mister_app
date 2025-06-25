/** @format */

type Match = {
  home_team: string;
  away_team: string;
};

export function CalendarMatchEditor({
  value,
  onChange,
  homeOptions,
  awayOptions,
  disabled,
}: {
  value: Match;
  onChange: (val: Match) => void;
  homeOptions: string[];
  awayOptions: string[];
  disabled?: boolean;
}) {
  return (
    <div className="flex space-x-2 mb-2 items-center">
      <select
        disabled={disabled}
        value={value.home_team}
        onChange={(e) => onChange({ ...value, home_team: e.target.value })}
        className="border rounded-2xl flex-grow bg-white text-black p-2 w-[50%]"
      >
        <option value="">Selecciona local</option>
        {homeOptions.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      <span>vs</span>

      <select
        disabled={disabled}
        value={value.away_team}
        onChange={(e) => onChange({ ...value, away_team: e.target.value })}
        className="border rounded-2xl flex-grow bg-white text-black p-2 w-[50%]"
      >
        <option value="">Selecciona visitante</option>
        {awayOptions.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
}
