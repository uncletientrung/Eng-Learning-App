import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/authApi";

export default function RequireAdmin() {
  const user = getCurrentUser();
  return user?.role?.toUpperCase() === "ADMIN"
    ? <Outlet />
    : <Navigate to="/" replace />;
}
