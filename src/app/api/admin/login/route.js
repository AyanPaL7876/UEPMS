import { connect } from '../../../../db/dbConnnect';
import Admin from '../../../../modules/AdminSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json(
                { error: "E-mail not registered" },
                { status: 404 }
            );
        }

        const validPass = await bcryptjs.compare(password, admin.password);
        if (!validPass) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged in Successfully",
            success: true,
            token: token
        });

        response.cookies.set("token", token, {
            path: "/",
            httpOnly: false,
          });

        return response;

    } catch (e) {
        return NextResponse.json(
            { error: `Error: ${e.message}` },
            { status: 500 }
        );
    }
}
