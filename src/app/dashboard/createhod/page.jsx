"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Signup from "@/components/Signup";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";

const CreateHODPage = () => {
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

  const handleCreateHOD = async (formData) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify({
          name: formData.name,
          dept: formData.dept,
          email: formData.email,
          password: formData.password,
          role: "HOD",
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
    return <h1 className="text-white font-bold">Only COEs can create HOD.</h1>;
  }

  const inputFields = [
    { name: "name", type: "text", label: "Name" },
    { name: "dept", type: "text", label: "Department" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];

  return (
      <Signup
        userType="Teacher"
        inputFields={inputFields}
        onSubmit={handleCreateHOD}
        error={error}
      />
  );
};


export default CreateHODPage;