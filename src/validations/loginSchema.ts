/** @format */

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("El email es obligatorio").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;
