import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  // Save token & user
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};