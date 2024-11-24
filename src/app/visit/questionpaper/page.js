"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/loading/LoadingPage";

// Error message component with retry functionality
const ErrorMessage = ({ message, onRetry }) => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  </div>
);

const ExamCard = ({ exam, onClick }) => (
  <div
    onClick={onClick}
    className="group relative bg-slate-900 text-white rounded-xl shadow-lg mb-6 overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
  >
    {/* Glowing border effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Inner content with hover effect */}
    <div className="relative bg-slate-900 m-[1px] p-6 rounded-xl transition-transform duration-300 group-hover:bg-slate-800">
      {/* Title section with hover effect */}
      <h2 className="text-xl font-bold mb-4 text-center pb-3 border-b border-slate-700 group-hover:text-blue-400 transition-colors duration-300">
        {exam.examDetails?.title || "Untitled Exam"}
      </h2>

      {/* Content grid with hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
        <div className="space-y-2 transform transition-all duration-300 group-hover:translate-x-2">
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Session:</span> {exam.examDetails?.session || "N/A"}
          </p>
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Date:</span> {exam.examDetails?.date || "N/A"}
          </p>
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Course Code:</span> {exam.courseInfo?.code || "N/A"}
          </p>
        </div>
        <div className="space-y-2 transform transition-all duration-300 group-hover:translate-x-2">
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Max Marks:</span> {exam.examParameters?.maxMarks || "N/A"}
          </p>
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Duration:</span> {exam.examParameters?.duration || "N/A"}
          </p>
          <p className="group-hover:text-white transition-colors duration-300">
            <span className="font-semibold text-blue-400">Course:</span> {exam.courseInfo?.name || "N/A"}
          </p>
        </div>
      </div>

      {/* View Details button that appears on hover */}
      <div className="mt-4 text-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          View Details →
        </span>
      </div>
    </div>
  </div>
);

export default function EnhancedPage({ id }) {
  const router = useRouter();
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExamData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/question");
      if (!response.ok) throw new Error("Failed to fetch exam data");

      const data = await response.json();
      setExamData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  if (loading) return <LoadingPage message="Fetching all Questions" />;
  if (error) return <ErrorMessage message={`Error: ${error}`} onRetry={fetchExamData} />;
  if (!examData.length) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center p-4">No exam data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Question Papers
        </h1>
        <div className="space-y-6 p-5">
          {examData.map((exam, index) => (
            <ExamCard
              key={exam._id || index}
              exam={exam}
              onClick={() => router.push(`/visit/questionpaper/${exam._id || index}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}