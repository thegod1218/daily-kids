import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../store'
import { useToast } from '../hooks/useToast'

const AVATARS = [
  { id: 'chick', emoji: '🐣', label: '병아리' },
  { id: 'cat',   emoji: '🐱', label: '고양이' },
  { id: 'dog',   emoji: '🐶', label: '강아지' },
  { id: 'fox',   emoji: '🦊', label: '여우'   },
]

export default function SetupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDemoMode = location.state?.demo
  const { setProfile } = useAppStore()
  const { show, ToastEl } = useToast()

  const [step, setStep] = useState(1) // 1: 보호자, 2: 아이, 3: 가족코드
  const [parentName, setParentName] = useState('')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [avatar, setAvatar] = useState('chick')

  const generatedCode = 'DK-' + Math.floor(1000 + Math.random() * 9000)

  const next = () => {
    if (step === 1) {
      if (!isDemoMode && !parentName) { show('보호자 이름을 입력해주세요'); return }
      setStep(2)
    } else if (step === 2) {
      if (!childName) { show('아이 이름을 입력해주세요'); return }
      if (!childAge || isNaN(childAge) || +childAge < 1 || +childAge > 18) { show('올바른 나이를 입력해주세요'); return }
      setProfile({
        parentName: isDemoMode ? '데모 보호자' : parentName,
        childName,
        childAge: +childAge,
        childAvatar: avatar,
        familyCode: generatedCode
      })
      setStep(3)
    }
  }

  const finish = () => navigate('/pin-setup')

  return (
    <div className="page-no-tab" style={{ background: 'white', minHeight: '100dvh' }}>
      {/* 진행 바 */}
      <div style={{ height: 3, background: '#F1EFE8' }}>
        <div style={{ height: '100%', background: '#7F77DD', width: `${(step / 3) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={{ padding: '28px 22px' }}>

        {step === 1 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 500, color: '#2C2C2A', marginBottom: 6 }}>반가워요!</div>
            <div style={{ fontSize: 14, color: '#888780', marginBottom: 28, lineHeight: 1.6 }}>
              {isDemoMode ? '데모 모드로 시작해요.' : '먼저 보호자 정보를 입력해주세요.'}
            </div>
            {isDemoMode ? (
              <button className="btn btn-primary" onClick={next}>데모 시작하기</button>
            ) : (
              <>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#888780', marginBottom: 6 }}>보호자 이름</div>
                <input className="input" placeholder="홍길동" value={parentName} onChange={e => setParentName(e.target.value)} style={{ marginBottom: 24 }} />
                <button className="btn btn-primary" onClick={next}>다음</button>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 500, color: '#2C2C2A', marginBottom: 6 }}>아이 정보</div>
            <div style={{ fontSize: 14, color: '#888780', marginBottom: 24, lineHeight: 1.6 }}>아이의 이름과 나이, 캐릭터를 선택해주세요.</div>

            <div style={{ fontSize: 12, fontWeight: 500, color: '#888780', marginBottom: 6 }}>아이 이름</div>
            <input className="input" placeholder="김민준" value={childName} onChange={e => setChildName(e.target.value)} style={{ marginBottom: 14 }} />

            <div style={{ fontSize: 12, fontWeight: 500, color: '#888780', marginBottom: 6 }}>나이</div>
            <input className="input" type="number" placeholder="8" min="1" max="18" inputMode="numeric" value={childAge} onChange={e => setChildAge(e.target.value)} style={{ marginBottom: 20 }} />

            <div style={{ fontSize: 12, fontWeight: 500, color: '#888780', marginBottom: 12 }}>캐릭터 선택</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              {AVATARS.map(av => (
                <button
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  style={{
                    flex: 1, padding: '12px 6px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                    border: avatar === av.id ? '2px solid #7F77DD' : '0.5px solid #EDE9FE',
                    background: avatar === av.id ? '#EEEDFE' : 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                  }}
                >
                  <span style={{ fontSize: 24 }}>{av.emoji}</span>
                  <span style={{ fontSize: 11, color: avatar === av.id ? '#3C3489' : '#888780' }}>{av.label}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>이전</button>
              <button className="btn btn-primary" onClick={next} style={{ flex: 2 }}>다음</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 500, color: '#2C2C2A', marginBottom: 6 }}>가족 연동!</div>
            <div style={{ fontSize: 14, color: '#888780', marginBottom: 24, lineHeight: 1.6 }}>
              아이 폰에서 이 코드를 입력하면 실시간 연동이 시작돼요.
            </div>
            <div style={{ background: '#EEEDFE', borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#534AB7', letterSpacing: '0.8px', marginBottom: 10 }}>가족 코드</div>
              <div style={{ fontSize: 32, fontWeight: 500, color: '#3C3489', letterSpacing: '8px' }}>{generatedCode}</div>
              <div style={{ fontSize: 11, color: '#888780', marginTop: 10 }}>24시간 유효</div>
            </div>
            <button className="btn btn-primary" onClick={finish} style={{ marginBottom: 10 }}>앱 시작하기</button>
            <button className="btn btn-outline" onClick={() => { navigator.clipboard?.writeText(generatedCode); show('코드가 복사됐어요!') }}>
              코드 복사
            </button>
          </>
        )}
      </div>
      {ToastEl}
    </div>
  )
}
