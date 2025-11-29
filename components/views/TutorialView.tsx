'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  BookOpen, 
  Video, 
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Calendar,
  Stethoscope,
  Brain,
  Settings,
  BarChart3
} from 'lucide-react'

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  category: string
  videoUrl: string
  thumbnail: string
  steps: string[]
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started - Overview',
    description: 'Learn the basics of the Hospital Management System and navigate through the dashboard',
    duration: '5:30',
    category: 'Basics',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '📊',
    steps: [
      'Understanding the dashboard layout',
      'Navigating between sections',
      'Accessing patient records',
      'Viewing appointments'
    ]
  },
  {
    id: '2',
    title: 'Managing Patients',
    description: 'Complete guide to adding, editing, and managing patient records',
    duration: '8:15',
    category: 'Patients',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '👥',
    steps: [
      'Adding a new patient',
      'Editing patient information',
      'Searching and filtering patients',
      'Managing patient status',
      'Viewing patient history'
    ]
  },
  {
    id: '3',
    title: 'Appointment Scheduling',
    description: 'Master the appointment booking system with AI optimization',
    duration: '7:45',
    category: 'Appointments',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '📅',
    steps: [
      'Creating new appointments',
      'Linking patients and doctors',
      'Using AI schedule optimization',
      'Updating appointment status',
      'Canceling appointments'
    ]
  },
  {
    id: '4',
    title: 'Doctor Management',
    description: 'Manage your medical staff, schedules, and doctor profiles',
    duration: '6:20',
    category: 'Doctors',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '👨‍⚕️',
    steps: [
      'Adding doctor profiles',
      'Setting doctor availability',
      'Viewing doctor schedules',
      'Managing specializations'
    ]
  },
  {
    id: '5',
    title: 'AI Insights & Recommendations',
    description: 'Understanding and using AI-powered insights for better patient care',
    duration: '9:10',
    category: 'AI Features',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '🤖',
    steps: [
      'Understanding AI risk assessments',
      'Reading AI recommendations',
      'Using optimization suggestions',
      'Implementing AI insights'
    ]
  },
  {
    id: '6',
    title: 'Medical Records Management',
    description: 'Organize and manage patient medical records efficiently',
    duration: '7:00',
    category: 'Records',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '📋',
    steps: [
      'Adding medical records',
      'Viewing record history',
      'AI-powered summaries',
      'Exporting records'
    ]
  },
  {
    id: '7',
    title: 'Analytics & Reports',
    description: 'Analyze hospital performance with comprehensive analytics',
    duration: '6:45',
    category: 'Analytics',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '📈',
    steps: [
      'Understanding dashboard metrics',
      'Reading charts and graphs',
      'Exporting reports',
      'Analyzing trends'
    ]
  },
  {
    id: '8',
    title: 'Search & Navigation',
    description: 'Master the global search and quick navigation features',
    duration: '4:30',
    category: 'Navigation',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '🔍',
    steps: [
      'Using global search',
      'Filtering results',
      'Quick navigation tips',
      'Keyboard shortcuts'
    ]
  },
  {
    id: '9',
    title: 'Settings & Configuration',
    description: 'Configure system settings, notifications, and preferences',
    duration: '5:15',
    category: 'Settings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '⚙️',
    steps: [
      'General settings',
      'Notification preferences',
      'AI feature configuration',
      'Security settings'
    ]
  }
]

const quickGuides = [
  {
    icon: Users,
    title: 'Quick Guide: Adding a Patient',
    steps: ['Click "Add New Patient"', 'Fill in patient details', 'Set risk level', 'Save']
  },
  {
    icon: Calendar,
    title: 'Quick Guide: Booking Appointment',
    steps: ['Go to Appointments', 'Click "New Appointment"', 'Select patient and doctor', 'Choose date & time']
  },
  {
    icon: Search,
    title: 'Quick Guide: Using Search',
    steps: ['Click search box in header', 'Type patient/doctor name', 'Click result to navigate']
  },
  {
    icon: Brain,
    title: 'Quick Guide: AI Insights',
    steps: ['Go to AI Insights section', 'Review recommendations', 'Take action on alerts']
  }
]

export default function TutorialView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', ...Array.from(new Set(tutorials.map(t => t.category)))]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Patients': return Users
      case 'Appointments': return Calendar
      case 'Doctors': return Stethoscope
      case 'AI Features': return Brain
      case 'Records': return FileText
      case 'Analytics': return BarChart3
      case 'Settings': return Settings
      default: return Video
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Video Tutorials & Guides</h2>
        <p className="text-gray-600 dark:text-gray-400">Learn how to use the Hospital Management System effectively</p>
      </div>

      {/* Quick Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickGuides.map((guide, index) => {
          const Icon = guide.icon
          return (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{guide.title}</h3>
              </div>
              <ul className="space-y-1">
                {guide.steps.map((step, i) => (
                  <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="text-blue-500 mr-2">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {/* Video Player Modal */}
      {selectedTutorial && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTutorial(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedTutorial.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedTutorial.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTutorial(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedTutorial.videoUrl}
                  title={selectedTutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">What you'll learn:</h4>
                <ul className="space-y-2">
                  {selectedTutorial.steps.map((step, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial, index) => {
          const CategoryIcon = getCategoryIcon(tutorial.category)
          return (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedTutorial(tutorial)}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-6xl">{tutorial.thumbnail}</div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{tutorial.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <CategoryIcon className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">{tutorial.category}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {tutorial.description}
              </p>
              
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                <span>Watch Tutorial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No tutorials found matching your search</p>
        </div>
      )}

      {/* Documentation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need More Help?</h3>
            <p className="text-indigo-100 mb-4">
              Check out our comprehensive documentation for detailed guides and API references
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>User Guide PDF</span>
              </button>
            </div>
          </div>
          <BookOpen className="w-24 h-24 text-white/20" />
        </div>
      </motion.div>
    </div>
  )
}

