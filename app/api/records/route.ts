import { NextRequest, NextResponse } from 'next/server'
import { recordsDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const records = await recordsDB.getAll()
    return NextResponse.json({ success: true, data: records })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const record = await recordsDB.create(body)
    return NextResponse.json({ success: true, data: record }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create record' },
      { status: 500 }
    )
  }
}

