/** @format */

export function generarJornadas(teams: string[]) {
  const equipos = [...teams];
  if (equipos.length % 2 !== 0) equipos.push("BYE");

  const totalJornadas = (equipos.length - 1) * 2;
  const half = equipos.length / 2;
  const jornadasIda: { home_team: string; away_team: string }[][] = [];

  let home = equipos.slice(0, half);
  let away = equipos.slice(half).reverse();

  for (let i = 0; i < equipos.length - 1; i++) {
    const jornada = [];
    for (let j = 0; j < half; j++) {
      if (home[j] !== "BYE" && away[j] !== "BYE") {
        jornada.push({ home_team: home[j], away_team: away[j] });
      }
    }
    jornadasIda.push(jornada);

    // Algoritmo rotativo
    const fixed = home[0];
    home = [fixed, away[0], ...home.slice(1, -1)];
    away = [...away.slice(1), home.pop()];
  }

  // Generamos jornada de vuelta invirtiendo local/visitante
  const jornadasVuelta = jornadasIda.map((jornada) =>
    jornada.map(({ home_team, away_team }) => ({
      home_team: away_team,
      away_team: home_team,
    }))
  );

  return [...jornadasIda, ...jornadasVuelta];
}
