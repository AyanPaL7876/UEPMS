import { connect } from '../../../../db/dbConnnect';
import COE from '../../../../modules/COESchema';
import Admin from '../../../../modules/AdminSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

async function authenticateAdmin(request = NextRequest){
    const token = request.headers.get('Authorization')?.replace('Bearer ','');
    if(!token){
        return NextResponse.json(
            { message : "No token provided"},
            {status : 401}
        );
    };

    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        if(decoded.role != 'admin'){
            return NextResponse.json({ error: "Not authorized. only Admin can create COE" }, { status: 403 });
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
        const adminAuth = await authenticateAdmin(request);
        if (adminAuth instanceof NextResponse) {
            return adminAuth;
        }
        
        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        console.log(reqBody);

        // Validation
        const coeEmailExist = await COE.findOne({ email });
        if (coeEmailExist) {
            return NextResponse.json({ error: "Email already exists... Please change your email"}, {status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const decoded = adminAuth;
        console.log(decoded.email);

        // Find the admin document using the decoded email (or another identifier)
        const admin = await Admin.findOne({ email: decoded.email });
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        const newCoe = new COE({
            name,
            email,
            password: hashedPassword,
            role: "COE",
            lastLogin: Date.now(),
            Admin : [admin._id]
        });

        const saveCOE = await newCoe.save();
        console.log(saveCOE);

        // Add COE ID to Admin's COE field
        admin.COE.push(saveCOE._id);
        await admin.save();

        return NextResponse.json({ error: `User successfully created with user id: ${saveCOE._id}`}, {status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: `Error: ${e}`}, {status: 400 });
    }
}
