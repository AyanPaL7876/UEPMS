import { connect } from "@/db";
import { findUser } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request=NextRequest) {
  await connect();

  const { success, user, message, status } = await findUser(request);
  if (!success) {
    return NextResponse.json({ success, message }, { status });
  }
  
  return NextResponse.json({
    success: true,
    message: "User retrieved successfully",
    user,
  });
}
