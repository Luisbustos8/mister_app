/** @format */

import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import { useTeam } from "../../hooks/useTeam";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { insertRival } from "../../services/queries/addRival";

type RivalFormData = {
  name: string;
  logo_url?: string;
  address?: string;
  name_address?: string;
};

export function RivalForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const { team } = useTeam(user?.id);
  const methods = useForm<RivalFormData>();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RivalFormData) => {
    if (!team?.id) return;

    setErrorMessage(null);

    const { success, error } = await insertRival({
      team_id: team.id,
      name: data.name,
      logo_url: data.logo_url,
      address: data.address,
      name_address: data.name_address,
    });

    if (success) {
      reset();
    } else {
      setErrorMessage("Error al añadir rival: " + error);
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
        <h2 className="text-xl font-bold">Añadir rival</h2>

        <Input
          name="name"
          className="border-2 border-black rounded-xl text-black w-[400px] p-2"
          placeholder="Nombre del rival"
          required
        />

        <Input
          name="logo_url"
          placeholder="Logo (URL)"
          className="border-2 border-black rounded-xl text-black w-[400px] p-2"
        />

        <Input
          name="address"
          placeholder="Dirección"
          className="border-2 border-black rounded-xl text-black w-[400px] p-2"
        />
        <Input
          name="name_address"
          placeholder="Nombre del estadio"
          className="border-2 border-black rounded-xl text-black w-[400px] p-2"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="border-2 p-4 flex items-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
        >
          {isSubmitting ? "Guardando..." : "Añadir rival"}
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </FormProvider>
  );
}
