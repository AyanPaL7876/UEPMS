import { connect } from '@/db/dbConnnect';
import HOD from '@/modules/HODSchema';
import Moderator from '@/modules/ModeratorSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Initialize the database connection
connect();

// Function to authenticate HOD using JWT
async function authenticateHod(request = NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.role !== 'HOD') {
      return NextResponse.json(
        { error: "Not authorized. Only HOD can access this resource" },
        { status: 403 }
      );
    }

    return decoded;

  } catch (e) {
    return NextResponse.json(
      { error: `Error: ${e.message}` },
      { status: 500 }
    );
  }
}

// Handler for the GET request to fetch all teachers under a HOD
export async function GET(request = NextRequest) {
  try {
    const hodAuth = await authenticateHod(request);
    if (hodAuth instanceof NextResponse) {
      return hodAuth;
    }

    const hod = await HOD.findOne({ email: hodAuth.email }).populate('moderators');

    if (!hod) {
      return NextResponse.json(
        { error: "HOD not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: hod.moderators },
      { status: 200 }
    );

  } catch (e) {
    return NextResponse.json(
      { error: `Error fetching Moderators: ${e.message}` },
      { status: 500 }
    );
  }
}
