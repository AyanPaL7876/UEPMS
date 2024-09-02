"use client";

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import CoeSection from '@/components/dashboard/COEDashboard';
import HodSection from '@/components/dashboard/HodDashboard';
import TeacherSection from '@/components/dashboard/TeacherDashboard';
import ModeratorSection from '@/components/dashboard/ModeratorDashboard';
import AdminSection from '@/components/dashboard/AdminDashboard';

function DashboardPage() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Function to get the token from cookies
    const getTokenFromCookies = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      return token;
    };

    // Get and decode the token
    const token = getTokenFromCookies();

    if (token) {
      try {
        // Decode the token to get the role
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token:", decodedToken); // Log the decoded token for debugging

        if (decodedToken && decodedToken.role) {
          setRole(decodedToken.role);
          setName(decodedToken.name)
        } else {
          console.error("Role not found in the token");
        }
      } catch (error) {
        console.error("Failed to decode the token:", error);
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className='loginPage w-screen h-screen text-white font-bold'>
      <div className='bg_blur w-screen h-screen flex flex-col justify-start items-center gap-y-56 '>
      <div>
        {role ? (
          <h1 className='text-2xl py-2'>Welcome, {name} ({role})!</h1>
        ) : (
          <h1>Token or Role not found...</h1>
        )}
      </div>
      {role==='admin' && <AdminSection/>}
      {role==='COE' && <CoeSection/>}
      {role==='HOD' && <HodSection/>}
      {role==='Teacher' && <TeacherSection/>}
      {role==='Moderator' && <ModeratorSection/>}
      </div>
    </div>
  );
}

export default DashboardPage;
