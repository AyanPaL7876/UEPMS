import { connect } from "@/db/dbConnnect";
import { User } from "@/modules/UserSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
  const jsonBody = await request.json();
  const { email, password } = jsonBody;

  await connect();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 400 }
      );
    }

    // Construct the data
    let data = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Conditionally add `dept` if the role is neither 'admin' nor 'COE'
    if (user.role !== "admin" && user.role !== "COE") {
      data.dept = user.dept;
    }
    if (user.role !== "admin") {
      data.universityName = user.universityName;
    }

    // Sign the token with the constructed data
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    console.log(token);

    user.lastLogin = new Date();
    await user.save();

    const response = NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Server Error:", error); // Added logging for the server error
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
