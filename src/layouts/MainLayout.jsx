import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { canAccess } from "../utils/permissions";

export function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <nav className="space-y-2">
        {canAccess(user.role, "DASHBOARD") && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}

        {canAccess(user.role, "ADD_PROJECT") && (
          <NavLink to="/add-project">Add Project</NavLink>
        )}

        {canAccess(user.role, "ADD_USER") && (
          <NavLink to="/add-user">Add User</NavLink>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
