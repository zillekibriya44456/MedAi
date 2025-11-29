'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { MedicalRecord } from '@/types'
import { useHospitalStore } from '@/store/useHospitalStore'

interface RecordFormProps {
  record?: MedicalRecord
  onClose: () => void
}

export default function RecordForm({ record, onClose }: RecordFormProps) {
  const { addRecord, patients, doctors, fetchPatients, fetchDoctors } = useHospitalStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    recordType: 'Lab Results',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed' as 'Completed' | 'Pending Review' | 'Active' | 'Archived',
    content: '',
    fileSize: '1.0 MB',
  })

  useEffect(() => {
    fetchPatients()
    fetchDoctors()
  }, [fetchPatients, fetchDoctors])

  useEffect(() => {
    if (record) {
      const patient = patients.find((p: any) => p.name === record.patientName)
      const doctor = doctors.find((d: any) => d.name === record.doctorName)
      setFormData({
        patientId: patient?.id || '',
        doctorId: doctor?.id || '',
        recordType: record.recordType,
        date: record.date,
        status: record.status,
        content: record.content || '',
        fileSize: record.fileSize || '1.0 MB',
      })
    }
  }, [record, patients, doctors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const patient = patients.find((p: any) => p.id === formData.patientId)
      const doctor = doctors.find((d: any) => d.id === formData.doctorId)

      if (!patient || !doctor) {
        throw new Error('Please select both patient and doctor')
      }

      const data = {
        patientId: formData.patientId,
        patientName: patient.name,
        doctorId: formData.doctorId,
        doctorName: doctor.name,
        recordType: formData.recordType,
        date: formData.date,
        status: formData.status,
        content: formData.content,
        fileSize: formData.fileSize,
        aiSummary: `AI-generated summary for ${formData.recordType}`,
      }

      if (!record) {
        await addRecord(data)
      }
      onClose()
    } catch (error: any) {
      console.error('Error saving record:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {record ? 'Edit Record' : 'Add Medical Record'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Patient *
            </label>
            <select
              required
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Patient</option>
              {patients.map((patient: any) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Doctor *
            </label>
            <select
              required
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor: any) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Record Type *
              </label>
              <select
                required
                value={formData.recordType}
                onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Lab Results">Lab Results</option>
                <option value="Diagnostic Report">Diagnostic Report</option>
                <option value="X-Ray Report">X-Ray Report</option>
                <option value="Prescription">Prescription</option>
                <option value="Surgery Report">Surgery Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Completed">Completed</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Record Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              placeholder="Enter record details..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold disabled:opacity-50"
            >
              {loading ? 'Saving...' : record ? 'Update' : 'Add Record'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

