"use client";

import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";

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

  useEffect(() => {
    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.name && decodedToken.role) {
        setName(decodedToken.name);
        setDept(decodedToken.dept);
        setRole(decodedToken.role);
      } else {
        console.error("Role not found in the token");
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className="flex flex-row justify-between mx-10">
      <h1 className="text-xl font-bold">{name}{role?`, (${role})`:""} {dept?`, ${dept}`:""}</h1>
      <ul className="flex space-x-3.5 text-lg">
        <li>
          <a
            href="/dashboard"
            className="hover:text-indigo-200"
            aria-label="Home"
          >
            <IoHome className="w-6 h-6 mx-2 icon_shadow" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-indigo-200"
            aria-label="User Profile"
          >
            <FaUser className="w-6 h-6 mx-2 icon_shadow" />
          </a>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-indigo-200 cursor-pointer"
            aria-label="Logout"
          >
            <TbLogout className="w-6 h-6 mx-2 icon_shadow" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
