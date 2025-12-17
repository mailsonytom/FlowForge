import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { USER_ROLES } from "../auth/auth.types";

export function AppRoutes() {
  const { login, logout, isAuthenticated } = useAuth();

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
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div>
              <h1>Dashboard</h1>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
