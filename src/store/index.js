import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project.slice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});
