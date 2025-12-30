import { http, HttpResponse } from "msw";

let projects = [];
let users = [];
let pages = [];
let workflows = [];

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

    mockUsers.push(newUser);

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

  // GET /pages/:pageId/workflow
  http.get("/pages/:pageId/workflow", ({ params }) => {
    const workflow = workflows.find((w) => w.pageId === params.pageId);

    return HttpResponse.json(workflow || null, { status: 200 });
  }),

  // POST /pages/:pageId/workflow
  http.post("/pages/:pageId/workflow", async ({ request, params }) => {
    const body = await request.json();

    const newWorkflow = {
      id: Date.now().toString(),
      pageId: params.pageId,
      description: body.description,
      status: "pending_approval",
      currentVersion: 0,
      updatedBy: body.updatedBy,
      updatedAt: new Date().toISOString(),
    };

    workflows = workflows.filter((w) => w.pageId !== params.pageId);
    workflows.push(newWorkflow);

    return HttpResponse.json(newWorkflow, { status: 201 });
  }),

  // POST /pages/:pageId/workflow/approve
  http.post("/pages/:pageId/workflow/approve", ({ params }) => {
    const workflow = workflows.find((w) => w.pageId === params.pageId);

    if (!workflow) {
      return HttpResponse.json(
        { message: "Workflow not found" },
        { status: 404 }
      );
    }

    workflow.status = "approved";
    workflow.currentVersion += 1;
    workflow.approvedBy = "Manager";
    workflow.approvedAt = new Date().toISOString();

    return HttpResponse.json(workflow, { status: 200 });
  }),

  // POST /pages/:pageId/workflow/reject
  http.post("/pages/:pageId/workflow/reject", ({ params }) => {
    const workflow = workflows.find((w) => w.pageId === params.pageId);

    if (!workflow) {
      return HttpResponse.json(
        { message: "Workflow not found" },
        { status: 404 }
      );
    }

    workflow.status = "rejected";

    return HttpResponse.json(workflow, { status: 200 });
  }),
];
