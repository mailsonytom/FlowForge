import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-gray-200 p-4 rounded cursor-pointer hover:shadow transition text-left"
    >
      <h3 className="font-semibold text-lg mb-2">{project.name}</h3>

      {/* Placeholder description (until later) */}
      <p className="text-sm text-gray-700 mb-4">
        This is a description for the project
      </p>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>{new Date().toLocaleDateString()}</span>
        <span className="text-lg">→</span>
      </div>
    </div>
  );
}
