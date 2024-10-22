import React from "react";
import { Eye, EyeOff } from "lucide-react";

const QuestionInput = ({ 
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
    <div className="mb-6">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-200 mb-2">
        {field.label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200">
          {field.icon}
        </div>
        {field.type === "select" ? (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            disabled={field.disabled}
            required={field.required}
            className="block w-full pl-10 pr-3 py-2.5 text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:border-gray-600 sm:text-sm"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={isPassword ? (isShowingPassword ? "text" : "password") : field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            disabled={field.disabled}
            required={field.required}
            className="block w-full pl-10 pr-3 py-2.5 text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:border-gray-600 sm:text-sm"
            placeholder={field.placeholder}
          />
        )}
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-200"
          >
            {isShowingPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {field.name === "password" && (
        <p className="mt-2 text-sm text-gray-400 italic">
          *Password must be at least 8 characters long.
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
};

export default QuestionInput;