"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateQuestion from "@/components/createQuestion";
import Loading from "@/components/common/loading";
import { getTokenFromCookies, decodeToken } from "@/utils/auth";
import { QuestionCreateInputFields, groupFieldsTemplate } from "@/data/createQuestionFields";
import { Group } from "lucide-react";

const CreatePage = () => {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
        setDepartment(decodedToken.department);
        setUniversityName(decodedToken.universityName);
      } catch (err) {
        console.error("Error checking token:", err);
        setError("An error occurred while verifying your credentials");
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router]);

  const handleCreateQuestion = async (formData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify({
          ...formData,
          universityName,
          department,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/home");
      } else {
        setError(data.message || "Error during question creation");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred while creating the question.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (role !== "coe") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">
            Only COE can create question papers.
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
    <div className="flex min-h-screen flex-col justify-start items-center p-4">
      <div className="w-full pb-3 px-3 pt-10">
        <h2 className="text-3xl text-white font-bold mb-4 text-center">
          Create Question Paper
        </h2>
        <p className="text-gray-300 text-center">
          Add a new question paper for the department.
        </p>
      </div>
      <div className="flex justify-center items-center overflow-hidden max-w-4xl w-full gap-2">
        <CreateQuestion
          userType="QuestionPaper"
          inputFields={QuestionCreateInputFields}
          groupFields={groupFieldsTemplate}
          onSubmit={handleCreateQuestion}
          error={error}
        />
      </div>
    </div>
  );
};

export default CreatePage;
