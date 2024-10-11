"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RenderField from "@/components/input/renderInput";

function Signup({ userType = "Account", onSubmit, error, inputFields = [] }) {
  const [formData, setFormData] = useState(
    (inputFields || []).reduce(
      (acc, field) => ({ ...acc, [field.name]: field.value || "" }),
      {}
    )
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      const field = inputFields.find(f => f.name === fieldName);
      if (field?.required) {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) newErrors[fieldName] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-5 w-full md:w-3/4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {inputFields?.map((field) => (
        <RenderField
          key={field.name}
          field={field}
          value={formData[field.name] || ""}
          onChange={handleChange}
          error={errors[field.name]}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      ))}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <UserPlus className="inline-block mr-2" />
          Create {userType}
        </button>
      </div>
    </form>
  );
}

export default Signup;