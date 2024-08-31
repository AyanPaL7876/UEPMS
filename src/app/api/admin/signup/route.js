import { connect } from '@/db/dbConnnect'; // Adjust path as needed
import Admin from '@/modules/AdminSchema'; // Adjust path as needed
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request= NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        console.log(reqBody);

        const adminEmailExist = await Admin.findOne({ email });

        // Validation
        if (adminEmailExist) {
            return NextResponse.json({ error: "Email already exists... Please change your email", status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            isVerified: true,
            lastLogin: Date.now(),
        });

        const saveAdmin = await newAdmin.save();
        console.log(saveAdmin);
        return NextResponse.json({ error: `User successfully created with user id: ${saveAdmin._id}`, status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: `Error: ${e}`, status: 400 });
    }
}
