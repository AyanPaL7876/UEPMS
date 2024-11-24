import ActionButton from "@/components/ActionButton";
import ExamSchedulePage from "@/components/ExamSchedulePage";
import QuestionPaperForm from "@/components/QuestionPaperForm/QuestionPaperForm";
import React from "react";

function page() {
  const examData = {
    universityName: "ADAMAS UNIVERSITY",
    examDetails: {
      title: "END SEMESTER EXAMINATION (THEORY)",
      session: "Academic Session: 2024-25",
      date: "December 2024"
    },
    courseInfo: {
      program: ["BCA", "BCABFSI", "BCAGA"],
      semester: "III",
      name: "Database Management System",
      code: "CSE11412"
    },
    examParameters: {
      maxMarks: 50,
      duration: 180, // minutes
      totalQuestions: 12,
      totalPages: 2
    },
    instructions: [
      "Clearly mention University Roll No., Enrolment No., Course Name & Code, Date of Exam on top sheet.",
      "Answer all parts of a Question consecutively. Start each Answer on a fresh page.",
      "State any assumptions clearly at the beginning of your answer."
    ],
    groups: [
      {
        title: "Group A",
        instructions: "Answer All 5 Questions (5 × 2 = 10 marks)",
        questions: [
          {
            number: "Q-1",
            text: "What are the advantages of DBMS over File System?",
            marks: 2,
            level: "L2",
            outcome: "CO2"
          },
          {
            number: "Q-2",
            text: "Explain Functional Dependency.",
            marks: 2,
            level: "L2",
            outcome: "CO2"
          },
          {
            number: "Q-3",
            text: "Differentiate between DML and DDL.",
            marks: 2,
            level: "L3",
            outcome: "CO3"
          },
          {
            number: "Q-4",
            text: "What is a Composite Primary Key?",
            marks: 2,
            level: "L4",
            outcome: "CO3"
          },
          {
            number: "Q-5",
            text: "Define Aggregation.",
            marks: 2,
            level: "L1",
            outcome: "CO1"
          }
        ]
      },
      {
        title: "Group B",
        instructions: "Answer All 5 Questions (5 × 4 = 20 marks)",
        questions: [
          {
            number: "Q-6",
            text: "Explain Generalization and Specialization with Example.",
            marks: 4,
            level: "L2",
            outcome: "CO2"
          },
          {
            number: "Q-7",
            text: "Briefly Discuss ACID Properties of Transaction.",
            marks: 4,
            level: "L1",
            outcome: "CO1"
          },
          {
            number: "Q-8",
            text: "Define Two-Phase Locking Protocol.",
            marks: 4,
            level: "L2",
            outcome: "CO2"
          },
          {
            number: "Q-9",
            text: "Discuss 2NF with Example.",
            marks: 4,
            level: "L3",
            outcome: "CO3"
          },
          {
            number: "Q-10",
            type: "alternative",
            questions: [
              {
                number: "Q-10(a)",
                text: "Construct an ER Diagram for an Online Medicine Delivery System.",
                marks: 4,
                level: "L4",
                outcome: "CO4"
              },
              {
                number: "Q-10(b)",
                text: "Explain Armstrong's Axioms.",
                marks: 4,
                level: "L4",
                outcome: "CO4"
              }
            ]
          }
        ]
      },
      {
        title: "Group C",
        instructions: "Answer All 2 Questions (2 × 10 = 20 marks)",
        questions: [
          {
            number: "Q-11",
            type: "alternative",
            questions: [
              {
                number: "Q-11(a)",
                text: "Construct an ER Diagram of Hospital Management System.",
                marks: 6,
                level: "L4",
                outcome: "CO4"
              },
              {
                number: "Q-11(b)",
                text: "Explain Conflict Serializability. Determine if the given schedule is Conflict Serializable (4+6).",
                marks: 10,
                level: "L3",
                outcome: "CO3"
              }
            ]
          },
          {
            number: "Q-12",
            type: "alternative",
            questions: [
              {
                number: "Q-12(a)",
                text: "Construct an ER Diagram of Hospital Management System.",
                marks: 6,
                level: "L4",
                outcome: "CO4"
              },
              {
                number: "Q-12(b)",
                text: "Explain the Concept of Normalization.",
                marks: 10,
                level: "L4",
                outcome: "CO4"
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-slate-950">
      <ActionButton />
      {/* <ExamSchedulePage data={examData} /> */}
      <QuestionPaperForm/>

    </div>
  );
}

export default page;
