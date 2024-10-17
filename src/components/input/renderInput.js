"use client"

import React from "react";
import { Eye, EyeOff } from "lucide-react";

const RenderField = ({ 
    field, 
    value, 
    onChange, 
    error, 
    showPassword, 
    setShowPassword, 
    showConfirmPassword, 
    setShowConfirmPassword 
  }) => {
    const isPassword = field.type === "password";
    const isShowingPassword = isPassword && 
      (field.name === "password" ? showPassword : showConfirmPassword);
  
    return (
      <div className="mb-4">
        <div className="flex justify-center items-center">
          <span className="w-10 h-10 flex justify-center items-center">
            {field.icon}
          </span>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={value}
              onChange={onChange}
              disabled={field.disabled}
              required={field.required}
              className="w-full bg-transparent focus:bg-blue-400 focus:rounded-xl text-white p-2 border-[0.25px] border-b-gray-200 border-transparent focus:outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex w-full relative">
              <input
                type={isPassword ? (isShowingPassword ? "text" : "password") : field.type}
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                disabled={field.disabled}
                required={field.required}
                className="w-full bg-transparent text-white p-2 border-[0.25px] border-b-gray-200 border-transparent focus:outline-none disabled:cursor-not-allowed"
                placeholder={field.placeholder}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => {
                    if (field.name === "password") {
                      setShowPassword(!showPassword);
                    } else if (field.name === "confirmPassword") {
                      setShowConfirmPassword(!showConfirmPassword);
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {isShowingPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          )}
        </div>
        {field.name === "password" && (
          <p className="text-gray-400 text-sm mt-1 ml-10">
            *Password must be at least 8 characters long.
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-1 ml-10">{error}</p>
        )}
      </div>
    );
  };

export default RenderField;