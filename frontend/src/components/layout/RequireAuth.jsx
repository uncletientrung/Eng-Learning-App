import { useEffect, useSyncExternalStore } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthenticatedToken, getTokenExpiresAt, logout, subscribeAuth } from "../../services/authApi";

// k quyền -> trang login
export default function RequireAuth() {
  const token = useSyncExternalStore(subscribeAuth, getAuthenticatedToken, () => null);
  const location = useLocation();
  const expiresAt = getTokenExpiresAt(token);
  const authenticated = Boolean(token);

  useEffect(() => {
    if (!authenticated) return;
    const timer = window.setTimeout(logout, Math.min(expiresAt - Date.now(), 2_147_483_647));
    return () => window.clearTimeout(timer);
  }, [authenticated, expiresAt]);

  return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
}
