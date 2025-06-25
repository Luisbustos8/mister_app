/** @format */

export const positionOptions = [
  { value: "goalkeeper", label: "Portero" },
  { value: "right_back", label: "Lateral derecho" },
  { value: "left_back", label: "Lateral izquierdo" },
  { value: "defensa_central", label: "Defensa Central" },
  { value: "defensive_midfielder", label: "Pivote" },
  { value: "central_midfielder", label: "Mediocentro" },
  { value: "striker", label: "Delantero" },
  { value: "right_winger", label: "Extremo derecho" },
  { value: "left_winger", label: "Extremo izquierdo" },
];
export type positionOptions =
  | "goalkeeper"
  | "defensa_central"
  | "right_back"
  | "left_back"
  | "defensive_midfielder"
  | "central_midfielder"
  | "striker"
  | "right_winger"
  | "left_winger";

export const getPositionLabel = (value: string): string => {
  const found = positionOptions.find((opt) => opt.value === value);
  return found ? found.label : value;
};
