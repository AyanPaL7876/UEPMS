import { connect } from '@/db';
import { University } from '@/models';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connect();
  
        const body = await request.json();
        console.log('body:', body);
        const uniName = body.name;
        const schoolName = body.school[0].name;
        const departments = body.school[0].departments;
  
        console.log('uniName:', uniName, 'schoolName:', schoolName, 'departments:', departments , 'body:', body);
  
        // Validate request
        if (!uniName || !schoolName || !departments) {
            return NextResponse.json(
              { success: false, message: 'University name, school name and departments are required' }, 
              { status: 400 });
        }
  
        // Check if university already exists
        const university = await University.findOne(
            { name: uniName },
            { schools: { $elemMatch: { name: schoolName }}}
        );

        if(!university) {
            return NextResponse.json({ success: false, message: `University or School not found` }, { status: 400 });
        }

        university.schools[0].departments=[];
        university.schools[0].departments.push(...departments);
        await university.save();
  
        return NextResponse.json({ success: true, message: `Departments created successfully` });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to create university' }, { status: 500 });
    }
  }
