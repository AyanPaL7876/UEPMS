"use client";

import React from "react";
import { Book, Building2, IdCard, LockKeyhole } from "lucide-react";
import { useCreateUser } from "@/hooks/createUserContext";

const InfoItem = ({
  icon: Icon,
  colorClass,
  label,
  value,
  onChange = () => {}, // Default function
  type = "text",
  placeholder
}) => (
  <div className="flex flex-col">
    <label className="text-slate-400">{label}</label>
    <div className="flex items-center">
      <Icon className={`w-5 h-5 mr-2 ${colorClass}`} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-slate-600/30 bg-slate-700 rounded-md p-2 outline-none w-[90%] mt-1 text-white"
      />
    </div>
  </div>
);

const DetailsCard = () => {
  const {
    universityName,
    setUniversityName,
    school,
    setSchool,
    specialization,
    setSpecialization,
    department,
    setDepartment,
    employeeId,
    setEmployeeId,
    experience,
    setExperience,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
  } = useCreateUser();

  const fields = [
    { icon: Building2, colorClass: "text-blue-400", label: "University", value: universityName, onChange: setUniversityName, placeholder: "University Name" },
    { icon: Book, colorClass: "text-purple-400", label: "School", value: school, onChange: setSchool, placeholder: "School Name" },
    { icon: Book, colorClass: "text-red-400", label: "Specialization", value: specialization, onChange: setSpecialization, placeholder: "Specialization Name" },
    { icon: Book, colorClass: "text-green-400", label: "Department", value: department, onChange: setDepartment, placeholder: "Department Name" },
    { icon: IdCard, colorClass: "text-yellow-400", label: "Employee ID", value: employeeId, onChange: setEmployeeId, placeholder: "Employee ID" },
    { icon: Book, colorClass: "text-pink-400", label: "Experience", value: experience, onChange: setExperience, type: "number", placeholder: "Experience in Years" },
    { icon: LockKeyhole, colorClass: "text-teal-400", label: "Password", value: password, onChange: setPassword, type: "password", placeholder: "Enter Password" },
    { icon: LockKeyhole, colorClass: "text-indigo-400", label: "Confirm Password", value: confirmPassword, onChange: setConfirmPassword, type: "password", placeholder: "Re-enter Password" },
  ];


  return (
    <div className="col-span-2 bg-slate-800/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-600/30 p-8">
      <h2 className="text-slate-200 font-bold text-lg mb-5">Professional Information</h2>
      <div className="grid grid-cols-1 gap-5">
        {fields.map((field, index) => (
          <InfoItem key={index} {...field} />
        ))}
      </div>
      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm font-semibold">{errorMessage}</p>
      )}
    </div>
  );
};

export default DetailsCard;
