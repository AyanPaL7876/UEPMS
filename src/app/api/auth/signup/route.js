import { connect } from "@/db";
import bcrypt from "bcryptjs";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { validatePassword } from "@/lib";

// Constants
const VALID_ROLES = ["admin", "coe", "hod", "teacher"];
const VALID_TEACHER_TYPES = ["external", "internal"];
const PHONE_LENGTH = 10;

export async function POST(request) {
  try {
    await connect();
    const reqBody = await request.json();
    
    // Validate required fields
    const missingFields = validateRequiredFields(reqBody);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(reqBody.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate role
    if (!VALID_ROLES.includes(reqBody.role)) {
      return NextResponse.json(
        { success: false, message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // Check admin limit
    if (reqBody.role === "admin") {
      const adminExists = await checkAdminExists();
      if (adminExists) {
        return NextResponse.json(
          { success: false, message: "Admin already exists" },
          { status: 400 }
        );
      }
    }

    // Validate role-specific requirements
    const roleValidation = await validateRoleRequirements(reqBody);
    if (!roleValidation.isValid) {
      return NextResponse.json(
        { success: false, message: roleValidation.message },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: reqBody.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Format and validate phone
    const formattedPhone = formatPhone(reqBody.phone);
    if (!formattedPhone) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Hash password
    validatePassword(reqBody.password);
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    // Create user
    const userData = createUserData(reqBody, hashedPassword, formattedPhone);
    const newUser = new User(userData);
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        data: sanitizeUserData(newUser),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        detail: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}

// Helper functions
function validateRequiredFields(data) {
  const requiredFields = [
    "name",
    "email",
    "password",
    "role",
    "universityName",
    "phone",
    "address",
    "employeeId",
    "specialization",
    "experience",
  ];
  return requiredFields.filter(field => !data[field]);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function checkAdminExists() {
  const adminCount = await User.countDocuments({ role: "admin" });
  return adminCount > 0;
}

async function validateRoleRequirements(data) {
  if ((data.role === "hod" || data.role === "teacher") && (!data.school || !data.department)) {
    return {
      isValid: false,
      message: "school and department are required for HOD and teacher roles",
    };
  }

  if (data.role === "teacher" && (!data.teacherType || !VALID_TEACHER_TYPES.includes(data.teacherType))) {
    return {
      isValid: false,
      message: `Valid teacherType (${VALID_TEACHER_TYPES.join(" or ")}) is required for teacher role`,
    };
  }

  return { isValid: true };
}

function formatPhone(phone) {
  if (!phone || phone.length !== PHONE_LENGTH) {
    return null;
  }
  return `+91${phone}`;
}

function createUserData(data, hashedPassword, formattedPhone) {
  return {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    universityName: data.universityName,
    phone: formattedPhone,
    address: data.address,
    employeeId: data.employeeId,
    specialization: data.specialization,
    experience: data.experience,
    status: "active",
    department: data.department || undefined,
    school: data.school || undefined,
    teacherType: data.role === "teacher" ? data.teacherType : undefined,
    createdAt: new Date(),
  };
}

function sanitizeUserData(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    universityName: user.universityName,
    department: user.department,
    school: user.school,
    teacherType: user.teacherType,
    status: user.status,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };
}