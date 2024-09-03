"use client";

import React, { useEffect, useState } from 'react';
import { getTokenFromCookies, decodeToken } from '@/utils/auth';
import CreateModeratorForm from '@/components/signup/CreateModeratorForm';
import { useRouter } from 'next/navigation';

function Page() {
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async ({ name, dept, email, password }) => {
    try {
      const res = await fetch(`/api/moderator/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getTokenFromCookies()}`
        },
        body: JSON.stringify({ name, dept, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("Moderator created successfully");
        router.push("/dashboard"); 
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        console.error("Error during moderator creation:", errorData.error);
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
        setDept(decodedToken.dept);
        console.log(`dept : ${decodedToken.dept}`);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className='loginPage w-screen h-screen text-white font-bold'>
      <div className='w-screen h-screen flex flex-col justify-start items-center gap-y-56'>
        <div className='bg_blur px-10 py-7 border-2 bg-[#4848483e] rounded-xl mt-10'>
          {role === 'HOD' ? (
            <CreateModeratorForm role={role} onSubmit={handleSignup} dept={dept} error={error}/>
          ) : (
            <h1>Only HODs can create Moderators.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
