import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo/uni.png';

const Header = ({ formData, setFormData }) => {
  const updateExamDetails = (field, value) => {
    setFormData(prev => ({
      ...prev,
      examDetails: { ...prev.examDetails, [field]: value }
    }));
  };

  return (
    <div className="grid grid-cols-4 w-full text-base border-[1px] border-b-0 border-black">
      <div className="py-1 px-10 border-[1px] border-black h-24 flex justify-center items-center">
        <Image src={logo} alt="University Logo" className="h-20 w-28 object-contain" />
      </div>
      <div className="grid grid-rows-3 border-l-[1px] border-black col-span-3 text-center border-[1px] h-24">
        <input 
          className="text-3xl font-bold uppercase text-center w-full"
          value={formData.universityName}
          onChange={(e) => setFormData(prev => ({ ...prev, universityName: e.target.value }))}
        />
        <input 
          className="text-lg uppercase font-bold text-center w-full"
          value={formData.examDetails.title}
          onChange={(e) => updateExamDetails('title', e.target.value)}
        />
        <input 
          className="text-sm text-center w-full"
          value={formData.examDetails.session}
          onChange={(e) => updateExamDetails('session', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;