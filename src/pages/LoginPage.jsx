import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signInWithEmail, sendOtp } = useAuth()
  const { show, ToastEl } = useToast()
  const [tab, setTab] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { show('이메일과 비밀번호를 입력해주세요'); return }
    setLoading(true)
    try {
      await signInWithEmail(email, password)
      navigate('/child/home')
    } catch (err) {
      show(err.message.includes('Invalid') ? '이메일 또는 비밀번호가 올바르지 않아요' : err.message)
    } finally { setLoading(false) }
  }

  const handleSignup = async () => {
    if (!email) { show('이메일을 입력해주세요'); return }
    setLoading(true)
    try {
      await sendOtp(email)
      navigate('/auth/otp', { state: { email } })
    } catch (err) {
      show(err.message)
    } finally { setLoading(false) }
  }

  const handleDemo = () => {
    navigate('/auth/setup', { state: { demo: true } })
  }

  return (
    <div className="page-no-tab" style={{ background: 'white', minHeight: '100dvh' }}>
      <div style={{ padding: '40px 22px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* 로고 */}
        <div style={{ width: 72, height: 72, borderRadius: 24, background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div style={{ fontSize: 24, fontWeight: 500, color: '#2C2C2A', marginBottom: 4 }}>DailyKids</div>
        <div style={{ fontSize: 14, color: '#888780', marginBottom: 28, textAlign: 'center', lineHeight: 1.6 }}>아이와 부모를 위한<br />생활관리 앱</div>

        {/* 탭 */}
        <div style={{ display: 'flex', background: '#F1EFE8', borderRadius: 14, padding: 3, gap: 2, width: '100%', marginBottom: 22 }}>
          {['login', 'signup'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '10px', borderRadius: 11, border: 'none',
                background: tab === t ? 'white' : 'transparent',
                color: tab === t ? '#2C2C2A' : '#888780',
                fontWeight: tab === t ? 500 : 400,
                fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s'
              }}
            >
              {t === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        {/* 폼 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#888780' }}>이메일</div>
          <input
            className="input"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
          />
          {tab === 'login' && (
            <>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#888780', marginTop: 2 }}>비밀번호</div>
              <input
                className="input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                autoComplete="current-password"
              />
            </>
          )}

          <button
            className="btn btn-primary"
            onClick={tab === 'login' ? handleLogin : handleSignup}
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? '처리 중...' : tab === 'login' ? '로그인' : '인증 코드 받기'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
            <div style={{ flex: 1, height: 0.5, background: '#EDE9FE' }} />
            <span style={{ fontSize: 12, color: '#B4B2A9' }}>또는</span>
            <div style={{ flex: 1, height: 0.5, background: '#EDE9FE' }} />
          </div>

          <button className="btn btn-outline" onClick={handleDemo}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            데모로 체험하기
          </button>

          {tab === 'login' && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 13, color: '#7F77DD', cursor: 'pointer' }} onClick={() => show('비밀번호 재설정 메일을 보냈어요!')}>
                비밀번호를 잊으셨나요?
              </span>
            </div>
          )}
        </div>
      </div>
      {ToastEl}
    </div>
  )
}
