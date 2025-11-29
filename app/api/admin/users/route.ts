import { NextRequest, NextResponse } from 'next/server'
import { usersDB, initializeStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const users = await usersDB.getAll()
    return NextResponse.json({ success: true, data: users })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStorage()
    const body = await request.json()
    const user = await usersDB.create(body)
    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create user' },
      { status: 500 }
    )
  }
}


