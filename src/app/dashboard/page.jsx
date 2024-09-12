"use client";

import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';

import cteareCOE from "@/assets/create/coe.svg";
import cteareHOD from "@/assets/create/hod.svg";
import CteareTeacher from "@/assets/create/teacher.svg";
import CteareModerator from "@/assets/create/moderator.svg";
import ctearePaper from "@/assets/create/paper.svg";

import viewCOE from "@/assets/viewAll/coe.svg";
import viewHOD from "@/assets/viewAll/hod.svg";
import viewTeacher from "@/assets/viewAll/teacher.svg";
import viewModerator from "@/assets/viewAll/moderator.svg";
import viewPaper from "@/assets/viewAll/paper.svg";

import selectTeacher from "@/assets/selectTeacher.svg";
import selectModerator from "@/assets/selectModerator.svg";
import VisitPaper from "@/assets/selectTeacher.svg";

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

  const AdminButtons = [
    { Icon: cteareCOE, text: "Create COE", path: "/dashboard/createcoe" },
    { Icon: cteareHOD, text: "Create HOD", path: "/dashboard/createhod" },
    { Icon: viewCOE, text: "View All COEs", path: "/list/coelist" },
    { Icon: viewHOD, text: "View All HODs", path: "/list/hodlist" },
    { Icon: ctearePaper, text: "Create Paper", path: "#" },
    { Icon: viewPaper, text: "View Paper", path: "#" },
  ];

  const COEButtons = [
    { Icon: cteareHOD, text: "Create HOD", path: "/dashboard/createhod" },
    { Icon: viewHOD, text: "View All HODs", path: "/list/hodlist" },
    { Icon: ctearePaper, text: "Create Paper", path: "#" },
    { Icon: viewPaper, text: "View Paper", path: "#" },
  ];
  
  const HODButtons = [
    {Icon: CteareTeacher,text: "Create Teacher",path: "dashboard/createteacher"},
    {Icon: CteareModerator,text: "Create Moderator",path: "dashboard/createmoderator"},
    {Icon: viewTeacher, text: "All Teachers", path: "/list/teacherlist" },
    {Icon: viewModerator,text: "All Moderators",path: "/list/moderatorlist"},
    {Icon: selectTeacher,text: "Select Teacher",path: "/list/moderatorlist"},
    {Icon: selectModerator,text: "Select Moderators",path: "/list/moderatorlist"},
  ];
  
  const TeacherButtons = [
    { Icon: cteareHOD, text: "Create Questions Paper", path: "#" },
    { Icon: viewHOD, text: "Visit all Papers", path: "#" },
  ];
  
  const ModeratorButtons = [
    { Icon: ctearePaper, text: "Create Questions Paper", path: "#" },
    { Icon: cteareHOD, text: "Select Questions Paper", path: "#" },
    { Icon: viewHOD, text: "Visit all Papers", path: "#" },
  ];


  return (
    <div className='text-white font-bold'>
      <div className='flex flex-col justify-start items-center'>
        <div>
          {role  === 'admin' ? <Dashboard buttons={AdminButtons} role={role} /> :
            (role === 'COE') ? <Dashboard buttons={COEButtons} role={role}/> :
            (role === 'HOD') ? <Dashboard buttons={HODButtons} role={role} /> :
            (role === 'Teacher') ? <Dashboard buttons={TeacherButtons} role={role} /> :
            (role === 'Moderator') ? <Dashboard buttons={ModeratorButtons} role={role} /> :
            <div className=' pt-16 h-screen'>
              <h1 className='bg-red-300 text-2xl text-white'>Token or Role not found...</h1>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
