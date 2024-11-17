"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/authContext';
import LoginForm from './LoginForm';
import Header from './Header';

const LoginPage = () => {
  const { setIsLoading, setError, previousPage } = useAuth();
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/profile");
      } else {
        const errorData = await res.json();
        console.log("Login failed. Please try again."+errorData);
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (e) {
      console.error("An unexpected error occurred:", e);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("Previous page:", previousPage);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;