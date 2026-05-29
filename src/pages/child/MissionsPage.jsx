import React, { useState } from 'react'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet } from '../../components/Common'

const TIME_COLOR = { am: 'var(--sage)', pm: 'var(--amber)', ev: 'var(--indigo)' }
const TIME_BG    = { am: 'var(--sage-l)', pm: 'var(--amber-l)', ev: 'var(--indigo-l)' }
const TIME_LABEL = { am: '오전', pm: '오후', ev: '저녁' }
const ICON_MAP   = {
  toothbrush:'🪥', droplet:'💧', sun:'☀️', book:'📚',
  pencil:'✏️', tools:'🧹', moon:'🌙', check:'✅',
  run:'🏃', art:'🎨', music:'🎵', errand:'🛍️'
}

export default function MissionsPage() {
  const { missions, completeMission, addMission } = useAppStore()
  const { show, ToastEl } = useToast()
  const [addOpen, setAddOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('am')
  const [needApproval, setNeedApproval] = useState(false)

  const done = missions.filter(m => m.done).length
  const confirmM = missions.find(m => m.id === confirmId)

  const handleComplete = () => {
    if (!confirmM) return
    completeMission(confirmId)
    setConfirmId(null)
    show(confirmM.needApproval ? '부모님께 확인 요청했어요!' : `+${confirmM.pts}P 획득! 🎉`)
  }

  const handleAdd = () => {
    if (!title.trim()) { show('미션 이름을 입력해주세요'); return }
    addMission({ title: title.trim(), icon: 'check', color: TIME_COLOR[time], pts: 10, xp: 20, time, needApproval })
    setTitle(''); setTime('am'); setNeedApproval(false); setAddOpen(false)
    show('미션 추가!')
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="header-title">미션 센터</div>
          <div className="header-sub">{done}/{missions.length} 완료</div>
        </div>
        <button onClick={() => setAddOpen(true)} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#EEEEFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#5B5FEF' }} aria-label="추가">+</button>
      </div>

      {/* 오늘 전체 진행 바 */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ background: '#F3F4F6', borderRadius: 12, overflow: 'hidden', height: 8 }}>
          <div style={{ height: '100%', background: '#5B5FEF', borderRadius: 12, width: `${missions.length > 0 ? (done / missions.length * 100) : 0}%`, transition: 'width 0.5s' }} />
        </div>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8, textAlign: 'right' }}>
          {done === missions.length && done > 0 ? '🎉 오늘 미션 모두 완료!' : `${missions.length - done}개 남음`}
        </div>
      </div>

      {/* 시간대별 미션 */}
      {['am', 'pm', 'ev'].map(t => {
        const group = missions.filter(m => m.time === t)
        if (!group.length) return null
        const groupDone = group.filter(m => m.done).length
        return (
          <div key={t} style={{ marginBottom: 4 }}>
            {/* 섹션 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 10px' }}>
              <div className="row">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: TIME_COLOR[t] }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', letterSpacing: '0.5px' }}>{TIME_LABEL[t]}</span>
              </div>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>{groupDone}/{group.length}</span>
            </div>

            {group.map(m => (
              <div
                key={m.id}
                className={`mission-card ${m.done ? 'done' : ''}`}
                onClick={() => !m.done && setConfirmId(m.id)}
              >
                <div className="mission-inner">
                  {/* 아이콘 */}
                  <div className="mission-icon-wrap" style={{ background: m.done ? '#DCFCE7' : TIME_BG[m.time] }}>
                    <span>{ICON_MAP[m.icon] || '✅'}</span>
                  </div>
                  {/* 텍스트 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: m.done ? 400 : 600, color: m.done ? '#9CA3AF' : '#111827', textDecoration: m.done ? 'line-through' : 'none', marginBottom: 3 }}>
                      {m.title}
                    </div>
                    <div className="mission-pts">+{m.pts}P · +{m.xp}XP{m.needApproval ? ' · 부모 확인' : ''}</div>
                  </div>
                  {/* 상태 */}
                  {m.done ? (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✓</div>
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      })}

      <div style={{ height: 8 }} />

      {/* 완료 확인 시트 */}
      <Sheet open={!!confirmId} onClose={() => setConfirmId(null)}>
        {confirmM && (
          <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{ICON_MAP[confirmM.icon] || '✅'}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{confirmM.title}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--amber)', marginBottom: 6 }}>+{confirmM.pts}P · +{confirmM.xp}XP</div>
            {confirmM.needApproval && (
              <div style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 4 }}>부모님 확인 후 포인트가 지급돼요</div>
            )}
            <div style={{ height: 20 }} />
            <button className="btn btn-primary" onClick={handleComplete}>완료!</button>
          </div>
        )}
      </Sheet>

      {/* 미션 추가 시트 */}
      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="미션 추가">
        <input className="input" placeholder="미션 이름" value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['am', 'pm', 'ev'].map(t => (
            <button key={t} onClick={() => setTime(t)} style={{ flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, border: time === t ? `2px solid ${TIME_COLOR[t]}` : '1.5px solid #E5E7EB', background: time === t ? TIME_BG[t] : 'white', color: time === t ? TIME_COLOR[t] : '#9CA3AF' }}>
              {TIME_LABEL[t]}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#6B7280', marginBottom: 20, cursor: 'pointer' }}>
          <input type="checkbox" checked={needApproval} onChange={e => setNeedApproval(e.target.checked)} style={{ width: 18, height: 18 }} />
          부모님 확인 필요
        </label>
        <button className="btn btn-primary" onClick={handleAdd}>추가하기</button>
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}
