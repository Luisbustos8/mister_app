/** @format */

import { Link } from "react-router-dom";

export type Rival = {
  id: string;
  name: string;
  logo_url?: string | null;
  name_address?: string | null;
  address?: string | null;
};

export function RivalCard({
  id,
  name,
  logo_url,
  name_address,
  address,
}: Rival) {
  console.log(id);
  return (
    <Link to={`/dashboard/rivals/${id}`}>
      <div
        key={id}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div className="flex justify-center pt-6">
          {logo_url ? (
            <img
              src={logo_url}
              alt={`${name} logo`}
              className="w-20 h-20 object-contain rounded-full border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
              <span className="text-gray-500 text-sm">Sin logo</span>
            </div>
          )}
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-black mb-2 truncate">
              {name}
            </h3>
            {name_address && address && (
              <p className="text-sm text-gray-600 mb-2">
                Estadio:{" "}
                <a
                  href={address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {name_address}
                </a>
              </p>
            )}

            {address && !name_address && (
              <p className="text-sm text-gray-600">
                Dirección:{" "}
                <a
                  href={address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Ver en mapa
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
