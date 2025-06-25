/** @format */

import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/common/Input";

import { CiCirclePlus } from "react-icons/ci";
import Select from "../../components/common/SelectPosition";
import { UseAddPlayer, type NewPlayerData } from "../../hooks/useAddPlayer";
import { positionOptions } from "../../utils/consts";

export default function AddPlayer() {
  const methods = useForm<NewPlayerData>();

  const { handleSubmit, reset } = methods;

  const { addPlayer, error, loading } = UseAddPlayer();

  const handleAddPlayer = async (data: NewPlayerData) => {
    await addPlayer(data);
    if (!error) reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleAddPlayer)}
        className="space-y-4 w-full p-4"
      >
        <h2 className="text-3xl text-black">Añadir jugador</h2>
        <div className="flex min-w-full gap-4">
          <Input
            name="name"
            label="Nombre"
            type="text"
            placeholder="Nombre del jugador"
            className="w-[600px] p-2 rounded text-black border-2 rounded-2xl"
          />
          <Select
            name="position"
            label="Posición"
            options={positionOptions}
            className="w-[300px] p-4 text-black border-2 h-11"
          />
        </div>
        <button
          type="submit"
          className="border-2 items-center justify-center flex gap-2  bg-gray-800 text-white px-4 py-2 rounded-3xl w-[300px] h-[60px] mt-2"
        >
          <CiCirclePlus className="size-8" />
          {loading ? "Añadiendo..." : "Añadir"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </FormProvider>
  );
}
