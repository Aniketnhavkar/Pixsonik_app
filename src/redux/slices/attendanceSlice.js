import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { clockInApi, clockOutApi } from "../../api/apiEndpoints";

export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.post("clock-in");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Clock In failed");
    }
  }
);

export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.post("clock-out");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Clock Out failed");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    isCheckedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: state => { state.error = null; },
  },
  extraReducers: builder => {
    builder
      .addCase(clockIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clockIn.fulfilled, (state) => {
        state.loading = false;
        state.isCheckedIn = true;
      })
      .addCase(clockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clockOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clockOut.fulfilled, (state) => {
        state.loading = false;
        state.isCheckedIn = false;
      })
      .addCase(clockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetError } = attendanceSlice.actions;

export default attendanceSlice.reducer;
