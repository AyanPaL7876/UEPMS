"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Signup from "@/components/Signup";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";

const CreateCOEpage = () => {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role) {
        setRole(decodedToken.role);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  const handleCreateCOE = async (formData) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "COE",
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Error during teacher creation");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("An unexpected error occurred:", error);
    }
  };

  if (role !== "COE") {
    return <h1 className="text-white font-bold">Only Admin can create COE.</h1>;
  }

  const inputFields = [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];

  return (
      <Signup
        userType="Teacher"
        inputFields={inputFields}
        onSubmit={handleCreateCOE}
        error={error}
      />
  );
};


export default CreateCOEpage;
