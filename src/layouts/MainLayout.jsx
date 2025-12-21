import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { canAccess } from "../utils/permissions";

export function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="h-screen w-screen flex bg-gray-50">
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
      <main>
        <Outlet />
      </main>
    </div>
  );
}
