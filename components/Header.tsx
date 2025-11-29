'use client'

import { Search, Bell, User, Menu, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchModal from './SearchModal'
import NotificationsPanel from './NotificationsPanel'
import { useHospitalStore } from '@/store/useHospitalStore'

interface HeaderProps {
  onMenuClick: () => void
  activeView: string
  setActiveView?: (view: string) => void
}

const viewTitles: Record<string, string> = {
  dashboard: 'Dashboard Overview',
  patients: 'Patient Management',
  appointments: 'Appointment Scheduling',
  doctors: 'Doctor & Staff Management',
  records: 'Medical Records',
  'ai-insights': 'AI Insights & Recommendations',
  analytics: 'Analytics & Reports',
  tutorials: 'Video Tutorials & Guides',
  admin: 'Administrator Panel',
  settings: 'System Settings',
}

export default function Header({ onMenuClick, activeView, setActiveView }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { patients, appointments } = useHospitalStore()
  
  // Calculate notification count
  const unreadNotifications = patients.filter((p: any) => p.status === 'critical').length +
    appointments.filter((a: any) => {
      const today = new Date().toISOString().split('T')[0]
      return a.date === today && a.status === 'scheduled'
    }).length

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {viewTitles[activeView] || 'Dashboard'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="relative hidden md:flex items-center space-x-3 px-4 py-2 w-80 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Search patients, doctors, records...</span>
          </button>
          
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadNotifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </motion.span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Dr. Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </button>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSelectResult={(type, id) => {
          if (setActiveView) {
            if (type === 'patient') setActiveView('patients')
            if (type === 'doctor') setActiveView('doctors')
            if (type === 'appointment') setActiveView('appointments')
          }
        }}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </header>
  )
}

