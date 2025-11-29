import axios from 'axios'
import { Patient, Doctor, Appointment, MedicalRecord, SystemUser, SystemLog } from '@/types'

const api = axios.create({
  baseURL: '/api',
})

// Patients API
export const patientsAPI = {
  getAll: () => api.get<{ success: boolean; data: Patient[] }>('/patients'),
  getById: (id: string) => api.get<{ success: boolean; data: Patient }>(`/patients/${id}`),
  create: (data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: Patient }>('/patients', data),
  update: (id: string, data: Partial<Patient>) =>
    api.put<{ success: boolean; data: Patient }>(`/patients/${id}`, data),
  delete: (id: string) => api.delete<{ success: boolean }>(`/patients/${id}`),
}

// Doctors API
export const doctorsAPI = {
  getAll: () => api.get<{ success: boolean; data: Doctor[] }>('/doctors'),
  getById: (id: string) => api.get<{ success: boolean; data: Doctor }>(`/doctors/${id}`),
  create: (data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: Doctor }>('/doctors', data),
  update: (id: string, data: Partial<Doctor>) =>
    api.put<{ success: boolean; data: Doctor }>(`/doctors/${id}`, data),
  delete: (id: string) => api.delete<{ success: boolean }>(`/doctors/${id}`),
}

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get<{ success: boolean; data: Appointment[] }>('/appointments'),
  getById: (id: string) => api.get<{ success: boolean; data: Appointment }>(`/appointments/${id}`),
  create: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: Appointment }>('/appointments', data),
  update: (id: string, data: Partial<Appointment>) =>
    api.put<{ success: boolean; data: Appointment }>(`/appointments/${id}`, data),
  delete: (id: string) => api.delete<{ success: boolean }>(`/appointments/${id}`),
}

// Records API
export const recordsAPI = {
  getAll: () => api.get<{ success: boolean; data: MedicalRecord[] }>('/records'),
  create: (data: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: MedicalRecord }>('/records', data),
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get<{ success: boolean; data: any }>('/dashboard/stats'),
}

// Admin API
export const adminAPI = {
  users: {
    getAll: () => api.get<{ success: boolean; data: SystemUser[] }>('/admin/users'),
    getById: (id: string) => api.get<{ success: boolean; data: SystemUser }>(`/admin/users/${id}`),
    create: (data: Omit<SystemUser, 'id' | 'createdAt' | 'permissions'>) =>
      api.post<{ success: boolean; data: SystemUser }>('/admin/users', data),
    update: (id: string, data: Partial<SystemUser>) =>
      api.put<{ success: boolean; data: SystemUser }>(`/admin/users/${id}`, data),
    delete: (id: string) => api.delete<{ success: boolean }>(`/admin/users/${id}`),
  },
  logs: {
    getAll: () => api.get<{ success: boolean; data: SystemLog[] }>('/admin/logs'),
    create: (data: Omit<SystemLog, 'id' | 'timestamp'>) =>
      api.post<{ success: boolean; data: SystemLog }>('/admin/logs', data),
  },
  health: {
    get: () => api.get<{ success: boolean; data: any }>('/admin/health'),
  },
}

