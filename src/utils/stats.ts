/** @format */

export function formatStatLabel(
  stat: "goals" | "assists" | "matches_played",
  value: number
) {
  const labels = {
    goals: ["gol", "goles"],
    assists: ["asistencia", "asistencias"],
    matches_played: ["partido", "partidos"],
  };

  const [singular, plural] = labels[stat];
  return value === 1 ? singular : plural;
}
