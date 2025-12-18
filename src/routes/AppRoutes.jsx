import { Routes, Route } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { USER_ROLES } from "../auth/auth.types";
import { ROLE_ACCESS } from "./roleGuards";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AddProject from "../pages/AddProject.jsx";
import AddUser from "../pages/AddUser.jsx";

export function AppRoutes() {
  const { login, logout } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Login Page</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() =>
                login("fake-jwt-token", {
                  id: "1",
                  name: "Admin User",
                  role: USER_ROLES.ADMIN,
                })
              }
            >
              Login
            </button>
          </div>
        }
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={ROLE_ACCESS.DASHBOARD}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={ROLE_ACCESS.DASHBOARD}>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-project"
          element={
            <ProtectedRoute allowedRoles={ROLE_ACCESS.ADD_PROJECT}>
              <AddProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute allowedRoles={ROLE_ACCESS.ADD_USER}>
              <AddUser />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
