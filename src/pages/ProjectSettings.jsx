import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateProjectMembers } from "../store/slices/project.slice";
import { useAuth } from "../auth/useAuth";

export default function ProjectSettings() {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { token, user } = useAuth();

  const project = useAppSelector((state) =>
    state.projects.items.find((p) => p.id === projectId)
  );

  const users = useAppSelector((state) => state.users.items);
  console.log("users", users);

  if (!project) return null;

  const toggleUser = (userId) => {
    const updatedMembers = project.members.includes(userId)
      ? project.members.filter((id) => id !== userId)
      : [...project.members, userId];

    dispatch(
      updateProjectMembers({
        projectId,
        members: updatedMembers,
        token,
        user,
      })
    );
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Project Members</h2>

      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{u.name}</span>
            <input
              type="checkbox"
              checked={project.members.includes(u.id)}
              onChange={() => toggleUser(u.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
