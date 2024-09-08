import { NextResponse } from 'next/server';
import StudentEmailMapping from '@/models/usnmappingemail_schema';
import Attendance from '@/models/attendance_schema';
import connectToDatabase from '@/lib/db';

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the body of the POST request
    const { email } = await request.json();

    // Find the student's USN using the email
    const studentMapping = await StudentEmailMapping.findOne({ 'students.email': email });

    if (!studentMapping) {
      return NextResponse.json({ message: 'Student mapping not found' }, { status: 200 });
    }

    // Extract USN from the mapping
    const student = studentMapping.students.find(student => student.email === email);
    if (!student) {
      return NextResponse.json({ message: 'Student not found in mapping' }, { status: 200});
    }

    // Find all attendance records for the student's USN
    const attendanceRecords = await Attendance.find();

    if (!attendanceRecords.length) {
      return NextResponse.json({ message: 'No attendance records found! Ask your faculty to switch to us for easy access to your attendance' }, { status: 200});
    }

    return NextResponse.json({ attendanceRecords, studentDetails: student }, { status: 200 });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
