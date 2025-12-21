import { http, HttpResponse } from "msw";

let projects = [];
let users = [];
let pages = [];

const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@test.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "3",
    name: "Normal User",
    email: "user@test.com",
    password: "user123",
    role: "user",
  },
];

export const handlers = [
  // POST /login
  http.post("/login", async ({ request }) => {
    const { email, password } = await request.json();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        token: "fake-jwt-token",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  }),

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

  // GET /projects/:projectId/pages
  http.get("/projects/:projectId/pages", ({ params }) => {
    const { projectId } = params;
    const projectPages = pages.filter((p) => p.projectId === projectId);

    return HttpResponse.json(projectPages, { status: 200 });
  }),

  // POST /projects/:projectId/pages
  http.post("/projects/:projectId/pages", async ({ request, params }) => {
    const { projectId } = params;
    const body = await request.json();

    const newPage = {
      id: Date.now().toString(),
      projectId,
      title: body.title,
      thumbnailImage: body.thumbnailImage || null,
    };

    pages.push(newPage);

    return HttpResponse.json(newPage, { status: 201 });
  }),
];
