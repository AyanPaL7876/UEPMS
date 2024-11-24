"use client";

import ExamSchedulePage from "@/components/ExamSchedulePage";
import LoadingPage from "@/components/loading/LoadingPage";
import React, { useState, use } from "react";

function Page({ params }) {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Safely unwrap params using React.use()
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/question/${id}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setQuestionPaper(result.data);
      } else {
        setError("Failed to load question paper data");
      }
    } catch (error) {
      console.error("Error fetching question paper:", error);
      setError("Failed to fetch question paper");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <LoadingPage message="Loading question paper..." />;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!questionPaper) {
    return <div className="flex justify-center items-center min-h-screen">No question paper found</div>;
  }

  return (
    <div className="bg-slate-950">
      {/* Only render ExamSchedulePage when we have data */}
      <ExamSchedulePage data={questionPaper} />
    </div>
  );
}

export default Page;