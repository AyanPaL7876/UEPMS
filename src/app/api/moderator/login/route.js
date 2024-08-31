import { connect } from '@/db/dbConnnect';
import Moderator from '@/modules/ModeratorSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

export async function POST(request=NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const moderator = await Moderator.findOne({ email });
        if (!moderator) {
            return NextResponse.json(
                { error: "E-mail not register" },
                { status: 404 }
            );
        }

        const validPass = await bcryptjs.compare(password, moderator.password);
        if (!validPass) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: moderator._id,
            name: moderator.name,
            email: moderator.email,
            role: moderator.role,
            dept: moderator.dept
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged in Successfully",
            success: true,
            token : token
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
