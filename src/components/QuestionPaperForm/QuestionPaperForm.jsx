"use client";

import { useState } from "react";
import Header from "./Header";
import CourseInfo from "./CourseInfo";
import ExamParameters from "./ExamParameters";
import Instructions from "./Instructions";
import QuestionGroup from "./QuestionGroup";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const QuestionPaperForm = () => {
  const [formData, setFormData] = useState({
    universityName: "ADAMAS UNIVERSITY",
    examDetails: {
      title: "END SEMESTER EXAMINATION (THEORY)",
      session: "Academic Session: 2024-25",
      date: "December 2024",
    },
    courseInfo: {
      program: [],
      semester: "",
      name: "",
      code: "",
    },
    examParameters: {
      maxMarks: "",
      duration: "",
      totalQuestions: "",
      totalPages: "",
    },
    instructions: [
      "Clearly mention University Roll No., Enrolment No., Course Name & Code, Date of Exam on top sheet.",
      "Answer all parts of a Question consecutively. Start each Answer on a fresh page.",
      "State any assumptions clearly at the beginning of your answer.",
    ],
    groups: [
      {
        title: "Group A",
        instructions: "",
        questions: [],
      },
      {
        title: "Group B",
        instructions: "",
        questions: [],
      },
      {
        title: "Group C",
        instructions: "",
        questions: [],
      },
    ],
    createdBy: "609b8b8f8f1f1f1f1f1f1f1f",
    status: "draft",
    department: "Computer Science",
    academicYear: "2023-2024",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    status: "", // 'success' or 'error'
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({
      isSubmitting: true,
      status: "",
      message: "",
    });

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus({
          isSubmitting: false,
          status: "success",
          message: "Question paper submitted successfully!",
        });
      } else {
        const errorData = await response.json();
        setSubmissionStatus({
          isSubmitting: false,
          status: "error",
          message:
            errorData.message ||
            "Failed to submit question paper. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus({
        isSubmitting: false,
        status: "error",
        message:
          "Network error occurred. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="bg-white p-8 text-black max-w-5xl mx-auto mb-20 mt-10 playfair-display-bold relative">
      {/* Status Message Toast */}
      {submissionStatus.status && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 ${
            submissionStatus.status === "success"
              ? "bg-green-100 border-l-4 border-green-500"
              : "bg-red-100 border-l-4 border-red-500"
          }`}
        >
          <div className="flex items-center gap-3">
            {submissionStatus.status === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <p
              className={`${
                submissionStatus.status === "success"
                  ? "text-green-700"
                  : "text-red-700"
              } font-medium`}
            >
              {submissionStatus.message}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden mt-14">
        <Header formData={formData} setFormData={setFormData} />
        <div className="grid grid-cols-4 w-full text-base mb-10 border-[1px] border-t-0 border-black">
          <CourseInfo formData={formData} setFormData={setFormData} />
          <ExamParameters formData={formData} setFormData={setFormData} />
          <Instructions
            instructions={formData.instructions}
            setFormData={setFormData}
          />
        </div>
        {formData.groups.map((group, index) => (
          <QuestionGroup
            key={index}
            group={group}
            groupIndex={index}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        <button
          type="submit"
          disabled={submissionStatus.isSubmitting}
          className={`w-full p-4 font-bold mt-4 transition-all duration-300 ${
            submissionStatus.isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {submissionStatus.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
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
              Submitting...
            </span>
          ) : (
            "Submit Question Paper"
          )}
        </button>
      </form>
    </div>
  );
};

export default QuestionPaperForm;
