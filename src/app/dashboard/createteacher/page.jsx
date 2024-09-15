"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Signup from "@/components/Signup";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";

const CreateTeacherPage = () => {
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role && decodedToken.dept) {
        setRole(decodedToken.role);
        setDept(decodedToken.dept);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  const handleCreateTeacher = async (formData) => {
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
          role: "Teacher",
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

  if (role !== "HOD") {
    return <h1 className="text-white font-bold">Only HODs can create teachers.</h1>;
  }

  const inputFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
    { name: "dept", label: "Department", type: "text", value: dept, disabled: true }, // Pre-filled dept
  ];

  return (
      <Signup
        userType="Teacher"
        inputFields={inputFields}
        onSubmit={handleCreateTeacher}
        error={error}
      />
  );
};

export default CreateTeacherPage;
