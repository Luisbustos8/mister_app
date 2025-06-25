/** @format */

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/common/Input";
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
      {team?.squad?.length > 0 ? (
        "Hay jugadores"
      ) : (
        <a
          href="/dashboard/plantilla/add-player"
          className="text-black underline text-lg"
        >
          Aún no hay jugadores creados, ¿Quieres añadirlos?
        </a>
      )}
    </div>
  );
}
