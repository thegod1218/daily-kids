import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useAppStore } from './store'
import './styles/global.css'

// 페이지 임포트
import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import SetupPage from './pages/SetupPage'
import { PinSetupPage, PinEnterPage } from './pages/PinPage'
import ChildHomePage from './pages/child/HomePage'
import MissionsPage from './pages/child/MissionsPage'
import MoneyPage from './pages/child/MoneyPage'
import ParentDashboard from './pages/parent/DashboardPage'
import { GpsPage, SettingsPage } from './pages/parent/GpsSettingsPage'

// 인증 가드
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const { childName } = useAppStore()

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F4FF' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
          <div style={{ fontSize: 16, color: '#7F77DD', fontWeight: 500 }}>DailyKids</div>
        </div>
      </div>
    )
  }

  // 데모 모드: childName이 설정되어 있으면 인증 없이 허용
  if (!isAuthenticated && !childName) {
    return <Navigate to="/login" replace />
  }

  return children
}

// 부모 모드 가드
function ParentRoute({ children }) {
  const { appMode } = useAppStore()
  if (appMode !== 'parent') return <Navigate to="/pin-enter" replace />
  return children
}

function App() {
  const { checkDailyReset } = useAppStore()

  useEffect(() => {
    checkDailyReset()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login"      element={<LoginPage />} />
        <Route path="/auth/otp"   element={<OtpPage />} />
        <Route path="/auth/setup" element={<SetupPage />} />
        <Route path="/auth/callback" element={<Navigate to="/child/home" replace />} />

        {/* PIN */}
        <Route path="/pin-setup" element={<PrivateRoute><PinSetupPage /></PrivateRoute>} />
        <Route path="/pin-enter" element={<PrivateRoute><PinEnterPage /></PrivateRoute>} />

        {/* 아이 화면 */}
        <Route path="/child/home"     element={<PrivateRoute><ChildHomePage /></PrivateRoute>} />
        <Route path="/child/missions" element={<PrivateRoute><MissionsPage /></PrivateRoute>} />
        <Route path="/child/money"    element={<PrivateRoute><MoneyPage /></PrivateRoute>} />
        <Route path="/child/books"    element={<PrivateRoute><BooksPlaceholder /></PrivateRoute>} />

        {/* 부모 화면 */}
        <Route path="/parent/dashboard" element={<PrivateRoute><ParentRoute><ParentDashboard /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/community" element={<PrivateRoute><ParentRoute><CommunityPlaceholder /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/gps"       element={<PrivateRoute><ParentRoute><GpsPage /></ParentRoute></PrivateRoute>} />
        <Route path="/parent/settings"  element={<PrivateRoute><ParentRoute><SettingsPage /></ParentRoute></PrivateRoute>} />

        {/* 기본 리다이렉트 */}
        <Route path="/" element={<Navigate to="/child/home" replace />} />
        <Route path="*" element={<Navigate to="/child/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

// 임시 플레이스홀더 (2주차에 구현)
import TabBar from './components/TabBar'
import { useNavigate } from 'react-router-dom'

function BooksPlaceholder() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="page-header"><span style={{ fontSize: 18, fontWeight: 500 }}>독서 통장</span></div>
      <div style={{ padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>📚</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#2C2C2A', marginBottom: 8 }}>곧 오픈!</div>
        <div style={{ fontSize: 14, color: '#888780', lineHeight: 1.7 }}>독서 통장, 독후감 작성,<br />부모님 도장 승인 기능이 준비 중이에요.</div>
      </div>
      <TabBar />
    </div>
  )
}

function CommunityPlaceholder() {
  return (
    <div className="page">
      <div className="page-header"><span style={{ fontSize: 18, fontWeight: 500 }}>커뮤니티</span></div>
      <div style={{ padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>💬</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#2C2C2A', marginBottom: 8 }}>곧 오픈!</div>
        <div style={{ fontSize: 14, color: '#888780', lineHeight: 1.7 }}>육아 커뮤니티, 전문가 칼럼이<br />준비 중이에요.</div>
      </div>
      <TabBar />
    </div>
  )
}

export default App
