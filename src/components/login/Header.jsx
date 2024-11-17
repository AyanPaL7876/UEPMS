"use client";
import React from 'react';
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";

function Header() {
  return (
    <div className={`fixed bg_blur w-full z-50 transition-all duration-300`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white flex items-center">
                <FaGraduationCap className="mr-2" />
                UEMS
              </span>
            </Link>
          </div>
        </nav>
      </div>
  )
}

export default Header