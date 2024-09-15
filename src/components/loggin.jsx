"use client";

import React, { useState } from "react";
import { Spinner } from "./Spinner";

const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", email);
    onSubmit({ email, password});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-4 w-full">
      <div className="flex flex-col w-full text-white">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 py-2 px-3 rounded-xl text-black outline-none"
          required
        />
      </div>

      <div className="flex flex-col w-full text-white">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 py-2 px-3 rounded-xl text-black outline-none"
          required
        />
        <div className="h-6">

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      <div className="flex justify-between space-x-4 pt-2 ">
        <button
          type="submit"
          className="flex-1 btn_color text-white font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : "Log in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
