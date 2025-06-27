/** @format */

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/common/Input";
import LeagueTable from "../../components/ui/LeagueTable";
import NearbyMatches from "../../components/ui/NerbyMatches";
import NextMatchCard from "../../components/ui/NextMatchCard";
import TopPlayersByStat from "../../components/ui/TopPlayersByStats";
import { useCreateTeam } from "../../services/queries/useCreateTeam";
import { useTeam } from "../../services/queries/useTeam";
import { useUserId } from "../../services/queries/useUserId";

export type FormValues = {
  name: string;
  logo: FileList;
};

export function Homepage() {
  const methods = useForm<FormValues>();
  const { handleSubmit, setError: setFormError, reset } = methods;

  const {
    data: userId,
    isLoading: loadingUser,
    error: userError,
  } = useUserId();

  const {
    data: team,
    isLoading: loadingTeam,
    error: teamError,
  } = useTeam(userId);
  const { mutate: createTeam, isPending: creating } = useCreateTeam(reset);

  const onSubmit = (data: FormValues) => {
    const file = data.logo?.[0];
    if (!file) {
      setFormError("logo", {
        type: "manual",
        message: "Debes subir un logo",
      });
      return;
    }
    createTeam({ name: data.name, logo: file });
  };

  if (loadingUser || loadingTeam) return <p>Cargando...</p>;

  if (userError || teamError) {
    toast.error("Ocurrió un error");
    return <p>Ocurrió un error.</p>;
  }

  if (!team) {
    return (
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-8"
        >
          <h2 className="text-xl font-bold mb-4">Crear equipo</h2>

          <Input
            name="name"
            label="Nombre del equipo"
            type="text"
            placeholder="Nombre del equipo"
            className="w-full p-2 mb-2 rounded text-black"
          />

          <Input
            name="logo"
            label="Logo del equipo"
            type="file"
            accept="image/*"
            className="mb-4"
          />

          <button
            type="submit"
            disabled={creating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {creating ? "Creando..." : "Crear equipo"}
          </button>
        </form>
      </FormProvider>
    );
  }

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-2 text-black">{team?.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TopPlayersByStat
          teamId={team.id}
          stat="goals"
          title="Top Goleadores"
        />
        <TopPlayersByStat
          teamId={team.id}
          stat="assists"
          title="Top Asistentes"
        />
        <TopPlayersByStat
          teamId={team.id}
          stat="matches_played"
          title="Más Partidos Jugados"
        />
        <LeagueTable
          size="small"
          teamName="A.D. Villaviciosa de Odón - Infantil A"
        />
        <NearbyMatches
          className="col-span-2"
          team={team}
          teamId={team.id}
          range={1}
        />
        <div className="col-span-3">
          <NextMatchCard
            teamId={team.id}
            teamName={team.name}
            logo={team.logo_url}
          />
        </div>
      </div>
    </div>
  );
}
