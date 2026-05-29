```jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { ProgBar } from '../../components/Common'


const MOODS = [
  { type: 'happy', e: '😊', label: '행복' },
  { type: 'good', e: '🙂', label: '좋아요' },
  { type: 'neutral', e: '😐', label: '보통' },
  { type: 'sad', e: '😢', label: '슬퍼요' },
  { type: 'angry', e: '😠', label: '화나요' },
]

const CHARACTERS = [
  { key: 'elephant', label: '토리' },
  { key: 'chick', label: '병아리', emoji: '🐣' },
  { key: 'cat', label: '고양이', emoji: '🐱' },
  { key: 'dog', label: '강아지', emoji: '🐶' },
  { key: 'fox', label: '여우', emoji: '🦊' },
]

export default function HomePage() {
  const nav = useNavigate()
  const { show, ToastEl } = useToast()

  const [moodNote, setMoodNote] = useState('')
  const [showGallery, setShowGallery] = useState(false)

  const [selectedCharacter, setSelectedCharacter] = useState(
    localStorage.getItem('dailyKidsCharacter') || 'elephant'
  )

  const {
    childName,
    points,
    missions,
    moodLogs,
    logMood,
  } = useAppStore()

  useEffect(() => {}, [])

  const done = missions.filter(m => m.done).length
  const total = missions.length

  const today = dayjs().format('YYYY-MM-DD')
  const todayMood = moodLogs.find(m => m.date === today)

  const selectCharacter = (key) => {
    setSelectedCharacter(key)
    localStorage.setItem('dailyKidsCharacter', key)
    setShowGallery(false)
    show('캐릭터가 변경되었어요!')
  }

  const renderCharacter = (size = 46) => {
    if (selectedCharacter === 'elephant') {
      return (
        <img
         src="/elephant.png"
        alt=""
        style={{
          width: 38,
          height: 38,
          objectFit: 'contain'
          transform: 'translateY(2px)'
          }}
        />
      )
    }

    const found = CHARACTERS.find(c => c.key === selectedCharacter)

    return <span style={{ fontSize: size * 0.7 }}>{found?.emoji}</span>
  }

  const handleMood = (type) => {
    logMood(type, moodNote)
    show('기분이 기록되었어요')
  }

  return (
    <div className="page">

      {showGallery && (
        <div
          onClick={() => setShowGallery(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.28)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              background: 'white',
              borderRadius: '24px 24px 0 0',
              padding: 20
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
              캐릭터 고르기
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5,1fr)',
              gap: 12
            }}>
              {CHARACTERS.map(char => (
                <button
                  key={char.key}
                  onClick={() => selectCharacter(char.key)}
                  style={{
                    border: '1px solid #E6DDD3',
                    borderRadius: 16,
                    padding: 10,
                    background: '#fff'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 8
                  }}>
                    {char.key === 'elephant'
                      ? <img src={elephantImg} style={{ width: 36 }} />
                      : <span style={{ fontSize: 28 }}>{char.emoji}</span>}
                  </div>
                  <div style={{ fontSize: 12 }}>{char.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{
        padding: '20px'
      }}>
        <div className="spb">
           <div
           className="avatar" 
           onClick={() => setShowGallery(true)}
    style={{
      width: 52,
      height: 52,
      minWidth: 52,
      borderRadius: '50%',
      background: '#F7E6DD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      cursor: 'pointer'
    }}
  >
    {renderCharacter(34)}
  </div>

  <div>
    <div
      style={{
        fontSize: 12,
        color: '#7C746D',
        fontWeight: 600,
        marginBottom: 2
      }}
    >
      Daily Kids
    </div>

    <div
      style={{
        fontSize: 18,
        fontWeight: 800,
        lineHeight: 1.2,
        color: '#2C2926'
      }}
    >
      오늘 뭐 해볼까?
    </div>

    <div
      style={{
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4
      }}
    >
      Lv.1 · 0 / 200 XP
    </div>
  </div>
</div>
              </div>
            </div>
          </div>

          <button
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              border: '1px solid #E6DDD3',
              background: 'white'
            }}
          >
            🔔
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ fontSize: 13, color: '#7C746D' }}>오늘의 목표</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>아침 양치</div>

        <ProgBar value={total ? (done / total) * 100 : 0} />

        <div style={{ marginTop: 8, color: '#7C746D' }}>
          하나씩 천천히 해보면 돼요.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>오늘의 마음</div>

        <div style={{
          display: 'flex',
          gap: 10
        }}>
          {MOODS.map(m => (
            <button
              key={m.type}
              onClick={() => handleMood(m.type)}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: 10,
                border: todayMood?.type === m.type
                  ? '2px solid #D28A6A'
                  : '1px solid #E6DDD3',
                background: '#fff'
              }}
            >
              <div style={{ fontSize: 26 }}>{m.e}</div>
              <div style={{ fontSize: 12 }}>{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>짧은 일기</div>

        <textarea
          className="input"
          placeholder="오늘 좋았던 일을 적어봐요."
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
        />
      </div>

      <TabBar />
      {ToastEl}
    </div>
  )
}
```
