import { NextRequest, NextResponse } from 'next/server'
import { appointmentsDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const appointments = await appointmentsDB.getAll()
    return NextResponse.json({ success: true, data: appointments })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const appointment = await appointmentsDB.create(body)
    return NextResponse.json({ success: true, data: appointment }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

