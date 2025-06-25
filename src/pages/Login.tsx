/** @format */

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../validations/loginSchema";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit, setError } = methods;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch {
      toast.error("Email o contraseña incorrectos");
      setError("email", { message: "Email o contraseña incorrectos" });
      setError("password", { message: " " });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-2 border-white bg-[#fafaf9] w-[500px] gap-4 rounded-3xl p-10 "
        >
          <h2 className="flex items-center justify-center text-xl font-reboto">
            Iniciar sesión
          </h2>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="border-2 w-full p-4 rounded-3xl border-gray-200"
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="border-2 border-gray-200 w-full p-4 rounded-3xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-4 rounded-3xl hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
