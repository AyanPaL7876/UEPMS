"use client";
import { FaFileSignature } from "react-icons/fa6";
import { IoFileTrayFullOutline } from "react-icons/io5";
export default function TeacherSection() {
  return (
    <div className="flex gap-5">
      <button
        type="button"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
      >
        <FaFileSignature className="w-20 h-20 ml-8" />
        <p>create Question Paper</p>
      </button>

      <button
        type="button"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
      >
        <IoFileTrayFullOutline className="w-20 h-20 ml-3.5" />
        <p>View Question Paper</p>
      </button>
    </div>
  );
}
