import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validators";
import { apiClient } from "../services/apiClient";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await apiClient("/login", {
        method: "POST",
        body: data,
      });

      login(response.token, response.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 space-y-4 border p-6"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          className="border p-2 w-full"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white w-full py-2"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
