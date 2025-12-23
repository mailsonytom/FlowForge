import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";

export const loadWorkflow = createAsyncThunk(
  "workflow/load",
  async ({ pageId }, { rejectWithValue }) => {
    try {
      return await apiClient(`/pages/${pageId}/workflow`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveWorkflow = createAsyncThunk(
  "workflow/save",
  async ({ pageId, data }, { rejectWithValue }) => {
    try {
      return await apiClient(`/pages/${pageId}/workflow`, {
        method: "POST",
        body: data,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const approveWorkflow = createAsyncThunk(
  "workflow/approve",
  async ({ pageId }, { rejectWithValue }) => {
    try {
      return await apiClient(`/pages/${pageId}/workflow/approve`, {
        method: "POST",
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const rejectWorkflow = createAsyncThunk(
  "workflow/reject",
  async ({ pageId }, { rejectWithValue }) => {
    try {
      return await apiClient(`/pages/${pageId}/workflow/reject`, {
        method: "POST",
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const workflowSlice = createSlice({
  name: "workflow",
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWorkflow(state) {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWorkflow.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadWorkflow.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(loadWorkflow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveWorkflow.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(approveWorkflow.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(rejectWorkflow.fulfilled, (state, action) => {
        state.item = action.payload;
      });
  },
});

export const { clearWorkflow } = workflowSlice.actions;
export default workflowSlice.reducer;
