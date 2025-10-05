// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import attendanceReducer from "./slices/attendanceSlice";
import employeeReducer from "./slices/employeeSlice";
import profileReducer from "./slices/profileSlice";
import projectsReducer from "./slices/projectsSlice";
import tasksReducer from "./slices/tasksSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    employee: employeeReducer,
    profile: profileReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export default store;
