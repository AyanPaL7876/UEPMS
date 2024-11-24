import { connect } from "@/db";
import { QuestionPaper } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        console.log("id is : ", id);

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "ID parameter is required"
            }, { status: 400 });
        }

        await connect();
        
        // Add error handling for invalid ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({
                success: false,
                message: "Invalid ID format"
            }, { status: 400 });
        }

        const questionPaper = await QuestionPaper.findById(id);
        
        if (!questionPaper) {
            return NextResponse.json({
                success: false,
                message: "Question paper not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: questionPaper
        }, { status: 200 });

    } catch (error) {
        console.error("Error in GET question paper:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching the question paper",
            error: error.message
        }, { status: 500 });
    }
}