'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react'
import { useHospitalStore } from '@/store/useHospitalStore'
import { Patient } from '@/types'
import PatientForm from '@/components/forms/PatientForm'

export default function PatientsView() {
  const { patients, fetchPatients, deletePatient } = useHospitalStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>()
  const [showMenu, setShowMenu] = useState<string | null>(null)

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  const filteredPatients = patients.filter((patient: Patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowForm(true)
    setShowMenu(null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      await deletePatient(id)
      setShowMenu(null)
    }
  }

  const handleAdd = () => {
    setSelectedPatient(undefined)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedPatient(undefined)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500'
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor all patients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New Patient</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-3 rounded-xl transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-3 rounded-xl transition-colors ${
              filterStatus === 'active'
                ? 'bg-green-500 text-white'
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('critical')}
            className={`px-4 py-3 rounded-xl transition-colors ${
              filterStatus === 'critical'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
            }`}
          >
            Critical
          </button>
        </div>
      </div>

      {/* Patients Grid */}
      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No patients found. Add your first patient to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient: Patient, index: number) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{patient.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patient.age} years old • {patient.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`} />
                <button 
                  onClick={() => setShowMenu(showMenu === patient.id ? null : patient.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                {showMenu === patient.id && (
                  <div className="absolute top-10 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-10 min-w-[120px]">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Condition</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{patient.condition}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{patient.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Next: {patient.nextAppointment}</span>
              </div>

              {/* AI Insight */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">AI Insight</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{patient.aiInsight}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold">
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      )}
      
      {showForm && (
        <PatientForm
          patient={selectedPatient}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}

