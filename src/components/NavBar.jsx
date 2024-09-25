"use client";

import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { getTokenFromCookies, decodeToken } from "@/utils/auth";

function Navbar() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
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

  // useEffect(() => {
  //   const token = getTokenFromCookies();

  //   if (token) {
  //     const decodedToken = decodeToken(token);
  //     console.log("Decoded Token:", decodedToken);

  //     if (decodedToken && decodedToken.name && decodedToken.role) {
  //       setName(decodedToken.name);
  //       setDept(decodedToken.dept);
  //       setRole(decodedToken.role);
  //     } else {
  //       console.error("Role not found in the token");
  //     }
  //   } else {
  //     console.error("Token not found in cookies");
  //   }
  // }, []);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white flex-1 font-sofadi">
          {name}
          {role ? `, (${role})` : ""}
          {dept ? `, ${dept}` : ""}
          {!name ? "Exam Question Paper Management System" : ""}
        </h1>
        <ul className="flex flex-wrap space-x-4 items-center justify-center md:space-x-6">
          <li>
            <a
              href="/dashboard"
              className="text-white hover:text-gray-400 transition-colors duration-300"
              aria-label="Home"
            >
              <IoHome className="w-6 h-6"/>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-gray-400 transition-colors duration-300"
              aria-label="User Profile"
            >
              <FaUser className="w-6 h-6"/>
            </a>
          </li>
          <li className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
              aria-label="Logout"
            >
              <TbLogout className="w-7 h-7"/>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
