import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";

export const loadUsers = createAsyncThunk(
  "users/load",
  async (_, { rejectWithValue }) => {
    try {
      return await apiClient("/users");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      return await apiClient("/users", {
        method: "POST",
        body: data,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log("Loaded users:", action.payload);
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default userSlice.reducer;
