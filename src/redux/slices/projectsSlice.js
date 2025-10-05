// src/redux/slices/projectsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { getEmployeeProjectsApi } from "../../api/apiEndpoints";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(getEmployeeProjectsApi(userId));
      console.log("Projects API response:", response.data);
      return response.data.projects || []; // adapt if API returns another key
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
