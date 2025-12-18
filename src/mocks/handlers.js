import { http, HttpResponse } from "msw";

let projects = [];

export const handlers = [
  // GET /projects
  http.get("/projects", () => {
    return HttpResponse.json(projects, {
      status: 200,
    });
  }),

  // POST /projects
  http.post("/projects", async ({ request }) => {
    const body = await request.json();

    const newProject = {
      id: Date.now(),
      ...body,
    };

    projects.push(newProject);

    return HttpResponse.json(newProject, {
      status: 201,
    });
  }),
];
