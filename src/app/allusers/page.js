"use client";

import React, { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import { getUsers } from '@/lib';
import Image from "next/image";
import Loading from '@/components/common/loading';

const UserCard = ({ name, email, profilePicture }) => (
  <div className="flex items-center space-x-4 p-4 bg-[#4b5f728b] rounded-lg cursor-pointer shadow-md transform transition duration-300 hover:scale-105 btn_hover whitespace-normal break-words"
  >
    <div>
    <Image
      src={profilePicture}
      alt={name}
      className="max-w-full w-12 h-12 rounded-full border-2 border-white"
      // priority
    />
    </div>
    <div>
      <h3 className="font-semibold text-lg text-gray-200">{name}</h3>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  </div>
);

const UserListUI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <Loading />
    </div>
  );
  if (error) return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 min-h-[96vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search users"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
            <Users size={20} className="mr-2" />
            All users
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">New users</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
            <UserCard key={index} {...user} />
          ))
        ) : (
          <div className="col-span-3 text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UserListUI;