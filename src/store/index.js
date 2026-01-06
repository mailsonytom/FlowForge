import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project.slice";
import userReducer from "./slices/user.slice";
import pageReducer from "./slices/page.slice";
import workflowReducer from "./slices/workflow.slice";
import workflowVersionReducer from "./slices/workflowVersion.slice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    users: userReducer,
    pages: pageReducer,
    workflow: workflowReducer,
    workflowVersions: workflowVersionReducer,
  },
});
