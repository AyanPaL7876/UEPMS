"use client";

import React from "react";
import DetailsCard from "./DetailsCard";
import ContactInfo from "./ContactInfo";

const Profile = () => {

  return (
    <div className="px-8 py-5 md:p-10 bg-slate-950 ">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Contact Info */}
        <ContactInfo />
        <div className="md:col-span-2">
        {/* Details Card */}
        <DetailsCard />

        </div>
      </div>
    </div>
  );
};

export default Profile;
