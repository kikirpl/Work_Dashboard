"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUsername } from "../services/user.services";
import axios from "axios";

export const useLogin = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState({
    loginSuccess: false,
    loginFailed: false,
    loading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      try {
        const username = getUsername(token);
        console.log(`Logged in as: ${username}`);
        setLoginState((prev) => ({ ...prev, loginFailed: false }));
        // Hapus redirection ke /dashboard di sini
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setLoginState((prev) => ({ ...prev, loginFailed: true }));
        router.push("/login");
      }
    }
  }, [router]);

  const login = useCallback(
    async (username, password) => {
      setLoginState((prev) => ({ ...prev, loading: true }));
      try {
        console.log("Attempting to login with:", username);
        const response = await axios.post("/api/login", { username, password });
        console.log("Login response:", response.data);
        localStorage.setItem("token", response.data.token);
        setLoginState({
          loginSuccess: true,
          loginFailed: false,
          loading: false,
        });
        // Hapus redirection ke /dashboard di sini
      } catch (error) {
        console.error("Login failed:", error);
        setLoginState({
          loginSuccess: false,
          loginFailed: true,
          loading: false,
        });
      }
    },
    [router]
  );

  return {
    login,
    ...loginState,
  };
};
