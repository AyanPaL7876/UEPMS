import { connect } from '../../../../db/dbConnnect';
import HOD from '../../../../modules/HODSchema';
import Moderator from '../../../../modules/ModeratorSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

async function authenticateHod(request = NextRequest){
    const token = request.headers.get('Authorization')?.replace('Bearer ','');
    if(!token){
        return NextResponse.json(
            { message : "No token provided"},
            {status : 401}
        );
    };

    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        if(decoded.role != 'HOD'){
            return NextResponse.json({ error: "Not authorized. only HOD can create Moderator" }, { status: 403 });
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
        const hodAuth = await authenticateHod(request);
        if (hodAuth instanceof NextResponse) {
            return hodAuth;
        }
        
        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        console.log(reqBody);

        // Validation
        const moderatorEmailExist = await Moderator.findOne({ email });
        if (moderatorEmailExist) {
            return NextResponse.json({ error: "Email already exists... Please change your email"}, {status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log(hodAuth.email);

        const hod = await HOD.findOne({ email: hodAuth.email });
        if (!hod) {
            return NextResponse.json({ error: "Hod not found" }, { status: 404 });
        }

        const newModerator = new Moderator({
            name,
            email,
            dept : hod.dept,
            password: hashedPassword,
            role: "Moderator",
            lastLogin: Date.now(),
            hod : [hod._id]
        });

        const saveModerator = await newModerator.save();
        console.log(saveModerator);

        hod.moderators.push(saveModerator._id);
        await hod.save();

        return NextResponse.json({ error: `Moderator successfully created with id: ${saveModerator._id}`}, {status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: `Error: ${e}`}, {status: 400 });
    }
}
