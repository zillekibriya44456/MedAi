import { NextRequest, NextResponse } from 'next/server'
import { doctorsDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const doctors = await doctorsDB.getAll()
    return NextResponse.json({ success: true, data: doctors })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const doctor = await doctorsDB.create(body)
    return NextResponse.json({ success: true, data: doctor }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create doctor' },
      { status: 500 }
    )
  }
}

