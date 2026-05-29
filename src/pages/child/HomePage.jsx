import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { ProgBar, LevelUp } from '../../components/Common'
import dayjs from 'dayjs'

const AV = { chick:'🐣', cat:'🐱', dog:'🐶', fox:'🦊' }
const MOODS = [
  { type:'happy',   e:'😊', label:'행복해요'  },
  { type:'good',    e:'🙂', label:'좋아요'    },
  { type:'neutral', e:'😐', label:'보통이에요' },
  { type:'sad',     e:'😢', label:'슬퍼요'    },
  { type:'angry',   e:'😠', label:'화나요'    },
]

export default function HomePage() {
  const nav = useNavigate()
  const { show, ToastEl } = useToast()
  const [lvUp, setLvUp] = useState(false)
  const [moodNote, setMoodNote] = useState('')
  const [showMoodInput, setShowMoodInput] = useState(false)
  const {
    childName, childAvatar, points, xp, level, streak,
    missions, piggies, moodLogs, todayChecked,
    checkDailyReset, checkIn, logMood
  } = useAppStore()

  useEffect(() => { checkDailyReset() }, [])

  const done = missions.filter(m => m.done).length
  const total = missions.length
  const xpPct = Math.round(xp / (level * 200) * 100)
  const today = dayjs().format('YYYY-MM-DD')
  const todayMood = moodLogs.find(m => m.date === today)
  const mainPiggy = piggies[0]
  const piggyPct = mainPiggy ? Math.round(mainPiggy.current / mainPiggy.target * 100) : 0

  const handleCheckIn = () => {
    const ok = checkIn()
    show(ok ? '출석 완료! +5P 🎉' : '오늘은 이미 출석했어요!')
  }

  const handleMood = (type) => {
    logMood(type, moodNote)
    setShowMoodInput(false)
    setMoodNote('')
    show('기분 기록 완료!')
  }

  return (
    <div className="page">
      {lvUp && <LevelUp level={level} onClose={() => setLvUp(false)} />}

      {/* 헤더 */}
      <div style={{ background: 'white', padding: '16px 20px 14px', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="spb">
          <div className="row">
            <div className="avatar-wrap">
              <div className="avatar">{AV[childAvatar] || '🐣'}</div>
              <div className="avatar-lv">Lv.{level}</div>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>{childName}</div>
              <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', margin: '5px 0', width: 110 }}>
                <div style={{ height: '100%', background: '#5B5FEF', borderRadius: 3, width: `${xpPct}%`, transition: 'width 0.5s' }} />
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{xp} / {level * 200} XP</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>⭐ {points}P</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>🔥 {streak}일 연속</div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>

        {/* 출석 체크 — 최상단 */}
        <div className="card" style={{ background: todayChecked ? '#F0FDF4' : 'white', borderColor: todayChecked ? '#BBF7D0' : '#E5E7EB' }}>
          <div className="spb" style={{ marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>📅 출석 체크</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>{streak}일 연속 달성 중</div>
            </div>
            <span className={`badge ${todayChecked ? 'badge-green' : 'badge-gray'}`}>
              {todayChecked ? '완료 ✓' : '오늘 미완료'}
            </span>
          </div>
          {/* 달력 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: 8,
                background: i < streak ? '#5B5FEF' : '#F3F4F6',
                color: i < streak ? 'white' : '#9CA3AF',
                fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {i < streak ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button onClick={handleCheckIn} disabled={todayChecked} className={`btn ${todayChecked ? 'btn-ghost' : 'btn-primary'}`}>
            {todayChecked ? '오늘 출석 완료 ✓' : '출석 체크 +5P'}
          </button>
        </div>

        {/* 오늘 진행 */}
        <div className="card">
          <div className="spb" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>오늘의 미션</div>
            <span className="badge badge-accent">{done} / {total}</span>
          </div>
          <ProgBar value={total > 0 ? (done / total * 100) : 0} style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 14, color: '#6B7280' }}>
            {done === total ? '🎉 오늘 미션 모두 완료!' : `다음: ${missions.find(m => !m.done)?.title || ''}`}
          </div>
        </div>

        {/* 통계 2컬 */}
        <div className="g2" style={{ padding: '0 20px', marginBottom: 12 }}>
          <div style={{ background: '#F0FDF4', borderRadius: 20, padding: '18px 16px', cursor: 'pointer' }} onClick={() => nav('/child/missions')}>
            <div style={{ fontSize: 12, color: '#16A34A', fontWeight: 600, marginBottom: 6 }}>연속 달성</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#15803D' }}>{streak}<span style={{ fontSize: 16 }}>일</span></div>
            <div style={{ fontSize: 22, marginTop: 6 }}>🔥</div>
          </div>
          <div style={{ background: '#FFFBEB', borderRadius: 20, padding: '18px 16px', cursor: 'pointer' }} onClick={() => nav('/child/money')}>
            <div style={{ fontSize: 12, color: '#D97706', fontWeight: 600, marginBottom: 6 }}>잔액</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#92400E' }}>
              {useAppStore.getState().moneyLogs
                .reduce((s, r) => r.type === 'income' ? s + r.amount : s - r.amount, 0)
                .toLocaleString('ko-KR')}
              <span style={{ fontSize: 14 }}>원</span>
            </div>
            <div style={{ fontSize: 22, marginTop: 6 }}>💰</div>
          </div>
        </div>

        {/* 저금통 */}
        {mainPiggy ? (
          <div className="card" style={{ cursor: 'pointer', borderColor: '#C7D2FE' }} onClick={() => nav('/child/money')}>
            <div className="spb" style={{ marginBottom: 10 }}>
              <div className="row">
                <span style={{ fontSize: 20 }}>🐷</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{mainPiggy.name}</span>
              </div>
              <span className="badge badge-accent">{piggyPct}%</span>
            </div>
            <ProgBar value={piggyPct} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: '#6B7280' }}>
              {mainPiggy.current.toLocaleString()}원 / {mainPiggy.target.toLocaleString()}원
            </div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer', color: '#9CA3AF', fontSize: 15 }} onClick={() => nav('/child/money')}>
            🐷 저금통을 추가해봐요
          </div>
        )}

        {/* 포인트 스토어 */}
        <div style={{ margin: '0 20px 12px', background: '#FFFBEB', borderRadius: 20, padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #FDE68A' }} onClick={() => show('포인트 스토어 준비 중!')}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🎁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#92400E' }}>포인트 스토어</div>
            <div style={{ fontSize: 13, color: '#D97706' }}>보상으로 교환하기</div>
          </div>
          <span className="badge badge-amber">⭐ {points}P</span>
        </div>

        {/* 오늘 기분 */}
        <div className="card">
          <div style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 14 }}>오늘 기분은?</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: todayMood || showMoodInput ? 14 : 0 }}>
            {MOODS.map(({ type, e }) => (
              <button key={type} onClick={() => { setShowMoodInput(true); logMood(type, '') }} style={{
                width: 52, height: 52, borderRadius: '50%', cursor: 'pointer', fontFamily: 'inherit',
                border: todayMood?.type === type ? '2.5px solid #5B5FEF' : '1.5px solid #E5E7EB',
                background: todayMood?.type === type ? '#EEEEFF' : '#F9FAFB',
                fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                {e}
              </button>
            ))}
          </div>
          {/* 기분 텍스트 메모 */}
          {(showMoodInput || todayMood) && (
            <div style={{ marginTop: 12 }}>
              <input
                className="input"
                placeholder="오늘 기분을 짧게 써봐요... (예: 시험이 잘 봤어요!)"
                value={moodNote}
                onChange={e => setMoodNote(e.target.value)}
                style={{ fontSize: 14 }}
                onKeyDown={e => e.key === 'Enter' && todayMood && show('기분 메모 저장!')}
              />
              {todayMood && (
                <div style={{ marginTop: 10, padding: '10px 14px', background: '#F9FAFB', borderRadius: 12, fontSize: 13, color: '#6B7280' }}>
                  오늘 기분: {MOODS.find(m => m.type === todayMood.type)?.e} {MOODS.find(m => m.type === todayMood.type)?.label}
                  {todayMood.note && <div style={{ marginTop: 4, color: '#374151', fontWeight: 500 }}>"{todayMood.note}"</div>}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ height: 8 }} />
      </div>

      <TabBar />
      {ToastEl}
    </div>
  )
}
