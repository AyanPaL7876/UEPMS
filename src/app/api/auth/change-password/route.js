// import { connect } from "@/db";
// import { User } from "@/modules";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";
// import { findUser } from "@/middleware";

// export async function POST(request = NextRequest) {
//   const { currentPassword, newPassword } = await request.json();

//   // Connect to the database
//   await connect();

//   try {
//     // Find the user by ID
//     const { success, user, message, status } = await findUser(request); 
//     if(!success) {
//       return { success: false, message, status };
//     }

//     // Check if the current password matches the user's password
//     console.log("Current Password:", currentPassword);
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, message: "Current password is incorrect" },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password and save the user
//     user.password = hashedPassword;
//     await user.save();

//     // Return a success response
//     return NextResponse.json(
//       { success: true, message: "Password changed successfully" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Server Error:", error); // Added logging for the server error
//     return NextResponse.json(
//       { success: false, message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
