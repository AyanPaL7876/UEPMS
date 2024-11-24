"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserIP from "@/components/create/user/userIP";
import { CreateUserProvider } from "@/hooks/createUserContext";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import LoadingPage from "@/components/loading/LoadingPage";

function Page() {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeDashboard = () => {
      const token = getTokenFromCookies();
      if (!token) {
        console.log("Token not found in cookies");
        router.push("/login");
        return;
      }

      const decodedToken = decodeToken(token);
      if (!decodedToken?.role) {
        console.log("Role not found in the token");
      }

      setRole(decodedToken.role);
      setIsLoading(false);
    };

    initializeDashboard();
  }, [router]);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!role) {
    return (
      <UnauthorizedPage />
    )
  }

  return (
    <>
        <CreateUserProvider>
          <div className="min-h-screen bg-slate-950">
            <h1 className="text-3xl font-bold text-white text-center p-4">
              Create New User Profile
            </h1>
            <UserIP />
          </div>
        </CreateUserProvider>
    </>
  );
}

export default Page;
