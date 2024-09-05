"use client";

import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";

function CreateModeratorForm({ role, onSubmit, dept, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("External");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== "HOD") {
      alert("Only HODs can create moderators.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    onSubmit({ name, dept, email, password, userType });
  };

  return (
    <div className="flex flex-col min-h-screen w-full pb-5">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center py-8 text-center w-full">
        <h1 className="text-3xl font-bold mb-4">Create Moderator</h1>
        <p className="text-sm font-light max-w-xl mx-auto">
          Easily add a new moderator to your department to help manage tasks efficiently.
        </p>
      </header>

      {/* Form Section */}
      <main className="flex-1 flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white text-gray-800 rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="mb-4">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            >
              <option value="External">External</option>
              <option value="Internal">Internal</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              id="dept"
              type="text"
              placeholder="Department"
              value={dept}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center"
            >
              <FaUserShield className="w-6 h-6 mr-2" />
              Create Moderator
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateModeratorForm;