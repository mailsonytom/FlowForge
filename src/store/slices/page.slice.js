import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";

export const loadPages = createAsyncThunk(
  "pages/load",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      return await apiClient(`/projects/${projectId}/pages`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addPage = createAsyncThunk(
  "pages/create",
  async ({ projectId, data }, { rejectWithValue }) => {
    try {
      return await apiClient(`/projects/${projectId}/pages`, {
        method: "POST",
        body: data,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPages(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPage.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clearPages } = pageSlice.actions;
export default pageSlice.reducer;
