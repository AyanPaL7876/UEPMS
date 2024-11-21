import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ExamPDFGenerator = () => {
  const [jsonInput, setJsonInput] = useState('');

  const generatePDF = () => {
    try {
      const data = JSON.parse(jsonInput);
      const doc = new jsPDF();

      // Set up initial margins and font
      const marginX = 10;
      let yPosition = 15;
      doc.setFont('helvetica');

      // University and Exam Header
      doc.setFontSize(16);
    //   doc.setFontType('bold');
      doc.text('ADAMAS UNIVERSITY', 105, yPosition, { align: 'center' });
      yPosition += 7;
      doc.setFontSize(12);
      doc.text('END SEMESTER EXAMINATION DECEMBER 2023', 105, yPosition, { align: 'center' });
      yPosition += 6;
      doc.text('(Academic Session: 2023-24)', 105, yPosition, { align: 'center' });
      yPosition += 10;

      // Exam Details Section
      doc.rect(marginX, yPosition, 190, 30); // Outer border
      doc.setFontSize(10);
    //   doc.setFontType('normal');
      doc.text(`Name of the Program: ${data.programName.join(', ')}`, marginX + 2, yPosition + 5);
      doc.text(`Semester: ${data.semester}`, 160, yPosition + 5);
      doc.text(`Course/Subject Name: ${data.subjectName}`, marginX + 2, yPosition + 12);
      doc.text(`Course/Subject Code: ${data.subjectCode}`, 160, yPosition + 12);
      doc.text(`Maximum Marks: ${data.totalMarks}`, marginX + 2, yPosition + 19);
      doc.text(`Time Duration: ${data.timeAllowed} Minutes`, 160, yPosition + 19);
      doc.text(`Total No. of Questions: ${data.totalQuestions}`, marginX + 2, yPosition + 26);
      doc.text('Total No. of Pages: 02', 160, yPosition + 26);
      yPosition += 35;

      // Instructions Section
      doc.rect(marginX, yPosition, 190, 15);
      const instructions = [
        '1. At top sheet, clearly mention Univ. Roll No., Enrolment No., Course Name & Code, Date of Exam.',
        '2. All parts of a Question should be answered consecutively. Each Answer should start from a fresh page.',
        '3. Assumptions made if any, should be stated clearly at the beginning of your answer.'
      ];
      instructions.forEach((inst, index) => {
        doc.text(inst, marginX + 2, yPosition + 5 + index * 5);
      });
      yPosition += 20;

      // Question Groups
      Object.entries(data.questions).forEach(([group, questions], groupIndex) => {
        // Group Header
        doc.rect(marginX, yPosition, 190, 10);
        doc.setFontSize(12);
        // doc.setFontType('bold');
        doc.text(`Group ${group}`, marginX + 2, yPosition + 7);
        doc.text(`Answer All ${questions.length} Questions`, 160, yPosition + 7);
        yPosition += 12;

        // Questions
        questions.forEach((question, index) => {
          doc.setFontSize(10);
        //   doc.setFontType('normal');
          doc.rect(marginX, yPosition, 190, question.options.length > 0 ? 15 : 10);
          doc.text(`${index + 1}. ${question.text}`, marginX + 2, yPosition + 5);
          yPosition += 5;

          if (question.options && question.options.length > 0) {
            question.options.forEach((option, optionIndex) => {
              doc.text(`   ${String.fromCharCode(65 + optionIndex)}. ${option}`, marginX + 7, yPosition + 5);
              yPosition += 5;
            });
          }
          yPosition += 5;
        });
        yPosition += 5;
      });

      // Generate and open PDF
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      alert('Invalid JSON format. Please enter valid JSON.');
      console.log('Error:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <textarea
        rows="8"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON data here"
        className="border p-2 w-full"
      />
      <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2">
        Generate PDF
      </button>
    </div>
  );
};

export default ExamPDFGenerator;