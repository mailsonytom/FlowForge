import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";

export const loadWorkflowVersions = createAsyncThunk(
  "workflowVersions/load",
  async ({ pageId }, { rejectWithValue }) => {
    try {
      return await apiClient(`/pages/${pageId}/workflow/versions`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const workflowVersionSlice = createSlice({
  name: "workflowVersions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWorkflowVersions(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWorkflowVersions.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadWorkflowVersions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadWorkflowVersions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWorkflowVersions } = workflowVersionSlice.actions;
export default workflowVersionSlice.reducer;
