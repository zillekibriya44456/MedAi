'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  FileText, 
  Activity,
  Brain,
  Settings,
  X,
  ChevronLeft,
  HeartPulse,
  PlayCircle,
  Shield
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600' },
  { id: 'patients', label: 'Patients', icon: Users, color: 'text-green-600' },
  { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'text-purple-600' },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope, color: 'text-red-600' },
  { id: 'records', label: 'Medical Records', icon: FileText, color: 'text-orange-600' },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain, color: 'text-indigo-600' },
  { id: 'analytics', label: 'Analytics', icon: Activity, color: 'text-pink-600' },
  { id: 'tutorials', label: 'Tutorials', icon: PlayCircle, color: 'text-yellow-600' },
  { id: 'admin', label: 'Administrator', icon: Shield, color: 'text-red-600' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
]

export default function Sidebar({ isOpen, onToggle, activeView, setActiveView }: SidebarProps) {
  return (
    <>
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? 280 : 80,
        }}
        className="h-full bg-white dark:bg-slate-800 shadow-xl border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300"
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          {isOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MedAI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hospital System</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
          )}
          {isOpen && (
            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveView(item.id)
                  if (!isOpen) onToggle()
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* AI Badge */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 m-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">AI Powered</span>
            </div>
            <p className="text-xs text-indigo-100">
              Smart recommendations and insights powered by advanced AI
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

