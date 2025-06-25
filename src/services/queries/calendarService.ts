/** @format */

import { supabase } from "../../lib/createClient";
import type { Jornada } from "../../types/calendar";

export async function fetchRivals(teamId: string) {
  const { data, error } = await supabase
    .from("rivals")
    .select("name")
    .eq("team_id", teamId);
  if (error) throw error;
  return data || [];
}

export async function fetchCalendar(teamId: string) {
  const { data, error } = await supabase
    .from("matchdays")
    .select(
      `
      id,
      matchday_number,
      match_date,
      matches:matches(
        id,
        home_team,
        away_team,
        home_goals,
        away_goals
      )
    `
    )
    .eq("team_id", teamId)
    .order("matchday_number", { ascending: true });

  if (error) throw error;
  return data;
}

export async function saveCalendar(teamId: string, jornadas: Jornada[]) {
  const { data: existing } = await supabase
    .from("matchdays")
    .select("id")
    .eq("team_id", teamId);

  if (existing?.length) {
    const matchdayIds = existing.map((m) => m.id);
    await supabase.from("matches").delete().in("matchday_id", matchdayIds);
    await supabase.from("matchdays").delete().eq("team_id", teamId);
  }

  for (const jornada of jornadas) {
    const { data: inserted, error } = await supabase
      .from("matchdays")
      .insert([
        {
          team_id: teamId,
          matchday_number: jornada.matchday_number,
          match_date: jornada.match_date,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    const matches = jornada.matches.map((m) => ({
      matchday_id: inserted.id,
      home_team: m.home_team,
      away_team: m.away_team,
      home_goals: 0,
      away_goals: 0,
    }));

    const { error: matchesError } = await supabase
      .from("matches")
      .insert(matches);

    if (matchesError) throw matchesError;
  }
}
