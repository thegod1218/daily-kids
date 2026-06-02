import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'

const TIME_COLOR = { am: '#4A7C59', pm: '#C06000', ev: '#5B5FEF' }
const TIME_BG    = { am: '#EDF4EF', pm: '#FFF8EE', ev: '#EEEEFF' }
const TIME_LABEL = { am: '오전', pm: '오후', ev: '저녁' }
const ICON_MAP   = {
  toothbrush:'🪥', droplet:'💧', sun:'☀️', book:'📚',
  pencil:'✏️', tools:'🧹', moon:'🌙', check:'✅',
  run:'🏃', art:'🎨', music:'🎵', errand:'🛍️'
}

function Toast({ msg }) {
  if (!msg) return null
  return (
    <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', background:'#2C2926', color:'white', padding:'12px 20px', borderRadius:24, fontSize:14, fontWeight:600, whiteSpace:'nowrap', zIndex:999, pointerEvents:'none', maxWidth:'90%' }}>
      {msg}
    </div>
  )
}

export default function MissionsPage() {
  const nav = useNavigate()
  const { missions, completeMission, addMission } = useAppStore()
  const [addOpen, setAddOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('am')
  const [needApproval, setNeedApproval] = useState(false)
  const [toast, setToast] = useState(null)

  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400) }

  const done = missions.filter(m => m.done).length
  const confirmM = missions.find(m => m.id === confirmId)
  const path = window.location.pathname

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

  const tabs = [
    { icon:'🏠', label:'홈',   to:'/child/home'      },
    { icon:'⭐', label:'미션', to:'/child/missions'   },
    { icon:'💰', label:'용돈', to:'/child/money'      },
    { icon:'📚', label:'독서', to:'/child/books'      },
    { icon:'👪', label:'부모', to:'/parent/dashboard' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#F7F3EE', paddingBottom:90, fontFamily:'sans-serif', color:'#2C2926' }}>

      {/* 헤더 */}
      <div style={{ background:'#F7F3EE', padding:'18px 20px 16px', borderBottom:'1px solid #E6DDD3', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.8px' }}>미션 센터</div>
            <div style={{ fontSize:13, color:'#7C746D', marginTop:2 }}>{done}/{missions.length} 완료</div>
          </div>
          <button onClick={() => setAddOpen(true)} style={{ width:40, height:40, borderRadius:'50%', border:'none', background:'#F7E6DD', cursor:'pointer', fontSize:22, color:'#D28A6A', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
        </div>
        {/* 전체 진행바 */}
        <div style={{ marginTop:12, height:6, background:'#E6DDD3', borderRadius:3, overflow:'hidden' }}>
          <div style={{ height:'100%', background:'#D28A6A', borderRadius:3, width:`${missions.length > 0 ? (done/missions.length*100) : 0}%`, transition:'width 0.5s' }} />
        </div>
        <div style={{ fontSize:12, color:'#7C746D', marginTop:6, textAlign:'right' }}>
          {done === missions.length && done > 0 ? '🎉 오늘 미션 모두 완료!' : `${missions.length - done}개 남음`}
        </div>
      </div>

      <div style={{ padding:'12px 20px 0' }}>
        {['am','pm','ev'].map(t => {
          const group = missions.filter(m => m.time === t)
          if (!group.length) return null
          const gDone = group.filter(m => m.done).length
          return (
            <div key={t} style={{ marginBottom:8 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 0 8px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:TIME_COLOR[t] }} />
                  <span style={{ fontSize:13, fontWeight:700, color:'#7C746D' }}>{TIME_LABEL[t]}</span>
                </div>
                <span style={{ fontSize:12, color:'#9CA3AF' }}>{gDone}/{group.length}</span>
              </div>
              {group.map(m => (
                <div key={m.id} onClick={() => !m.done && setConfirmId(m.id)}
                  style={{ background: m.done ? '#F9FCF9' : '#FFFDF9', borderRadius:16, border: m.done ? '1px solid #B8DBBF' : '1px solid #E6DDD3', display:'flex', alignItems:'center', gap:12, padding:'14px 16px', marginBottom:8, cursor: m.done ? 'default' : 'pointer' }}>
                  <div style={{ width:42, height:42, borderRadius:13, background: m.done ? '#EDF9F0' : TIME_BG[t], display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                    {ICON_MAP[m.icon] || '✅'}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, fontWeight: m.done ? 400 : 700, color: m.done ? '#9CA3AF' : '#2C2926', textDecoration: m.done ? 'line-through' : 'none', marginBottom:3 }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#C06000' }}>
                      +{m.pts}P · +{m.xp}XP{m.needApproval ? ' · 부모 확인' : ''}
                    </div>
                  </div>
                  {m.done
                    ? <div style={{ width:30, height:30, borderRadius:'50%', background:'#EDF9F0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, color:'#4A7C59' }}>✓</div>
                    : <div style={{ width:30, height:30, borderRadius:'50%', background:'#F3F0ED', display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', fontSize:16 }}>›</div>
                  }
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* 완료 확인 시트 */}
      {confirmId && (
        <div onClick={() => setConfirmId(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            {confirmM && (
              <div style={{ textAlign:'center', paddingBottom:8 }}>
                <div style={{ fontSize:56, marginBottom:14 }}>{ICON_MAP[confirmM.icon] || '✅'}</div>
                <div style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>{confirmM.title}</div>
                <div style={{ fontSize:16, fontWeight:700, color:'#C06000', marginBottom:6 }}>+{confirmM.pts}P · +{confirmM.xp}XP</div>
                {confirmM.needApproval && <div style={{ fontSize:13, color:'#9CA3AF', marginBottom:4 }}>부모님 확인 후 포인트가 지급돼요</div>}
                <div style={{ height:20 }} />
                <button onClick={handleComplete} style={{ width:'100%', padding:15, borderRadius:16, background:'#D28A6A', border:'none', color:'white', fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>완료!</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 미션 추가 시트 */}
      {addOpen && (
        <div onClick={() => setAddOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            <div style={{ fontSize:20, fontWeight:700, marginBottom:18 }}>미션 추가</div>
            <input placeholder="미션 이름" value={title} onChange={e => setTitle(e.target.value)}
              style={{ width:'100%', height:50, border:'1.5px solid #E6DDD3', borderRadius:12, padding:'0 16px', fontSize:16, outline:'none', fontFamily:'inherit', marginBottom:12, boxSizing:'border-box' }} />
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              {['am','pm','ev'].map(t => (
                <button key={t} onClick={() => setTime(t)} style={{ flex:1, padding:11, borderRadius:12, cursor:'pointer', fontFamily:'inherit', fontSize:14, fontWeight:600, border: time===t ? `2px solid ${TIME_COLOR[t]}` : '1px solid #E6DDD3', background: time===t ? TIME_BG[t] : 'white', color: time===t ? TIME_COLOR[t] : '#9CA3AF' }}>
                  {TIME_LABEL[t]}
                </button>
              ))}
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:10, fontSize:14, color:'#7C746D', marginBottom:20, cursor:'pointer' }}>
              <input type="checkbox" checked={needApproval} onChange={e => setNeedApproval(e.target.checked)} style={{ width:18, height:18 }} />
              부모님 확인 필요
            </label>
            <button onClick={handleAdd} style={{ width:'100%', padding:15, borderRadius:16, background:'#D28A6A', border:'none', color:'white', fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>추가하기</button>
          </div>
        </div>
      )}

      {/* 탭바 */}
      <nav style={{ position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:'1px solid #E6DDD3', display:'flex', justifyContent:'space-around', padding:'10px 0', zIndex:100 }}>
        {tabs.map(t => (
          <button key={t.to} onClick={() => nav(t.to)} style={{ textAlign:'center', fontSize:12, fontWeight:700, cursor:'pointer', background:'none', border:'none', color: path===t.to ? '#D28A6A' : '#888', fontFamily:'inherit' }}>
            <div style={{ fontSize:20 }}>{t.icon}</div>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <Toast msg={toast} />
    </div>
  )
}
