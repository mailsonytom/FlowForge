import { apiClient } from "./apiClient";

export function fetchProjects(token) {
  return apiClient("/projects", { token });
}

export function createProject(data, token) {
  return apiClient("/projects", {
    method: "POST",
    body: data,
    token,
  });
}
