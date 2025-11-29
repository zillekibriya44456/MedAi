'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const monthlyData = [
  { month: 'Jan', patients: 1200, revenue: 45000, appointments: 800 },
  { month: 'Feb', patients: 1350, revenue: 52000, appointments: 920 },
  { month: 'Mar', patients: 1500, revenue: 58000, appointments: 1050 },
  { month: 'Apr', patients: 1420, revenue: 55000, appointments: 980 },
  { month: 'May', patients: 1680, revenue: 65000, appointments: 1180 },
  { month: 'Jun', patients: 1750, revenue: 68000, appointments: 1220 },
]

const departmentData = [
  { name: 'Cardiology', value: 25, color: '#3b82f6' },
  { name: 'Neurology', value: 20, color: '#8b5cf6' },
  { name: 'Orthopedics', value: 18, color: '#ef4444' },
  { name: 'Pediatrics', value: 15, color: '#22c55e' },
  { name: 'Dermatology', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#6b7280' },
]

const kpiData = [
  { title: 'Total Revenue', value: '$68,000', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-600' },
  { title: 'Active Patients', value: '1,750', change: '+8.2%', trend: 'up', icon: Users, color: 'text-blue-600' },
  { title: 'Appointments', value: '1,220', change: '+5.1%', trend: 'up', icon: Calendar, color: 'text-purple-600' },
  { title: 'Avg. Wait Time', value: '12 min', change: '-18%', trend: 'down', icon: Activity, color: 'text-orange-600' },
]

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics & Reports</h2>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                {kpi.trend === 'up' ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{kpi.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{kpi.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Patients Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Monthly Trends</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="appointments" 
                stroke="#22c55e" 
                fill="#22c55e"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Department Distribution</h3>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Revenue Analysis</h3>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Patient Growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Patient Growth</h3>
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
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
              dot={{ fill: '#3b82f6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

