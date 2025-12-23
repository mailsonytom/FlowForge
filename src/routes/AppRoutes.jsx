import { Routes, Route } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { USER_ROLES } from "../auth/auth.types";
import { ROLE_ACCESS } from "./roleGuards";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AddProject from "../pages/AddProject.jsx";
import AddUser from "../pages/AddUser.jsx";
import Project from "../pages/Project.jsx";
import Workflow from "../pages/Workflow.jsx";

export function AppRoutes() {
  const { login, logout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login login={login} />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={ROLE_ACCESS.DASHBOARD}>
            <DashboardLayout />
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
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute allowedRoles={ROLE_ACCESS.DASHBOARD}>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pages/:pageId/workflow"
          element={
            <ProtectedRoute allowedRoles={ROLE_ACCESS.WORKFLOW_EDIT}>
              <Workflow />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
