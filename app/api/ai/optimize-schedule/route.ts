import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { appointments } = await request.json()

    // Simulate AI schedule optimization
    const optimizedSchedule = appointments.map((apt: any, index: number) => ({
      ...apt,
      optimizedTime: apt.time,
      waitTimeReduction: Math.floor(Math.random() * 30) + 10,
      aiOptimized: index % 3 === 0, // Simulate some appointments being optimized
    }))

    const totalWaitTimeReduction = optimizedSchedule
      .filter((apt: any) => apt.aiOptimized)
      .reduce((sum: number, apt: any) => sum + apt.waitTimeReduction, 0)

    return NextResponse.json({
      success: true,
      optimizedSchedule,
      totalWaitTimeReduction,
      efficiencyGain: Math.round((totalWaitTimeReduction / appointments.length) * 100) / 100,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to optimize schedule' },
      { status: 500 }
    )
  }
}

