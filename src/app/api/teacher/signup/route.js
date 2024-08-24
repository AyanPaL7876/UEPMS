import { connect } from "@/db/dbConnnect";
import Teacher from "@/modules/TeacherSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request=NextRequest){
    try{
        const reqBody = await request.json();
        const {userName, email, password} = reqBody;
        console.log(reqBody);

        // validation
        const teacherexist = await Teacher.findOne({email})
        if(teacherexist){
            return NextResponse.json({error: "E-mail already exists... Please cheack your E-mail", status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newTeacher = new Teacher({
            userName,
            email,
            password : hashedPassword,
        });

        const saveTeacher = await newTeacher.save();
        console.log(saveTeacher);
        return NextResponse.json({error: `User successfully created : ${saveTeacher}` , status: 200});
        
    }catch(e){
        return NextResponse.json({error: `Error : ${e}` , status: 400});
    }
}