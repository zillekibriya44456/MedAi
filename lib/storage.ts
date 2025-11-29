import { promises as fs } from 'fs'
import path from 'path'
import { Patient, Doctor, Appointment, MedicalRecord, AIInsight, SystemUser, SystemLog } from '@/types'

const dataDir = path.join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Initialize data files with default data
async function initializeDataFile(filePath: string, defaultData: any[]) {
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2))
  }
}

// Initialize all data files
export async function initializeStorage() {
  await ensureDataDir()
  
  const defaultPatients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 234-567-8900',
      email: 'john.doe@email.com',
      condition: 'Hypertension',
      status: 'active',
      riskLevel: 'low',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-25',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiInsight: 'Stable condition, medication compliance good',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      age: 32,
      gender: 'Female',
      phone: '+1 234-567-8901',
      email: 'sarah.w@email.com',
      condition: 'Diabetes Type 2',
      status: 'active',
      riskLevel: 'medium',
      lastVisit: '2024-01-14',
      nextAppointment: '2024-01-20',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiInsight: 'AI suggests closer monitoring of blood sugar levels',
    },
  ]

  const defaultDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiologist',
      experience: '15 years',
      email: 'sarah.smith@hospital.com',
      phone: '+1 234-567-8900',
      location: 'Cardiology Wing, Floor 3',
      status: 'available',
      rating: 4.9,
      patients: 245,
      nextAvailable: '2:00 PM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Dr. Michael Johnson',
      specialization: 'Neurologist',
      experience: '12 years',
      email: 'michael.j@hospital.com',
      phone: '+1 234-567-8901',
      location: 'Neurology Wing, Floor 2',
      status: 'busy',
      rating: 4.8,
      patients: 189,
      nextAvailable: '4:30 PM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const defaultAppointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      doctorId: '1',
      doctorName: 'Dr. Sarah Smith',
      date: new Date().toISOString().split('T')[0],
      time: '09:00 AM',
      duration: '30 min',
      type: 'Regular Checkup',
      status: 'scheduled',
      aiOptimized: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const defaultUsers: SystemUser[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@hospital.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      permissions: ['all'],
    },
  ]

  await initializeDataFile(path.join(dataDir, 'patients.json'), defaultPatients)
  await initializeDataFile(path.join(dataDir, 'doctors.json'), defaultDoctors)
  await initializeDataFile(path.join(dataDir, 'appointments.json'), defaultAppointments)
  await initializeDataFile(path.join(dataDir, 'records.json'), [])
  await initializeDataFile(path.join(dataDir, 'insights.json'), [])
  await initializeDataFile(path.join(dataDir, 'users.json'), defaultUsers)
  await initializeDataFile(path.join(dataDir, 'logs.json'), [])
}

