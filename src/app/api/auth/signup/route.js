import { connect } from "@/db";
import bcrypt from "bcryptjs";
import { User } from "@/modules";
import { authMiddleware } from "@/middleware";
import { validatePassword } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request = NextRequest) {
  let currUser;

  try {

    const {
      name,
      email,
      password,
      role,
      department,
      universityName,
      teacherType,
    } = await request.json();

    // Check if it's an admin creation
    if (role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      console.log("Admin Count:", adminCount);
      if (adminCount > 0) {
        return NextResponse.json(
          { success: false, message: "Admin already exists" },
          { status: 400 }
        );
      }
    } else {
      // For non-admin roles, proceed with the existing logic
      const validateRole =
        role === "teacher"
          ? "hod"
          : role === "hod"
          ? "coe"
          : role === "coe"
          ? "admin"
          : "";

      if (!validateRole) {
        return NextResponse.json(
          { success: false, message: "Invalid role specified" },
          { status: 400 }
        );
      }
      const passwordValidation = validatePassword(password);
      if(!passwordValidation.success){
        return NextResponse.json({ success: false, message: passwordValidation.message }, { status: 400 });
      }

      // Call middleware for authentication
      const { success, user, message, status } = await authMiddleware(
        [validateRole],
        request
      );


      currUser = user;

      if (!success) {
        return NextResponse.json({ success: false, message }, { status });
      }

      // Check permissions
      if (
        (user.role !== "admin" && role === "coe") ||
        (user.role !== "coe" && role === "hod") ||
        (user.role !== "hod" && role === "teacher")
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "You do not have permission to create this user role",
          },
          { status: 403 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password,
      role,
      universityName:
        role === "admin"
          ? undefined
          : role !== "coe"
          ? currUser.universityName
          : universityName,
      department:
        role === "hod"
          ? department
          : role === "teacher"
          ? currUser.department
          : undefined,
      teacherType: role === "teacher" ? teacherType : undefined,
      createdBy: role !== "admin" ? currUser._id : undefined,
      password : hashedPassword
    };

    console.log("data : ", data);
    const newUser = new User(data);
    await newUser.save();

    // Update the creating user's document (not applicable for admin creation)
    if (role !== "admin") {
      switch (role) {
        case "coe":
          await User.findByIdAndUpdate(currUser._id, {
            $push: { coes: newUser._id },
          });
          break;
        case "hod":
          await User.findByIdAndUpdate(currUser._id, {
            $push: { hods: newUser._id },
          });
          break;
        case "teacher":
          await User.findByIdAndUpdate(currUser._id, {
            $push: { teachers: newUser._id },
          });
          break;
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          universityName: newUser.universityName,
          department: newUser.department,
          teacherType: newUser.teacherType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
