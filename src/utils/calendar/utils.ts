/** @format */

import type { Jornada } from "../../types/calendar";

export const generateInvertedJornadas = (
  jornadas: Jornada[],
  totalJornadas: number
): Jornada[] => {
  const halfway = Math.floor(totalJornadas / 2); // Ej: 7 para 14 jornadas
  const invertedJornadas: Jornada[] = [];

  // Solo procesamos las primeras 'halfway' jornadas
  for (let i = 0; i < halfway && i < jornadas.length; i++) {
    const jornada = jornadas[i];
    const invertedMatchdayNumber = halfway + i + 1; // Ej: jornada 1 -> jornada 8

    invertedJornadas.push({
      matchday_number: invertedMatchdayNumber,
      date: jornada.date, // Mantenemos la misma fecha, el usuario la cambiará
      matches: jornada.matches.map((match) => ({
        home_team: match.away_team, // Invertimos equipos
        away_team: match.home_team,
      })),
      isEditable: true, // Permitimos editar la fecha
    });
  }

  return invertedJornadas;
};
