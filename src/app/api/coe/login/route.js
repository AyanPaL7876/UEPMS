import { connect } from '@/db/dbConnnect';
import COE from '@/modules/COESchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

export async function POST(request=NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const coe = await COE.findOne({ email });
        if (!coe) {
            return NextResponse.json(
                { error: "E-mail not registered" },
                { status: 404 }
            );
        }

        const validPass = await bcryptjs.compare(password, coe.password);
        if (!validPass) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        const tokenData = {
            name: coe.name,
            id: coe._id,
            name: coe.name,
            email: coe.email,
            role: coe.role
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
