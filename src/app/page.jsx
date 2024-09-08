"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/loggin";
import { Spinner } from "@/components/Spinner";

const Page = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginIn = async ({ email, password, role }) => {
    setIsLoading(true);
    setError(""); // Clear any previous errors
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-500 to-indigo-500">
      <main className="bg_blur px-10 py-7 border-2 bg-[#4848483e] rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-white">Log In</h1>
        <LoginForm onSubmit={handleLoginIn} error={error} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Page;