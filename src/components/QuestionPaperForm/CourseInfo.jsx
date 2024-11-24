import {InfoRowTextArea} from './InfoRow';

const CourseInfo = ({ formData, setFormData }) => {
    const updateCourseInfo = (field, value) => {
      setFormData(prev => ({
        ...prev,
        courseInfo: { 
          ...prev.courseInfo, 
          [field]: field === 'program' ? value.split('/') : value 
        }
      }));
    };
  
    return (
      <>
        <InfoRowTextArea 
          label="Name of the Program:"
          value={formData.courseInfo.program.join('/')}
          onChange={(value) => updateCourseInfo('program', value)}
        />
        <InfoRowTextArea 
          label="Semester:"
          value={formData.courseInfo.semester}
          onChange={(value) => updateCourseInfo('semester', value)}
        />
        <InfoRowTextArea 
          label="Course/Subject Name:"
          value={formData.courseInfo.name}
          onChange={(value) => updateCourseInfo('name', value)}
        />
        <InfoRowTextArea 
          label="Course/Subject Code:"
          value={formData.courseInfo.code}
          onChange={(value) => updateCourseInfo('code', value)}
        />
      </>
    );
  };
  
export default CourseInfo;