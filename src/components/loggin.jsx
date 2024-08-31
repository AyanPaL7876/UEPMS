"use client";

import React, { useState } from "react";

const LoginForm = ({ onSubmit, error }) => {
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
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Log In
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;
