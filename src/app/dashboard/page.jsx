"use client";

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

function DashboardPage() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Function to get the token from cookies
    const getTokenFromCookies = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      return token;
    };

    // Get and decode the token
    const token = getTokenFromCookies();

    if (token) {
      try {
        // Decode the token to get the role
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token:", decodedToken); // Log the decoded token for debugging

        if (decodedToken && decodedToken.role) {
          setRole(decodedToken.role);
          setName(decodedToken.name)
        } else {
          console.error("Role not found in the token");
        }
      } catch (error) {
        console.error("Failed to decode the token:", error);
      }
    } else {
      console.error("Token not found in cookies");
    }
  }, []);

  return (
    <div className='loginPage w-screen h-screen text-white font-bold'>
      <div className='bg_blur w-screen h-screen flex flex-col justify-start items-center gap-y-56 '>
      <div>
        {role ? (
          <h1 className='text-2xl py-2'>Welcome, {name} ({role})!</h1>
        ) : (
          <h1>Token or Role not found...</h1>
        )}
      </div>
      {role==='admin' && (
        <div>
          <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            create COE
          </button>
        </div>
      )}
      {role==='COE' && (
        <div>
          <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            create HOD
          </button>
        </div>
      )}
      {role==='HOD' && (
        <div className="flex gap-20 ">
        <div>
          <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            create Teacher
          </button>
        </div>
        <div>
          <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            create Moderator
          </button>
        </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default DashboardPage;
