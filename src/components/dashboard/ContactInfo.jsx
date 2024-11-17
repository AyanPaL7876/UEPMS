"use client";

import React, { useContext } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ProfileContext } from "@/hooks/ProfileContext";

const ContactInfo = () => {
  const {profileData} = useContext(ProfileContext);

  return (
    <div className="col-span-1 bg-slate-800/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-600/30">
      <div className="relative h-48 ">
        {/* Banner */}
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
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {profileData.name}
        </h2>
        <p className="text-slate-400 text-center mb-6">{profileData.role?.toUpperCase()}</p>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-slate-300">
            <Mail className="w-5 h-5" />
            <span>{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <Phone className="w-5 h-5" />
            <span>{profileData.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <MapPin className="w-5 h-5" />
            <span>{profileData.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
