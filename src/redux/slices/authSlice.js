import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiClient.post("login", { email, password });
      return response.data; // Expect { token, user: { id, name, ... } }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Login failed");
    }
  }
);

// Logout Thunk
export const logoutApiCall = createAsyncThunk(
  "auth/logoutApiCall",
  async (_, thunkAPI) => {
    try {
      await apiClient.post("logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    logoutLoading: false,
    logoutError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.logoutLoading = false;
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token || null;
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutApiCall.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutApiCall.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutApiCall.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
