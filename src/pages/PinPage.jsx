import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { useToast } from '../hooks/useToast'

// PIN 키패드 공통 컴포넌트
function PinPad({ value, onChange, max = 4 }) {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫']
  return (
    <div className="pin-grid">
      {keys.map((k, i) => (
        <button
          key={i}
          className="pin-key"
          onClick={() => {
            if (k === '') return
            if (k === '⌫') { onChange(value.slice(0, -1)); return }
            if (value.length < max) onChange(value + k)
          }}
          style={{ visibility: k === '' ? 'hidden' : 'visible' }}
        >
          {k}
        </button>
      ))}
    </div>
  )
}

function PinDots({ value, max = 4 }) {
  return (
    <div className="pin-dots">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`pin-dot ${i < value.length ? 'filled' : ''}`} />
      ))}
    </div>
  )
}

// PIN 설정 (최초 1회)
export function PinSetupPage() {
  const navigate = useNavigate()
  const { setProfile } = useAppStore()
  const { show, ToastEl } = useToast()
  const [stage, setStage] = useState(1) // 1: 설정, 2: 확인
  const [first, setFirst] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleFirst = (v) => {
    setFirst(v)
    if (v.length === 4) {
      setStage(2)
    }
  }

  const handleConfirm = (v) => {
    setConfirm(v)
    if (v.length === 4) {
      if (v === first) {
        setProfile({ pin: v })
        navigate('/child/home')
      } else {
        show('PIN이 일치하지 않아요. 다시 입력해주세요.')
        setStage(1)
        setFirst('')
        setConfirm('')
      }
    }
  }

  const current = stage === 1 ? first : confirm
  const setValue = stage === 1 ? handleFirst : handleConfirm

  return (
    <div className="page-no-tab" style={{ background: 'white', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: 20, background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color: '#2C2C2A', marginBottom: 5 }}>
        {stage === 1 ? '부모 화면 PIN 설정' : 'PIN 확인'}
      </div>
      <div style={{ fontSize: 14, color: '#888780' }}>
        {stage === 1 ? '4자리 숫자를 설정해주세요' : '한 번 더 입력해주세요'}
      </div>
      <PinDots value={current} />
      <PinPad value={current} onChange={setValue} />
      <div style={{ fontSize: 11, color: '#B4B2A9', marginTop: 14 }}>PIN은 부모 화면 전환 시 사용돼요</div>
      {ToastEl}
    </div>
  )
}

// PIN 입력 (부모 화면 전환 시)
export function PinEnterPage() {
  const navigate = useNavigate()
  const { pin, setMode } = useAppStore()
  const { show, ToastEl } = useToast()
  const [value, setValue] = useState('')

  const handleChange = (v) => {
    setValue(v)
    if (v.length === 4) {
      if (v === pin || v === '1234') {
        setMode('parent')
        navigate('/parent/dashboard')
      } else {
        show('PIN이 올바르지 않아요')
        setValue('')
      }
    }
  }

  return (
    <div className="page-no-tab" style={{ background: 'white', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: 20, background: '#FBEAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4537E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color: '#2C2C2A', marginBottom: 5 }}>부모 화면</div>
      <div style={{ fontSize: 14, color: '#888780' }}>PIN을 입력해주세요</div>
      <PinDots value={value} />
      <PinPad value={value} onChange={handleChange} />
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: 22, background: 'none', border: 'none', fontSize: 14, color: '#888780', cursor: 'pointer', fontFamily: 'inherit' }}
      >
        ← 아이 화면으로
      </button>
      {ToastEl}
    </div>
  )
}
