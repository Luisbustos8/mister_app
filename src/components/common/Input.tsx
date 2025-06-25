/** @format */

import type { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  name: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ name, label, ...props }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="mb-[1rem]">
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} {...register(name)} {...props} />
      {errors[name] && (
        <p className="text-red-700 font-[0.8rem]">
          {error?.message?.toString() || "Campo inválido"}
        </p>
      )}
    </div>
  );
}
