"use client";

import React from "react";
import { UserRound, Mail, Phone, MapPin } from "lucide-react";
import { useCreateUser } from "@/hooks/createUserContext";

const EditableField = ({
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="flex items-center space-x-3 text-slate-100">
    <Icon className="w-5 h-5" />
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-slate-700 outline-none w-full py-1 px-2 rounded-md"
    />
  </div>
);

const ContactInfo = () => {
  const {
    name,
    setName,
    role,
    setRole,
    teacherType,
    setTeacherType,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
  } = useCreateUser();

  return (
    <div className="col-span-1 bg-slate-800/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-600/30">
      <div className="relative h-48">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: "40px" }}
        >
          <div className="p-1 bg-slate-800 rounded-full">
            <div className="border-4 border-slate-600 rounded-full p-2 bg-slate-700">
              <UserRound className="w-24 h-24 text-slate-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 pb-8 px-8">
        <div className="mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter User Name"
            className="text-2xl bg-slate-700 font-bold text-white outline-none py-1 px-2 w-full rounded-md"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-white bg-slate-700 outline-none w-full mt-2 py-1 px-2 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="coe">Controller Of Examination (COE)</option>
            <option value="hod">Head Of the Department (HOD)</option>
            <option value="teacher">Teacher</option>
          </select>

          {role === "teacher" && (
            <select
              value={teacherType}
              onChange={(e) => setTeacherType(e.target.value)}
              className="text-white bg-slate-700 outline-none w-full mt-2 py-1 px-2 rounded-md"
            >
              <option value="">Select Teacher Type</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          )}
        </div>

        <div className="space-y-3">
          <EditableField
            icon={Mail}
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="Enter Email"
          />
          <EditableField
            icon={Phone}
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder="Enter Phone"
          />
          <EditableField
            icon={MapPin}
            value={address}
            onChange={setAddress}
            placeholder="Enter Address"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
