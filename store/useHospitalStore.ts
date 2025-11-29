import { create } from 'zustand'
import { Patient, Doctor, Appointment, MedicalRecord } from '@/types'
import { patientsAPI, doctorsAPI, appointmentsAPI, recordsAPI } from '@/lib/api'
import toast from 'react-hot-toast'

interface HospitalStore {
  // State
  patients: Patient[]
  doctors: Doctor[]
  appointments: Appointment[]
  records: MedicalRecord[]
  loading: boolean
  stats: any

  // Actions
  fetchPatients: () => Promise<void>
  fetchDoctors: () => Promise<void>
  fetchAppointments: () => Promise<void>
  fetchRecords: () => Promise<void>
  fetchStats: () => Promise<void>
  
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>
  deletePatient: (id: string) => Promise<void>
  
  addDoctor: (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateDoctor: (id: string, updates: Partial<Doctor>) => Promise<void>
  deleteDoctor: (id: string) => Promise<void>
  
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>
  deleteAppointment: (id: string) => Promise<void>
  
  addRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export const useHospitalStore = create<HospitalStore>((set, get) => ({
  patients: [],
  doctors: [],
  appointments: [],
  records: [],
  loading: false,
  stats: {},

  fetchPatients: async () => {
    try {
      set({ loading: true })
      const response = await patientsAPI.getAll()
      set({ patients: response.data.data, loading: false })
    } catch (error: any) {
      toast.error('Failed to fetch patients')
      set({ loading: false })
    }
  },

  fetchDoctors: async () => {
    try {
      set({ loading: true })
      const response = await doctorsAPI.getAll()
      set({ doctors: response.data.data, loading: false })
    } catch (error: any) {
      toast.error('Failed to fetch doctors')
      set({ loading: false })
    }
  },

  fetchAppointments: async () => {
    try {
      set({ loading: true })
      const response = await appointmentsAPI.getAll()
      set({ appointments: response.data.data, loading: false })
    } catch (error: any) {
      toast.error('Failed to fetch appointments')
      set({ loading: false })
    }
  },

  fetchRecords: async () => {
    try {
      set({ loading: true })
      const response = await recordsAPI.getAll()
      set({ records: response.data.data, loading: false })
    } catch (error: any) {
      toast.error('Failed to fetch records')
      set({ loading: false })
    }
  },

  fetchStats: async () => {
    try {
      const response = await patientsAPI.getAll()
      const appointmentsResponse = await appointmentsAPI.getAll()
      const doctorsResponse = await doctorsAPI.getAll()
      
      const today = new Date().toISOString().split('T')[0]
      const todayAppointments = appointmentsResponse.data.data.filter(
        (apt: Appointment) => apt.date === today && apt.status !== 'cancelled'
      )

      set({
        stats: {
          totalPatients: response.data.data.length,
          todayAppointments: todayAppointments.length,
          activeDoctors: doctorsResponse.data.data.filter((d: Doctor) => d.status === 'available').length,
          totalDoctors: doctorsResponse.data.data.length,
        },
      })
    } catch (error: any) {
      console.error('Failed to fetch stats', error)
    }
  },

  addPatient: async (patient) => {
    try {
      const response = await patientsAPI.create(patient)
      set({ patients: [...get().patients, response.data.data] })
      toast.success('Patient added successfully')
    } catch (error: any) {
      toast.error('Failed to add patient')
      throw error
    }
  },

  updatePatient: async (id, updates) => {
    try {
      const response = await patientsAPI.update(id, updates)
      set({
        patients: get().patients.map(p => p.id === id ? response.data.data : p),
      })
      toast.success('Patient updated successfully')
    } catch (error: any) {
      toast.error('Failed to update patient')
      throw error
    }
  },

  deletePatient: async (id) => {
    try {
      await patientsAPI.delete(id)
      set({ patients: get().patients.filter(p => p.id !== id) })
      toast.success('Patient deleted successfully')
    } catch (error: any) {
      toast.error('Failed to delete patient')
      throw error
    }
  },

  addDoctor: async (doctor) => {
    try {
      const response = await doctorsAPI.create(doctor)
      set({ doctors: [...get().doctors, response.data.data] })
      toast.success('Doctor added successfully')
    } catch (error: any) {
      toast.error('Failed to add doctor')
      throw error
    }
  },

  updateDoctor: async (id, updates) => {
    try {
      const response = await doctorsAPI.update(id, updates)
      set({
        doctors: get().doctors.map(d => d.id === id ? response.data.data : d),
      })
      toast.success('Doctor updated successfully')
    } catch (error: any) {
      toast.error('Failed to update doctor')
      throw error
    }
  },

  deleteDoctor: async (id) => {
    try {
      await doctorsAPI.delete(id)
      set({ doctors: get().doctors.filter(d => d.id !== id) })
      toast.success('Doctor deleted successfully')
    } catch (error: any) {
      toast.error('Failed to delete doctor')
      throw error
    }
  },

  addAppointment: async (appointment) => {
    try {
      const response = await appointmentsAPI.create(appointment)
      set({ appointments: [...get().appointments, response.data.data] })
      toast.success('Appointment created successfully')
    } catch (error: any) {
      toast.error('Failed to create appointment')
      throw error
    }
  },

  updateAppointment: async (id, updates) => {
    try {
      const response = await appointmentsAPI.update(id, updates)
      set({
        appointments: get().appointments.map(a => a.id === id ? response.data.data : a),
      })
      toast.success('Appointment updated successfully')
    } catch (error: any) {
      toast.error('Failed to update appointment')
      throw error
    }
  },

  deleteAppointment: async (id) => {
    try {
      await appointmentsAPI.delete(id)
      set({ appointments: get().appointments.filter(a => a.id !== id) })
      toast.success('Appointment deleted successfully')
    } catch (error: any) {
      toast.error('Failed to delete appointment')
      throw error
    }
  },

  addRecord: async (record) => {
    try {
      const response = await recordsAPI.create(record)
      set({ records: [...get().records, response.data.data] })
      toast.success('Medical record added successfully')
    } catch (error: any) {
      toast.error('Failed to add record')
      throw error
    }
  },
}))

