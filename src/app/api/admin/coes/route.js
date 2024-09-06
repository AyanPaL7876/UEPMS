import { connect } from '@/db/dbConnnect';
import Admin from '@/modules/AdminSchema';
import COE from '@/modules/COESchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Initialize the database connection
connect();

// Function to authenticate HOD using JWT
async function authenticateadmin(request = NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.role !== 'admin') {
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
    const adminAuth = await authenticateadmin(request);
    if (adminAuth instanceof NextResponse) {
      return adminAuth;
    }

    const admin = await Admin.findOne({ email: adminAuth.email }).populate('coes');

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: admin.coes },
      { status: 200 }
    );

  } catch (e) {
    return NextResponse.json(
      { error: `Error fetching teachers: ${e.message}` },
      { status: 500 }
    );
  }
}
