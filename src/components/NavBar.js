"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaGraduationCap,
} from "react-icons/fa";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";
import { CircleUserRound ,LogOut,Home } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  const [name, setName] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Clear the token from cookies (if necessary)
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Redirect to home or login page after logout
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.name) {
        setName(decodedToken.name);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-4 flex justify-between items-center z-50">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white flex items-center">
            <FaGraduationCap className="mr-2" />
            QuestionMaster
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <span className="text-gray-300 hidden md:flex">{name}</span>
          <CircleUserRound  className="w-5 h-5 md:hidden text-gray-300" />
        </div>
          <Link href="/home" 
          className="text-gray-400 hover:text-white mr-4"
          >
            <Home className="w-5 h-5" />
          </Link>
          <button 
          className="text-gray-400 hover:text-white"
          onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
}

export default Navbar;
