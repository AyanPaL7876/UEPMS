import { connect } from '@/db';
import { University } from '@/models';
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // Build search query
    const query = search 
      ? { name: { $regex: search, $options: 'i' } } 
      : {};

    const [universities, total] = await Promise.all([
      University.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      University.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: universities,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: total > skip + universities.length
      }
    });

  } catch (error) {
    console.error('Failed to fetch universities:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch universities' 
      }, 
      { status: 500 }
    );
  }
}

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
      const university = await University.findOne({ name: uniName });
      if (university) {

        university.schools.push(body.school[0]);
        university.save();
        return NextResponse.json({ success: true, message: `University already exists` }, { status: 200 });
      }

      // Create new university
      const newUniversity = new University({
          name: uniName,
          schools: body.school
      });

      await newUniversity.save();

      return NextResponse.json({ success: true, message: `University created successfully` });
  } catch (error) {
      console.error('Error in POST handler:', error);
      return NextResponse.json({ success: false, message: 'Failed to create university' }, { status: 500 });
  }
}


// export async function PUT(request) {
//   try {
//     await connect();

//     const segments = request.url.split('/');
//     const id = segments[segments.length - 1];
//     const body = await request.json();

//     if (!body.name) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'University name is required' 
//         }, 
//         { status: 400 }
//       );
//     }

//     const university = await University.findByIdAndUpdate(
//       id,
//       body,
//       { new: true, runValidators: true }
//     );

//     if (!university) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'University not found' 
//         }, 
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: university
//     });

//   } catch (error) {
//     console.error('Failed to update university:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to update university' 
//       }, 
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connect();

//     const segments = request.url.split('/');
//     const id = segments[segments.length - 1];

//     const university = await University.findByIdAndDelete(id);

//     if (!university) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'University not found' 
//         }, 
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'University deleted successfully'
//     });

//   } catch (error) {
//     console.error('Failed to delete university:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to delete university' 
//       }, 
//       { status: 500 }
//     );
//   }
// }

// Handle CORS preflight requests
// export async function OPTIONS(request) {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Allow': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//     },
//   });
// }

