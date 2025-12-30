import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/validators";
import { useAppDispatch } from "../store/hooks";
import { addUser } from "../store/slices/user.slice";

export default function AddUser() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(addUser(data));
    reset();
  };

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold mb-4">Add User</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          className="border p-2 w-full"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <select className="border p-2 w-full" {...register("role")}>
          <option value="">Select role</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
