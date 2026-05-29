import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { LevelUp, ProgBar } from '../../components/Common'
import dayjs from 'dayjs'

const AV = { chick:'🐣', cat:'🐱', dog:'🐶', fox:'🦊' }
const MOODS = [
  { type:'happy',   e:'😊', label:'행복해요'   },
  { type:'good',    e:'🙂', label:'좋아요'     },
  { type:'neutral', e:'😐', label:'보통이에요'  },
  { type:'sad',     e:'😢', label:'슬퍼요'     },
  { type:'angry',   e:'😠', label:'화나요'     },
]

export default function HomePage() {
  const nav = useNavigate()
  const { show, ToastEl } = useToast()
  const [lvUp, setLvUp] = useState(false)
  const [moodNote, setMoodNote] = useState('')
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
  const balance = useAppStore.getState().moneyLogs.reduce((s,r) => r.type==='income' ? s+r.amount : s-r.amount, 0)

  const handleCheckIn = () => {
    const ok = checkIn()
    show(ok ? '출석 완료! +5P' : '오늘은 이미 출석했어요!')
  }

  const handleMood = (type) => {
    logMood(type, moodNote)
    show('기분 기록 완료!')
  }

  return (
    <div className="page">
      {lvUp && <LevelUp level={level} onClose={() => setLvUp(false)} />}

      {/* 헤더 */}
      <div style={{ background:'var(--bg)', padding:'14px 20px', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:50 }}>
        <div className="spb">
          <div className="row">
            <div className="avatar-w">
              <div className="avatar">{AV[childAvatar]||'🐣'}</div>
              <div className="av-lv">Lv.{level}</div>
            </div>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:'var(--ink)', letterSpacing:'-.4px' }}>{childName}</div>
              <div style={{ height:4, background:'var(--bg2)', borderRadius:2, overflow:'hidden', margin:'5px 0', width:100 }}>
                <div style={{ height:'100%', background:'var(--indigo)', borderRadius:2, width:`${xpPct}%`, transition:'width .5s' }} />
              </div>
              <div style={{ fontSize:12, color:'var(--ink3)' }}>{xp} / {level*200} XP</div>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:20, fontWeight:800, color:'var(--ink)', letterSpacing:'-.5px' }}>{points.toLocaleString()}P</div>
            <div style={{ fontSize:13, color:'var(--ink3)', marginTop:3 }}>🔥 {streak}일 연속</div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop:16 }}>

        {/* 출석 체크 */}
        <div className="card" style={{ borderColor: todayChecked ? '#B8DBBF' : 'var(--border)', background: todayChecked ? 'var(--sage-l)' : 'var(--white)' }}>
          <div className="spb" style={{ marginBottom:14 }}>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:'var(--ink)', letterSpacing:'-.3px' }}>출석 체크</div>
              <div style={{ fontSize:13, color:'var(--ink3)', marginTop:2 }}>{streak}일 연속 달성 중</div>
            </div>
            <span className={`badge ${todayChecked ? 'bd-s' : 'bd-g'}`}>{todayChecked ? '완료 ✓' : '오늘 미완료'}</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
            {Array.from({length:21}).map((_,i) => (
              <div key={i} style={{ width:30, height:30, borderRadius:8, background: i<streak ? 'var(--indigo)' : 'var(--bg2)', color: i<streak ? '#fff' : 'var(--ink4)', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {i < streak ? '✓' : i+1}
              </div>
            ))}
          </div>
          <button onClick={handleCheckIn} disabled={todayChecked} className={`btn ${todayChecked ? 'btn-ghost' : 'btn-s'}`}>
            {todayChecked ? '오늘 출석 완료 ✓' : '출석 체크 +5P'}
          </button>
        </div>

        {/* 오늘 미션 */}
        <div className="card">
          <div className="spb" style={{ marginBottom:12 }}>
            <div style={{ fontSize:17, fontWeight:700, color:'var(--ink)', letterSpacing:'-.3px' }}>오늘의 미션</div>
            <span className="badge bd-i">{done} / {total}</span>
          </div>
          <ProgBar value={total > 0 ? done/total*100 : 0} color="var(--indigo)" style={{ marginBottom:10 }} />
          <div style={{ fontSize:14, color:'var(--ink3)' }}>
            {done===total ? '🎉 오늘 미션 모두 완료!' : `다음: ${missions.find(m=>!m.done)?.title||''}`}
          </div>
        </div>

        {/* 2컬 통계 */}
        <div className="g2" style={{ padding:'0 20px', marginBottom:12 }}>
          <div style={{ background:'var(--sage-l)', borderRadius:20, padding:'16px 15px', cursor:'pointer', border:'1px solid #B8DBBF' }} onClick={() => nav('/child/missions')}>
            <div style={{ fontSize:12, color:'var(--sage)', fontWeight:700, marginBottom:6 }}>연속 달성</div>
            <div style={{ fontSize:26, fontWeight:800, color:'var(--ink)', letterSpacing:'-.5px' }}>{streak}<span style={{ fontSize:15 }}>일</span></div>
            <div style={{ fontSize:20, marginTop:6 }}>🔥</div>
          </div>
          <div style={{ background:'var(--amber-l)', borderRadius:20, padding:'16px 15px', cursor:'pointer', border:'1px solid #E8C99A' }} onClick={() => nav('/child/money')}>
            <div style={{ fontSize:12, color:'var(--amber)', fontWeight:700, marginBottom:6 }}>잔액</div>
            <div style={{ fontSize:20, fontWeight:800, color:'var(--ink)', letterSpacing:'-.5px' }}>{balance.toLocaleString()}<span style={{ fontSize:13 }}>원</span></div>
            <div style={{ fontSize:20, marginTop:6 }}>💰</div>
          </div>
        </div>

        {/* 저금통 */}
        {mainPiggy ? (
          <div className="card" style={{ cursor:'pointer' }} onClick={() => nav('/child/money')}>
            <div className="spb" style={{ marginBottom:10 }}>
              <div className="row"><span style={{ fontSize:20 }}>🐷</span><span style={{ fontSize:16, fontWeight:700, color:'var(--ink)', letterSpacing:'-.3px' }}>{mainPiggy.name}</span></div>
              <span className="badge bd-i">{piggyPct}%</span>
            </div>
            <ProgBar value={piggyPct} color="var(--indigo)" style={{ marginBottom:8 }} />
            <div style={{ fontSize:13, color:'var(--ink3)' }}>{mainPiggy.current.toLocaleString()}원 / {mainPiggy.target.toLocaleString()}원</div>
          </div>
        ) : (
          <div className="card" style={{ textAlign:'center', cursor:'pointer', color:'var(--ink3)', fontSize:15 }} onClick={() => nav('/child/money')}>
            🐷 저금통을 추가해봐요
          </div>
        )}

        {/* 포인트 스토어 */}
        <div className="card-fill" style={{ background:'var(--amber-l)', border:'1px solid #E8C99A', cursor:'pointer', display:'flex', alignItems:'center', gap:14 }} onClick={() => show('포인트 스토어 준비 중!')}>
          <div style={{ width:46, height:46, borderRadius:14, background:'#FAECD0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🎁</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16, fontWeight:700, color:'var(--ink)', letterSpacing:'-.3px' }}>포인트 스토어</div>
            <div style={{ fontSize:13, color:'var(--amber)', marginTop:2 }}>보상으로 교환하기</div>
          </div>
          <span className="badge bd-a">⭐ {points}P</span>
        </div>

        {/* 기분 체크인 */}
        <div className="card">
          <div style={{ fontSize:17, fontWeight:700, color:'var(--ink)', letterSpacing:'-.3px', marginBottom:14 }}>오늘 기분은?</div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
            {MOODS.map(({ type, e }) => (
              <button key={type} onClick={() => handleMood(type)} style={{
                width:52, height:52, borderRadius:'50%', cursor:'pointer', fontFamily:'inherit',
                border: todayMood?.type===type ? '2.5px solid var(--indigo)' : '1.5px solid var(--border)',
                background: todayMood?.type===type ? 'var(--indigo-l)' : 'var(--bg)',
                fontSize:26, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s'
              }}>{e}</button>
            ))}
          </div>
          <input
            className="input"
            style={{ fontSize:14, height:44, background:'var(--bg)', border:'1px solid var(--border)' }}
            placeholder="오늘 기분을 한 줄로 써봐요..."
            value={moodNote}
            onChange={e => setMoodNote(e.target.value)}
            onKeyDown={e => e.key==='Enter' && show('기분 메모 저장!')}
          />
          {todayMood?.note && (
            <div style={{ marginTop:10, padding:'10px 14px', background:'var(--bg2)', borderRadius:12, fontSize:13, color:'var(--ink2)' }}>
              "{todayMood.note}"
            </div>
          )}
        </div>

        <div style={{ height:8 }} />
      </div>
      <TabBar />
      {ToastEl}
    </div>
  )
}
