export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  email: string
  address?: string
  condition: string
  status: 'active' | 'inactive' | 'critical'
  riskLevel: 'low' | 'medium' | 'high'
  lastVisit?: string
  nextAppointment?: string
  createdAt: string
  updatedAt: string
  aiInsight?: string
  medicalHistory?: string[]
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: string
  email: string
  phone: string
  location: string
  status: 'available' | 'busy' | 'offline'
  rating: number
  patients: number
  nextAvailable?: string
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: string
  type: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes?: string
  aiOptimized?: boolean
  createdAt: string
  updatedAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  recordType: string
  date: string
  doctorId: string
  doctorName: string
  status: 'Completed' | 'Pending Review' | 'Active' | 'Archived'
  fileSize?: string
  aiSummary?: string
  content?: string
  createdAt: string
  updatedAt: string
}

export interface AIInsight {
  id: string
  type: 'risk-alert' | 'optimization' | 'prediction' | 'medication' | 'diagnosis'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  patients?: string[]
  impact?: string
  recommendation: string
  timestamp: string
  acknowledged: boolean
}

export interface DashboardStats {
  totalPatients: number
  todayAppointments: number
  activeDoctors: number
  totalRevenue: number
}

export interface SystemUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'lab_technician'
  department?: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin?: string
  createdAt: string
  permissions: string[]
}

export interface SystemLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  details?: string
  ipAddress?: string
  timestamp: string
  status: 'success' | 'failed' | 'warning'
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: string
  database: 'connected' | 'disconnected'
  api: 'operational' | 'degraded' | 'down'
  storage: number
  storageUsed: number
  activeUsers: number
}
