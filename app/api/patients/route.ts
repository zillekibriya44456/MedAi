import { NextRequest, NextResponse } from 'next/server'
import { patientsDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const patients = await patientsDB.getAll()
    return NextResponse.json({ success: true, data: patients })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch patients' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const patient = await patientsDB.create(body)
    return NextResponse.json({ success: true, data: patient }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create patient' },
      { status: 500 }
    )
  }
}

