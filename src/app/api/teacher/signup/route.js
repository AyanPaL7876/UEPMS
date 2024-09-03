import { connect } from '@/db/dbConnnect';
import HOD from '@/modules/HODSchema';
import Teacher from '@/modules/TeacherSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

async function authenticateHod(request = NextRequest){
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log("No token provided");
        return NextResponse.json(
            { message: "No token provided" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded Token:", decoded);
        if (decoded.role !== 'HOD') {
            return NextResponse.json({ error: "Not authorized. Only HOD can create Teacher" }, { status: 403 });
        }

        return decoded;

    } catch (e) {
        console.error("JWT Verification Error:", e.message);
        return NextResponse.json(
            { error: `Error: ${e.message}` },
            { status: 500 }
        );
    }
}

export async function POST(request = NextRequest) {
    try {
        const hodAuth = await authenticateHod(request);
        if (hodAuth instanceof NextResponse) {
            return hodAuth;
        }

        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        console.log(reqBody);

        // Validation
        const teacherEmailExist = await Teacher.findOne({ email });
        if (teacherEmailExist) {
            return NextResponse.json({ error: "Email already exists... Please change your email" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log(hodAuth.email);

        const hod = await HOD.findOne({ email: hodAuth.email });
        if (!hod) {
            return NextResponse.json({ error: "HOD not found" }, { status: 404 });
        }

        const newTeacher = new Teacher({
            name,
            email,
            dept: hod.dept,
            password: hashedPassword,
            role: "Teacher",
            lastLogin: Date.now(),
            hod: hod._id
        });

        const saveTeacher = await newTeacher.save();
        console.log(saveTeacher);

        hod.teachers.push(saveTeacher._id);
        await hod.save();

        return NextResponse.json({ message: `Teacher successfully created with id: ${saveTeacher._id}` }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: `Error: ${e.message}` }, { status: 400 });
    }
}
