import React from 'react';
import UserList from '@/components/list/UserList';

function Page() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white min-h-screen w-full flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">All coe</h1>
      <UserList api="/api/admin/coes" userType="COE"/>
    </div>
  );
}

export default Page;
