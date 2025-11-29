import { NextRequest, NextResponse } from 'next/server'
import { logsDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const logs = await logsDB.getAll()
    return NextResponse.json({ success: true, data: logs })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const log = await logsDB.create(body)
    return NextResponse.json({ success: true, data: log }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create log' },
      { status: 500 }
    )
  }
}


