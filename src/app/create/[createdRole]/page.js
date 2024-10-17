"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Signup from "@/components/Signup";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";
import signupImg from "@/assets/img/signup.png";
import {
  teacherInputFields,
  coeInputFields,
  hodInputFields,
} from "@/data/signupFields";
import Loading from "@/components/common/loading";

const CreatePage = ({ params }) => {
  const { createdRole } = params;
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modifiedFields, setModifiedFields] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = getTokenFromCookies();
        if (!token) {
          setError("You must be logged in to access this page");
          router.push("/login");
          return;
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken || !decodedToken.role) {
          setError("Invalid token");
          router.push("/login");
          return;
        }

        setRole(decodedToken.role);
        setDept(decodedToken.department);
        setUniversityName(decodedToken.universityName);

        let selectedFields;
        switch (createdRole) {
          case "teacher":
            selectedFields = teacherInputFields;
            break;
          case "hod":
            selectedFields = hodInputFields;
            break;
          case "coe":
            selectedFields = coeInputFields;
            break;
          default:
            selectedFields = teacherInputFields;
        }

        const updatedFields = selectedFields.map((field) => {
          if (field.name === "department" && createdRole !== "hod") {
            return {
              ...field,
              value: decodedToken.department,
              disabled: createdRole !== "hod",
            };
          }
          return field;
        });

        setModifiedFields(updatedFields);
      } catch (err) {
        console.error("Error checking token:", err);
        setError("An error occurred while verifying your credentials");
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router, createdRole]);

  const capitalizeFirstLetter = (s) => {
    if (s === "teacher") return "Teacher";
    else if (s === "hod") return "HOD";
    if (s === "coe") return "COE";
    else return s;
  };

  const handleCreateUser = async (formData) => {
    console.log(formData);
    console.log("created role:", createdRole);
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: createdRole,
          department: formData.department || dept,
          universityName: formData.universityName || universityName,
          teacherType: createdRole === "teacher" ? formData.teacherType : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/allusers");
      } else {
        setError(data.message || `Error during ${createdRole} creation`);
        console.log(data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError(
        `An unexpected error occurred while creating the ${createdRole} account.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const canCreate =
    role === "admin"
      ? "coe"
      : role === "coe"
      ? "hod"
      : role === "hod"
      ? "teacher"
      : "";

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (createdRole !== canCreate) {
    return (
      <div className="flex min-h-[96vh] items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">
            {role}s can not create {createdRole}.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    // <div>OK</div>
    <div className="flex min-h-[95vh] flex-col justify-start items-center p-4">
      <div className="w-1/2 pb-3 pt-10">
        <h2 className="text-3xl text-white font-bold mb-4 text-center">
          Create {capitalizeFirstLetter(createdRole)} Account
        </h2>
        <p className="text-gray-300 text-center">
          Add a new {createdRole} to the {dept} department.
        </p>
      </div>
      <div className="flex overflow-hidden max-w-4xl w-full gap-2">
        <div className="w-1/2 items-center justify-center hidden md:flex">
          <Image
            src={signupImg}
            alt="Teacher signup illustration"
            className="max-w-full h-auto"
            priority
          />
        </div>
        <Signup
          userType={createdRole}
          inputFields={modifiedFields}
          onSubmit={handleCreateUser}
          error={error}
        />
      </div>
    </div>
  );
};

export default CreatePage;