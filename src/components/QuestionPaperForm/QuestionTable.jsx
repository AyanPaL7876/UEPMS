"use client";

import React, { useEffect, useRef } from 'react';

const AutoResizeTextArea = ({ value, onChange, className }) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`${className} overflow-hidden resize-none`}
      rows={1}
    />
  );
};

const QuestionTable = ({ group, groupIndex, formData, setFormData, onRemoveQuestion }) => {
  const knowledgeLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
  const courseOutcomes = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5'];

  const calculateQuestionNumber = (questionIndex) => {
    let startNumber = 1;
    // Calculate start number based on previous groups
    for (let i = 0; i < groupIndex; i++) {
      startNumber += formData.groups[i].questions.length;
    }
    return startNumber + questionIndex;
  };

  const addAlternativeQuestion = (questionIndex) => {
    const updatedGroups = [...formData.groups];
    const currentQuestion = updatedGroups[groupIndex].questions[questionIndex];
    const baseNumber = calculateQuestionNumber(questionIndex);
    
    if (!currentQuestion.type) {
      currentQuestion.type = 'alternative';
      currentQuestion.questions = [
        { ...currentQuestion },
        {
          number: `${baseNumber}(b)`,
          text: "",
          level: "",
          outcome: ""
        }
      ];
      currentQuestion.questions[0].number = `${baseNumber}(a)`;
      delete currentQuestion.text;
      delete currentQuestion.level;
      delete currentQuestion.outcome;
    } else {
      const nextLetter = String.fromCharCode(97 + currentQuestion.questions.length);
      currentQuestion.questions.push({
        number: `${baseNumber}(${nextLetter})`,
        text: "",
        level: "",
        outcome: ""
      });
    }

    setFormData(prev => ({ ...prev, groups: updatedGroups }));
  };
  
    const renderQuestionRow = (question, questionIndex) => {
      if (question.type === 'alternative') {
        return (
          <>
            {question.questions.map((altQuestion, altIndex) => (
              <React.Fragment key={altIndex}>
                <div className="grid grid-cols-7 text-center border-black">
                  <input 
                    className="border border-black p-1"
                    value={altQuestion.number}
                    onChange={(e) => {
                      const updatedGroups = [...formData.groups];
                      updatedGroups[groupIndex].questions[questionIndex].questions[altIndex].number = e.target.value;
                      setFormData(prev => ({ ...prev, groups: updatedGroups }));
                    }}
                  />
                  <div className="col-span-4 p-1 border border-black text-left">
                    <AutoResizeTextArea 
                      className="w-full"
                      value={altQuestion.text}
                      onChange={(e) => {
                        const updatedGroups = [...formData.groups];
                        updatedGroups[groupIndex].questions[questionIndex].questions[altIndex].text = e.target.value;
                        setFormData(prev => ({ ...prev, groups: updatedGroups }));
                      }}
                    />
                  </div>
                  <select 
                    required={true}
                    className="border border-black"
                    value={altQuestion.level}
                    onChange={(e) => {
                      const updatedGroups = [...formData.groups];
                      updatedGroups[groupIndex].questions[questionIndex].questions[altIndex].level = e.target.value;
                      setFormData(prev => ({ ...prev, groups: updatedGroups }));
                    }}
                  >
                    <option value="">Select Level</option>
                    {knowledgeLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <select 
                    required={true}
                    className="border border-black"
                    value={altQuestion.outcome}
                    onChange={(e) => {
                      const updatedGroups = [...formData.groups];
                      updatedGroups[groupIndex].questions[questionIndex].questions[altIndex].outcome = e.target.value;
                      setFormData(prev => ({ ...prev, groups: updatedGroups }));
                    }}
                  >
                    <option value="">Select CO</option>
                    {courseOutcomes.map(co => (
                      <option key={co} value={co}>{co}</option>
                    ))}
                  </select>
                </div>
                {altIndex === 0 && (
                  <div className="col-span-7 text-center font-medium border-[1px] border-black">
                    <p>OR</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        );
      }
  
      return (
        <div className="grid grid-cols-7 text-center border-black">
          <AutoResizeTextArea 
            className="border border-black p-1"
            value={question.number}
            onChange={(e) => {
              const updatedGroups = [...formData.groups];
              updatedGroups[groupIndex].questions[questionIndex].number = e.target.value;
              setFormData(prev => ({ ...prev, groups: updatedGroups }));
            }}
          />
          <div className="col-span-4 p-1 border border-black text-left">
            <AutoResizeTextArea 
              className="w-full"
              value={question.text}
              onChange={(e) => {
                const updatedGroups = [...formData.groups];
                updatedGroups[groupIndex].questions[questionIndex].text = e.target.value;
                setFormData(prev => ({ ...prev, groups: updatedGroups }));
              }}
            />
          </div>
          <select 
            className="border border-black"
            value={question.level}
            onChange={(e) => {
              const updatedGroups = [...formData.groups];
              updatedGroups[groupIndex].questions[questionIndex].level = e.target.value;
              setFormData(prev => ({ ...prev, groups: updatedGroups }));
            }}
          >
            <option value="">Select Level</option>
            {knowledgeLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select 
            className="border border-black"
            value={question.outcome}
            onChange={(e) => {
              const updatedGroups = [...formData.groups];
              updatedGroups[groupIndex].questions[questionIndex].outcome = e.target.value;
              setFormData(prev => ({ ...prev, groups: updatedGroups }));
            }}
          >
            <option value="">Select CO</option>
            {courseOutcomes.map(co => (
              <option key={co} value={co}>{co}</option>
            ))}
          </select>
        </div>
      );
    };
  
    return (
      <>
        <div className="grid grid-cols-7 text-center border border-black text-sm">
          <div className="border-r-2 border-black">Question no.</div>
          <div className="col-span-4 border-r-2 border-black">Question</div>
          <div className="border-r-2 border-black p-1">Knowledge Level (L1-6)</div>
          <div className="p-1">Course Outcome (CO1-5)</div>
        </div>
  
        {group.questions.map((question, questionIndex) => (
          <React.Fragment key={questionIndex}>
            {renderQuestionRow(question, questionIndex)}
            <div className="flex">
              <button 
                type="button"
                onClick={() => addAlternativeQuestion(questionIndex)}
                className="w-1/2 p-2 bg-blue-500 text-white"
              >
                Add Alternative Question
              </button>
              <button 
                type="button"
                onClick={() => onRemoveQuestion(questionIndex)}
                className="w-1/2 p-2 bg-red-500 text-white"
              >
                Remove Question
              </button>
            </div>
          </React.Fragment>
        ))}
      </>
    );
};

export default QuestionTable;