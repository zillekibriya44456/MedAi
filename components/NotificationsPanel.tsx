'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, AlertCircle, CheckCircle2, Clock, Calendar, User } from 'lucide-react'
import { useHospitalStore } from '@/store/useHospitalStore'
import { formatDistanceToNow, format } from 'date-fns'

interface Notification {
  id: string
  type: 'appointment' | 'patient' | 'system' | 'alert'
  title: string
  message: string
  time: string
  read: boolean
  link?: string
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { patients, appointments, fetchPatients, fetchAppointments } = useHospitalStore()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchPatients()
      fetchAppointments()
    }
  }, [isOpen, fetchPatients, fetchAppointments])

  useEffect(() => {
    // Generate notifications from real data
    const generated: Notification[] = []

    // Critical patients
    const criticalPatients = patients.filter((p: any) => p.status === 'critical')
    criticalPatients.forEach((patient: any) => {
      generated.push({
        id: `critical-${patient.id}`,
        type: 'alert',
        title: 'Critical Patient Alert',
        message: `${patient.name} requires immediate attention`,
        time: new Date().toISOString(),
        read: false,
      })
    })

    // Today's appointments
    const today = format(new Date(), 'yyyy-MM-dd')
    const todayAppointments = appointments.filter((a: any) => a.date === today && a.status === 'scheduled')
    todayAppointments.slice(0, 3).forEach((apt: any) => {
      generated.push({
        id: `appt-${apt.id}`,
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: `${apt.patientName} has an appointment at ${apt.time}`,
        time: new Date().toISOString(),
        read: false,
      })
    })

    // New patients (if any added today)
    const recentPatients = patients.filter((p: any) => {
      const created = new Date(p.createdAt)
      const today = new Date()
      return created.toDateString() === today.toDateString()
    })
    recentPatients.forEach((patient: any) => {
      generated.push({
        id: `new-${patient.id}`,
        type: 'patient',
        title: 'New Patient Registered',
        message: `${patient.name} has been added to the system`,
        time: patient.createdAt,
        read: false,
      })
    })

    // Sort by time (newest first)
    generated.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    setNotifications(generated.slice(0, 10))
  }, [patients, appointments])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertCircle
      case 'appointment': return Calendar
      case 'patient': return User
      default: return Bell
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      case 'appointment': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
      case 'patient': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12 px-6">
                <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {notifications.map((notification) => {
                  const Icon = getIcon(notification.type)
                  let timeAgo = 'just now'
                  try {
                    timeAgo = formatDistanceToNow(new Date(notification.time), { addSuffix: true })
                  } catch {
                    timeAgo = 'recently'
                  }
                  
                  return (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className={`text-sm font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {timeAgo}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