// Read data from file
export async function readData<T>(filename: string): Promise<T[]> {
  await initializeStorage()
  const filePath = path.join(dataDir, filename)
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write data to file
export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await initializeStorage()
  const filePath = path.join(dataDir, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// CRUD Operations
export const patientsDB = {
  getAll: () => readData<Patient>('patients.json'),
  getById: async (id: string) => {
    const patients = await readData<Patient>('patients.json')
    return patients.find(p => p.id === id)
  },
  create: async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const patients = await readData<Patient>('patients.json')
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    patients.push(newPatient)
    await writeData('patients.json', patients)
    return newPatient
  },
  update: async (id: string, updates: Partial<Patient>) => {
    const patients = await readData<Patient>('patients.json')
    const index = patients.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Patient not found')
    patients[index] = { ...patients[index], ...updates, updatedAt: new Date().toISOString() }
    await writeData('patients.json', patients)
    return patients[index]
  },
  delete: async (id: string) => {
    const patients = await readData<Patient>('patients.json')
    const filtered = patients.filter(p => p.id !== id)
    await writeData('patients.json', filtered)
    return true
  },
}

export const doctorsDB = {
  getAll: () => readData<Doctor>('doctors.json'),
  getById: async (id: string) => {
    const doctors = await readData<Doctor>('doctors.json')
    return doctors.find(d => d.id === id)
  },
  create: async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const doctors = await readData<Doctor>('doctors.json')
    const newDoctor: Doctor = {
      ...doctor,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    doctors.push(newDoctor)
    await writeData('doctors.json', doctors)
    return newDoctor
  },
  update: async (id: string, updates: Partial<Doctor>) => {
    const doctors = await readData<Doctor>('doctors.json')
    const index = doctors.findIndex(d => d.id === id)
    if (index === -1) throw new Error('Doctor not found')
    doctors[index] = { ...doctors[index], ...updates, updatedAt: new Date().toISOString() }
    await writeData('doctors.json', doctors)
    return doctors[index]
  },
  delete: async (id: string) => {
    const doctors = await readData<Doctor>('doctors.json')
    const filtered = doctors.filter(d => d.id !== id)
    await writeData('doctors.json', filtered)
    return true
  },
}

export const appointmentsDB = {
  getAll: () => readData<Appointment>('appointments.json'),
  getById: async (id: string) => {
    const appointments = await readData<Appointment>('appointments.json')
    return appointments.find(a => a.id === id)
  },
  create: async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const appointments = await readData<Appointment>('appointments.json')
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    appointments.push(newAppointment)
    await writeData('appointments.json', appointments)
    return newAppointment
  },
  update: async (id: string, updates: Partial<Appointment>) => {
    const appointments = await readData<Appointment>('appointments.json')
    const index = appointments.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Appointment not found')
    appointments[index] = { ...appointments[index], ...updates, updatedAt: new Date().toISOString() }
    await writeData('appointments.json', appointments)
    return appointments[index]
  },
  delete: async (id: string) => {
    const appointments = await readData<Appointment>('appointments.json')
    const filtered = appointments.filter(a => a.id !== id)
    await writeData('appointments.json', filtered)
    return true
  },
}

export const recordsDB = {
  getAll: () => readData<MedicalRecord>('records.json'),
  getById: async (id: string) => {
    const records = await readData<MedicalRecord>('records.json')
    return records.find(r => r.id === id)
  },
  create: async (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const records = await readData<MedicalRecord>('records.json')
    const newRecord: MedicalRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    records.push(newRecord)
    await writeData('records.json', records)
    return newRecord
  },
  update: async (id: string, updates: Partial<MedicalRecord>) => {
    const records = await readData<MedicalRecord>('records.json')
    const index = records.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Record not found')
    records[index] = { ...records[index], ...updates, updatedAt: new Date().toISOString() }
    await writeData('records.json', records)
    return records[index]
  },
  delete: async (id: string) => {
    const records = await readData<MedicalRecord>('records.json')
    const filtered = records.filter(r => r.id !== id)
    await writeData('records.json', filtered)
    return true
  },
}

export const usersDB = {
  getAll: () => readData<SystemUser>('users.json'),
  getById: async (id: string) => {
    const users = await readData<SystemUser>('users.json')
    return users.find(u => u.id === id)
  },
  create: async (user: Omit<SystemUser, 'id' | 'createdAt' | 'permissions'>) => {
    const users = await readData<SystemUser>('users.json')
    const newUser: SystemUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      permissions: [],
    }
    users.push(newUser)
    await writeData('users.json', users)
    return newUser
  },
  update: async (id: string, updates: Partial<SystemUser>) => {
    const users = await readData<SystemUser>('users.json')
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    users[index] = { ...users[index], ...updates }
    await writeData('users.json', users)
    return users[index]
  },
  delete: async (id: string) => {
    const users = await readData<SystemUser>('users.json')
    const filtered = users.filter(u => u.id !== id)
    await writeData('users.json', filtered)
    return true
  },
}

export const logsDB = {
  getAll: () => readData<SystemLog>('logs.json'),
  create: async (log: Omit<SystemLog, 'id' | 'timestamp'>) => {
    const logs = await readData<SystemLog>('logs.json')
    const newLog: SystemLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    logs.push(newLog)
    await writeData('logs.json', logs.slice(-100)) // Keep last 100 logs
    return newLog
  },
}
