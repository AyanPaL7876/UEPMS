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
    onSubmit({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-5 sm:px-6 md:px-8 lg:px-10">
    <main className="pb-10 py-7 flex flex-col items-center justify-around w-full max-w-md mx-auto">
      <div className="text-white mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-base sm:text-lg font-light">
          Enter your credentials to access your account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col w-full text-white">
          <label htmlFor="email" className="mb-1">Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 py-2 px-3 rounded-xl text-black outline-none"
            required
          />
        </div>
  
        <div className="flex flex-col w-full text-white">
          <label htmlFor="password" className="mb-1">Password: </label>
          <input
            id="password"
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
  
        <div className="flex justify-center pt-2 w-full">
          <button
            type="submit"
            className="btn_color text-white font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center w-full"
          >
            {isLoading ? <Spinner /> : "Log in"}
          </button>
        </div>
      </form>
    </main>
  </div>
  
  );
};

export default LoginForm;
