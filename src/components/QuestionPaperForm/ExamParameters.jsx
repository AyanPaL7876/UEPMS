import {InfoRow} from './InfoRow';
const ExamParameters = ({ formData, setFormData }) => {
    const updateExamParams = (field, value) => {
      setFormData(prev => ({
        ...prev,
        examParameters: { ...prev.examParameters, [field]: value }
      }));
    };
  
    return (
      <>
        <InfoRow 
          label="Maximum Marks:"
          value={formData.examParameters.maxMarks}
          onChange={(value) => updateExamParams('maxMarks', value)}
          type="number"
        />
        <InfoRow 
          label="Time Duration:"
          value={formData.examParameters.duration}
          onChange={(value) => updateExamParams('duration', value)}
          type="number"
        />
        <InfoRow 
          label="Total No. of Questions:"
          value={formData.examParameters.totalQuestions}
          onChange={(value) => updateExamParams('totalQuestions', value)}
          type="number"
        />
        <InfoRow 
          label="Total No of Pages:"
          value={formData.examParameters.totalPages}
          onChange={(value) => updateExamParams('totalPages', value)}
          type="number"
        />
      </>
    );
  };

  export default ExamParameters;