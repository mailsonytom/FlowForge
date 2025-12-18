import { Outlet, NavLink } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-2 py-1 rounded ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/add-project"
          className={({ isActive }) =>
            `block px-2 py-1 rounded ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Add Project
        </NavLink>
        <NavLink
          to="/add-user"
          className={({ isActive }) =>
            `block px-2 py-1 rounded ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Add User
        </NavLink>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
