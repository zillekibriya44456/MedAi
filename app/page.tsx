'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard activeView={activeView} />
        </main>
      </div>
    </div>
  )
}

