
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Dashboard from '@/components/Dashboard';
import Loading from '@/components/common/loading';
import { AdminButtons, COEButtons, HODButtons, TeacherButtons } from '@/data/dashboardData';
import { getTokenFromCookies, decodeToken } from '@/utils/auth';

const ROLE_BUTTONS = {
  Admin: AdminButtons,
  COE: COEButtons,
  HOD: HODButtons,
  Teacher: TeacherButtons,
};

function DashboardPage() {
  const [role, setRole] = useState('');
  const [buttons, setButtons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const initializeDashboard = () => {
      const token = getTokenFromCookies();
      if (!token) {
        console.error("Token not found in cookies");
        router.push("/login");
        return;
      }

      const decodedToken = decodeToken(token);
      if (!decodedToken?.role) {
        console.error("Role not found in the token");
        router.push("/login");
        return;
      }

      setRole(decodedToken.role);
      setButtons(ROLE_BUTTONS[decodedToken.role] || null);
      setIsLoading(false);
    };

    initializeDashboard();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!role || !buttons) {
    return (
      <div className="pt-16 h-screen">
        <div className="w-full bg-red-300 text-xl text-gray-800 text-center px-4 py-2">
          <p>Authentication error</p>
          <p>Please log in again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white font-bold">
      <Dashboard buttons={buttons} role={role} />
    </div>
  );
}

export default DashboardPage;