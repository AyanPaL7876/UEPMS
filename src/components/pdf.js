"use client";
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExamPaperPDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF("portrait", "mm", "a4");

    // Custom font sizes
    const headerFontSize = 16;
    const subHeaderFontSize = 12;
    const tableFontSize = 10;
    let startY = 10;

    // New Data to be displayed
    const data = {
      universityName: "ADAMAS UNIVERSITY",
      examDetails: {
        title: "END SEMESTER EXAMINATION (THEORY) DECEMBAR 2024",
        session: "Academic Session: 2024-25",
        date: "December 2024",
      },
      courseInfo: {
        program: ["BCA ", " BCA(GA)"],
        semester: "III",
        name: "DBMS",
        code: "CSE2345",
      },
      examParameters: {
        maxMarks: "50",
        duration: "180",
        totalQuestions: "12",
        totalPages: "2",
      },
      instructions: [
        "Clearly mention University Roll No., Enrolment No., Course Name & Code, Date of Exam on top sheet.",
        "Answer all parts of a Question consecutively. Start each Answer on a fresh page.",
        "State any assumptions clearly at the beginning of your answer.",
      ],
      groups: [
        {
          title: "Group A",
          instructions: "Answer All 5 Questions (5 x 2 = 10)",
          questions: [
            { number: "1", text: "What are the advantages of DBMS over file System?", level: "L1", outcome: "CO3", type: "regular" },
            { number: "2", text: "What are the advantages of DBMS over file System?", level: "L2", outcome: "CO2", type: "regular" },
            { number: "3", text: "What are the advantages of DBMS over file System?", level: "L3", outcome: "CO2", type: "regular" },
            { number: "4", text: "What are the advantages of DBMS over file System?", level: "L3", outcome: "CO3", type: "regular" },
            { number: "5", text: "What are the advantages of DBMS over file System?", level: "L4", outcome: "CO2", type: "regular" },
          ],
        },
        {
          title: "Group B",
          instructions: "Answer All 5 Questions (5 x 4 = 20)",
          questions: [
            { number: "6", text: "Explain Functional dependency.", level: "L3", outcome: "CO3", type: "regular" },
            { number: "7", text: "Explain Functional dependency.", level: "L2", outcome: "CO4", type: "regular" },
            { number: "8", text: "Explain Functional dependency.", level: "L2", outcome: "CO3", type: "regular" },
            { number: "9", text: "Explain Functional dependency.", level: "L3", outcome: "CO3", type: "regular" },
            {
              number: "10", type: "alternative", questions: [
                { number: "10(a)", text: "Explain Functional dependency.", level: "L1", outcome: "CO3" },
                { number: "10(b)", text: "Explain Functional dependency.", level: "L1", outcome: "CO4" },
              ],
            },
          ],
        },
        {
          title: "Group C",
          instructions: "Answer All 5 Questions (2 x 10 = 20)",
          questions: [
            {
              number: "11", type: "alternative", questions: [
                { number: "11(a)", text: "Explain Functional dependency.", level: "L2", outcome: "CO3" },
                { number: "11(b)", text: "What are the advantages of DBMS over file System?", level: "L5", outcome: "CO3" },
              ],
            },
            {
              number: "12", type: "alternative", questions: [
                { number: "12(a)", text: "Explain Functional dependency.", level: "L1", outcome: "CO2" },
                { number: "12(b)", text: "What are the advantages of DBMS over file System?", level: "L1", outcome: "CO2" },
              ],
            },
          ],
        },
      ],
    };

    // 1. Header Section
    doc.setFont("times", "bold");
    doc.setFontSize(headerFontSize);
    doc.text(data.universityName, 105, startY, { align: "center" });

    doc.setFontSize(subHeaderFontSize);
    doc.text(data.examDetails.title, 105, startY + 6, { align: "center" });

    doc.setFont("times", "normal");
    doc.text(`(${data.examDetails.session})`, 105, startY + 12, { align: "center", fontSize: 8 });

    startY += 20

    // 2. Course Info Table
    const courseInfoTable = [
      ["Name of the Program:", data.courseInfo.program.join(", "), "Semester:", data.courseInfo.semester],
      ["Course/Subject Name:", data.courseInfo.name, "Course/Subject Code:", data.courseInfo.code],
      ["Maximum Marks:", data.examParameters.maxMarks, "Time Duration:", data.examParameters.duration],
      ["Total No. of Questions:", data.examParameters.totalQuestions, "Total No. of Pages:", data.examParameters.totalPages],
      [
        { content: "(Any other information for the student may be mentioned here)", styles: { fontStyle: "italic" } },
        { content: data.instructions.join("\n"), colSpan: 3 },
      ],
    ];

    doc.autoTable({
      startY: startY,
      body: courseInfoTable,
      theme: "grid",
      styles: {
        font: "times",
        fontSize: tableFontSize,
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { halign: "left", cellWidth: 50 },
        1: { halign: "left", cellWidth: 50 },
        2: { halign: "left", cellWidth: 50 },
        3: { halign: "left", cellWidth: 40 },
      },
      didDrawCell: function (data) {
        if (data.row.index === 4 && data.column.index === 0) {
          // Italicize specific row
          doc.setFont("times", "italic");
        }
      },
    });

    startY = doc.lastAutoTable.finalY + 10;

    // 3. Iterate over groups and questions
    data.groups.forEach((group) => {
      // Title of the group
      doc.setFont("times", "bold");
      doc.setFontSize(subHeaderFontSize);
      doc.text(group.title, 105, startY, { align: "center" });
      doc.setFontSize(subHeaderFontSize);
      doc.setFont("times", "italic");
      doc.text(group.instructions, 105, startY + 6, { align: "center" });

      // Prepare the questions for the table
      const formattedQuestions = group.questions.flatMap((q) => {
        if (q.type === "alternative") {
          // Insert the "OR" row between alternative questions
          const alternativeRows = [];
          for (let i = 0; i < q.questions.length; i++) {
            const altQ = q.questions[i];
            alternativeRows.push([altQ.number, altQ.text, altQ.level, altQ.outcome]);
            if (i < q.questions.length - 1) {
              // Insert "OR" between alternative questions
              alternativeRows.push([{ content: "OR", colSpan: 4, styles: { fontStyle: "bold", halign: "center"} }]);
            }
          }
          return alternativeRows;
        } else {
          return [[q.number, q.text, q.level, q.outcome]];
        }
      });

      // Add the questions to the table
      doc.autoTable({
        startY: startY + 10,
        head: [["Q No.", "Question", "Knowledge Level", "Course Outcome"]],
        body: formattedQuestions,
        theme: "grid",
        styles: {
          font: "times",
          fontSize: tableFontSize,
          textColor: [0, 0, 0],
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 120 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      });

      startY = doc.lastAutoTable.finalY + 10;
    });

    // Save the document
    doc.save("exam-paper.pdf");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <button
        onClick={generatePDF}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Exam PDF
      </button>
    </div>
  );
};

export default ExamPaperPDF;
