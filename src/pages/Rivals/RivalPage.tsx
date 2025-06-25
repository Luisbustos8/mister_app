/** @format */

import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { RivalCard } from "../../components/ui/RivalCard";
import { useAuth } from "../../context/AuthContext";
import { useTeam } from "../../hooks/useTeam";
import { useRivals } from "../../services/queries/getRivals";

export function RivalPage() {
  const { user } = useAuth();
  const { team } = useTeam(user?.id);

  const { rivals, loading: rivalsLoading, error } = useRivals(team?.id);

  if (rivalsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl text-black font-bold mb-8">Rivales</h1>
        <Link
          className="border-2 p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
          to="/dashboard/rivales/add-rivals"
        >
          <CirclePlus />
          Añadir rival
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rivals.map((rival) => (
          <RivalCard key={rival.id} {...rival} />
        ))}
      </div>
    </div>
  );
}
