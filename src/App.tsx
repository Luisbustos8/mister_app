/** @format */

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { Homepage } from "./pages/Home/homePage";

import { useAuth } from "./context/AuthContext";
import CalendarioPage from "./pages/Calendar/CalendarPage";
import LoadCalendar from "./pages/Calendar/LoadCalendar";
import LoginPage from "./pages/Login";
import { RivalForm } from "./pages/Rivals/AddRivalForm";
import { RivalDetail } from "./pages/Rivals/RivalDetail";
import { RivalPage } from "./pages/Rivals/RivalPage";
import AddPlayer from "./pages/Team/AddPlayer";
import { TeamPage } from "./pages/Team/TeamPage";
import { PrivateRoute } from "./routes/PrivateRoute";

export default function App() {
  const { user } = useAuth();
  return (
    <main className="min-h-screen bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Homepage />} />
          <Route path="plantilla" element={<TeamPage />} />
          <Route path="plantilla/add-player" element={<AddPlayer />} />
          <Route path="rivales/add-rivals" element={<RivalForm />} />
          <Route path="rivales" element={<RivalPage />} />
          <Route path="/dashboard/rivals/:id" element={<RivalDetail />} />
          <Route path="/dashboard/calendario" element={<CalendarioPage />} />
          <Route
            path="/dashboard/calendario/add-calendar"
            element={<LoadCalendar />}
          />
        </Route>
      </Routes>
    </main>
  );
}
