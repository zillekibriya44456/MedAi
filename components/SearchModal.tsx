'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, User, Stethoscope, Calendar, FileText, ArrowRight } from 'lucide-react'
import { useHospitalStore } from '@/store/useHospitalStore'
import { Patient, Doctor, Appointment } from '@/types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectResult?: (type: string, id: string) => void
}

export default function SearchModal({ isOpen, onClose, onSelectResult }: SearchModalProps) {
  const { patients, doctors, appointments, fetchPatients, fetchDoctors, fetchAppointments } = useHospitalStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<{
    patients: Patient[]
    doctors: Doctor[]
    appointments: Appointment[]
  }>({ patients: [], doctors: [], appointments: [] })

  useEffect(() => {
    if (isOpen) {
      fetchPatients()
      fetchDoctors()
      fetchAppointments()
    }
  }, [isOpen, fetchPatients, fetchDoctors, fetchAppointments])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ patients: [], doctors: [], appointments: [] })
      return
    }

    const term = searchTerm.toLowerCase()
    
    const matchedPatients = patients.filter((p: Patient) =>
      p.name.toLowerCase().includes(term) ||
      p.condition.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term) ||
      p.phone.includes(term)
    )

    const matchedDoctors = doctors.filter((d: Doctor) =>
      d.name.toLowerCase().includes(term) ||
      d.specialization.toLowerCase().includes(term) ||
      d.email.toLowerCase().includes(term)
    )

    const matchedAppointments = appointments.filter((a: Appointment) =>
      a.patientName.toLowerCase().includes(term) ||
      a.doctorName.toLowerCase().includes(term) ||
      a.type.toLowerCase().includes(term)
    )

    setResults({
      patients: matchedPatients.slice(0, 5),
      doctors: matchedDoctors.slice(0, 5),
      appointments: matchedAppointments.slice(0, 5),
    })
  }, [searchTerm, patients, doctors, appointments])

  const totalResults = results.patients.length + results.doctors.length + results.appointments.length

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20 px-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[70vh] overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search patients, doctors, appointments, records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {!searchTerm ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Start typing to search...</p>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Patients Results */}
                {results.patients.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      PATIENTS ({results.patients.length})
                    </h3>
                    <div className="space-y-2">
                      {results.patients.map((patient) => (
                        <button
                          key={patient.id}
                          onClick={() => {
                            if (onSelectResult) onSelectResult('patient', patient.id)
                            onClose()
                          }}
                          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{patient.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {patient.condition} • {patient.age} years old
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctors Results */}
                {results.doctors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      DOCTORS ({results.doctors.length})
                    </h3>
                    <div className="space-y-2">
                      {results.doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => {
                            if (onSelectResult) onSelectResult('doctor', doctor.id)
                            onClose()
                          }}
                          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{doctor.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {doctor.specialization} • {doctor.experience}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appointments Results */}
                {results.appointments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      APPOINTMENTS ({results.appointments.length})
                    </h3>
                    <div className="space-y-2">
                      {results.appointments.map((appointment) => (
                        <button
                          key={appointment.id}
                          onClick={() => {
                            if (onSelectResult) onSelectResult('appointment', appointment.id)
                            onClose()
                          }}
                          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {appointment.patientName} with {appointment.doctorName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.date} • {appointment.time} • {appointment.type}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

