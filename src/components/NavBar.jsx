"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaGraduationCap,
} from "react-icons/fa";
import { Home } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Clear the token from cookies (if necessary)
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-slate-950 mx-auto px-6 py-4 flex justify-between items-center z-50 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white flex items-center">
            <FaGraduationCap className="mr-2" />
            UEMS
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
          <Link href="/profile" 
          className="text-gray-400 hover:text-blue-500 duration-300 transition-all hover:scale-90"
          >
            <Home className="w-6 h-6" />
          </Link>
          <button 
          className="text-gray-400 hover:text-gray-100 border-2 px-2 py-1 rounded-lg border-gray-400 hover:border-red-400 font-bold duration-300 transition-all hover:scale-90"
          onClick={handleLogout}
          >
            Log out
          </button>
      </div>
    </div>
  );
}

export default Navbar;
