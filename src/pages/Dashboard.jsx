import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProjects, addNewProject } from "../store/slices/project.slice";
import { useAuth } from "../auth/useAuth";

function Dashboard({ logout }) {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  console.log(token, ":Token in dashboard");

  const { items, loading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(loadProjects({ token }));
  }, [dispatch, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
        onClick={() =>
          dispatch(
            addNewProject({
              data: {
                id: Date.now(),
                name: "Test Project",
                status: "active",
              },
              token,
            })
          )
        }
      >
        Add Project
      </button>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>

      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
export default Dashboard;
