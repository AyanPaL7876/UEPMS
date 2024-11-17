import React from "react";
import { Camera, Activity, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <div id="features" className="py-24">
      <h2 className="text-4xl font-extrabold mb-12 text-center py-1">
        Key Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8 py-5 px-8">
        <FeatureCard
          icon={<ShieldCheck size={40} />}
          title="Intelligent Access Control"
          description="Tailor-made access for Admin, COE, HOD, and Teachers, ensuring data integrity and security."
        />
        <FeatureCard
          icon={<Activity size={40} />}
          title="Real-time Collaboration"
          description="Seamlessly work together on question papers with live editing and commenting features."
        />
        <FeatureCard
          icon={<Camera size={40} />}
          title="Fortress-level Security"
          description="Bank-grade encryption and role-based access control to protect your sensitive exam data."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#f1f1f11c] rounded-lg p-6 text-center shadow-md flex justify-center items-center flex-col transition duration-300 hover:scale-105">
    <div className="text-blue-500 mb-4 shadow-md">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Features;