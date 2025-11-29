'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Shield, 
  Database,
  Zap,
  User,
  Globe,
  Moon,
  Sun,
  Save,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import toast from 'react-hot-toast'

type SettingsTab = 'general' | 'notifications' | 'ai' | 'security' | 'data'

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const [saving, setSaving] = useState(false)
  
  const [generalSettings, setGeneralSettings] = useState({
    hospitalName: 'MedAI Hospital',
    timezone: 'UTC-5 (EST)',
    language: 'English',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    criticalAlerts: true,
  })

  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    autoOptimization: true,
    riskDetection: true,
    insights: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    passwordPolicy: 'strong',
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedGeneral = localStorage.getItem('hospital-general-settings')
    const savedNotifications = localStorage.getItem('hospital-notification-settings')
    const savedAI = localStorage.getItem('hospital-ai-settings')
    const savedSecurity = localStorage.getItem('hospital-security-settings')

    if (savedGeneral) setGeneralSettings(JSON.parse(savedGeneral))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedAI) setAiSettings(JSON.parse(savedAI))
    if (savedSecurity) setSecuritySettings(JSON.parse(savedSecurity))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save to localStorage (in production, save to backend)
      localStorage.setItem('hospital-general-settings', JSON.stringify(generalSettings))
      localStorage.setItem('hospital-notification-settings', JSON.stringify(notifications))
      localStorage.setItem('hospital-ai-settings', JSON.stringify(aiSettings))
      localStorage.setItem('hospital-security-settings', JSON.stringify(securitySettings))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = () => {
    toast.success('Data export started. Check your downloads.')
  }

  const handleImportData = () => {
    toast.info('Data import feature coming soon')
  }

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      toast.success('Data reset initiated')
    }
  }

  const tabs = [
    { id: 'general' as SettingsTab, label: 'General', icon: Settings },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'ai' as SettingsTab, label: 'AI Settings', icon: Zap },
    { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
    { id: 'data' as SettingsTab, label: 'Data Management', icon: Database },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">System Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure your hospital management system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-slate-700 space-y-2 sticky top-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">General Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.hospitalName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, hospitalName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Time Zone
                  </label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>UTC-5 (EST)</option>
                    <option>UTC-8 (PST)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (CET)</option>
                    <option>UTC+5:30 (IST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'criticalAlerts' 
                          ? 'Receive immediate alerts for critical patient conditions'
                          : `Receive ${key} notifications for important updates`}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Settings */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-6 h-6" />
                <h3 className="text-xl font-bold">AI Features</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(aiSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div>
                      <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm text-indigo-100">
                        {key === 'enabled' && 'Enable all AI-powered features'}
                        {key === 'autoOptimization' && 'Automatically optimize schedules'}
                        {key === 'riskDetection' && 'Detect patient risk factors'}
                        {key === 'insights' && 'Generate AI insights and recommendations'}
                      </p>
                    </div>
                    <button
                      onClick={() => setAiSettings({ ...aiSettings, [key]: !value })}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        value ? 'bg-white' : 'bg-white/30'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-indigo-600 rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({ ...securitySettings, twoFactor: !securitySettings.twoFactor })}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      securitySettings.twoFactor ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        securitySettings.twoFactor ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password Policy
                  </label>
                  <select
                    value={securitySettings.passwordPolicy}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordPolicy: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weak">Weak</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data Management */}
          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Data Management</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Export Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Download all hospital data as a backup file
                  </p>
                  <button
                    onClick={handleExportData}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Data</span>
                  </button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Import Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Import data from a backup file
                  </p>
                  <button
                    onClick={handleImportData}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Data</span>
                  </button>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/30">
                  <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">Danger Zone</h4>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Permanently delete all data. This action cannot be undone.
                  </p>
                  <button
                    onClick={handleResetData}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Reset All Data</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow font-semibold disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
