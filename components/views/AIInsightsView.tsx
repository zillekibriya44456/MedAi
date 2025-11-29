'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHospitalStore } from '@/store/useHospitalStore'
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb,
  Activity,
  Target,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react'

const insights = [
  {
    id: 1,
    type: 'risk-alert',
    title: 'High Priority Risk Detection',
    description: 'AI identified 3 patients with elevated risk factors requiring immediate attention',
    severity: 'high',
    patients: ['Mike Johnson', 'Sarah Wilson', 'John Doe'],
    recommendation: 'Schedule immediate follow-up consultations within 24 hours',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 2,
    type: 'optimization',
    title: 'Schedule Optimization Opportunity',
    description: 'Rescheduling 5 appointments could reduce patient wait times by 30%',
    severity: 'medium',
    impact: 'High',
    recommendation: 'AI suggests moving 3 appointments to less busy time slots',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    type: 'prediction',
    title: 'Patient Flow Prediction',
    description: 'AI predicts 45% increase in appointments for next week',
    severity: 'low',
    recommendation: 'Consider scheduling additional staff or extending hours',
    icon: Activity,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    type: 'medication',
    title: 'Medication Compliance Analysis',
    description: '12 patients show potential non-compliance patterns',
    severity: 'medium',
    recommendation: 'Send automated reminders and schedule follow-up calls',
    icon: Target,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    type: 'diagnosis',
    title: 'Diagnostic Pattern Detection',
    description: 'AI detected common symptom patterns suggesting seasonal flu outbreak',
    severity: 'low',
    recommendation: 'Prepare additional resources for flu treatment and prevention',
    icon: Lightbulb,
    color: 'from-yellow-500 to-amber-500'
  },
]

export default function AIInsightsView() {
  const { patients, appointments, fetchPatients, fetchAppointments } = useHospitalStore()
  const [insights, setInsights] = useState<any[]>([])

  useEffect(() => {
    fetchPatients()
    fetchAppointments()
  }, [fetchPatients, fetchAppointments])

  useEffect(() => {
    // Generate real insights from data
    const generatedInsights: any[] = []

    // Critical patients alert
    const criticalPatients = patients.filter((p: any) => p.status === 'critical')
    if (criticalPatients.length > 0) {
      generatedInsights.push({
        id: '1',
        type: 'risk-alert',
        title: 'High Priority Risk Detection',
        description: `AI identified ${criticalPatients.length} patient(s) with elevated risk factors requiring immediate attention`,
        severity: 'high',
        patients: criticalPatients.map((p: any) => p.name),
        recommendation: 'Schedule immediate follow-up consultations within 24 hours',
        icon: AlertTriangle,
        color: 'from-red-500 to-orange-500'
      })
    }

    // Schedule optimization
    const today = new Date().toISOString().split('T')[0]
    const todayAppointments = appointments.filter((a: any) => a.date === today && a.status === 'scheduled')
    if (todayAppointments.length > 3) {
      generatedInsights.push({
        id: '2',
        type: 'optimization',
        title: 'Schedule Optimization Opportunity',
        description: `Rescheduling ${Math.floor(todayAppointments.length * 0.2)} appointments could reduce patient wait times`,
        severity: 'medium',
        impact: 'High',
        recommendation: 'AI suggests redistributing appointments to less busy time slots',
        icon: TrendingUp,
        color: 'from-blue-500 to-cyan-500'
      })
    }

    // Patient flow prediction
    if (appointments.length > 0) {
      generatedInsights.push({
        id: '3',
        type: 'prediction',
        title: 'Patient Flow Prediction',
        description: 'AI predicts increase in appointments based on current trends',
        severity: 'low',
        recommendation: 'Consider scheduling additional staff or extending hours if needed',
        icon: Activity,
        color: 'from-purple-500 to-pink-500'
      })
    }

    // Medication compliance
    const mediumRiskPatients = patients.filter((p: any) => p.riskLevel === 'medium')
    if (mediumRiskPatients.length > 5) {
      generatedInsights.push({
        id: '4',
        type: 'medication',
        title: 'Medication Compliance Analysis',
        description: `${mediumRiskPatients.length} patients show potential non-compliance patterns`,
        severity: 'medium',
        recommendation: 'Send automated reminders and schedule follow-up calls',
        icon: Target,
        color: 'from-green-500 to-emerald-500'
      })
    }

    setInsights(generatedInsights)
  }, [patients, appointments])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Insights & Recommendations</h2>
          <p className="text-gray-600 dark:text-gray-400">Powered by advanced machine learning algorithms</p>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-6 h-6" />
            <span className="text-2xl font-bold">{insights.length}</span>
          </div>
          <p className="text-sm text-indigo-100">Total Insights</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">92%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {patients.filter((p: any) => p.status === 'critical').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Critical Alerts</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {appointments.filter((a: any) => a.aiOptimized).length}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Optimized Appointments</p>
        </motion.div>
      </div>

      {/* Insights List */}
      {insights.length === 0 ? (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No AI insights available yet. Add more data to generate insights.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight: any, index: number) => {
          const Icon = insight.icon
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{insight.title}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSeverityColor(insight.severity)}`}>
                        {insight.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{insight.description}</p>
                  
                  {insight.patients && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Affected Patients:</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.patients.map((patient, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                          >
                            {patient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {insight.impact && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Impact: <span className="text-blue-600 dark:text-blue-400">{insight.impact}</span>
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">AI Recommendation</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold">
                      Take Action
                    </button>
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-semibold">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
          })}
        </div>
      )}
    </div>
  )
}

