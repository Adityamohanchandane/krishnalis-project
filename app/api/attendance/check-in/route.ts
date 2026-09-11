import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Haversine formula to calculate distance between two coordinates in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

export async function POST(req: Request) {
  try {
    const { token, lat, lng } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Identity token is required" },
        { status: 400 }
      );
    }

    // Find student by token
    const studentsRef = adminDb.collection('students');
    const studentSnapshot = await studentsRef.where('identityToken', '==', token).limit(1).get();

    if (studentSnapshot.empty) {
      return NextResponse.json(
        { error: "Invalid identity token" },
        { status: 404 }
      );
    }

    const studentDoc = studentSnapshot.docs[0];
    const student = { id: studentDoc.id, ...studentDoc.data() } as any;

    if (student.status === false) {
      return NextResponse.json(
        { error: "Student account is inactive" },
        { status: 403 }
      );
    }

    // Check location
    let locationVerified = false;
    if (lat !== null && lng !== null && typeof lat === 'number' && typeof lng === 'number') {
      // Find campus
      const campusSnapshot = await adminDb.collection('campus').where('status', '==', true).limit(1).get();

      if (!campusSnapshot.empty) {
        const campus = campusSnapshot.docs[0].data();
        const distance = getDistance(lat, lng, campus.latitude, campus.longitude);
        if (distance <= campus.allowedRadius) {
          locationVerified = true;
        }
      }
    }

    // Check if already marked for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendanceRef = adminDb.collection('attendance');
    const existingAttendanceSnapshot = await attendanceRef
      .where('studentId', '==', student.id)
      .where('attendanceDate', '>=', startOfDay)
      .where('attendanceDate', '<=', endOfDay)
      .limit(1)
      .get();

    if (!existingAttendanceSnapshot.empty) {
      return NextResponse.json(
        { error: "Attendance already recorded for today" },
        { status: 400 }
      );
    }

    // Create attendance record
    const newAttendanceRef = await attendanceRef.add({
      studentId: student.id,
      attendanceDate: new Date(),
      checkInTime: new Date(),
      status: "PRESENT",
      verificationMethod: "QR_CODE",
      locationVerified,
      latitude: lat || null,
      longitude: lng || null,
    });

    return NextResponse.json({
      success: true,
      message: "Attendance recorded successfully",
      student: {
        fullName: student.fullName,
        studentId: student.studentId,
        class: {
          className: student.className || "Unknown",
        },
        division: student.division,
      },
      locationVerified,
      attendanceId: newAttendanceRef.id,
    });
  } catch (error: any) {
    console.error("Attendance check-in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
