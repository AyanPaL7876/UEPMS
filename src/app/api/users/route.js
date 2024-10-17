import { connect } from "@/db";
import { findUser } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
  await connect();

  const { success, user, message, status } = await findUser(request);
  if (!success) {
    return NextResponse.json({ success, message }, { status });
  }

  try {
    switch (user.role) {
      case 'admin':
        await user.populate('coes');
        return NextResponse.json({
          success: true,
          message: "User retrieved successfully",
          users: user.coes,
        });
      case 'coe':
        await user.populate('hods');
        return NextResponse.json({
          success: true,
          message: "User retrieved successfully",
          users: user.hods,
        });
      case 'hod':
        await user.populate('teachers');
        return NextResponse.json({
          success: true,
          message: "User retrieved successfully",
          users: user.teachers,
        });
      default:
        return NextResponse.json({
          success: true,
          message: "User retrieved successfully",
          user
        });
    }
  } catch (error) {
    console.error('Error in Get User:', error);
    return NextResponse.json({ success: false, message: 'Error find user' }, { status: 500 });
  }
}