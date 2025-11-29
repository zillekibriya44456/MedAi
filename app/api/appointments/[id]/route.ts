import { NextRequest, NextResponse } from 'next/server'
import { appointmentsDB, initializeStorage } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    const appointment = await appointmentsDB.getById(params.id)
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch appointment' },
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
    const appointment = await appointmentsDB.update(params.id, body)
    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update appointment' },
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
    await appointmentsDB.delete(params.id)
    return NextResponse.json({ success: true, message: 'Appointment deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete appointment' },
      { status: 500 }
    )
  }
}

