import { connect } from '../../../../db/dbConnnect';
import HOD from '../../../../modules/HODSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

export async function POST(request=NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const hod = await HOD.findOne({ email });
        if (!hod) {
            return NextResponse.json(
                { error: "Wrong E-mail address" },
                { status: 404 }
            );
        }

        const validPass = await bcryptjs.compare(password, hod.password);
        if (!validPass) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: hod._id,
            name: hod.userName,
            email: hod.email,
            role: hod.role,
            dept: hod.dept
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged in Successfully",
            success: true,
            token : token
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (e) {
        return NextResponse.json(
            { error: `Error: ${e.message}` },
            { status: 500 }
        );
    }
}
