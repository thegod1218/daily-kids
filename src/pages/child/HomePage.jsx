import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { ProgBar } from '../../components/Common'
import dayjs from 'dayjs'

const MOODS = [
  { type: 'happy', e: '😊', label: '행복' },
  { type: 'good', e: '🙂', label: '좋아요' },
  { type: 'neutral', e: '😐', label: '보통' },
  { type: 'sad', e: '😢', label: '슬퍼요' },
  { type: 'angry', e: '😠', label: '화나요' },
]

const CHARACTERS = [
  { key: 'elephant', label: '토리', emoji: '🐘' },
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
    missions,
    moodLogs,
    checkDailyReset,
    logMood,
  } = useAppStore()

  useEffect(() => {
    checkDailyReset()
  }, [])

  const done = missions.filter(m => m.done).length
  const total = missions.length
  const nextMission = missions.find(m => !m.done) || missions[0]

  const today = dayjs().format('YYYY-MM-DD')
  const todayMood = moodLogs.find(m => m.date === today)

  const balance = useAppStore
    .getState()
    .moneyLogs.reduce((sum, row) => (row.type === 'income' ? sum + row.amount : sum - row.amount), 0)

  const selectCharacter = (key) => {
    setSelectedCharacter(key)
    localStorage.setItem('dailyKidsCharacter', key)
    setShowGallery(false)
    show('캐릭터가 변경되었어요!')
  }

  const renderCharacter = (size = 28) => {
    const found = CHARACTERS.find(c => c.key === selectedCharacter)
    return <span style={{ fontSize: size }}>{found?.emoji || '🐘'}</span>
  }

  const handleMood = (type) => {
    logMood(type, moodNote)
    show('기분이 기록되었어요.')
  }

  const handleSaveMoodNote = () => {
    if (!todayMood) {
      show('먼저 오늘의 마음을 골라주세요.')
      return
    }

    logMood(todayMood.type, moodNote)
    show('짧은 일기가 저장되었어요.')
  }

  return (
    <div className="page">
      {showGallery && (
        <div
          onClick={() => setShowGallery(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(44,41,38,.28)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              background: 'white',
              borderRadius: '28px 28px 0 0',
              padding: '22px 20px 28px',
              boxShadow: '0 -12px 40px rgba(80,60,40,.16)',
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
              캐릭터 고르기
            </div>
            <div style={{ fontSize: 13, color: '#7C746D', marginBottom: 18 }}>
              홈 화면에 보여질 친구를 선택해요.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {CHARACTERS.map(char => {
                const active = selectedCharacter === char.key

                return (
                  <button
                    key={char.key}
                    onClick={() => selectCharacter(char.key)}
                    style={{
                      border: active ? '2px solid #D28A6A' : '1px solid #E6DDD3',
                      background: active ? '#F7E6DD' : '#FFFDF9',
                      borderRadius: 18,
                      padding: '12px 6px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{char.emoji}</div>
                    <div style={{ fontSize: 11, color: '#7C746D', fontWeight: 700 }}>
                      {char.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          background: '#F7F3EE',
          padding: '18px 20px 16px',
          borderBottom: '1px solid #E6DDD3',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="spb">
          <div className="row" style={{ gap: 12, alignItems: 'center' }}>
            <div
              onClick={() => setShowGallery(true)}
              style={{
                width: 44,
                height: 44,
                minWidth: 44,
                borderRadius: '50%',
                background: '#F7E6DD',
                border: '1px solid #E6DDD3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {renderCharacter(25)}
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#7C746D', fontWeight: 700 }}>
                Daily Kids
              </div>
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 850,
                  color: '#2C2926',
                  letterSpacing: '-0.8px',
                  lineHeight: 1.2,
                  marginTop: 2,
                }}
              >
                오늘 뭐 해볼까?
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                우리아이
              </div>
            </div>
          </div>

          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#FFFDF9',
              border: '1px solid #E6DDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            🔔
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>
        <div
          className="card"
          style={{
            borderColor: '#E6DDD3',
            background: '#FFFDF9',
            overflow: 'hidden',
          }}
        >
          <div className="spb" style={{ alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: '#7C746D', fontWeight: 700, marginBottom: 4 }}>
                오늘의 목표
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 850,
                  color: '#2C2926',
                  letterSpacing: '-0.8px',
                }}
              >
                {nextMission?.title || '오늘 미션 없음'}
              </div>
              <div style={{ fontSize: 13, color: '#7C746D', marginTop: 5 }}>
                {done} / {total}개 완료
              </div>
            </div>

            <button
              onClick={() => nav('/child/missions')}
              className="btn"
              style={{
                width: 'auto',
                padding: '11px 18px',
                borderRadius: 999,
                fontSize: 14,
                flexShrink: 0,
                border: 'none',
                background: '#F3F0ED',
                color: '#111',
                fontWeight: 800,
              }}
            >
              시작
            </button>
          </div>

          <ProgBar value={total > 0 ? (done / total) * 100 : 0} style={{ marginBottom: 10 }} />

          <div style={{ fontSize: 14, color: '#7C746D', lineHeight: 1.6 }}>
            하나씩 천천히 해보면 돼요.
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src="/elephant.png"
              alt=""
              style={{
                width: 130,
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        <div className="g2" style={{ padding: '0 20px', marginBottom: 12 }}>
          <div
            style={{
              background: '#FFFDF9',
              borderRadius: 22,
              padding: '18px 16px',
              cursor: 'pointer',
              border: '1px solid #E6DDD3',
              boxShadow: '0 8px 22px rgba(80,60,40,.05)',
            }}
            onClick={() => nav('/child/missions')}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#F7E6DD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              📋
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#2C2926' }}>계획</div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>할 일 보기</div>
          </div>

          <div
            style={{
              background: '#FFFDF9',
              borderRadius: 22,
              padding: '18px 16px',
              cursor: 'pointer',
              border: '1px solid #E6DDD3',
              boxShadow: '0 8px 22px rgba(80,60,40,.05)',
            }}
            onClick={() => nav('/child/money')}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#FFF3D7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              💰
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#2C2926' }}>용돈</div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>
              {balance.toLocaleString('ko-KR')}원
            </div>
          </div>
        </div>

        <div className="card" style={{ background: '#FFFDF9', borderColor: '#E6DDD3' }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#2C2926' }}>
              오늘의 마음
            </div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>
              하나만 골라봐요.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            {MOODS.map(({ type, e, label }) => {
              const active = todayMood?.type === type

              return (
                <button
                  key={type}
                  onClick={() => handleMood(type)}
                  style={{
                    flex: 1,
                    minHeight: 76,
                    borderRadius: 18,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    border: active ? '1.5px solid #D28A6A' : '1px solid #E6DDD3',
                    background: active ? '#F7E6DD' : '#FFFDF9',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{e}</span>
                  <span style={{ fontSize: 11, color: '#7C746D', fontWeight: 700 }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="card" style={{ background: '#FFFDF9', borderColor: '#E6DDD3' }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#2C2926' }}>
              짧은 일기
            </div>
            <div style={{ fontSize: 13, color: '#7C746D', marginTop: 4 }}>
              오늘 좋았던 일을 한 줄만 적어봐요.
            </div>
          </div>

          <textarea
            className="input"
            placeholder="예: 친구랑 같이 놀아서 좋았어요."
            value={moodNote}
            maxLength={120}
            onChange={(e) => setMoodNote(e.target.value)}
            style={{
              minHeight: 92,
              resize: 'none',
              fontSize: 14,
              lineHeight: 1.6,
              paddingTop: 12,
            }}
          />

          <div className="spb" style={{ marginTop: 10 }}>
            <span style={{ fontSize: 12, color: '#7C746D' }}>{moodNote.length}/120자</span>
            <button
              onClick={handleSaveMoodNote}
              className="btn"
              style={{
                width: 'auto',
                padding: '8px 14px',
                borderRadius: 999,
                fontSize: 13,
                border: 'none',
                background: '#D28A6A',
                color: '#fff',
                fontWeight: 800,
              }}
            >
              저장
            </button>
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>

      <TabBar />
      {ToastEl}
    </div>
  )
}