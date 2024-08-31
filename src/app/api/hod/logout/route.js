import { connect } from '@/db/dbConnnect';
import { NextResponse } from 'next/server';

// Initialize the database connection
connect();

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            status: 200,
            success: true
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (e) {
        return NextResponse.json(
            { error: `Error: ${e.message}` },
            { status: 500 }
        );
    }
}
