import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

export default function OtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyOtp, sendOtp } = useAuth()
  const { show, ToastEl } = useToast()
  const email = location.state?.email || ''
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const refs = useRef([])

  const handleInput = (val, idx) => {
    const v = val.replace(/\D/, '')
    const newDigits = [...digits]
    newDigits[idx] = v
    setDigits(newDigits)
    if (v && idx < 5) refs.current[idx + 1]?.focus()

    // 6자리 완성 시 자동 인증
    const full = newDigits.join('')
    if (full.length === 6) verify(full)
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setDigits(pasted.split(''))
      verify(pasted)
    }
  }

  const verify = async (code) => {
    setLoading(true)
    try {
      await verifyOtp(email, code)
      navigate('/auth/setup')
    } catch {
      show('인증 코드가 올바르지 않아요')
      setDigits(['', '', '', '', '', ''])
      refs.current[0]?.focus()
    } finally { setLoading(false) }
  }

  const resend = async () => {
    try {
      await sendOtp(email)
      show('인증 코드를 재발송했어요!')
    } catch { show('재발송에 실패했어요') }
  }

  return (
    <div className="page-no-tab" style={{ background: 'white', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 22px' }}>
      <div style={{ width: 56, height: 56, borderRadius: 18, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 500, color: '#2C2C2A', marginBottom: 6 }}>이메일 인증</div>
      <div style={{ fontSize: 13, color: '#888780', textAlign: 'center', marginBottom: 4 }}>6자리 코드를 발송했어요</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#7F77DD', marginBottom: 4 }}>{email}</div>
      <div style={{ fontSize: 12, color: '#B4B2A9', marginBottom: 4 }}>데모 코드: 123456</div>

      <div className="otp-wrap" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            className={`otp-box ${d ? 'filled' : ''}`}
            maxLength={1}
            value={d}
            inputMode="numeric"
            onChange={e => handleInput(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
          />
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => verify(digits.join(''))}
        disabled={loading || digits.join('').length < 6}
        style={{ width: '100%', marginBottom: 14 }}
      >
        {loading ? '인증 중...' : '인증 완료'}
      </button>

      <span style={{ fontSize: 13, color: '#888780' }}>
        못 받으셨나요?{' '}
        <span style={{ color: '#7F77DD', cursor: 'pointer' }} onClick={resend}>재발송</span>
      </span>
      {ToastEl}
    </div>
  )
}
