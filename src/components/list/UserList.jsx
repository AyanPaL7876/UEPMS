"use client";

import React, { useEffect, useState } from 'react';
import { getTokenFromCookies } from '@/utils/auth';
import { FaUser } from 'react-icons/fa';
import { Spinner } from '@/components/Spinner'; // Assuming you have a Spinner component

function UserItem({ user }) {
  return (
    <div className=" bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center p-4  shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 w-1/3">
      <div className="flex-shrink-0 h-12 w-12 rounded-full hover:bg-white/20 flex items-center justify-center mr-4">
        <FaUser className="text-white/80 text-xl" />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-white text-base font-semibold truncate">{user.name}</p>
        <p className="text-white/70 text-sm truncate">{user.email}</p>
      </div>
    </div>
  );
}

export default function UserList({ api, userType }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(api, {
          headers: {
            "Authorization": `Bearer ${getTokenFromCookies()}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'An error occurred while fetching users.');
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [api]);

  return (
    <div className="w-full mx-auto overflow-hidden items-center justify-center">
      {error ? (
        <p className="text-center p-4 text-red-400">{error}</p>
      ) : (
        <div className='flex flex-col gap-5 px-10 items-center justify-center w-full'>
          {users.length > 0 ? (
            users.map((user) => (
              <UserItem key={user._id} user={user} />
            ))
          ) : (
            <p className="text-center p-4 text-white/70">No {userType} found.</p>
          )}
        </div>
      )}
    </div>
  );
}
