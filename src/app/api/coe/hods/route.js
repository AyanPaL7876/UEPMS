import { connect } from '@/db/dbConnnect';
import HOD from '@/modules/HODSchema';
import COE from '@/modules/COESchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Initialize the database connection
connect();

// Function to authenticate HOD using JWT
async function authenticatecoe(request = NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.role !== 'COE') {
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
    const coeAuth = await authenticatecoe(request);
    if (coeAuth instanceof NextResponse) {
      return coeAuth;
    }

    const coe = await COE.findOne({ email: coeAuth.email }).populate('hods');

    if (!coe) {
      return NextResponse.json(
        { error: "COE not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: coe.hods },
      { status: 200 }
    );

  } catch (e) {
    return NextResponse.json(
      { error: `Error fetching hods: ${e.message}` },
      { status: 500 }
    );
  }
}
