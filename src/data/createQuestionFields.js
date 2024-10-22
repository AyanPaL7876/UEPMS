import {
    University,
    Calendar,
    FileText,
    GraduationCap,
    BookOpen,
    FileCode,
    Layers,
    Award,
    Timer,
    Building2,
    Paperclip
} from 'lucide-react';

const QuestionCreateInputFields = [
    { 
        name: "UniName", 
        label: "University Name", 
        type: "text", 
        required: true, 
        placeholder: "Enter University Name",
        icon: <University className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "University name is required";
            if (value.length < 2) return "University name must be at least 2 characters long";
            return "";
        }
    },
    { 
        name: "AcademicYear", 
        label: "Academic Year", 
        type: "text", 
        required: true, 
        placeholder: "Enter Academic Year",
        icon: <Calendar className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Year is required";
            if (value.length < 4) return "Year must be at least 4 characters long";
            return "";
        }
    },
    { 
        name: "Type", 
        label: "Question Type", 
        type: "select",
        options: ["theory", "practical"],
        icon: <FileText className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Question Type is required";
            return "";
        }
    },
    { 
        name: "programName", 
        label: "Program name", 
        type: "text",  
        required: true, 
        placeholder: "Enter Program name, e.g. B.Tech",
        icon: <GraduationCap className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "paperName", 
        label: "Paper name", 
        type: "text",  
        required: true, 
        placeholder: "Enter paper name",
        icon: <BookOpen className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "paperCode", 
        label: "Paper Code", 
        type: "text", 
        required: true,  
        placeholder: "Enter paper Code",
        icon: <FileCode className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "semester", 
        label: "Semester", 
        type: "select",
        options: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
        icon: <Layers className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Semester is required";
            return "";
        }
    },
    { 
        name: "MaximunMarks", 
        label: "Maximun Marks", 
        type: "number",  
        required: true, 
        placeholder: "Enter Maximum Marks",
        icon: <Award className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "TimeDuration", 
        label: "Time Duration", 
        type: "number",  
        required: true, 
        placeholder: "Enter Time Duration, e.g. 180",
        icon: <Timer className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "Depertment", 
        label: "Department", 
        type: "text",  
        required: true, 
        placeholder: "Enter Department, e.g. CSE",
        icon: <Building2 className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "totalGroups", 
        label: "Total number of groups", 
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        icon: <Paperclip className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Total number of groups is required";
            return "";
        }
    },
];

const groupFieldsTemplate = [
    {
        name: "groupType",
        label: "Group Type",
        type: "select",
        options: ["MCQ (1)", "SAQ (2)", "LAQ (4)", "LAQ (5)", "LAQ (10)"],
        icon: <FileText className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Group Type is required";
            return "";
        }
    },
    {
        name: "totalMarks",
        label: "Total Marks",
        type: "number",
        required: true,
        placeholder: "Enter Total Marks",
        icon: <Award className="h-5 w-5 text-gray-400" />
    },
    {
        name: "extraQuestions",
        label: "Extra Questions",
        type: "select",
        options: ["No Extra", "One Question Extra", "Two Questions Extra", "Each Question Has One OR", "Last Question Has OR"],
        icon: <Layers className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Extra Questions is required";
            return "";
        }
    }
];

export { QuestionCreateInputFields, groupFieldsTemplate };
