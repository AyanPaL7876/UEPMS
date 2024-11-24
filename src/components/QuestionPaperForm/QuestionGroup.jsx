import React from 'react';
import GroupHeader from './GroupHeader';
import QuestionTable from './QuestionTable';

const QuestionGroup = ({ group, groupIndex, formData, setFormData }) => {
    const updateGroup = (field, value) => {
      const updatedGroups = [...formData.groups];
      updatedGroups[groupIndex][field] = value;
      setFormData(prev => ({ ...prev, groups: updatedGroups }));
    };
  
    const addQuestion = () => {
      const newQuestion = {
        number: `Q-${group.questions.length + 1}`,
        text: "",
        marks: "",
        level: "",
        outcome: ""
      };
      const updatedGroups = [...formData.groups];
      updatedGroups[groupIndex].questions.push(newQuestion);
      setFormData(prev => ({ ...prev, groups: updatedGroups }));
    };
  
    const removeQuestion = (questionIndex) => {
      const updatedGroups = [...formData.groups];
      updatedGroups[groupIndex].questions.splice(questionIndex, 1);
      setFormData(prev => ({ ...prev, groups: updatedGroups }));
    };
  
    return (
      <div className="border border-black mb-4">
        <GroupHeader 
          group={group}
          onTitleChange={(value) => updateGroup('title', value)}
          onInstructionsChange={(value) => updateGroup('instructions', value)}
        />
        <QuestionTable 
          group={group}
          groupIndex={groupIndex}
          formData={formData}
          setFormData={setFormData}
          onRemoveQuestion={removeQuestion}
        />
        <button 
          type="button"
          onClick={addQuestion}
          className="w-full p-2 bg-green-500 text-white"
        >
          Add Question to {group.title}
        </button>
      </div>
    );
  };
  

  export default QuestionGroup;