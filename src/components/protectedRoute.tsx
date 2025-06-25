/** @format */

import { Navigate } from "react-router-dom";

import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
