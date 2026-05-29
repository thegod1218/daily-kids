import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useAppStore } from './store'
import './styles/global.css'

import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import SetupPage from './pages/SetupPage'
import { PinSetupPage, PinEnterPage } from './pages/PinPage'
import ChildHomePage from './pages/child/HomePage'
import MissionsPage from './pages/child/MissionsPage'
import MoneyPage from './pages/child/MoneyPage'
import BooksPage from './pages/child/BooksPage'
import ParentDashboard from './pages/parent/DashboardPage'
import { GpsPage, SettingsPage } from './pages/parent/GpsSettingsPage'
import TabBar from './components/TabBar'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const { childName } = useAppStore()
  if (loading) return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⭐</div>
        <div style={{ fontSize: 18, color: '#5B5FEF', fontWeight: 700 }}>DailyKids</div>
      </div>
    </div>
  )
  if (!isAuthenticated && !childName) return <Navigate to="/login" replace />
  return children
}

function ParentRoute({ children }) {
  const { appMode } = useAppStore()
  if (appMode !== 'parent') return <Navigate to="/pin-enter" replace />
  return children
}

function Placeholder({ emoji, title, desc }) {
  return (
    <div className="page">
      <div className="page-header"><span className="header-title">{title}</span></div>
      <div style={{ padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{emoji}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>곧 오픈!</div>
        <div style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.7 }}>{desc}</div>
      </div>
      <TabBar />
    </div>
  )
}

function App() {
  const { checkDailyReset } = useAppStore()
  useEffect(() => { checkDailyReset() }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"         element={<LoginPage />} />
        <Route path="/auth/otp"      element={<OtpPage />} />
        <Route path="/auth/setup"    element={<SetupPage />} />
        <Route path="/auth/callback" element={<Navigate to="/child/home" replace />} />
        <Route path="/pin-setup"     element={<PrivateRoute><PinSetupPage /></PrivateRoute>} />
        <Route path="/pin-enter"     element={<PrivateRoute><PinEnterPage /></PrivateRoute>} />
        <Route path="/child/home"     element={<PrivateRoute><ChildHomePage /></PrivateRoute>} />
        <Route path="/child/missions" element={<PrivateRoute><MissionsPage /></PrivateRoute>} />
        <Route path="/child/money"    element={<PrivateRoute><MoneyPage /></PrivateRoute>} />
        <Route path="/child/books"    element={<PrivateRoute><BooksPage /></PrivateRoute>} />
        <Route path="/parent/dashboard" element={<PrivateRoute><ParentRoute><ParentDashboard /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/community" element={<PrivateRoute><ParentRoute><Placeholder emoji="💬" title="커뮤니티" desc="육아 커뮤니티가 준비 중이에요." /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/gps"       element={<PrivateRoute><ParentRoute><GpsPage /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/settings"  element={<PrivateRoute><ParentRoute><SettingsPage /></ParentRoute></PrivateRoute>} />
        <Route path="/"  element={<Navigate to="/child/home" replace />} />
        <Route path="*"  element={<Navigate to="/child/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
