// src/api/apiEndpoints.js
const baseUrl = "https://management.pixsonik.com/api/";

export const loginApi = () => baseUrl + "login";
export const logoutApi = () => baseUrl + "logout";
export const clockInApi = () => baseUrl + "clock-in";
export const clockOutApi = () => baseUrl + "clock-out";

export const getEmployeeDetailsApi = (userId) =>
  `${baseUrl}employee/details/${userId}`;

export const getEmployeeProjectsApi = (userId) =>
  `${baseUrl}employee/projects?user_id=${userId}`;

export const getProjectTasksApi = (projectId) =>
  `${baseUrl}tasks/project/${projectId}`;
