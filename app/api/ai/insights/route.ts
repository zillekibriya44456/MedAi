import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Simulate AI insights generation
    const insights = [
      {
        id: 1,
        type: 'risk-alert',
        title: 'High Priority Risk Detection',
        description: 'AI identified 3 patients with elevated risk factors requiring immediate attention',
        severity: 'high',
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        type: 'optimization',
        title: 'Schedule Optimization Opportunity',
        description: 'Rescheduling 5 appointments could reduce patient wait times by 30%',
        severity: 'medium',
        timestamp: new Date().toISOString(),
      },
      {
        id: 3,
        type: 'prediction',
        title: 'Patient Flow Prediction',
        description: 'AI predicts 45% increase in appointments for next week',
        severity: 'low',
        timestamp: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      success: true,
      insights,
      totalInsights: insights.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch insights' },
      { status: 500 }
    )
  }
}

