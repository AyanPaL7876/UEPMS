"use client";

import React, { useContext } from "react";
import { Book, Building2, IdCard } from "lucide-react";
import { ProfileContext } from "@/hooks/ProfileContext";

const InfoItem = ({ icon: Icon, colorClass, label, content }) => (
  <div className="flex items-start space-x-4">
    <Icon className={`w-6 h-6 ${colorClass} mt-1`} />
    <div>
      <h3 className="text-slate-200 font-semibold mb-1">{label}</h3>
      <p className="text-slate-400">{content}</p>
    </div>
  </div>
);

const DetailsCard = () => {
  const {profileData} = useContext(ProfileContext);

  const fields = [
    { icon: Building2, colorClass: "text-blue-400", label: "University", content: profileData.universityName },
    profileData.school && { icon: Book, colorClass: "text-purple-400", label: "School", content: profileData.school },
    { icon: Book, colorClass: "text-red-400", label: "Specialization", content: profileData.specialization },
    profileData.department && { icon: Book, colorClass: "text-green-400", label: "Department", content: profileData.department },
    { icon: IdCard, colorClass: "text-yellow-400", label: "Employee ID", content: profileData.employeeId },
    { icon: Book, colorClass: "text-indigo-400", label: "Experience", content: `${profileData.experience}+ Years` },
  ].filter(Boolean); // Filter out null values

  return (
    <div className="col-span-2 bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-600/30">
      <h2 className="text-2xl font-bold text-white mb-8">Professional Information</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {fields.map(({ icon, colorClass, label, content }, index) => (
          <InfoItem key={index} icon={icon} colorClass={colorClass} label={label} content={content} />
        ))}
      </div>
      <div className="flex justify-end items-end mt-8 mr-10">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl p-2 mt-4 w-40">
          Update password
        </button>
      </div>
    </div>
  );
};

export default DetailsCard;
