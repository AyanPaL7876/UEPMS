import { connect } from '@/db/dbConnnect';
import COE from '@/modules/COESchema';
import HOD from '@/modules/HODSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

async function authenticateCoe(request = NextRequest){
    const token = request.headers.get('Authorization')?.replace('Bearer ','');
    if(!token){
        return NextResponse.json(
            { message : "No token provided"},
            {status : 401}
        );
    };

    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        if(decoded.role != 'COE'){
            return NextResponse.json({ error: "Not authorized. Only COE can create HOD" }, { status: 403 });
        }

        return decoded;

    }catch(e){
        return NextResponse.json(
            { error: `Error: ${e.message}` },
            { status: 500 }
        );
    }
}


export async function POST(request= NextRequest) {
    try {
        const coeAuth = await authenticateCoe(request);
        if (coeAuth instanceof NextResponse) {
            return coeAuth;
        }
        
        const reqBody = await request.json();
        const { name, email, password, dept } = reqBody;
        console.log(reqBody);

        // Validation
        const hodEmailExist = await HOD.findOne({ email });
        if (hodEmailExist) {
            return NextResponse.json({ error: "Email already exists... Please change your email"}, {status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log(coeAuth.email);

        const coe = await COE.findOne({ email: coeAuth.email });
        if (!coe) {
            return NextResponse.json({ error: "COE not found" }, { status: 404 });
        }

        const newHod = new HOD({
            name,
            email,
            dept,
            password: hashedPassword,
            role: "HOD",
            lastLogin: Date.now(),
            coe : [coe._id]
        });

        const saveHOD = await newHod.save();
        console.log(saveHOD);

        // Add COE ID to Admin's COE field
        coe.hods.push(saveHOD._id);
        await coe.save();

        return NextResponse.json({ error: `HOD creation successful with id: ${saveHOD._id}`}, {status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: `Error: ${e}`}, {status: 400 });
    }
}
