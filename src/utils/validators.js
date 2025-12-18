import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup
    .string()
    .required("Project name is required")
    .min(3, "Project name must be at least 3 characters"),

  description: yup.string().required("Description is required"),
});
