두 가지 문제가 보여요.

1. 코끼리 이미지가 이모지로 바뀜 (원래 `/elephant.png` 이미지 사용)
2. 탭바가 두 개 겹쳐서 나옴 (기존 TabBar + 새로 만든 ChildTabBar)
3. 2컬 레이아웃이 세로로 쌓임

**`child/HomePage.jsx` 전체 교체해주세요:**

```jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import dayjs from 'dayjs'

const MOODS = [
  { type: 'happy',   e: '😊', label: '행복'  },
  { type: 'good',    e: '🙂', label: '좋아요' },
  { type: 'neutral', e: '😐', label: '보통'  },
  { type: 'sad',     e: '😢', label: '슬퍼요' },
  { type: 'angry',   e: '😠', label: '화나요' },
]

const CHARACTERS = [
  { key: 'elephant', label: '토리',   emoji: '🐘' },
  { key: 'chick',    label: '병아리', emoji: '🐣' },
  { key: 'cat',      label: '고양이', emoji: '🐱' },
  { key: 'dog',      label: '강아지', emoji: '🐶' },
  { key: 'fox',      label: '여우',   emoji: '🦊' },
]

function ProgBar({ value, style }) {
  return (
    <div style={{ height: 6, background: '#E6DDD3', borderRadius: 3, overflow: 'hidden', ...style }}>
      <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, value))}%`, background: '#D28A6A', borderRadius: 3, transition: 'width .5s' }} />
    </div>
  )
}

