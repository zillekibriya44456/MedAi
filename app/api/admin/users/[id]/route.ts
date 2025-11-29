import { NextRequest, NextResponse } from 'next/server'
import { usersDB, initializeStorage } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeStorage()
    const user = await usersDB.getById(params.id)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch user' },
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
    const user = await usersDB.update(params.id, body)
    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update user' },
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
    await usersDB.delete(params.id)
    return NextResponse.json({ success: true, message: 'User deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete user' },
      { status: 500 }
    )
  }
}


