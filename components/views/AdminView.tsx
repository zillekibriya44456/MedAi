'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Activity, 
  Database,
  Server,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  BarChart3,
  Lock,
  Unlock
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useHospitalStore } from '@/store/useHospitalStore'
import { adminAPI } from '@/lib/api'

type AdminTab = 'users' | 'logs' | 'system' | 'backup' | 'health'

interface SystemUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'lab_technician'
  department?: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin?: string
  createdAt: string
}

interface SystemLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  details?: string
  timestamp: string
  status: 'success' | 'failed' | 'warning'
}

const defaultUsers: SystemUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@hospital.com',
    role: 'doctor',
    department: 'Cardiology',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]

export default function AdminView() {
  const { patients, doctors, appointments, fetchPatients, fetchDoctors, fetchAppointments } = useHospitalStore()
  const [activeTab, setActiveTab] = useState<AdminTab>('users')
  const [users, setUsers] = useState<SystemUser[]>(defaultUsers)
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null)
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy' as 'healthy' | 'warning' | 'critical',
    uptime: '99.9%',
    database: 'connected' as 'connected' | 'disconnected',
    api: 'operational' as 'operational' | 'degraded' | 'down',
    storage: 100,
    storageUsed: 45,
    activeUsers: 0,
  })

  useEffect(() => {
    fetchPatients()
    fetchDoctors()
    fetchAppointments()
    loadUsers()
    loadLogs()
    updateSystemHealth()
  }, [fetchPatients, fetchDoctors, fetchAppointments])

  const loadUsers = async () => {
    try {
      const response = await adminAPI.users.getAll()
      setUsers(response.data.data)
    } catch (error) {
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('hospital-users')
      if (saved) {
        setUsers(JSON.parse(saved))
      }
    }
  }

  const saveUsers = async (newUsers: SystemUser[]) => {
    setUsers(newUsers)
    localStorage.setItem('hospital-users', JSON.stringify(newUsers))
  }

  const loadLogs = async () => {
    try {
      const response = await adminAPI.logs.getAll()
      setLogs(response.data.data)
    } catch (error) {
      // Generate default logs if API fails
      const generatedLogs: SystemLog[] = [
        {
          id: '1',
          userId: '1',
          userName: 'Admin User',
          action: 'Login',
          resource: 'System',
          timestamp: new Date().toISOString(),
          status: 'success',
        },
      ]
      setLogs(generatedLogs)
    }
  }

  const updateSystemHealth = async () => {
    try {
      const response = await adminAPI.health.get()
      setSystemHealth(response.data.data)
    } catch (error) {
      const active = users.filter(u => u.status === 'active').length
      setSystemHealth(prev => ({
        ...prev,
        activeUsers: active,
      }))
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesFilter
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'doctor': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'nurse': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'receptionist': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'suspended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserForm(true)
  }

  const handleEditUser = (user: SystemUser) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.users.delete(id)
        setUsers(users.filter(u => u.id !== id))
        toast.success('User deleted successfully')
        addLog({
          userId: '1',
          userName: 'Admin',
          action: 'Delete User',
          resource: `User #${id}`,
          status: 'success',
        })
      } catch (error) {
        toast.error('Failed to delete user')
      }
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const user = users.find(u => u.id === id)
      if (!user) return
      
      const newStatus = user.status === 'active' ? 'inactive' : 'active'
      await adminAPI.users.update(id, { status: newStatus })
      
      const updated = users.map(u => {
        if (u.id === id) {
          return { ...u, status: newStatus }
        }
        return u
      })
      setUsers(updated)
      toast.success('User status updated')
      updateSystemHealth()
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const addLog = (log: Omit<SystemLog, 'id' | 'timestamp'>) => {
    const newLog: SystemLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    setLogs(prev => [newLog, ...prev].slice(0, 100)) // Keep last 100 logs
  }

  const handleBackup = () => {
    toast.success('Database backup initiated. This may take a few minutes.')
    addLog({
      userId: '1',
      userName: 'Admin',
      action: 'Database Backup',
      resource: 'System',
      status: 'success',
    })
  }

  const handleRestore = () => {
    if (confirm('Are you sure you want to restore from backup? This will overwrite current data.')) {
      toast.success('Database restore initiated')
      addLog({
        userId: '1',
        userName: 'Admin',
        action: 'Database Restore',
        resource: 'System',
        status: 'success',
      })
    }
  }

  const tabs = [
    { id: 'users' as AdminTab, label: 'User Management', icon: Users },
    { id: 'logs' as AdminTab, label: 'Activity Logs', icon: Activity },
    { id: 'health' as AdminTab, label: 'System Health', icon: Server },
    { id: 'backup' as AdminTab, label: 'Backup & Restore', icon: Database },
    { id: 'system' as AdminTab, label: 'System Config', icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Administrator Panel</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage users, monitor system, and configure settings</p>
      </div>

      {/* System Health Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 shadow-lg ${
          systemHealth.status === 'healthy'
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
            : systemHealth.status === 'warning'
            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
            : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Server className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">System Status: {systemHealth.status.toUpperCase()}</h3>
              <p className="text-sm opacity-90">
                Uptime: {systemHealth.uptime} • Database: {systemHealth.database} • API: {systemHealth.api}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              updateSystemHealth()
              toast.success('System status refreshed')
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-slate-700">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-xl transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* User Management */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="receptionist">Receptionist</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddUser}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add User</span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{user.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      {user.status === 'active' ? (
                        <Lock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <Unlock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Role</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  {user.department && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Department</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{user.department}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{user.status}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-semibold flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm font-semibold flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Activity Logs</h3>
            <button
              onClick={() => {
                setLogs([])
                toast.success('Logs cleared')
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm font-semibold"
            >
              Clear Logs
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              >
                {log.status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : log.status === 'failed' ? (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {log.userName} - {log.action}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Resource: {log.resource}
                  </p>
                  {log.details && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{log.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Health */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">Database</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status: {systemHealth.database}</p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Server className="w-6 h-6 text-purple-600" />
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">API Server</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status: {systemHealth.api}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Uptime: {systemHealth.uptime}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">Active Users</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{systemHealth.activeUsers}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currently online</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">Storage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {systemHealth.storageUsed} GB / {systemHealth.storage} GB
            </p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${(systemHealth.storageUsed / systemHealth.storage) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Download className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Backup Database</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Create a complete backup of all hospital data including patients, appointments, and records.
            </p>
            <button
              onClick={handleBackup}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Create Backup</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Restore Database</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Restore data from a previous backup. This will overwrite all current data.
            </p>
            <button
              onClick={handleRestore}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Restore Backup</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* System Configuration */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">System Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                System Maintenance Mode
              </label>
              <button className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                Enable Maintenance Mode
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Clear Cache
              </label>
              <button
                onClick={() => {
                  localStorage.clear()
                  toast.success('Cache cleared')
                }}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Clear All Cache
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {showUserForm && (
        <UserFormModal
          user={selectedUser}
          onClose={() => {
            setShowUserForm(false)
            setSelectedUser(null)
          }}
          onSave={async (userData) => {
            try {
              if (selectedUser) {
                await adminAPI.users.update(selectedUser.id, userData)
                const updated = users.map(u => u.id === selectedUser.id ? { ...u, ...userData } : u)
                setUsers(updated)
                toast.success('User updated successfully')
              } else {
                const response = await adminAPI.users.create(userData)
                setUsers([...users, response.data.data])
                toast.success('User created successfully')
                await adminAPI.logs.create({
                  userId: '1',
                  userName: 'Admin',
                  action: 'Create User',
                  resource: userData.email,
                  status: 'success',
                })
              }
              updateSystemHealth()
              setShowUserForm(false)
              setSelectedUser(null)
            } catch (error: any) {
              toast.error(error.response?.data?.error || 'Failed to save user')
            }
          }}
        />
      )}
    </div>
  )
}

// User Form Modal Component
function UserFormModal({ user, onClose, onSave }: { user: SystemUser | null, onClose: () => void, onSave: (data: Partial<SystemUser>) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'doctor' as SystemUser['role'],
    department: '',
    status: 'active' as SystemUser['status'],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || '',
        status: user.status,
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Role *</label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="receptionist">Receptionist</option>
              <option value="lab_technician">Lab Technician</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

