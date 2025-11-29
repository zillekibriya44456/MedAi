import { NextRequest, NextResponse } from 'next/server'
import { patientsDB, initializeStorage } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    const patient = await patientsDB.getById(params.id)
    if (!patient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: patient })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch patient' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    const body = await request.json()
    const patient = await patientsDB.update(params.id, body)
    return NextResponse.json({ success: true, data: patient })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update patient' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    await patientsDB.delete(params.id)
    return NextResponse.json({ success: true, message: 'Patient deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete patient' },
      { status: 500 }
    )
  }
}

