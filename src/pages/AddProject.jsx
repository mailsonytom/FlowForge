import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectSchema } from "../utils/validators";
import { useAppDispatch } from "../store/hooks";
import { addNewProject } from "../store/slices/project.slice";
import { useAuth } from "../auth/useAuth";

export default function AddProject() {
  const dispatch = useAppDispatch();
  const { token } = useAuth();

  console.log(token, ":Token is here");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(addNewProject({ data, token }));
    reset();
  };

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold mb-4">Add Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="border p-2 w-full"
            placeholder="Project name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
