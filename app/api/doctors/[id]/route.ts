import { NextRequest, NextResponse } from 'next/server'
import { doctorsDB, initializeStorage } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    const doctor = await doctorsDB.getById(params.id)
    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: doctor })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch doctor' },
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
    const doctor = await doctorsDB.update(params.id, body)
    return NextResponse.json({ success: true, data: doctor })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update doctor' },
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
    await doctorsDB.delete(params.id)
    return NextResponse.json({ success: true, message: 'Doctor deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete doctor' },
      { status: 500 }
    )
  }
}

