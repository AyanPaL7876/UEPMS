"use client";

import React, { useState } from "react";
import { Spinner } from "./Spinner";

const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 p-2 rounded text-black"
      >
        <option value="Admin">Admin</option>
        <option value="COE">COE</option>
        <option value="HOD">HOD</option>
        <option value="Teacher">Teacher</option>
        <option value="Moderator">Moderator</option>
      </select>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border border-gray-300 p-2 rounded text-black"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border border-gray-300 p-2 rounded text-black"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between space-x-4 pt-2">
        <button
          type="reset"
          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center"
        >
          {isLoading ? 
          
<Spinner />: 
          "Log in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
