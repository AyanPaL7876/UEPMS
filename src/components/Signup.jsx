"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

function Signup({ role, onSubmit, dept, error, inputFields, userType }) {
  const [formData, setFormData] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || "" }), {})
  );
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (role && role !== "Admin" && userType !== "HOD") {
    //   alert(`Only Admins can create ${userType}s.`);
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    onSubmit({ ...formData, dept });
  };

  return (
    <div className="flex flex-col min-h-screen w-full pb-5">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Create {userType}</h1>
        <p className="text-sm font-light max-w-xl mx-auto">
          Add a new {userType} to enhance your team.
        </p>
      </header>

      <main className="flex-1 flex justify-center items-center px-4 w-[600px]">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white text-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          {inputFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                  required={field.required !== false}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={field.disabled}
                  className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required={field.required !== false}
                />
              )}
            </div>
          ))}

          {(passwordError || error) && <p className="text-red-500 text-sm">{passwordError || error}</p>}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center"
            >
              <FaUserPlus className="w-6 h-6 mr-2" />
              {`Create ${userType}`}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Signup;