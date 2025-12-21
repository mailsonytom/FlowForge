import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r bg-white flex flex-col ">
      {/* Brand */}
      <div className="h-14 flex items-center justify-center border-b">
        <span className="font-bold italic text-lg">FlowForge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-rose-200" : "bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/add-project"
          className="block px-3 py-2 rounded bg-gray-100"
        >
          Add Project
        </NavLink>

        <NavLink to="/add-user" className="block px-3 py-2 rounded bg-gray-100">
          Add User
        </NavLink>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
          <span className="w-3 h-3 rounded-full bg-red-600" />
          <span className="text-sm">Profile</span>
        </div>
      </div>
    </aside>
  );
}
