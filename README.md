# 🏥 AI-Integrated Hospital Management System

A modern, feature-rich hospital management system powered by artificial intelligence, built with Next.js, TypeScript, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

### 🎯 Core Features

- **📊 Comprehensive Dashboard** - Real-time analytics and insights
- **👥 Patient Management** - Complete patient records and profiles
- **📅 Appointment Scheduling** - AI-optimized appointment management
- **👨‍⚕️ Doctor & Staff Management** - Staff profiles and scheduling
- **📋 Medical Records** - Digital health records with AI summaries
- **📈 Analytics & Reports** - Detailed performance metrics
- **⚙️ Settings** - Customizable system configuration

### 🤖 AI-Powered Features

- **🔍 Symptom Analysis** - AI-powered preliminary diagnosis suggestions
- **⏱️ Schedule Optimization** - Intelligent appointment scheduling to reduce wait times
- **⚠️ Risk Assessment** - Automated patient risk prediction
- **💡 Smart Insights** - AI-generated recommendations and alerts
- **📝 Medical Record Summarization** - AI-powered record analysis

### 🎨 Design Features

- **🎭 Modern UI/UX** - Beautiful, intuitive interface
- **🌓 Dark Mode Support** - Eye-friendly dark theme
- **📱 Responsive Design** - Works on all devices
- **✨ Smooth Animations** - Framer Motion powered transitions
- **🎨 Gradient Themes** - Modern gradient color schemes
- **🔔 Real-time Notifications** - Stay updated with important events

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "my Hospital new 2"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── ai/              # AI API endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── views/               # View components
│   │   ├── DashboardView.tsx
│   │   ├── PatientsView.tsx
│   │   ├── AppointmentsView.tsx
│   │   ├── DoctorsView.tsx
│   │   ├── RecordsView.tsx
│   │   ├── AIInsightsView.tsx
│   │   ├── AnalyticsView.tsx
│   │   └── SettingsView.tsx
│   ├── Dashboard.tsx        # Main dashboard router
│   ├── Sidebar.tsx          # Navigation sidebar
│   └── Header.tsx           # Top header
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** Zustand
- **Notifications:** React Hot Toast

## 🔌 API Integration

### AI Endpoints

The system includes AI API routes for:

- `/api/ai/analyze-symptoms` - Symptom analysis and diagnosis suggestions
- `/api/ai/optimize-schedule` - Appointment schedule optimization
- `/api/ai/risk-assessment` - Patient risk prediction
- `/api/ai/insights` - AI-generated insights and recommendations

### Integrating Real AI Services

To integrate with real AI services (OpenAI, medical AI APIs):

1. Install the OpenAI SDK:
   ```bash
   npm install openai
   ```

2. Create `.env.local` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Update API routes to use real AI services

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: { ... },
  medical: { ... }
}
```

### Themes

The system supports light and dark modes. Toggle can be found in the header.

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_APP_NAME="MedAI Hospital"
OPENAI_API_KEY=your_key_here
```

## 🤝 Contributing

This is a template project. Feel free to customize and extend it for your needs.

## 📝 License

This project is open source and available for use and modification.

## 🆘 Support

For issues or questions, please check the documentation or create an issue.

## 🎯 Roadmap

Future enhancements:
- [ ] Real-time patient monitoring
- [ ] Video consultation integration
- [ ] Mobile app version
- [ ] Advanced analytics with ML models
- [ ] Multi-language support
- [ ] Integration with lab systems
- [ ] Telemedicine features

## 🙏 Acknowledgments

Built with modern web technologies and best practices for healthcare management systems.

---

**Made with ❤️ for better healthcare management**

# MedAi
# MedAi
# MedAi
