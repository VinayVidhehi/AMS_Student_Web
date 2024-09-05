'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Header from '@/components/sections/Header'
import { cn } from '@/lib/utils'


const Page = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseAttendance, setCourseAttendance] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (session?.user?.email) {
        const connectionString = process.env.NEXT_PUBLIC_BACKEND_URL|| "something" + process.env.ATTENDANCE_URL || "server";
        const response = await axios.post(connectionString , { email: session.user.email });
        setAttendanceData(response.data.attendanceRecords);
        setStudentDetails(response.data.studentDetails);
      }
    };

    fetchAttendanceData();
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.back();
    }
  }, [status, session, router]);

  const handleViewCourseAttendance = () => {
    if (courseId && attendanceData) {
      const filteredAttendance = attendanceData.filter((course) => course.courseId === courseId);
      if (filteredAttendance.length > 0) {
        setCourseAttendance(filteredAttendance[0].attendance);
      }
    }
  };

  console.log("course attendance is ", courseAttendance);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header/>
      <div className="container mx-auto py-10">
        <div className="mb-6">
          
          <div className="flex items-center space-x-4">
            <Select onValueChange={(value) => setCourseId(value)}>
              <SelectTrigger className="w-[180px] border border-gray-300 rounded-md bg-white text-black">
                <SelectValue placeholder="Choose Course" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md">
                {attendanceData != null && attendanceData.map((attendance) => (
                  <SelectItem key={attendance.courseId} value={attendance.courseId}>
                    {attendance.courseId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {courseId ? (
              <Button onClick={handleViewCourseAttendance} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                View Attendance
              </Button>
            ) : (
              <p className="text-sm text-gray-500">Select a course to view attendance</p>
            )}
          </div>
        </div>

        {courseAttendance && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Attendance for Course: {courseId}</h3>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {courseAttendance.map((att, index) => {
                  const isPresent = att.students.some((s) => s.usn === studentDetails.usn);
                  const attendanceType = att.note === "no note for now" ? "Class Attendance" : "Lab Attendance";

                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{new Date(att.date).toLocaleDateString()}</td>
                      <td className={cn("border px-4 py-2", isPresent ? "text-green-600" : "text-red-600")}>
                        {isPresent ? 'Present' : 'Absent'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{attendanceType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
