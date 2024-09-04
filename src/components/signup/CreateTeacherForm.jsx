"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function CreateTeacherForm({ role, onSubmit, dept, error, onCancel }) {
  const [name, setName] = useState("");
// const [dept, setDept] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "HOD") {
      alert("Only HODs can create teachers.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    onSubmit({ name, dept, email, password });
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl py-2">Create Teacher</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-2 px-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="py-2 px-4 rounded"
          required
          disabled
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-2 px-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 px-4 rounded"
          required
        />
        <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`py-2 px-4 rounded w-full ${
              passwordError ? "border-red-500 border" : ""
            }`}
            required
          />
          {passwordError && (
            <p className="text-red-500 absolute top-full left-0 text-sm mt-1">
              {passwordError}
            </p>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between mt-4">
        <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Create Teacher
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTeacherForm;
