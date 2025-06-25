/** @format */

// src/pages/Dashboard.tsx

import { Calendar, Power, ShieldHalf } from "lucide-react";
import { AiOutlineTeam } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const session = user;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Infantil A</h2>
            <p className="text-sm text-gray-400 break-words">
              {session?.email}
            </p>
          </div>

          <nav className="space-y-4">
            <a
              href="/dashboard/home"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <MdSpaceDashboard size={18} />
              Inicio
            </a>
            <a
              href="/dashboard/plantilla"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <AiOutlineTeam size={18} />
              Plantilla
            </a>
            <a
              href="/dashboard/rivales"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <ShieldHalf size={18} />
              Rivales
            </a>
            <a
              href="/dashboard/calendario"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <Calendar size={18} />
              Calendario
            </a>
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded w-full text-left mt-8"
        >
          <Power size={18} />
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 p-8 bg-gray-300">
        <Outlet />
      </main>
    </div>
  );
}
