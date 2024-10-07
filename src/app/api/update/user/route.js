import { connect } from "@/db";
import { findUser } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

// export async function PUT(request = NextRequest) {
//   await connect();

//   const { success, user, message, status } = await findUser(request);
//   if (!success) {
//     return NextResponse.json({ success, message }, { status });
//   }

//   try {
//     // Extract the updated user data from the request body
//     const { name, email, universityName } = await request.json();
    
//     // Update the user fields if provided
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (universityName) user.universityName = universityName;
//     if (CurrentStatus) user.CurrentStatus = CurrentStatus;

//     // Save the updated user back to the database
//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "User updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         phNumber: user.phNumber,
//         role: user.role,
//         pgName: user.pgName,
//         CurrentStatus: user.CurrentStatus,
//       },
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error in Update User:', error);
//     return NextResponse.json({ success: false, message: 'Error updating user' }, { status: 500 });
//   }
// }

export async function GET(request = NextRequest) {
  await connect();

  const { success, user, message, status } = await findUser(request);
  if (!success) {
    return NextResponse.json({ success, message }, { status });
  }

  try {
    return NextResponse.json({
      success: true,
      message: "User retrieved successfully",
      user
    }, { status: 200 });
  } catch (error) {
    console.error('Error in Get User:', error);
    return NextResponse.json({ success: false, message: 'Error retrieving user' }, { status: 500 });
  }
}

export async function DELETE(request = NextRequest) {
  await connect();

  const { success, user, message, status } = await findUser(request);
  if (!success) {
    return NextResponse.json({ success, message }, { status });
  }

  try {
    // Delete the user from the database
    await user.deleteOne();

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    }, { status: 200 });
  } catch (error) {
    console.error('Error in Delete User:', error);
    return NextResponse.json({ success: false, message: 'Error deleting user' }, { status: 500 });
  }
}