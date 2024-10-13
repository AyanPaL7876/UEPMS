import {
    UserRound,
    Mail,
    LockKeyhole,
    Building
} from 'lucide-react';

const hodInputFields = [
    { 
        name: "name", 
        label: "Name", 
        type: "text", 
        required: true, 
        placeholder: "Enter hod's full name",
        icon: <UserRound className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Name is required";
            if (value.length < 2) return "Name must be at least 2 characters long";
            return "";
        }
    },
    { 
        name: "email", 
        label: "Email", 
        type: "email", 
        required: true, 
        placeholder: "Enter hod's email address",
        icon: <Mail className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Email is required";
            if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
            return "";
        }
    },
    { 
        name: "department", 
        label: "Department", 
        type: "text",
        placeholder: "hod department",
        required: true,
        disabled: false,
        icon: <Building className="h-5 w-5 text-gray-400" />
    },
    { 
        name: "password", 
        label: "Password", 
        type: "password", 
        required: true, 
        placeholder: "Enter your password",
        icon: <LockKeyhole className="h-5 w-5 text-gray-400" />,
        validation: (value) => {
            if (!value) return "Password is required";
            if (value.length < 8) return "Password must be at least 8 characters long";
            // Add more password requirements as needed
            return "";
        }
    },
    { 
        name: "confirmPassword", 
        label: "Confirm Password", 
        type: "password", 
        required: true, 
        placeholder: "Confirm your password",
        icon: <LockKeyhole className="h-5 w-5 text-gray-400" />,
        validation: (value, formData) => {
            if (!value) return "Please confirm your password";
            if (value !== formData.password) return "Passwords do not match";
            return "";
        }
    },
];

export default hodInputFields;