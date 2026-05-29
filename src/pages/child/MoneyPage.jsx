import React, { useState } from 'react'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet, ProgBar, Empty } from '../../components/Common'

export default function MoneyPage() {
  const { moneyLogs, piggies, addMoneyLog, addPiggy } = useAppStore()
  const { show, ToastEl } = useToast()

  const [moneySheet, setMoneySheet] = useState(false)
  const [piggySheet, setPiggySheet] = useState(false)
  const [mType, setMType] = useState('income')
  const [mTitle, setMTitle] = useState('')
  const [mAmount, setMAmount] = useState('')
  const [mPiggyId, setMPiggyId] = useState('')
  const [pgName, setPgName] = useState('')
  const [pgTarget, setPgTarget] = useState('')
  const [selectedPiggy, setSelectedPiggy] = useState(0)

  const income  = moneyLogs.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0)
  const expense = moneyLogs.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0)
  const balance = income - expense

  const handleAddMoney = () => {
    if (!mTitle.trim()) { show('내역 이름을 입력해주세요'); return }
    const amt = parseInt(mAmount)
    if (!amt || amt <= 0) { show('올바른 금액을 입력해주세요'); return }
    addMoneyLog({ type: mType, title: mTitle.trim(), amount: amt, piggyId: mPiggyId || null })
    setMTitle(''); setMAmount(''); setMPiggyId(''); setMoneySheet(false)
    show((mType === 'income' ? '+' : '-') + amt.toLocaleString('ko-KR') + '원 기록!')
  }

  const handleAddPiggy = () => {
    if (!pgName.trim()) { show('저금통 이름을 입력해주세요'); return }
    const tgt = parseInt(pgTarget)
    if (!tgt || tgt <= 0) { show('목표 금액을 입력해주세요'); return }
    addPiggy({ name: pgName.trim(), target: tgt })
    setPgName(''); setPgTarget(''); setPiggySheet(false)
    show(pgName + ' 저금통 추가!')
  }

  const addPreset = (name, target) => {
    addPiggy({ name, target })
    setPiggySheet(false)
    show(name + ' 저금통 추가!')
  }

  const mainPiggy = piggies[selectedPiggy]
  const rem = mainPiggy ? mainPiggy.target - mainPiggy.current : 0

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A' }}>용돈 기입장</div>
        <button onClick={() => setMoneySheet(true)} style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid #EDE9FE', background: '#EEEDFE', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="내역 추가">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        {/* 수입/지출 카드 */}
        <div className="g2" style={{ marginBottom: 10 }}>
          <div style={{ background: '#EAF3DE', borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 11, color: '#27500A', marginBottom: 4 }}>수입</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#085041' }}>+{income.toLocaleString('ko-KR')}원</div>
          </div>
          <div style={{ background: '#FBEAF0', borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 11, color: '#72243E', marginBottom: 4 }}>지출</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#4B1528' }}>-{expense.toLocaleString('ko-KR')}원</div>
          </div>
        </div>

        <div className="card spb" style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: '#888780' }}>잔액</span>
          <span style={{ fontSize: 20, fontWeight: 500, color: '#2C2C2A' }}>{balance.toLocaleString('ko-KR')}원</span>
        </div>

        {/* 저금통 */}
        <div className="spb" style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>🐷 저금통</div>
          <button onClick={() => setPiggySheet(true)} style={{ fontSize: 13, color: '#7F77DD', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>+ 추가</button>
        </div>

        {piggies.length > 0 ? (
          <>
            {piggies.map((p, i) => {
              const pct = Math.round(p.current / p.target * 100)
              const isSelected = i === selectedPiggy
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPiggy(i)}
                  style={{ background: 'white', borderRadius: 18, border: isSelected ? '1.5px solid #7F77DD' : '0.5px solid #EDE9FE', padding: 14, marginBottom: 8, cursor: 'pointer' }}
                >
                  <div className="spb" style={{ marginBottom: 8 }}>
                    <div className="row"><span style={{ fontSize: 18 }}>🐷</span><span style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{p.name}</span></div>
                    <span className={`chip ${isSelected ? 'chip-p' : 'chip-g'}`}>{pct}%</span>
                  </div>
                  <ProgBar value={pct} color={isSelected ? '#7F77DD' : '#1D9E75'} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 12, color: '#888780' }}>{p.current.toLocaleString('ko-KR')}원 / {p.target.toLocaleString('ko-KR')}원 · {(p.target - p.current).toLocaleString('ko-KR')}원 남음</div>
                </div>
              )
            })}

            {/* 달성 가이드 */}
            {mainPiggy && rem > 0 && (
              <div className="fill-a" style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#412402', marginBottom: 10 }}>{mainPiggy.name} 달성 방법</div>
                {[['심부름', Math.ceil(rem / 2000) + '번'], ['주간 용돈', Math.ceil(rem / 5000) + '주'], ['미션 보너스', Math.ceil(rem / 15) + '일']].map(([label, val]) => (
                  <div key={label} className="spb" style={{ padding: '7px 0', borderBottom: '0.5px solid #FAC775' }}>
                    <span style={{ fontSize: 13, color: '#633806' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#412402' }}>{val} 하면 달성</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <Empty emoji="🐷" message="저금통을 추가해봐요" />
        )}

        {/* 최근 내역 */}
        <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 8 }}>최근 내역</div>
        <div className="card">
          {moneyLogs.length > 0 ? moneyLogs.slice(0, 20).map(r => (
            <div key={r.id} className="row" style={{ padding: '10px 0', borderBottom: '0.5px solid #F1EFE8' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: r.type === 'income' ? '#EAF3DE' : '#FBEAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {r.type === 'income' ? '↑' : '↓'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{r.title}</div>
                <div style={{ fontSize: 11, color: '#888780' }}>{r.date}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: r.type === 'income' ? '#085041' : '#4B1528' }}>
                {r.type === 'income' ? '+' : '-'}{r.amount.toLocaleString('ko-KR')}원
              </span>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: 16, fontSize: 13, color: '#888780' }}>내역을 추가해봐요!</div>
          )}
        </div>
        <div style={{ height: 8 }} />
      </div>

      {/* 내역 추가 시트 */}
      <Sheet open={moneySheet} onClose={() => setMoneySheet(false)} title="내역 추가">
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[['income', '+ 수입'], ['expense', '- 지출']].map(([t, label]) => (
            <button key={t} onClick={() => setMType(t)} style={{ flex: 1, padding: 11, borderRadius: 14, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: mType === t ? (t === 'income' ? '#EAF3DE' : '#FBEAF0') : '#F1EFE8', color: mType === t ? (t === 'income' ? '#27500A' : '#72243E') : '#888780', border: mType === t ? `0.5px solid ${t === 'income' ? '#1D9E75' : '#D4537E'}` : '0.5px solid #D3D1C7' }}>
              {label}
            </button>
          ))}
        </div>
        <input className="input" placeholder="내역 이름" value={mTitle} onChange={e => setMTitle(e.target.value)} style={{ marginBottom: 10 }} />
        <input className="input" type="number" placeholder="금액 (원)" inputMode="numeric" value={mAmount} onChange={e => setMAmount(e.target.value)} style={{ marginBottom: 10 }} />
        {piggies.length > 0 && (
          <select value={mPiggyId} onChange={e => setMPiggyId(e.target.value)} style={{ width: '100%', height: 44, border: '0.5px solid #D3D1C7', borderRadius: 10, padding: '0 14px', fontSize: 14, background: 'white', color: '#2C2C2A', marginBottom: 10, outline: 'none', fontFamily: 'inherit' }}>
            <option value="">저금통 연결 (선택)</option>
            {piggies.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
        <button className="btn btn-primary" onClick={handleAddMoney} style={{ marginTop: 8 }}>추가하기</button>
      </Sheet>

      {/* 저금통 추가 시트 */}
      <Sheet open={piggySheet} onClose={() => setPiggySheet(false)} title="저금통 만들기">
        <div style={{ fontSize: 12, color: '#888780', marginBottom: 10 }}>빠른 선택</div>
        {[['게임기', 50000], ['운동화', 80000], ['그림 도구', 25000]].map(([name, target]) => (
          <div key={name} onClick={() => addPreset(name, target)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F5F4FF', borderRadius: 14, cursor: 'pointer', marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A' }}>{name}</div><div style={{ fontSize: 12, color: '#888780' }}>목표 {target.toLocaleString('ko-KR')}원</div></div>
            <span style={{ color: '#B4B2A9' }}>›</span>
          </div>
        ))}
        <div style={{ height: 0.5, background: '#EDE9FE', margin: '14px 0' }} />
        <input className="input" placeholder="저금통 이름" value={pgName} onChange={e => setPgName(e.target.value)} style={{ marginBottom: 10 }} />
        <input className="input" type="number" placeholder="목표 금액 (원)" inputMode="numeric" value={pgTarget} onChange={e => setPgTarget(e.target.value)} style={{ marginBottom: 18 }} />
        <button className="btn btn-primary" onClick={handleAddPiggy}>만들기</button>
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}
