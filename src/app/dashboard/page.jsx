"use client";

import React, { useEffect, useState } from 'react';
import CoeSection from '@/components/dashboard/CoeDashboard';
import HodSection from '@/components/dashboard/HodDashboard';
import TeacherSection from '@/components/dashboard/TeacherDashboard';
import ModeratorSection from '@/components/dashboard/ModeratorDashboard';
import AdminSection from '@/components/dashboard/AdminDashboard';
import { getTokenFromCookies, decodeToken } from '@/utils/auth';

function DashboardPage() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.role) {
        setRole(decodedToken.role);
        setName(decodedToken.name);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className='text-white font-bold h-screen'>
      {/* <div className='flex flex-col justify-start items-center '> */}
        {/* <div>
          {role ? (
            <h1 className='text-2xl py-2'>Welcome, {name} ({role})!</h1>
          ) : (
            <h1>Token or Role not found...</h1>
          )}
        </div> */}
        {role === 'admin' && <AdminSection />}
        {role === 'COE' && <CoeSection />}
        {role === 'HOD' && <HodSection />}
        {role === 'Teacher' && <TeacherSection />}
        {role === 'Moderator' && <ModeratorSection />}
      {/* </div> */}
    </div>
  );
}

export default DashboardPage;
