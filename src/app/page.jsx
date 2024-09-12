"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/loggin";

const Page = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginIn = async ({ email, password, role }) => {
    setIsLoading(true);
    setError("");
    try {
      const userType = role.toLowerCase();
      const res = await fetch(`/api/${userType}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        const data = await res.json();
        // Redirect to the appropriate dashboard based on role
        router.push("/dashboard"); // Change '/dashboard' to your desired route
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[95vh] py-2 body_bg">
      <main className="px-10 py-7 flex flex-col items-center justify-around w-1.5/4">
        <div className="text-white mb-12">
          <h1 className="text-4xl font-bold mb-1  text-center">Welcome Back</h1>
          <p className="text-lg font-light text-center">
            Enter your credentials to access your account.
          </p>
        </div>
        <LoginForm onSubmit={handleLoginIn} error={error} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Page;