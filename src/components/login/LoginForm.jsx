"use client";
import React, { useState } from "react";
import { Mail, Lock, UserCircle2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/authContext";
import ImageBox from "./ImageBox";

const LoginForm = ({ onSubmit }) => {
  const { error, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputProps = {
    required: true,
    onChange: handleChange,
    className: "appearance-none block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-blue-800/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg">
        <ImageBox />
        <div className="w-full md:w-1/2 space-y-6 p-6 md:p-10 bg-gradient-to-b from-blue-600/20 to-transparent">
          <div className="space-y-1 flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <UserCircle2 className="h-10 w-10 text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400 text-center">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  {...inputProps}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={formData.email}
                />
              </div>
              <div className="flex items-center relative">
                <Lock className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  {...inputProps}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formData.password}
                  className={inputProps.className + " pr-10"}
                />
                <button
                  type="button"
                  className="absolute z-50 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;