
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Dashboard from '@/components/Dashboard';
import Loading from '@/components/common/loading';
import { getTokenFromCookies, decodeToken } from '@/utils/auth';

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
      setIsLoading(false);
    };

    initializeDashboard();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!role) {
    return (
      <div className="pt-1 min-h-screen px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-auto min-w-screen" role="alert">
          <strong className="font-bold">Authentication error: </strong>
          <span className="block sm:inline">Please log in again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white font-bold">
      <Dashboard role={role} />
    </div>
  );
}

export default DashboardPage;