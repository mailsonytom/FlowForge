import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadProjects,
  // addNewProject
} from "../store/slices/project.slice";
import { useAuth } from "../auth/useAuth";
import ProjectCard from "../components/ProjectCard";
// import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  // const navigate = useNavigate();

  const { items, loading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(loadProjects({ token }));
  }, [dispatch, token]);

  if (loading) return <p>Loading projects...</p>;
  if (error) {
    console.log(error, "error");

    return <p className="text-red-600">Failed to load projects</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-gray-500">
        No projects yet. Create your first project.
      </div>
    );
  }

  // const handleLogout = () => {
  //   logout();
  //   navigate("/", { replace: true });
  // };

  return (
    // <button
    //     className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
    //     onClick={() =>
    //       dispatch(
    //         addNewProject({
    //           data: {
    //             id: Date.now(),
    //             name: "Test Project",
    //             status: "active",
    //           },
    //           token,
    //         })
    //       )
    //     }
    //   >
    //     Add Project
    //   </button>
    <div className="grid grid-cols-3 gap-6">
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
export default Dashboard;
