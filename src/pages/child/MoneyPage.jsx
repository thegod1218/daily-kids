import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'

function Toast({ msg }) {
  if (!msg) return null
  return <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', background:'#2C2926', color:'white', padding:'12px 20px', borderRadius:24, fontSize:14, fontWeight:600, whiteSpace:'nowrap', zIndex:999, pointerEvents:'none', maxWidth:'90%' }}>{msg}</div>
}

export default function MoneyPage() {
  const nav = useNavigate()
  const { moneyLogs, piggies, addMoneyLog, addPiggy } = useAppStore()
  const [moneySheet, setMoneySheet] = useState(false)
  const [piggySheet, setPiggySheet] = useState(false)
  const [mType, setMType] = useState('income')
  const [mTitle, setMTitle] = useState('')
  const [mAmount, setMAmount] = useState('')
  const [mPiggyId, setMPiggyId] = useState('')
  const [pgName, setPgName] = useState('')
  const [pgTarget, setPgTarget] = useState('')
  const [selPiggy, setSelPiggy] = useState(0)
  const [toast, setToast] = useState(null)

  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400) }

  const income  = moneyLogs.filter(r => r.type==='income').reduce((s,r) => s+r.amount, 0)
  const expense = moneyLogs.filter(r => r.type==='expense').reduce((s,r) => s+r.amount, 0)
  const balance = income - expense
  const mainPiggy = piggies[selPiggy]
  const rem = mainPiggy ? mainPiggy.target - mainPiggy.current : 0
  const path = window.location.pathname

  const handleAddMoney = () => {
    if (!mTitle.trim()) { show('내역 이름을 입력해주세요'); return }
    const amt = parseInt(mAmount)
    if (!amt || amt <= 0) { show('올바른 금액을 입력해주세요'); return }
    addMoneyLog({ type:mType, title:mTitle.trim(), amount:amt, piggyId:mPiggyId||null })
    setMTitle(''); setMAmount(''); setMPiggyId(''); setMoneySheet(false)
    show((mType==='income' ? '+' : '-') + amt.toLocaleString('ko-KR') + '원 기록!')
  }

  const handleAddPiggy = () => {
    if (!pgName.trim()) { show('저금통 이름을 입력해주세요'); return }
    const tgt = parseInt(pgTarget)
    if (!tgt || tgt<=0) { show('목표 금액을 입력해주세요'); return }
    addPiggy({ name:pgName.trim(), target:tgt })
    setPgName(''); setPgTarget(''); setPiggySheet(false)
    show(pgName + ' 저금통 추가!')
  }

  const tabs = [
    { icon:'🏠', label:'홈',   to:'/child/home'      },
    { icon:'⭐', label:'미션', to:'/child/missions'   },
    { icon:'💰', label:'용돈', to:'/child/money'      },
    { icon:'📚', label:'독서', to:'/child/books'      },
    { icon:'👪', label:'부모', to:'/parent/dashboard' },
  ]

  const inputStyle = { width:'100%', height:50, border:'1.5px solid #E6DDD3', borderRadius:12, padding:'0 16px', fontSize:16, outline:'none', fontFamily:'inherit', marginBottom:12, boxSizing:'border-box', background:'white' }

  return (
    <div style={{ minHeight:'100vh', background:'#F7F3EE', paddingBottom:90, fontFamily:'sans-serif', color:'#2C2926' }}>

      {/* 헤더 */}
      <div style={{ background:'#F7F3EE', padding:'18px 20px 16px', borderBottom:'1px solid #E6DDD3', position:'sticky', top:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.8px' }}>용돈 기입장</div>
        <button onClick={() => setMoneySheet(true)} style={{ width:40, height:40, borderRadius:'50%', border:'none', background:'#F7E6DD', cursor:'pointer', fontSize:22, color:'#D28A6A', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
      </div>

      <div style={{ padding:'16px 20px 0' }}>

        {/* 수입/지출 */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
          <div style={{ background:'#EDF9F0', borderRadius:20, padding:'16px 15px', border:'1px solid #B8DBBF' }}>
            <div style={{ fontSize:12, color:'#4A7C59', fontWeight:700, marginBottom:6 }}>수입</div>
            <div style={{ fontSize:20, fontWeight:800, color:'#2C2926' }}>+{income.toLocaleString('ko-KR')}원</div>
          </div>
          <div style={{ background:'#FFF0F4', borderRadius:20, padding:'16px 15px', border:'1px solid #F4C0C9' }}>
            <div style={{ fontSize:12, color:'#C0395A', fontWeight:700, marginBottom:6 }}>지출</div>
            <div style={{ fontSize:20, fontWeight:800, color:'#2C2926' }}>-{expense.toLocaleString('ko-KR')}원</div>
          </div>
        </div>

        {/* 잔액 */}
        <div style={{ background:'#FFFDF9', borderRadius:18, border:'1px solid #E6DDD3', padding:'14px 16px', marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:14, color:'#7C746D' }}>잔액</span>
          <span style={{ fontSize:22, fontWeight:800 }}>{balance.toLocaleString('ko-KR')}원</span>
        </div>

        {/* 저금통 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div style={{ fontSize:17, fontWeight:700 }}>🐷 저금통</div>
          <button onClick={() => setPiggySheet(true)} style={{ fontSize:13, color:'#D28A6A', fontWeight:700, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>+ 추가</button>
        </div>

        {piggies.length > 0 ? (
          <>
            {piggies.map((p, i) => {
              const pct = Math.round(p.current / p.target * 100)
              const sel = i === selPiggy
              return (
                <div key={p.id} onClick={() => setSelPiggy(i)}
                  style={{ background:'#FFFDF9', borderRadius:18, border: sel ? '2px solid #D28A6A' : '1px solid #E6DDD3', padding:14, marginBottom:8, cursor:'pointer' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:18 }}>🐷</span>
                      <span style={{ fontSize:15, fontWeight:700 }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, padding:'3px 9px', borderRadius:20, background: sel ? '#F7E6DD' : '#EDF9F0', color: sel ? '#D28A6A' : '#4A7C59' }}>{pct}%</span>
                  </div>
                  <div style={{ height:6, background:'#F1EFE8', borderRadius:3, overflow:'hidden', marginBottom:6 }}>
                    <div style={{ height:'100%', background: sel ? '#D28A6A' : '#4A7C59', borderRadius:3, width:`${pct}%`, transition:'width 0.5s' }} />
                  </div>
                  <div style={{ fontSize:12, color:'#7C746D' }}>{p.current.toLocaleString('ko-KR')}원 / {p.target.toLocaleString('ko-KR')}원 · {(p.target-p.current).toLocaleString('ko-KR')}원 남음</div>
                </div>
              )
            })}

            {/* 달성 가이드 */}
            {mainPiggy && rem > 0 && (
              <div style={{ background:'#FFF8EE', borderRadius:18, padding:14, marginBottom:12, border:'1px solid #E8C99A' }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#C06000', marginBottom:10 }}>{mainPiggy.name} 달성 방법</div>
                {[['심부름', Math.ceil(rem/2000)+'번'], ['주간 용돈', Math.ceil(rem/5000)+'주'], ['미션 보너스', Math.ceil(rem/15)+'일']].map(([label, val]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'0.5px solid #E8C99A' }}>
                    <span style={{ fontSize:13, color:'#7C746D' }}>{label}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:'#2C2926' }}>{val} 하면 달성</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'24px 20px', background:'#FFFDF9', borderRadius:16, border:'1px solid #E6DDD3', color:'#9CA3AF', fontSize:14, marginBottom:12 }}>
            <div style={{ fontSize:36, marginBottom:8 }}>🐷</div>
            저금통을 추가해봐요
          </div>
        )}

        {/* 최근 내역 */}
        <div style={{ fontSize:17, fontWeight:700, marginBottom:10 }}>최근 내역</div>
        <div style={{ background:'#FFFDF9', borderRadius:18, border:'1px solid #E6DDD3', padding:'4px 16px', marginBottom:8 }}>
          {moneyLogs.length > 0 ? moneyLogs.slice(0, 20).map(r => (
            <div key={r.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 0', borderBottom:'1px solid #F1EFE8' }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background: r.type==='income' ? '#EDF9F0' : '#FFF0F4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                {r.type==='income' ? '↑' : '↓'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{r.title}</div>
                <div style={{ fontSize:11, color:'#9CA3AF' }}>{r.date}</div>
              </div>
              <span style={{ fontSize:14, fontWeight:700, color: r.type==='income' ? '#4A7C59' : '#C0395A' }}>
                {r.type==='income' ? '+' : '-'}{r.amount.toLocaleString('ko-KR')}원
              </span>
            </div>
          )) : (
            <div style={{ textAlign:'center', padding:20, fontSize:13, color:'#9CA3AF' }}>내역을 추가해봐요!</div>
          )}
        </div>
      </div>

      {/* 내역 추가 시트 */}
      {moneySheet && (
        <div onClick={() => setMoneySheet(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            <div style={{ fontSize:20, fontWeight:700, marginBottom:18 }}>내역 추가</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              {[['income','+ 수입'],['expense','- 지출']].map(([t, label]) => (
                <button key={t} onClick={() => setMType(t)} style={{ flex:1, padding:12, borderRadius:12, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', background: mType===t ? (t==='income' ? '#EDF9F0' : '#FFF0F4') : '#F7F3EE', color: mType===t ? (t==='income' ? '#4A7C59' : '#C0395A') : '#9CA3AF', border: mType===t ? `1.5px solid ${t==='income' ? '#4A7C59' : '#C0395A'}` : '1px solid #E6DDD3' }}>
                  {label}
                </button>
              ))}
            </div>
            <input placeholder="내역 이름" value={mTitle} onChange={e => setMTitle(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="금액 (원)" inputMode="numeric" value={mAmount} onChange={e => setMAmount(e.target.value)} style={inputStyle} />
            {piggies.length > 0 && (
              <select value={mPiggyId} onChange={e => setMPiggyId(e.target.value)} style={{ ...inputStyle, height:50, padding:'0 16px' }}>
                <option value="">저금통 연결 (선택)</option>
                {piggies.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
            <button onClick={handleAddMoney} style={{ width:'100%', padding:15, borderRadius:16, background:'#D28A6A', border:'none', color:'white', fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>추가하기</button>
          </div>
        </div>
      )}

      {/* 저금통 추가 시트 */}
      {piggySheet && (
        <div onClick={() => setPiggySheet(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            <div style={{ fontSize:20, fontWeight:700, marginBottom:18 }}>저금통 만들기</div>
            <div style={{ fontSize:12, color:'#7C746D', marginBottom:10 }}>빠른 선택</div>
            {[['🎮 게임기',50000],['👟 운동화',80000],['🎨 그림 도구',25000]].map(([name, target]) => (
              <div key={name} onClick={() => { addPiggy({ name:name.replace(/^.+ /,''), target }); setPiggySheet(false); show(name+' 저금통 추가!') }}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#F7F3EE', borderRadius:14, cursor:'pointer', marginBottom:8 }}>
                <span style={{ fontSize:22 }}>{name.split(' ')[0]}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{name.replace(/^.+ /,'')}</div>
                  <div style={{ fontSize:12, color:'#7C746D' }}>목표 {target.toLocaleString('ko-KR')}원</div>
                </div>
                <span style={{ color:'#9CA3AF' }}>›</span>
              </div>
            ))}
            <div style={{ height:1, background:'#E6DDD3', margin:'14px 0' }} />
            <input placeholder="저금통 이름" value={pgName} onChange={e => setPgName(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="목표 금액 (원)" inputMode="numeric" value={pgTarget} onChange={e => setPgTarget(e.target.value)} style={{ ...inputStyle, marginBottom:20 }} />
            <button onClick={handleAddPiggy} style={{ width:'100%', padding:15, borderRadius:16, background:'#D28A6A', border:'none', color:'white', fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>만들기</button>
          </div>
        </div>
      )}

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
