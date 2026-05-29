import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { ProgressBar, LevelUpOverlay } from '../../components/Common'
import dayjs from 'dayjs'

const AVATAR_EMOJI = { chick: '🐣', cat: '🐱', dog: '🐶', fox: '🦊' }

export default function ChildHomePage() {
  const navigate = useNavigate()
  const { show, ToastEl } = useToast()
  const [showLevelUp, setShowLevelUp] = useState(false)
  const {
    childName, childAge, childAvatar, points, xp, level, streak,
    missions, piggies, moodLogs, todayChecked,
    checkDailyReset, checkIn, logMood, addPoints
  } = useAppStore()

  useEffect(() => { checkDailyReset() }, [])

  const doneMissions = missions.filter(m => m.done).length
  const totalMissions = missions.length
  const progPct = Math.round(doneMissions / totalMissions * 100)

  const mainPiggy = piggies[0]
  const piggyPct = mainPiggy ? Math.round(mainPiggy.current / mainPiggy.target * 100) : 0

  const todayMood = moodLogs.find(m => m.date === dayjs().format('YYYY-MM-DD'))?.type

  const handleCheckIn = () => {
    const success = checkIn()
    if (success) show('출석 완료! +5P')
    else show('오늘은 이미 출석했어요!')
  }

  const handleMood = (type) => {
    logMood(type)
    show('기분 기록 완료!')
  }

  const MOODS = [
    { type: 'happy',   emoji: '😊', label: '행복'  },
    { type: 'neutral', emoji: '😐', label: '보통'  },
    { type: 'sad',     emoji: '😢', label: '슬픔'  },
    { type: 'angry',   emoji: '😠', label: '화남'  },
    { type: 'excited', emoji: '🤩', label: '신남'  },
  ]

  const pendingMission = missions.find(m => !m.done)
  const xpPct = Math.round(xp / (level * 200) * 100)

  return (
    <div className="page">
      {showLevelUp && <LevelUpOverlay level={level} onClose={() => setShowLevelUp(false)} />}

      {/* 헤더 */}
      <div className="child-hdr" style={{ background: 'white', padding: '12px 16px', borderBottom: '0.5px solid #EDE9FE', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="spb">
          <div className="row">
            <div className="avatar">
              <span style={{ fontSize: 22 }}>{AVATAR_EMOJI[childAvatar] || '🐣'}</span>
              <div className="avatar-lv">Lv.{level}</div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>{childName}</div>
              <div style={{ fontSize: 11, color: '#888780' }}>미션마스터</div>
              <div style={{ height: 4, background: '#EDE9FE', borderRadius: 2, overflow: 'hidden', margin: '4px 0', width: 100 }}>
                <div style={{ height: '100%', background: '#7F77DD', borderRadius: 2, width: `${xpPct}%`, transition: 'width 0.5s' }} />
              </div>
              <div style={{ fontSize: 11, color: '#888780' }}>{xp}/{level * 200} XP</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A' }}>
              <span style={{ fontSize: 14, color: '#BA7517' }}>★</span> {points}P
            </div>
            <div style={{ fontSize: 11, color: '#888780', marginTop: 3 }}>
              <span style={{ color: '#D85A30' }}>🔥</span> {streak}일 연속
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* 오늘 진행 */}
        <div className="card">
          <div className="spb" style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>오늘의 진행</span>
            <span className="chip chip-p">{doneMissions} / {totalMissions}</span>
          </div>
          <ProgressBar value={progPct} color="#7F77DD" style={{ marginBottom: 6 }} />
          <div style={{ fontSize: 12, color: '#888780' }}>
            {pendingMission ? `다음: ${pendingMission.title}` : '오늘 미션 모두 완료!'}
          </div>
        </div>

        {/* 통계 2컬 */}
        <div className="g2">
          <div style={{ background: '#EAF3DE', borderRadius: 18, padding: 14, cursor: 'pointer' }} onClick={() => navigate('/child/missions')}>
            <div style={{ fontSize: 11, color: '#27500A', marginBottom: 5 }}>연속 달성</div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#085041' }}>{streak}일</div>
            <div style={{ fontSize: 18, marginTop: 4 }}>🔥</div>
          </div>
          <div style={{ background: '#FAEEDA', borderRadius: 18, padding: 14, cursor: 'pointer' }} onClick={() => navigate('/child/money')}>
            <div style={{ fontSize: 11, color: '#633806', marginBottom: 5 }}>잔액</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#412402' }}>
              {useAppStore.getState().moneyLogs
                .reduce((sum, r) => r.type === 'income' ? sum + r.amount : sum - r.amount, 0)
                .toLocaleString('ko-KR')}원
            </div>
            <div style={{ fontSize: 18, marginTop: 4 }}>💰</div>
          </div>
        </div>

        {/* 저금통 */}
        {mainPiggy ? (
          <div className="card" style={{ cursor: 'pointer', borderColor: '#AFA9EC' }} onClick={() => navigate('/child/money')}>
            <div className="spb" style={{ marginBottom: 8 }}>
              <div className="row">
                <span style={{ fontSize: 18 }}>🐷</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{mainPiggy.name}</span>
              </div>
              <span className="chip chip-p">{piggyPct}%</span>
            </div>
            <ProgressBar value={piggyPct} color="#7F77DD" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: '#888780' }}>
              {mainPiggy.current.toLocaleString('ko-KR')}원 / {mainPiggy.target.toLocaleString('ko-KR')}원
            </div>
          </div>
        ) : (
          <div
            className="card"
            style={{ cursor: 'pointer', borderColor: '#AFA9EC', textAlign: 'center', padding: '16px', color: '#888780', fontSize: 13 }}
            onClick={() => navigate('/child/money')}
          >
            🐷 저금통을 추가해봐요
          </div>
        )}

        {/* 포인트 스토어 진입 */}
        <div className="fill-a" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => show('포인트 스토어 준비 중!')}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: '#FAC775', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>🎁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#412402' }}>포인트 스토어</div>
            <div style={{ fontSize: 12, color: '#633806' }}>보상으로 교환하기</div>
          </div>
          <span className="chip chip-a">★ {points}P</span>
        </div>

        {/* 감정 체크인 */}
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 14 }}>오늘 기분은?</div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {MOODS.map(({ type, emoji }) => (
              <button
                key={type}
                onClick={() => handleMood(type)}
                style={{
                  width: 46, height: 46, borderRadius: '50%', cursor: 'pointer', fontFamily: 'inherit',
                  border: todayMood === type ? '2px solid #7F77DD' : '1.5px solid #EDE9FE',
                  background: todayMood === type ? '#EEEDFE' : '#F5F4FF',
                  fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 출석 체크 */}
        <div className="card" style={{ borderColor: '#C0DD97' }}>
          <div className="spb" style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#27500A' }}>이번 달 출석</span>
            <span className="chip chip-g">{streak}일</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: i < streak ? '#7F77DD' : '#F1EFE8',
                  color: i < streak ? 'white' : '#B4B2A9',
                  fontSize: 10, fontWeight: 500,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {i < streak ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button
            onClick={handleCheckIn}
            disabled={todayChecked}
            className="btn btn-teal"
          >
            {todayChecked ? '오늘 출석 완료 ✓' : '오늘 출석 체크 +5P'}
          </button>
        </div>

        <div style={{ height: 8 }} />
      </div>

      <TabBar />
      {ToastEl}
    </div>
  )
}
