'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHospitalStore } from '@/store/useHospitalStore'
import { Appointment } from '@/types'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'

const appointments = [
  {
    id: 1,
    patient: 'John Doe',
    doctor: 'Dr. Sarah Smith',
    time: '09:00 AM',
    date: '2024-01-20',
    type: 'Regular Checkup',
    status: 'scheduled',
    duration: '30 min',
    aiOptimized: true
  },
  {
    id: 2,
    patient: 'Sarah Wilson',
    doctor: 'Dr. Michael Johnson',
    time: '10:30 AM',
    date: '2024-01-20',
    type: 'Follow-up',
    status: 'scheduled',
    duration: '20 min',
    aiOptimized: true
  },
  {
    id: 3,
    patient: 'Mike Johnson',
    doctor: 'Dr. Sarah Smith',
    time: '11:00 AM',
    date: '2024-01-20',
    type: 'Emergency',
    status: 'in-progress',
    duration: '45 min',
    aiOptimized: false
  },
  {
    id: 4,
    patient: 'Emily Chen',
    doctor: 'Dr. Robert Brown',
    time: '02:00 PM',
    date: '2024-01-20',
    type: 'Consultation',
    status: 'scheduled',
    duration: '30 min',
    aiOptimized: true
  },
  {
    id: 5,
    patient: 'Robert Brown',
    doctor: 'Dr. Sarah Smith',
    time: '03:30 PM',
    date: '2024-01-20',
    type: 'Regular Checkup',
    status: 'completed',
    duration: '30 min',
    aiOptimized: false
  },
]

export default function AppointmentsView() {
  const { appointments, fetchAppointments, updateAppointment, deleteAppointment } = useHospitalStore()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>()

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const handleAdd = () => {
    setSelectedAppointment(undefined)
    setShowForm(true)
  }

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setShowForm(true)
  }

  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    await updateAppointment(id, { status })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2
      case 'cancelled': return XCircle
      case 'in-progress': return AlertCircle
      default: return Clock
    }
  }

  const filteredAppointments = appointments.filter((apt: Appointment) => {
    const matchesDate = !selectedDate || apt.date === selectedDate
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus
    return matchesDate && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Appointment Scheduling</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage appointments with AI-optimized scheduling</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>New Appointment</span>
        </motion.button>
      </div>

      {/* AI Optimization Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">AI Schedule Optimization Active</h3>
              <p className="text-sm text-indigo-100">
                AI has optimized 3 appointments today to reduce wait times by 25%
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
            View Suggestions
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            filterStatus === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
          }`}
        >
          All Appointments
        </button>
        <button
          onClick={() => setFilterStatus('scheduled')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            filterStatus === 'scheduled'
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setFilterStatus('in-progress')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            filterStatus === 'in-progress'
              ? 'bg-yellow-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            filterStatus === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No appointments found. Create your first appointment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment: Appointment, index: number) => {
          const StatusIcon = getStatusIcon(appointment.status)
          return (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    appointment.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                    appointment.status === 'in-progress' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <Calendar className={`w-8 h-8 ${
                      appointment.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      appointment.status === 'in-progress' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{appointment.patient}</h3>
                      {appointment.aiOptimized && (
                        <span className="flex items-center space-x-1 text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Optimized</span>
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Stethoscope className="w-4 h-4" />
                        <span>{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time} • {appointment.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(appointment.status)} flex items-center space-x-1`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{appointment.status.replace('-', ' ')}</span>
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    {appointment.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <button 
                  onClick={() => handleEdit(appointment)}
                  className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold"
                >
                  Edit
                </button>
                {appointment.status === 'scheduled' && (
                  <button 
                    onClick={() => handleStatusChange(appointment.id, 'in-progress')}
                    className="flex-1 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold"
                  >
                    Start Appointment
                  </button>
                )}
                {appointment.status === 'in-progress' && (
                  <button 
                    onClick={() => handleStatusChange(appointment.id, 'completed')}
                    className="flex-1 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold"
                  >
                    Complete
                  </button>
                )}
              </div>
            </motion.div>
          )
          })}
        </div>
      )}
      
      {showForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          onClose={() => {
            setShowForm(false)
            setSelectedAppointment(undefined)
          }}
        />
      )}
    </div>
  )
}