export default function HomePage() {
  const nav = useNavigate()
  const [moodNote, setMoodNote] = useState('')
  const [showGallery, setShowGallery] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(
    localStorage.getItem('dailyKidsCharacter') || 'elephant'
  )

  const { childName, missions, moodLogs, checkDailyReset, logMood } = useAppStore()

  useEffect(() => { checkDailyReset() }, [])

  const done        = missions.filter(m => m.done).length
  const total       = missions.length
  const nextMission = missions.find(m => !m.done) || missions[0]
  const today       = dayjs().format('YYYY-MM-DD')
  const todayMood   = moodLogs.find(m => m.date === today)
  const balance     = useAppStore.getState().moneyLogs.reduce((s, r) => r.type === 'income' ? s + r.amount : s - r.amount, 0)
  const path        = window.location.pathname

  const selectCharacter = (key) => {
    setSelectedCharacter(key)
    localStorage.setItem('dailyKidsCharacter', key)
    setShowGallery(false)
  }

  const renderChar = (size = 25) => {
    const found = CHARACTERS.find(c => c.key === selectedCharacter)
    return <span style={{ fontSize: size }}>{found?.emoji || '🐘'}</span>
  }

  const handleMood = (type) => { logMood(type, moodNote) }

  const handleSaveMoodNote = () => {
    if (!todayMood) return
    logMood(todayMood.type, moodNote)
  }

  const tabs = [
    { icon: '🏠', label: '홈',   to: '/child/home'      },
    { icon: '⭐', label: '미션', to: '/child/missions'   },
    { icon: '💰', label: '용돈', to: '/child/money'      },
    { icon: '📚', label: '독서', to: '/child/books'      },
    { icon: '👪', label: '부모', to: '/parent/dashboard' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F7F3EE', paddingBottom: 90, fontFamily: 'sans-serif', color: '#2C2926' }}>

      {/* 캐릭터 갤러리 */}
      {showGallery && (
        <div onClick={() => setShowGallery(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(44,41,38,.28)', zIndex: 999, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: 'white', borderRadius: '28px 28px 0 0', padding: '22px 20px 28px' }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>캐릭터 고르기</div>
            <div style={{ fontSize: 13, color: '#7C746D', marginBottom: 18 }}>홈 화면에 보여질 친구를 선택해요.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {CHARACTERS.map(char => (
                <button key={char.key} onClick={() => selectCharacter(char.key)}
                  style={{ border: selectedCharacter === char.key ? '2px solid #D28A6A' : '1px solid #E6DDD3', background: selectedCharacter === char.key ? '#F7E6DD' : '#FFFDF9', borderRadius: 18, padding: '12px 6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{char.emoji}</div>
                  <div style={{ fontSize: 11, color: '#7C746D', fontWeight: 700 }}>{char.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div style={{ background: '#F7F3EE', padding: '18px 20px 16px', borderBottom: '1px solid #E6DDD3', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={() => setShowGallery(true)} style={{ width: 44, height: 44, borderRadius: '50%', background: '#F7E6DD', border: '1px solid #E6DDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 24 }}>
              {renderChar(24)}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#7C746D', fontWeight: 700 }}>Daily Kids</div>
              <div style={{ fontSize: 21, fontWeight: 800, color: '#2C2926', letterSpacing: '-0.8px', lineHeight: 1.2, marginTop: 2 }}>오늘 뭐 해볼까?</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{childName || '우리아이'}</div>
            </div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#FFFDF9', border: '1px solid #E6DDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔔</div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>

        {/* 오늘의 목표 */}
        <div style={{ background: '#FFFDF9', borderRadius: 22, border: '1px solid #E6DDD3', padding: 18, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: '#7C746D', fontWeight: 700, marginBottom: 4 }}>오늘의 목표</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#2C2926', letterSpacing: '-0.8px' }}>{nextMission?.title || '오늘 미션 없음'}</div>
              <div style={{ fontSize: 13, color: '#7C746D', marginTop: 5 }}>{done} / {total}개 완료</div>
            </div>
            <button onClick={() => nav('/child/missions')} style={{ padding: '11px 18px', borderRadius: 999, fontSize: 14, border: 'none', background: '#F3F0ED', color: '#111', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>시작</button>
          </div>
          <ProgBar value={total > 0 ? (done / total) * 100 : 0} style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 14, color: '#7C746D', lineHeight: 1.6, marginBottom: 16 }}>하나씩 천천히 해보면 돼요.</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/elephant.png" alt="" style={{ width: 130, height: 'auto', objectFit: 'contain' }}
              onError={e => { e.target.style.display = 'none' }} />
          </div>
        </div>

        {/* 2컬 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div onClick={() => nav('/child/missions')} style={{ background: '#FFFDF9', borderRadius: 22, padding: '18px 16px', cursor: 'pointer', border: '1px solid #E6DDD3' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#F7E6DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>계획</div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>할 일 보기</div>
          </div>
          <div onClick={() => nav('/child/money')} style={{ background: '#FFFDF9', borderRadius: 22, padding: '18px 16px', cursor: 'pointer', border: '1px solid #E6DDD3' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#FFF3D7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>💰</div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>용돈</div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>{balance.toLocaleString('ko-KR')}원</div>
          </div>
        </div>

        {/* 오늘의 마음 */}
        <div style={{ background: '#FFFDF9', borderRadius: 22, border: '1px solid #E6DDD3', padding: 18, marginBottom: 12 }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>오늘의 마음</div>
          <div style={{ fontSize: 13, color: '#7C746D', marginBottom: 14 }}>하나만 골라봐요.</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
            {MOODS.map(({ type, e, label }) => (
              <button key={type} onClick={() => handleMood(type)}
                style={{ flex: 1, minHeight: 76, borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', border: todayMood?.type === type ? '1.5px solid #D28A6A' : '1px solid #E6DDD3', background: todayMood?.type === type ? '#F7E6DD' : '#FFFDF9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '8px 2px' }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <span style={{ fontSize: 10, color: '#7C746D', fontWeight: 700 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 짧은 일기 */}
        <div style={{ background: '#FFFDF9', borderRadius: 22, border: '1px solid #E6DDD3', padding: 18, marginBottom: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>짧은 일기</div>
          <div style={{ fontSize: 13, color: '#7C746D', marginBottom: 12 }}>오늘 좋았던 일을 한 줄만 적어봐요.</div>
          <textarea
            placeholder="예: 친구랑 같이 놀아서 좋았어요."
            value={moodNote}
            maxLength={120}
            onChange={e => setMoodNote(e.target.value)}
            style={{ width: '100%', minHeight: 92, resize: 'none', fontSize: 14, lineHeight: 1.6, border: '1px solid #E6DDD3', borderRadius: 14, padding: 14, outline: 'none', fontFamily: 'inherit', background: '#FFFDF9', color: '#2C2926' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <span style={{ fontSize: 12, color: '#7C746D' }}>{moodNote.length}/120자</span>
            <button onClick={handleSaveMoodNote} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, border: 'none', background: '#D28A6A', color: '#fff', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>저장</button>
          </div>
        </div>

      </div>

      {/* 탭바 */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #E6DDD3', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
        {tabs.map(t => (
          <button key={t.to} onClick={() => nav(t.to)}
            style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', color: path === t.to ? '#D28A6A' : '#888', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 22 }}>{t.icon}</div>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
```
