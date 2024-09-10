import React from 'react';
import UserList from '@/components/list/UserList';

function Page() {
  return (
    <div className="text-white min-h-screen w-full flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">All HOD</h1>
      <UserList api="/api/coe/hods" userType="HOD"/>
    </div>
  );
}

export default Page;
