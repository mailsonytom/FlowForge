import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    users: userReducer,
  },
});
