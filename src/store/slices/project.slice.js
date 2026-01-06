import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  // fetchProjects,
  createProject,
} from "../../services/project.service";
import { apiClient } from "../../services/apiClient";

const initialState = {
  items: [], // list of projects
  loading: false, // async status
  error: null, // error handling
};

export const loadProjects = createAsyncThunk(
  "projects/load",
  async ({ token, user }, { rejectWithValue }) => {
    try {
      return await apiClient("/projects", {
        token,
        user,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNewProject = createAsyncThunk(
  "projects/create",
  async ({ data, token }, { rejectWithValue }) => {
    console.log("Creating project with data:", data, "and token:", token);
    try {
      return await createProject(data, token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProjectMembers = createAsyncThunk(
  "projects/updateMembers",
  async ({ projectId, members, token, user }, { rejectWithValue }) => {
    try {
      return await apiClient(`/projects/${projectId}/members`, {
        method: "PATCH",
        body: { members },
        token,
        user,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProjectMembers.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
