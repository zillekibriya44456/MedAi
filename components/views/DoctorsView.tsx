'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHospitalStore } from '@/store/useHospitalStore'
import { Doctor } from '@/types'
import DoctorForm from '@/components/forms/DoctorForm'
import { 
  Stethoscope, 
  Star, 
  Calendar, 
  Users,
  Phone,
  Mail,
  MapPin,
  Plus,
  TrendingUp,
  Award
} from 'lucide-react'

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Smith',
    specialization: 'Cardiologist',
    experience: '15 years',
    patients: 245,
    rating: 4.9,
    image: '👩‍⚕️',
    status: 'available',
    nextAvailable: '2:00 PM',
    phone: '+1 234-567-8900',
    email: 'sarah.smith@hospital.com',
    location: 'Cardiology Wing, Floor 3'
  },
  {
    id: 2,
    name: 'Dr. Michael Johnson',
    specialization: 'Neurologist',
    experience: '12 years',
    patients: 189,
    rating: 4.8,
    image: '👨‍⚕️',
    status: 'busy',
    nextAvailable: '4:30 PM',
    phone: '+1 234-567-8901',
    email: 'michael.j@hospital.com',
    location: 'Neurology Wing, Floor 2'
  },
  {
    id: 3,
    name: 'Dr. Robert Brown',
    specialization: 'Orthopedist',
    experience: '18 years',
    patients: 312,
    rating: 4.9,
    image: '👨‍⚕️',
    status: 'available',
    nextAvailable: '1:00 PM',
    phone: '+1 234-567-8902',
    email: 'robert.b@hospital.com',
    location: 'Orthopedic Wing, Floor 1'
  },
  {
    id: 4,
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrician',
    experience: '10 years',
    patients: 167,
    rating: 4.7,
    image: '👩‍⚕️',
    status: 'available',
    nextAvailable: '3:15 PM',
    phone: '+1 234-567-8903',
    email: 'emily.c@hospital.com',
    location: 'Pediatrics Wing, Floor 2'
  },
  {
    id: 5,
    name: 'Dr. David Lee',
    specialization: 'Dermatologist',
    experience: '8 years',
    patients: 134,
    rating: 4.8,
    image: '👨‍⚕️',
    status: 'available',
    nextAvailable: '11:30 AM',
    phone: '+1 234-567-8904',
    email: 'david.l@hospital.com',
    location: 'Dermatology Wing, Floor 1'
  },
]

export default function DoctorsView() {
  const { doctors, fetchDoctors, deleteDoctor } = useHospitalStore()
  const [showForm, setShowForm] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  const handleAdd = () => {
    setSelectedDoctor(undefined)
    setShowForm(true)
  }

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoctor(id)
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'available' 
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Doctors & Staff</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage medical staff and specialists</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>Add Doctor</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{doctors.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Now</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {doctors.filter(d => d.status === 'available').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">4.8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {doctors.reduce((sum, d) => sum + d.patients, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Doctors Grid */}
      {doctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No doctors found. Add your first doctor to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.map((doctor: Doctor, index: number) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                  {doctor.image}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(doctor.status)}`}>
                {doctor.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Experience</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{doctor.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Patients</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{doctor.patients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{doctor.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Next Available</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{doctor.nextAvailable}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{doctor.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{doctor.location}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button 
                onClick={() => handleEdit(doctor)}
                className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(doctor.id)}
                className="flex-1 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </motion.div>
          ))}
        </div>
      )}
      
      {showForm && (
        <DoctorForm
          doctor={selectedDoctor}
          onClose={() => {
            setShowForm(false)
            setSelectedDoctor(undefined)
          }}
        />
      )}
    </div>
  )
}

