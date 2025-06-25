/** @format */

type Props = {
  name: string;
  logoUrl?: string | null;
};

export const RivalDetailCard = ({ name, logoUrl }: Props) => (
  <div className="flex items-center gap-4 mb-6">
    {logoUrl ? (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="w-20 h-20 rounded-full border-4 object-contain border-gray-200"
      />
    ) : (
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200 text-gray-400 font-semibold">
        Sin logo
      </div>
    )}
    <h1 className="text-3xl font-bold truncate text-black">{name}</h1>
  </div>
);
