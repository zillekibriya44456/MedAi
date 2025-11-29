'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Eye,
  Plus,
  Calendar,
  User,
  FileCheck,
  Brain
} from 'lucide-react'
import { useHospitalStore } from '@/store/useHospitalStore'
import { MedicalRecord } from '@/types'
import RecordForm from '@/components/forms/RecordForm'

export default function RecordsView() {
  const { records, fetchRecords } = useHospitalStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const filteredRecords = records.filter((record: MedicalRecord) => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.recordType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || record.recordType === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Active': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Archived': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Medical Records</h2>
          <p className="text-gray-600 dark:text-gray-400">Access and manage patient medical records with AI-powered insights</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>New Record</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search records by patient or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="Lab Results">Lab Results</option>
          <option value="Diagnostic Report">Diagnostic Report</option>
          <option value="X-Ray Report">X-Ray Report</option>
          <option value="Prescription">Prescription</option>
          <option value="Surgery Report">Surgery Report</option>
        </select>
      </div>

      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No records found. Add your first medical record!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record: MedicalRecord, index: number) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{record.recordType}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{record.patientName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <FileCheck className="w-4 h-4" />
                      <span>{record.doctorName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{record.date}</span>
                      <span className="text-gray-400">•</span>
                      <span>{record.fileSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            {record.aiSummary && (
              <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-start space-x-2">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">AI Summary</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{record.aiSummary}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button className="flex items-center justify-center space-x-2 flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="flex items-center justify-center space-x-2 flex-1 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
          ))}
        </div>
      )}
      
      {showForm && (
        <RecordForm
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

