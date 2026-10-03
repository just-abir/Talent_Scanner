import type { loginForm } from "../Pages/Login";
import type { registerForm } from "../Pages/Register";
import api from "./axios";

export const registerUser = async (data: registerForm) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

export const loginUser = async (data: loginForm) => {
  const response = await api.post("/user/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get("/user/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/user/getMe");
  return response.data;
};
