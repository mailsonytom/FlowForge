import { http, HttpResponse } from "msw";

let projects = [];
let users = [];

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

  // GET /users
  http.get("/users", () => {
    return HttpResponse.json(users, { status: 200 });
  }),

  // POST /users
  http.post("/users", async ({ request }) => {
    const body = await request.json();

    const newUser = {
      id: Date.now(),
      ...body,
    };

    users.push(newUser);

    return HttpResponse.json(newUser, { status: 201 });
  }),
];
