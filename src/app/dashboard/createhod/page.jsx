"use client";

import React, { useEffect, useState } from 'react';
import { getTokenFromCookies, decodeToken } from '@/utils/auth';
import Signup from '@/components/Signup';
import { useRouter } from 'next/navigation';

function Page() {
  const [role, setRole] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const inputFields = [
    { name: "name", type: "text", label: "Name" },
    { name: "dept", type: "text", label: "Department" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];

  const handleSignup = async (formData) => {
    try {
      const res = await fetch(`/api/hod/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getTokenFromCookies()}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("HOD created successfully");
        router.push("/dashboard"); 
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        console.error("Error during HOD creation:", errorData.error);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("An unexpected error occurred:", error);
    }
  };

  useEffect(() => {
    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.role) {
        setRole(decodedToken.role);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className='text-white font-bold'>
      <div className='flex flex-col justify-start items-center text-white'>
        <div>
          {role === 'COE' ? (
            <Signup role={role} onSubmit={handleSignup} error={error} inputFields={inputFields} userType="HOD"/>
          ) : (
            <h1>Only COEs can create HODs.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;