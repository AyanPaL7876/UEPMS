"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
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
    groups: [], // Start with empty groups
    createdBy: "609b8b8f8f1f1f1f1f1f1f1f",
    status: "draft",
    department: "Computer Science",
    academicYear: "2023-2024",
  });

  // Function to add a new group
  const addGroup = () => {
    const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const newGroupIndex = formData.groups.length;

    setFormData((prev) => ({
      ...prev,
      groups: [
        ...prev.groups,
        {
          title: `Group ${groupLetters[newGroupIndex]}`,
          instructions: "",
          questions: [],
        },
      ],
    }));
  };

  // Function to remove a group
  const removeGroup = (groupIndex) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.filter((_, index) => index !== groupIndex),
    }));

    // Renumber remaining groups
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.map((group, index) => ({
        ...group,
        title: `Group ${String.fromCharCode(65 + index)}`,
        questions: renumberQuestions(group.questions, index, prev.groups),
      })),
    }));
  };

  // Function to renumber questions
  const renumberQuestions = (questions, groupIndex, allGroups) => {
    let startNumber = 1;
    // Calculate start number based on previous groups
    for (let i = 0; i < groupIndex; i++) {
      startNumber += allGroups[i].questions.length;
    }

    return questions.map((question, index) => {
      const newNumber = startNumber + index;
      if (question.type === "alternative") {
        return {
          ...question,
          number: `${newNumber}`,
          questions: question.questions.map((altQ, altIndex) => ({
            ...altQ,
            number: `${newNumber}(${String.fromCharCode(97 + altIndex)})`,
          })),
        };
      }
      return {
        ...question,
        number: `${newNumber}`,
      };
    });
  };

  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    status: "", // 'success' or 'error'
    message: "",
  });

  const router = useRouter(); // Initialize the router

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

  // Auto-hide the submission status message after 3 seconds and redirect to profile
  useEffect(() => {
    if (submissionStatus.status) {
      const timer = setTimeout(() => {
        setSubmissionStatus((prev) => ({
          ...prev,
          status: "",
        }));

        // Redirect to the profile page after 3 seconds
        router.push("/profile"); // Use the router to navigate to /profile
      }, 3000); // Hide message after 3 seconds

      return () => clearTimeout(timer); // Clean up the timer if component unmounts or status changes
    }
  }, [submissionStatus.status, router]);

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
          <div key={index} className="relative">
            <button
              type="button"
              onClick={() => removeGroup(index)}
              className="absolute right-2 top-2 p-2 bg-red-500 text-white rounded-full"
            >
              ×
            </button>
            <QuestionGroup
              group={group}
              groupIndex={index}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addGroup}
          className="w-full p-4 bg-blue-500 text-white mb-4 hover:bg-blue-600 transition-colors"
        >
          Add New Group
        </button>

        <button
          type="submit"
          disabled={submissionStatus.isSubmitting}
          className={`w-full p-4 font-bold transition-all duration-300 ${
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 0c0-3.314 2.686-6 6-6V4a6 6 0 00-6 6h2z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default QuestionPaperForm;
