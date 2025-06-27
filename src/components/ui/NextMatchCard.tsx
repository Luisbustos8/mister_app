/** @format */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCalendar } from "../../hooks/useCalendar";
import { useRivals } from "../../services/queries/getRivals";

type Props = {
  teamId: string;
  teamName: string;
  logo: string;
};

export default function NextMatchCard({ teamId, teamName, logo }: Props) {
  const { jornadas, loading } = useCalendar(teamId);
  const { rivals } = useRivals(teamId);

  //     if (!jornadas.length) return null;

  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const sortedJornadas = [...jornadas].sort(
  //       (a, b) =>
  //         new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
  //     );

  //     const nextMatchday = sortedJornadas.find((j) => {
  //       const matchDate = new Date(j.match_date);
  //       matchDate.setHours(0, 0, 0, 0);
  //       return matchDate >= today;
  //     });

  //     if (!nextMatchday) return null;

  //     const match = nextMatchday.matches.find(
  //       (m) => m.home_team === teamName || m.away_team === teamName
  //     );

  //     return match
  //       ? {
  //           ...match,
  //           match_date: nextMatchday.match_date,
  //         }
  //       : null;
  //   }, [jornadas, teamName]);
  const nextMatch = useMemo(() => {
    if (!jornadas.length) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedJornadas = [...jornadas].sort(
      (a, b) =>
        new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
    );

    const nextMatchday = sortedJornadas.find((j) => {
      const matchDate = new Date(j.match_date);
      matchDate.setHours(0, 0, 0, 0);
      return matchDate >= today;
    });

    if (!nextMatchday) return null;

    const match = nextMatchday.matches.find(
      (m) => m.home_team === teamName || m.away_team === teamName
    );

    if (!match) return null;

    const rivalTeamName =
      match.home_team === teamName ? match.away_team : match.home_team;

    const rival = rivals.find((r) => r.name === rivalTeamName);

    return {
      ...rival,
      ...match,
      match_date: nextMatchday.match_date,
      rivalName: rivalTeamName,
    };
  }, [jornadas, teamName, rivals]);

  if (loading)
    return <div className="text-white">Cargando próximo partido...</div>;
  if (!nextMatch) return <div className="text-white">No hay más partidos</div>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-4 text-black">
      <h3 className="text-lg font-semibold mb-2">Próximo Partido</h3>
      <div className="flex w-full items-center">
        <div className="flex w-[50%] justify-start items-center  gap-2">
          <img
            src={nextMatch.home_team === teamName ? logo : nextMatch.logo_url}
            alt={"escudo equipo"}
            className="size-10"
          />
          <p className="text-2xl font-bold">{nextMatch.home_team}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>VS</p>
          <p className="text-sm text-gray-500">
            {new Date(nextMatch.match_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex w-[50%] justify-end items-center  gap-2">
          <p className="text-2xl font-bold">{nextMatch.away_team}</p>
          <img
            src={nextMatch.away_team === teamName ? logo : nextMatch.logo_url}
            alt={"escudo equipo"}
            className="size-10"
          />
        </div>
      </div>

      <Link
        className="border-2 p-4 flex w-[200px] mt-4 items-center justify-center gap-2 text-black rounded-xl hover:bg-black hover:text-white hover:border-white"
        to={`/dashboard/convocatoria/${nextMatch.id}`}
        state={{
          match: nextMatch,
          teamId: teamId,
        }}
      >
        {" "}
        Hacer convocatoria
      </Link>
    </div>
  );
}
