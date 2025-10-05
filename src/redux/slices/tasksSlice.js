// src/redux/slices/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { getProjectTasksApi } from "../../api/apiEndpoints";

export const fetchProjectTasks = createAsyncThunk(
  "tasks/fetchProjectTasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(getProjectTasksApi(projectId));
      console.log(`Tasks for project ${projectId}:`, response.data);
      return { projectId, tasks: response.data.tasks || [] };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { byProject: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.byProject[action.payload.projectId] = action.payload.tasks;
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
