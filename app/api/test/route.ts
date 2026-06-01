import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const userCount = await db.user.count()
    return NextResponse.json({ 
      success: true, 
      message: "Database connected!",
      users: userCount 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Database connection failed" 
    }, { status: 500 })
  }
}