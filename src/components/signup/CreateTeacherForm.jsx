"use client";

import React, { useState } from "react";

function CreateTeacherForm({ role, onSubmit, dept, error }) {
  const [name, setName] = useState("");
  // const [dept, setDept] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "HOD") {
      alert("Only HODs can create teachers.");
      return;
    }
    onSubmit({ name, dept, email, password });
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          Create Teacher
        </button>
      </form>
    </div>
  );
}

export default CreateTeacherForm;
