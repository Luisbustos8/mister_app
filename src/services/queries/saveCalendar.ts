/** @format */
import { supabase } from "../../lib/createClient";
import type { Jornada } from "../../types/calendar";

export async function saveCalendar(matchdays: Jornada[]) {
  for (const matchday of matchdays) {
    if (!matchday.match_date || matchday.matches.length === 0) {
      console.warn(
        `⏭️ Jornada ${matchday.matchday_number} ignorada (sin fecha o sin partidos).`
      );
      continue;
    }

    // 1. Insertar jornada
    const { data: insertedMatchday, error: insertMatchdayError } =
      await supabase
        .from("matchdays")
        .insert({
          matchday_number: matchday.matchday_number,
          match_date: matchday.match_date,
        })
        .select()
        .single();

    if (insertMatchdayError || !insertedMatchday) {
      throw new Error(
        `❌ Error al insertar jornada ${matchday.matchday_number}: ${insertMatchdayError?.message}`
      );
    }

    const matchdayId = insertedMatchday.id;

    // 2. Preparar partidos
    const matchesToInsert = matchday.matches
      .filter((m) => m.home_team && m.away_team)
      .map((m) => ({
        matchday_id: matchdayId,
        home_team: m.home_team,
        away_team: m.away_team,
        home_goals: m.home_goals ?? null,
        away_goals: m.away_goals ?? null,
      }));

    if (matchesToInsert.length === 0) {
      console.warn(
        `⚠️ No hay partidos válidos en jornada ${matchday.matchday_number}`
      );
      continue;
    }

    // 3. Insertar partidos
    const { error: insertMatchesError } = await supabase
      .from("matches")
      .insert(matchesToInsert);

    if (insertMatchesError) {
      throw new Error(
        `❌ Error al insertar partidos de jornada ${matchday.matchday_number}: ${insertMatchesError.message}`
      );
    }

    console.log(
      `✅ Partidos insertados para jornada ${matchday.matchday_number}`
    );
  }

  console.log("✅ Calendario completo guardado correctamente.");
}
