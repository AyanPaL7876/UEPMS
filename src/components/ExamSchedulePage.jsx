import React from "react";
import Image from "next/image";
import logo from "@/assets/logo/uni.png";

// Reusable component for table rows
const InfoRow = ({ label, value }) => (
  <>
    <div className="p-1 border-[1px] border-black">
      <p className="font-medium">{label}:</p>
    </div>
    <div className="p-1 border-[1px] border-black">
      <p>{value}</p>
    </div>
  </>
);

// Reusable component for question group
const QuestionGroup = ({ group }) => {
  if (!group) return null;
  
  return (
    <div className="">
      <div className="bg-gray-100 text-center font-bold py-2 border border-black">
        <h2 className="text-lg">{group.title}</h2>
        <p>{group.instructions}</p>
      </div>
      {group.title === "Group A" && (
        <div className="grid grid-cols-7 text-center border border-black text-sm">
          <div className="border-r-2 border-black">Question no.</div>
          <div className="col-span-4 border-r-2 border-black">Question</div>
          <div className="border-r-2 border-black p-1">Knowledge Level (L1-6)</div>
          <div className="p-1">Course Outcome (CO1-5)</div>
        </div>
      )}
      {group.questions?.map((question, qIndex) => {
        // Check if the question is an alternative question
        if (question.type === 'alternative') {
          return question.questions?.map((altQuestion, altIndex) => (
            <React.Fragment key={`${qIndex}-${altIndex}`}>
              <QuestionRow 
                question={altQuestion} 
                parentQuestion={question}
              />
              {altIndex === 0 && (  
                <div className="col-span-7 text-center font-medium border-[1px] border-black">
                  <p>OR</p>
                </div>
              )}
            </React.Fragment>
          ));
        }
        // Regular question
        return (
          <QuestionRow 
            key={qIndex} 
            question={question} 
          />
        );
      })}
    </div>
  );
};

// Reusable component for individual question rows
const QuestionRow = ({ question, parentQuestion }) => {
  if (!question) return null;
  
  return (
    <div className="grid grid-cols-7 text-center border-black">
      <p className="border border-black">
        {parentQuestion ? `${parentQuestion.number}${question.number.slice(-3)}` : question.number}
      </p>
      <div className="col-span-4 p-1 border border-black text-left">
        {question.text}
      </div>
      <p className="border border-black">{question.level}</p>
      <p className="border border-black">{question.outcome}</p>
    </div>
  );
};

const ExamSchedulePage = ({ data }) => {
  // Add null check for data
  if (!data) {
    return null;
  }

  const {
    universityName,
    examDetails,
    courseInfo,
    examParameters,
    instructions,
    groups
  } = data;

  // Verify all required data is present
  if (!examDetails || !courseInfo || !examParameters) {
    return <div>Missing required data</div>;
  }

  return (
    <div className="bg-white p-8 text-black max-w-5xl mx-auto mb-20 mt-10 playfair-display-bold">
      <div className="overflow-hidden mt-14">
        <div className="grid grid-cols-4 w-full text-base mb-10 border-[1px] border-black">
          {/* Header Section */}
          <div className="py-1 px-10 border-[1px] border-black h-24 flex justify-center items-center">
            <Image 
              src={logo} 
              alt="University Logo" 
              className="h-20 w-28 object-contain" 
            />
          </div>
          <div className="grid grid-rows-3 border-l-[1px] border-black col-span-3 text-center border-[1px] h-24">
            <h1 className="text-3xl font-bold uppercase">
              {universityName}
            </h1>
            <p className="text-lg uppercase font-bold">
              {examDetails.title}
            </p>
            <p className="text-sm">
              {examDetails.session}
            </p>
          </div>

          {/* Info Grid */}
          <InfoRow 
            label="Name of the Program" 
            value={courseInfo.program.join("/")} 
          />
          <InfoRow 
            label="Semester" 
            value={courseInfo.semester} 
          />
          <InfoRow 
            label="Course/Subject Name" 
            value={courseInfo.name} 
          />
          <InfoRow 
            label="Course/Subject Code" 
            value={courseInfo.code} 
          />
          <InfoRow 
            label="Maximum Marks" 
            value={examParameters.maxMarks} 
          />
          <InfoRow 
            label="Time Duration" 
            value={examParameters.duration} 
          />
          <InfoRow 
            label="Total No. of Questions" 
            value={examParameters.totalQuestions} 
          />
          <InfoRow 
            label="Total No of Pages" 
            value={examParameters.totalPages} 
          />

          {/* Additional Info */}
          <div className="p-1 text-sm border-[1px] border-black">
            <p className="font-light italic">
              (Any other information for the student may be mentioned here)
            </p>
          </div>

          {/* Instructions */}
          <div className="border-t border-[1px] border-black col-span-3">
            <ol className="list-decimal space-y-2 px-2 py-1">
              {instructions?.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Question Groups */}
        <div className="border border-black">
          {groups?.map((group, index) => (
            <QuestionGroup key={index} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSchedulePage;