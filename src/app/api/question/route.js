// app/api/question/route.js
import { connect } from "@/db";
import { QuestionPaper } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
    await connect();
    
    const data = await request.json();
    const questionPaper = new QuestionPaper(data);
    
    try {
        await questionPaper.save();
        return NextResponse.json({
            success: true,
            message: "Question paper created successfully",
            questionPaper,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connect();
        const questionPapers = await QuestionPaper.find({}, {
            'examDetails.title': 1,
            'examDetails.session': 1,
            'examDetails.date': 1,
            'courseInfo.name': 1,
            'courseInfo.code': 1,
            'examParameters.maxMarks': 1,
            'examParameters.duration': 1
        });
        
        return NextResponse.json(questionPapers);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch question papers" },
            { status: 500 }
        );
    }
}