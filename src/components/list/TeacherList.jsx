"use client";

import React, { useEffect, useState } from 'react';
import { getTokenFromCookies } from '@/utils/auth';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/hod/teachers', {
          headers: {
            "Authorization": `Bearer ${getTokenFromCookies()}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setTeachers(data.data);
        } else {
          const errorData = await res.json();
          setError(errorData.error);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred.");
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="teacher-list">
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc pl-5">
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <li key={teacher._id} className="mb-2">
              <p><strong>Name:</strong> {teacher.name}</p>
              <p><strong>Department:</strong> {teacher.dept}</p>
              <p><strong>Email:</strong> {teacher.email}</p>
            </li>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </ul>
    </div>
  );
}

export default TeacherList;
