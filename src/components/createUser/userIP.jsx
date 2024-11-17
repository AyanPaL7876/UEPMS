"use client";

import React from "react";
import { useCreateUser } from "@/hooks/createUserContext";
import DetailsCard from "./DetailsCardIP";
import ContactInfo from "./ContactInfoIP";

const UserIP = () => {
  const { resetForm, handleSubmit } = useCreateUser();

  return (
    <div className="px-8 py-5 md:p-10 bg-slate-950">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        <ContactInfo />
        <div className="md:col-span-2">
          <DetailsCard />
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-1 mt-10">
        <div className="ml-auto flex gap-10">
          <button
            onClick={resetForm}
            className="text-gray-400 hover:text-red-400 hover:bg-red-600/10 border-2 px-4 py-2 rounded-lg border-gray-400 hover:border-red-400 font-bold duration-300 transition-all hover:scale-90"
          >
            <span>Reset</span>
          </button>
          <button
            onClick={handleSubmit}
            className="text-gray-400 hover:text-emerald-500 border-2 px-4 py-2 rounded-lg border-gray-400 hover:border-emerald-500 font-bold duration-300 transition-all hover:scale-90 hover:bg-emerald-600/10"
          >
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserIP;