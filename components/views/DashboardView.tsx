'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHospitalStore } from '@/store/useHospitalStore'
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Brain,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const stats = [
  { 
    title: 'Total Patients', 
    value: '2,458', 
    change: '+12.5%', 
    trend: 'up',
    icon: Users, 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  { 
    title: 'Today\'s Appointments', 
    value: '48', 
    change: '+8.2%', 
    trend: 'up',
    icon: Calendar, 
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  { 
    title: 'Active Doctors', 
    value: '32', 
    change: '+2', 
    trend: 'up',
    icon: Activity, 
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  { 
    title: 'AI Insights', 
    value: '156', 
    change: 'New', 
    trend: 'neutral',
    icon: Brain, 
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
]

const chartData = [
  { name: 'Mon', patients: 45, appointments: 42 },
  { name: 'Tue', patients: 52, appointments: 48 },
  { name: 'Wed', patients: 48, appointments: 45 },
  { name: 'Thu', patients: 61, appointments: 55 },
  { name: 'Fri', patients: 55, appointments: 52 },
  { name: 'Sat', patients: 38, appointments: 35 },
  { name: 'Sun', patients: 32, appointments: 28 },
]

const appointmentStatus = [
  { name: 'Completed', value: 65, color: '#22c55e' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Cancelled', value: 10, color: '#ef4444' },
]

const recentActivities = [
  { id: 1, type: 'appointment', message: 'New appointment scheduled for John Doe', time: '5 mins ago', status: 'success' },
  { id: 2, type: 'patient', message: 'Patient Sarah Wilson checked in', time: '15 mins ago', status: 'info' },
  { id: 3, type: 'ai', message: 'AI detected potential risk for patient #2458', time: '1 hour ago', status: 'warning' },
  { id: 4, type: 'doctor', message: 'Dr. Smith completed patient consultation', time: '2 hours ago', status: 'success' },
  { id: 5, type: 'appointment', message: 'Appointment cancelled for Mike Johnson', time: '3 hours ago', status: 'error' },
]

export default function DashboardView() {
  const { stats, fetchStats, patients, appointments, doctors, fetchPatients, fetchAppointments, fetchDoctors } = useHospitalStore()

  useEffect(() => {
    fetchPatients()
    fetchAppointments()
    fetchDoctors()
    fetchStats()
  }, [fetchPatients, fetchAppointments, fetchDoctors, fetchStats])

  const displayStats = [
    { 
      title: 'Total Patients', 
      value: patients.length.toString(), 
      change: '+12.5%', 
      trend: 'up',
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      title: 'Today\'s Appointments', 
      value: stats.todayAppointments?.toString() || '0', 
      change: '+8.2%', 
      trend: 'up',
      icon: Calendar, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      title: 'Active Doctors', 
      value: stats.activeDoctors?.toString() || '0', 
      change: `+${doctors.filter(d => d.status === 'available').length}`, 
      trend: 'up',
      icon: Activity, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      title: 'AI Insights', 
      value: '156', 
      change: 'New', 
      trend: 'neutral',
      icon: Brain, 
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                )}
                {stat.trend === 'down' && (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                )}
                {stat.trend === 'neutral' && (
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{stat.change}</span>
                )}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient & Appointments Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Weekly Overview</h2>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Appointment Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Appointment Status</h2>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Insights & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6" />
              <h2 className="text-xl font-bold">AI Insights</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">High Priority Alert</p>
                  <p className="text-sm text-indigo-100">
                    AI detected 3 patients requiring immediate attention based on vital signs analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Optimization Suggestion</p>
                  <p className="text-sm text-indigo-100">
                    Rescheduling 5 appointments could reduce wait times by 30% tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                  activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  activity.status === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                  'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : activity.status === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

