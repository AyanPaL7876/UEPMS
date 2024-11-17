"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromCookies } from "@/utils/auth";
import { ProfileContext } from "@/hooks/ProfileContext";
import LoadingPage from "@/components/loading/LoadingPage";

function Page() {
  const [profileData, setProfileData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = getTokenFromCookies();
        if (!token) {
          // Redirect to login if no token is present
          router.push("/login");
          return;
        }

        const response = await fetch(`/api/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data.user);
          setIsLogin(true);
        } else {
          console.error(
            "Failed to fetch profile data. Status:",
            response.status
          );
          router.push("/login"); // Redirect to login if fetching fails
        }
      } catch (error) {
        console.error("An error occurred:", error);
        router.push("/login"); // Redirect to login if an error occurs
      }
    };

    fetchProfileData();
  }, [router]);

  if (!isLogin) {
    return (
      <LoadingPage />
    );
  }

  return (
    <ProfileContext.Provider value={{ profileData, isLogin }}>
      <div>
        <Dashboard />
      </div>
    </ProfileContext.Provider>
  );
}

export default Page;
