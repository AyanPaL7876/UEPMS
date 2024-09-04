import React from 'react';
import ModeratorList from '@/components/list/ModeratorList';

function Page() {
  return (
    <div className="bg-black text-white h-screen w-screen flex flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-8">All Moderator</h1>
      <ModeratorList />
    </div>
  );
}

export default Page;
