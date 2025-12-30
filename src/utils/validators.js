import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup.string().required("Password is required"),
});

export const projectSchema = yup.object({
  name: yup
    .string()
    .required("Project name is required")
    .min(3, "Project name must be at least 3 characters"),

  description: yup.string().required("Description is required"),
});

export const userSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: yup
    .string()
    .oneOf(["admin", "manager", "user"])
    .required("Role is required"),
});
