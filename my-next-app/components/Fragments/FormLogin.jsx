"use client";

import InputForm from "../../Input/Input.jsx";
import Button from "../Elements/button";
import { useEffect, useRef, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const router = useRouter();
  const { login, loginSuccess, loginFailed, loading } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      router.push("/dashboard");
    }
  }, [loginSuccess, router]);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        type="text"
        placeholder="John Doe"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        ref={usernameRef}
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="*****"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="bg-blue-600 w-full" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {loginFailed && (
        <p className="text-red-500 text-center mt-5">
          Login failed. Please try again.
        </p>
      )}

      {loginSuccess && (
        <p className="text-green-500 text-center mt-5">Login successful!</p>
      )}
    </form>
  );
};

export default FormLogin;
