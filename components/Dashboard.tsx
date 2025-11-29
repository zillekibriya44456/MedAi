'use client'

import { useState } from 'react'
import DashboardView from './views/DashboardView'
import PatientsView from './views/PatientsView'
import AppointmentsView from './views/AppointmentsView'
import DoctorsView from './views/DoctorsView'
import RecordsView from './views/RecordsView'
import AIInsightsView from './views/AIInsightsView'
import AnalyticsView from './views/AnalyticsView'
import TutorialView from './views/TutorialView'
import AdminView from './views/AdminView'
import SettingsView from './views/SettingsView'

interface DashboardProps {
  activeView: string
}

export default function Dashboard({ activeView }: DashboardProps) {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />
      case 'patients':
        return <PatientsView />
      case 'appointments':
        return <AppointmentsView />
      case 'doctors':
        return <DoctorsView />
      case 'records':
        return <RecordsView />
      case 'ai-insights':
        return <AIInsightsView />
      case 'analytics':
        return <AnalyticsView />
      case 'tutorials':
        return <TutorialView />
      case 'admin':
        return <AdminView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {renderView()}
    </div>
  )
}

