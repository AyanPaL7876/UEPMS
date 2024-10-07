"use client";

import React,{ useState } from 'react';
import { useRouter } from "next/navigation";
import LoginForm from "@/components/loggin";
import Link from "next/link";
import {
  FaGraduationCap,
} from "react-icons/fa";

const page = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginIn = async ({ email, password }) => {
    setIsLoading(true);
    setError("");
    console.log(email+" and "+password);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response : "+res);

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        console.log(errorData.error)
        setError(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* Header */}
      <heade
        className={`fixed bg_blur w-full z-50 transition-all duration-300 `}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white flex items-center">
                <FaGraduationCap className="mr-2" />
                QuestionMaster
              </span>
            </Link>
          </div>
        </nav>
      </heade>
      <LoginForm error={error} isLoading={isLoading} onSubmit={handleLoginIn}/>
    </div>
  );
}

export default page;
