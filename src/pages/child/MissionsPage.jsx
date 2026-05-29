import React, { useState } from 'react'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet } from '../../components/Common'

const TIME_COLOR = { am: '#1D9E75', pm: '#BA7517', ev: '#7F77DD' }
const TIME_LABEL = { am: '오전', pm: '오후', ev: '저녁' }

const ICON_MAP = {
  toothbrush: '🪥', droplet: '💧', sun: '☀️', book: '📚',
  pencil: '✏️', tools: '🧹', moon: '🌙', check: '✅',
  run: '🏃', art: '🎨', music: '🎵', errand: '🛒'
}

export default function MissionsPage() {
  const { missions, completeMission, addMission } = useAppStore()
  const { show, ToastEl } = useToast()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newTime, setNewTime] = useState('am')
  const [needApproval, setNeedApproval] = useState(false)

  const done = missions.filter(m => m.done).length

  const tapMission = (m) => {
    if (m.done) return
    setConfirmId(m.id)
  }

  const confirmComplete = () => {
    const m = missions.find(x => x.id === confirmId)
    if (!m) return
    completeMission(confirmId)
    setConfirmId(null)
    if (m.needApproval) show('부모님께 확인 요청했어요!')
    else show(`+${m.pts}P 획득!`)
  }

  const handleAdd = () => {
    if (!newTitle.trim()) { show('미션 이름을 입력해주세요'); return }
    addMission({ title: newTitle.trim(), icon: 'check', color: TIME_COLOR[newTime], pts: 10, xp: 20, time: newTime, needApproval })
    setNewTitle(''); setNewTime('am'); setNeedApproval(false)
    setSheetOpen(false)
    show('미션 추가!')
  }

  const confirmMission = missions.find(m => m.id === confirmId)

  return (
    <div className="page">
      {/* 헤더 */}
      <div className="page-header">
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A' }}>미션 센터</div>
          <div style={{ fontSize: 12, color: '#888780', marginTop: 2 }}>{done}/{missions.length} 완료</div>
        </div>
        <button
          onClick={() => setSheetOpen(true)}
          style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid #EDE9FE', background: '#EEEDFE', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="미션 추가"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div style={{ paddingTop: 14 }}>
        {['am', 'pm', 'ev'].map(time => {
          const group = missions.filter(m => m.time === time)
          if (!group.length) return null
          return (
            <div key={time}>
              <div className="sec-label" style={{ padding: '0 16px', marginBottom: 8 }}>{TIME_LABEL[time]}</div>
              {group.map(m => (
                <div
                  key={m.id}
                  className={`mission-tile ${m.done ? 'done' : ''}`}
                  onClick={() => tapMission(m)}
                >
                  <div className="mission-bar" style={{ background: m.done ? '#C0DD97' : TIME_COLOR[m.time] }} />
                  <div className="mission-body">
                    <div className="mission-icon" style={{ background: m.done ? '#EAF3DE' : '#F1EFE8', fontSize: 18 }}>
                      {ICON_MAP[m.icon] || '✅'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: m.done ? 400 : 500, color: m.done ? '#B4B2A9' : '#2C2C2A', textDecoration: m.done ? 'line-through' : 'none' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: 11, color: '#BA7517', marginTop: 2 }}>
                        +{m.pts}P · +{m.xp}XP{m.needApproval ? ' · 부모 확인' : ''}
                      </div>
                    </div>
                    {m.done
                      ? <span className="chip chip-g" style={{ fontSize: 10 }}>완료</span>
                      : <span style={{ fontSize: 11, color: '#D3D1C7' }}>탭</span>
                    }
                  </div>
                </div>
              ))}
              <div style={{ height: 6 }} />
            </div>
          )
        })}
      </div>

      {/* 미션 완료 확인 시트 */}
      <Sheet open={!!confirmId} onClose={() => setConfirmId(null)}>
        {confirmMission && (
          <div style={{ textAlign: 'center', padding: '4px 0 22px' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 30 }}>
              ✅
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A', marginBottom: 5 }}>{confirmMission.title}</div>
            <div style={{ fontSize: 14, color: '#BA7517', fontWeight: 500, marginBottom: 4 }}>+{confirmMission.pts}P · +{confirmMission.xp}XP</div>
            <div style={{ fontSize: 12, color: '#888780', marginBottom: 22 }}>
              {confirmMission.needApproval ? '부모님 확인 후 포인트가 지급돼요' : ''}
            </div>
            <button className="btn btn-primary" onClick={confirmComplete}>완료 확인</button>
          </div>
        )}
      </Sheet>

      {/* 미션 추가 시트 */}
      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="미션 추가">
        <input className="input" placeholder="미션 이름" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ marginBottom: 10 }} />
        <select
          value={newTime}
          onChange={e => setNewTime(e.target.value)}
          style={{ width: '100%', height: 44, border: '0.5px solid #D3D1C7', borderRadius: 10, padding: '0 14px', fontSize: 14, background: 'white', color: '#2C2C2A', marginBottom: 10, outline: 'none', fontFamily: 'inherit' }}
        >
          <option value="am">오전</option>
          <option value="pm">오후</option>
          <option value="ev">저녁</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#888780', marginBottom: 18, cursor: 'pointer' }}>
          <input type="checkbox" checked={needApproval} onChange={e => setNeedApproval(e.target.checked)} />
          부모님 확인 필요
        </label>
        <button className="btn btn-primary" onClick={handleAdd}>추가하기</button>
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}
