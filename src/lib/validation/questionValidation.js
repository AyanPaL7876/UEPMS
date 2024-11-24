export const validateQuestion = (data) => {
    const errors = {};
  
    // Validate main question fields
    if (!data.number?.trim()) {
      errors.number = 'Question number is required';
    }
  
    if (!data.text?.trim()) {
      errors.text = 'Question text is required';
    }
  
    if (!data.marks || data.marks <= 0) {
      errors.marks = 'Valid marks are required';
    }
  
    if (!data.level || !['easy', 'medium', 'hard'].includes(data.level)) {
      errors.level = 'Valid difficulty level is required';
    }
  
    if (!data.outcome?.trim()) {
      errors.outcome = 'Learning outcome is required';
    }
  
    if (!data.questionPaperId) {
      errors.questionPaperId = 'Question paper ID is required';
    }
  
    if (!data.groupId) {
      errors.groupId = 'Group ID is required';
    }
  
    // Validate alternative questions if present
    if (data.type === 'alternative' && Array.isArray(data.alternatives)) {
      const alternativeErrors = [];
  
      data.alternatives.forEach((alt, index) => {
        const altError = {};
  
        if (!alt.number?.trim()) {
          altError.number = 'Alternative question number is required';
        }
  
        if (!alt.text?.trim()) {
          altError.text = 'Alternative question text is required';
        }
  
        if (!alt.marks || alt.marks <= 0) {
          altError.marks = 'Valid marks are required';
        }
  
        if (!alt.level || !['easy', 'medium', 'hard'].includes(alt.level)) {
          altError.level = 'Valid difficulty level is required';
        }
  
        if (!alt.outcome?.trim()) {
          altError.outcome = 'Learning outcome is required';
        }
  
        if (Object.keys(altError).length > 0) {
          alternativeErrors[index] = altError;
        }
      });
  
      if (alternativeErrors.length > 0) {
        errors.alternatives = alternativeErrors;
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };