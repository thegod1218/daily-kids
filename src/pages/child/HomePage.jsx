import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { ProgBar, LevelUp } from '../../components/Common'
import dayjs from 'dayjs'
import elephantImg from '../../assets/elephant.png'

const AV = { chick: '🐣', cat: '🐱', dog: '🐶', fox: '🦊' }

const MOODS = [
  { type: 'happy', e: '😊', label: '행복해요' },
  { type: 'good', e: '🙂', label: '좋아요' },
  { type: 'neutral', e: '😐', label: '보통이에요' },
  { type: 'sad', e: '😢', label: '슬퍼요' },
  { type: 'angry', e: '😠', label: '화나요' },
]

export default function HomePage() {
  const nav = useNavigate()
  const { show, ToastEl } = useToast()
  const [lvUp, setLvUp] = useState(false)
  const [moodNote, setMoodNote] = useState('')

  const {
    childName,
    childAvatar,
    points,
    xp,
    level,
    streak,
    missions,
    moodLogs,
    checkDailyReset,
    logMood,
  } = useAppStore()

  useEffect(() => {
    checkDailyReset()
  }, [])

  const done = missions.filter((m) => m.done).length
  const total = missions.length
  const xpPct = Math.min(100, Math.round((xp / (level * 200)) * 100))
  const today = dayjs().format('YYYY-MM-DD')
  const todayMood = moodLogs.find((m) => m.date === today)
  const nextMission = missions.find((m) => !m.done) || missions[0]

  const balance = useAppStore
    .getState()
    .moneyLogs.reduce((sum, row) => (row.type === 'income' ? sum + row.amount : sum - row.amount), 0)

  const handleMood = (type) => {
    logMood(type, moodNote)
    show('기분 기록 완료!')
  }

  const handleSaveMoodNote = () => {
    if (!todayMood) {
      show('먼저 오늘 기분을 골라주세요.')
      return
    }

    logMood(todayMood.type, moodNote)
    show('짧은 일기가 저장되었어요.')
  }

  return (
    <div className="page">
      {lvUp && <LevelUp level={level} onClose={() => setLvUp(false)} />}

      {/* Header */}
      <div
        style={{
          background: 'var(--bg)',
          padding: '18px 20px 16px',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="spb">
          <div className="row">
            <div className="avatar-wrap">
              <div className="avatar">
  <img
    src={elephantImg}
    alt="elephant"
    style={{
      width: 42,
      height: 42,
      objectFit: 'contain'
    }}
  />
</div>
              <div className="avatar-lv">Lv.{level}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: 'var(--ink3)', fontWeight: 700 }}>
                Daily Kids
              </div>
              <div
                style={{
                  fontSize: 23,
                  fontWeight: 800,
                  color: 'var(--ink)',
                  letterSpacing: '-0.8px',
                  marginTop: 2,
                }}
              >
                오늘 뭐 해볼까?
              </div>
              <div
                style={{
                  height: 5,
                  background: 'var(--bg2)',
                  borderRadius: 999,
                  overflow: 'hidden',
                  margin: '8px 0 0',
                  width: 116,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: 'var(--indigo)',
                    borderRadius: 999,
                    width: `${xpPct}%`,
                    transition: 'width 0.5s',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--white)',
              border: '1px solid var(--border)',
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
        {/* 오늘의 목표 */}
        <div className="card" style={{ borderColor: 'var(--border)' }}>
          <div className="spb" style={{ marginBottom: 14 }}>
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--ink3)',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                오늘의 목표
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--ink)',
                  letterSpacing: '-0.8px',
                }}
              >
                {nextMission?.title || '오늘 미션 없음'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink3)', marginTop: 5 }}>
                {done} / {total}개 완료
              </div>
            </div>

            <button
              onClick={() => nav('/child/missions')}
              className="btn btn-primary"
              style={{
                width: 'auto',
                padding: '11px 18px',
                borderRadius: 999,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              시작
            </button>
          </div>

          <ProgBar value={total > 0 ? (done / total) * 100 : 0} style={{ marginBottom: 10 }} />

          <div style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6 }}>
            {done === total
              ? '오늘 미션을 모두 완료했어요.'
              : '하나씩 천천히 해보면 돼요.'}
          </div>
        </div>

        {/* 바로가기 카드 */}
        <div className="g2" style={{ padding: '0 20px', marginBottom: 12 }}>
          <div
            style={{
              background: 'var(--white)',
              borderRadius: 22,
              padding: '18px 16px',
              cursor: 'pointer',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 22px rgba(80,60,40,.05)',
            }}
            onClick={() => nav('/child/missions')}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'var(--indigo-l)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              📋
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>계획</div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', marginTop: 4 }}>할 일 보기</div>
          </div>

          <div
            style={{
              background: 'var(--white)',
              borderRadius: 22,
              padding: '18px 16px',
              cursor: 'pointer',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 22px rgba(80,60,40,.05)',
            }}
            onClick={() => nav('/child/money')}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'var(--amber-l)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              💰
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>용돈</div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', marginTop: 4 }}>
              {balance.toLocaleString('ko-KR')}원
            </div>
          </div>
        </div>

        {/* 오늘의 마음 */}
        <div className="card">
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: 'var(--ink)',
                letterSpacing: '-0.3px',
              }}
            >
              오늘의 마음
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', marginTop: 4 }}>
              하나만 골라봐요.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 14 }}>
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
                    border: active ? '1.5px solid var(--indigo)' : '1px solid var(--border)',
                    background: active ? 'var(--indigo-l)' : 'var(--white)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{e}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink3)', fontWeight: 700 }}>
                    {label.replace('해요', '')}
                  </span>
                </button>
              )
            })}
          </div>

          {todayMood && (
            <div
              style={{
                padding: '10px 14px',
                background: 'var(--bg2)',
                borderRadius: 14,
                fontSize: 13,
                color: 'var(--ink2)',
              }}
            >
              오늘 기분: {MOODS.find((m) => m.type === todayMood.type)?.e}{' '}
              {MOODS.find((m) => m.type === todayMood.type)?.label}
            </div>
          )}
        </div>

        {/* 짧은 일기 */}
        <div className="card">
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: 'var(--ink)',
                letterSpacing: '-0.3px',
              }}
            >
              짧은 일기
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', marginTop: 4 }}>
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
            <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{moodNote.length}/120자</span>
            <button
              onClick={handleSaveMoodNote}
              className="btn btn-primary"
              style={{ width: 'auto', padding: '8px 14px', borderRadius: 999, fontSize: 13 }}
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