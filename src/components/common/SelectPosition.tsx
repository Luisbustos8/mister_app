/** @format */

import { useFormContext } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
  className?: string;
}

export default function Select({
  name,
  label,
  options,
  className = "",
}: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })}
        className={`w-[400px] border px-2 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="">Selecciona una posición</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || "Error"}
        </p>
      )}
    </div>
  );
}
