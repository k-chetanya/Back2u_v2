import api from "./axios";

export const registerUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);
export const logoutUser = () => api.get("/user/logout");
