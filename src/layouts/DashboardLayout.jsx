import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex w-full h-full min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <TopBar title="Projects" />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
