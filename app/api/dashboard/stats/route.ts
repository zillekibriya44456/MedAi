import { NextRequest, NextResponse } from 'next/server'
import { patientsDB, appointmentsDB, doctorsDB, initializeStorage } from '@/lib/storage'
import { format } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    await initializeStorage()
    const [patients, appointments, doctors] = await Promise.all([
      patientsDB.getAll(),
      appointmentsDB.getAll(),
      doctorsDB.getAll(),
    ])

    const today = format(new Date(), 'yyyy-MM-dd')
    const todayAppointments = appointments.filter(
      apt => apt.date === today && apt.status !== 'cancelled'
    )

    const stats = {
      totalPatients: patients.length,
      todayAppointments: todayAppointments.length,
      activeDoctors: doctors.filter(d => d.status === 'available').length,
      totalRevenue: 68000, // Can be calculated from appointments
      totalDoctors: doctors.length,
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

