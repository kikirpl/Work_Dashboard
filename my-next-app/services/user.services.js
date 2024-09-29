"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = async (data) => {
  try {
    const response = await axios.post(`/api/login`, data);
    return { success: true, token: response.data.token };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error };
  }
};

export const getUsername = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    throw error;
  }
};
