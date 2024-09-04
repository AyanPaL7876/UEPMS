import React from 'react';
import TeacherList from '@/components/list/TeacherList';

function Page() {
  return (
    <div className="bg-black text-white h-screen w-screen flex flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-8">All Teachers</h1>
      <TeacherList />
    </div>
  );
}

export default Page;
