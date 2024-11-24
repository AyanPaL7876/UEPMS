import React, { useState } from 'react';
import Image from "next/image";
import logo from "@/assets/logo/uni.png";

const QuestionPaperForm = () => {
  const [formData, setFormData] = useState({
    universityName: "ADAMAS UNIVERSITY",
    examDetails: {
      title: "END SEMESTER EXAMINATION (THEORY)",
      session: "Academic Session: 2024-25",
      date: "December 2024"
    },
    courseInfo: {
      program: [],
      semester: "",
      name: "",
      code: ""
    },
    examParameters: {
      maxMarks: "",
      duration: "",
      totalQuestions: "",
      totalPages: ""
    },
    instructions: [],
    groups: [
      {
        title: "Group A",
        instructions: "",
        questions: []
      },
      {
        title: "Group B",
        instructions: "",
        questions: []
      },
      {
        title: "Group C",
        instructions: "",
        questions: []
      }
    ]
  });

  const updateNestedState = (path, value) => {
    const updatePath = path.split('.');
    setFormData(prev => {
      const newState = { ...prev };
      let current = newState;
      for (let i = 0; i < updatePath.length - 1; i++) {
        current = current[updatePath[i]];
      }
      current[updatePath[updatePath.length - 1]] = value;
      return newState;
    });
  };

  const addQuestion = (groupIndex) => {
    const newQuestion = {
      number: `Q-${formData.groups[groupIndex].questions.length + 1}`,
      text: "",
      marks: "",
      level: "",
      outcome: ""
    };
    const updatedGroups = [...formData.groups];
    updatedGroups[groupIndex].questions.push(newQuestion);
    setFormData(prev => ({ ...prev, groups: updatedGroups }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/university/createquestionpaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Question paper submitted successfully!');
      } else {
        alert('Failed to submit question paper');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting');
    }
  };

  return (
    <div className="bg-white p-8 text-black max-w-5xl mx-auto mb-20 mt-10 playfair-display-bold">
      <form onSubmit={handleSubmit} className="overflow-hidden mt-14">
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
            <input 
              className="text-3xl font-bold uppercase text-center w-full"
              value={formData.universityName}
              onChange={(e) => setFormData(prev => ({ ...prev, universityName: e.target.value }))}
            />
            <input 
              className="text-lg uppercase font-bold text-center w-full"
              value={formData.examDetails.title}
              onChange={(e) => updateNestedState('examDetails.title', e.target.value)}
            />
            <input 
              className="text-sm text-center w-full"
              value={formData.examDetails.session}
              onChange={(e) => updateNestedState('examDetails.session', e.target.value)}
            />
          </div>

          {/* Info Grid */}
          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Name of the Program:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              className="w-full"
              value={formData.courseInfo.program.join("/")}
              onChange={(e) => updateNestedState('courseInfo.program', e.target.value.split("/"))}
            />
          </div>
          
          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Semester:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              className="w-full"
              value={formData.courseInfo.semester}
              onChange={(e) => updateNestedState('courseInfo.semester', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Course/Subject Name:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              className="w-full"
              value={formData.courseInfo.name}
              onChange={(e) => updateNestedState('courseInfo.name', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Course/Subject Code:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              className="w-full"
              value={formData.courseInfo.code}
              onChange={(e) => updateNestedState('courseInfo.code', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Maximum Marks:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              type="number"
              className="w-full"
              value={formData.examParameters.maxMarks}
              onChange={(e) => updateNestedState('examParameters.maxMarks', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Time Duration:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              type="number"
              className="w-full"
              value={formData.examParameters.duration}
              onChange={(e) => updateNestedState('examParameters.duration', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Total No. of Questions:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              type="number"
              className="w-full"
              value={formData.examParameters.totalQuestions}
              onChange={(e) => updateNestedState('examParameters.totalQuestions', e.target.value)}
            />
          </div>

          <div className="p-1 border-[1px] border-black">
            <p className="font-medium">Total No of Pages:</p>
          </div>
          <div className="p-1 border-[1px] border-black">
            <input 
              type="number"
              className="w-full"
              value={formData.examParameters.totalPages}
              onChange={(e) => updateNestedState('examParameters.totalPages', e.target.value)}
            />
          </div>

          {/* Instructions */}
          <div className="p-1 text-sm border-[1px] border-black">
            <p className="font-light italic">Instructions</p>
          </div>
          <div className="border-t border-[1px] border-black col-span-3">
            {formData.instructions.map((instruction, idx) => (
              <div key={idx} className="flex">
                <input 
                  className="w-full p-1"
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...formData.instructions];
                    newInstructions[idx] = e.target.value;
                    setFormData(prev => ({ ...prev, instructions: newInstructions }));
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    const newInstructions = formData.instructions.filter((_, i) => i !== idx);
                    setFormData(prev => ({ ...prev, instructions: newInstructions }));
                  }}
                  className="px-2 bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                instructions: [...prev.instructions, ''] 
              }))}
              className="w-full p-1 bg-green-500 text-white"
            >
              Add Instruction
            </button>
          </div>
        </div>

        {/* Question Groups */}
        {formData.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="border border-black mb-4">
            <div className="bg-gray-100 text-center font-bold py-2 border border-black">
              <input 
                className="text-lg text-center w-full"
                value={group.title}
                onChange={(e) => {
                  const updatedGroups = [...formData.groups];
                  updatedGroups[groupIndex].title = e.target.value;
                  setFormData(prev => ({ ...prev, groups: updatedGroups }));
                }}
              />
              <input 
                className="text-center w-full"
                value={group.instructions}
                onChange={(e) => {
                  const updatedGroups = [...formData.groups];
                  updatedGroups[groupIndex].instructions = e.target.value;
                  setFormData(prev => ({ ...prev, groups: updatedGroups }));
                }}
              />
            </div>

            <div className="grid grid-cols-7 text-center border border-black text-sm">
              <div className="border-r-2 border-black">Question no.</div>
              <div className="col-span-4 border-r-2 border-black">Question</div>
              <div className="border-r-2 border-black p-1">Knowledge Level (L1-6)</div>
              <div className="p-1">Course Outcome (CO1-5)</div>
            </div>

            {group.questions.map((question, questionIndex) => (
              <React.Fragment key={questionIndex}>
                {renderQuestionRow(group, groupIndex, question, questionIndex)}
                <div className="flex">
                  <button 
                    type="button"
                    onClick={() => addAlternativeQuestion(groupIndex, questionIndex)}
                    className="w-1/2 p-2 bg-blue-500 text-white"
                  >
                    Add Alternative Question
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      const updatedGroups = [...formData.groups];
                      updatedGroups[groupIndex].questions.splice(questionIndex, 1);
                      setFormData(prev => ({ ...prev, groups: updatedGroups }));
                    }}
                    className="w-1/2 p-2 bg-red-500 text-white"
                  >
                    Remove Question
                  </button>
                </div>
              </React.Fragment>
            ))}

            <button 
              type="button"
              onClick={() => addQuestion(groupIndex)}
              className="w-full p-2 bg-green-500 text-white"
            >
              Add Question to {group.title}
            </button>
          </div>
        ))}

        <button 
          type="submit" 
          className="w-full p-4 bg-green-600 text-white font-bold mt-4"
        >
          Submit Question Paper
        </button>
      </form>
    </div>
  );
};

export default QuestionPaperForm;