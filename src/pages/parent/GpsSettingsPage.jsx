import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet, Toggle, EmptyState } from '../../components/Common'

export function GpsPage() {
  const { places, gpsLogs, addPlace } = useAppStore()
  const { show, ToastEl } = useToast()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [plName, setPlName] = useState('')
  const [plAddr, setPlAddr] = useState('')
  const [plType, setPlType] = useState('both')

  const handleAdd = () => {
    if (!plName.trim()) { show('장소 이름을 입력해주세요'); return }
    addPlace({ name: plName.trim(), address: plAddr.trim() || '주소 미입력', alertType: plType })
    setPlName(''); setPlAddr(''); setPlType('both'); setSheetOpen(false)
    show(plName + ' 등록 완료!')
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A' }}>안심 위치 알림</div>
          <div style={{ fontSize: 12, color: '#888780', marginTop: 2 }}>학원·학교 도착·출발 알림</div>
        </div>
        <button onClick={() => setSheetOpen(true)} style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid #B5D4F4', background: '#E6F1FB', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="장소 추가">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        <div className="fill-b" style={{ marginBottom: 10 }}>
          <div className="row" style={{ marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#B5D4F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>📍</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#0C447C' }}>아이가 도착·출발하면 알려드려요</div>
              <div style={{ fontSize: 12, color: '#185FA5', marginTop: 2 }}>반경 200m 자동 감지 · 위치정보 즉시 삭제</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="chip chip-b">반경 200m 감지</span>
            <span className="chip chip-b">배터리 절약</span>
            <span className="chip chip-g">개인정보 즉시 삭제</span>
          </div>
        </div>

        <div className="spb" style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>등록된 장소 <span className="chip chip-gray">{places.length}곳</span></span>
        </div>

        {places.length > 0 ? places.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 18, border: '0.5px solid #EDE9FE', padding: 14, marginBottom: 8 }}>
            <div className="spb">
              <div className="row">
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📍</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#888780' }}>{p.address}</div>
                </div>
              </div>
              <span className="chip chip-b">{p.alertType === 'both' ? '도착+출발' : '도착만'}</span>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '20px 16px', background: 'white', borderRadius: 20, border: '0.5px solid #EDE9FE', color: '#888780', fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            학원, 도서관 등을 등록하면<br />아이 동선을 실시간으로 확인할 수 있어요
          </div>
        )}

        <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 8 }}>최근 알림</div>
        <div className="card">
          {gpsLogs.length > 0 ? gpsLogs.slice(0, 5).map(l => (
            <div key={l.id} className="row" style={{ padding: '10px 0', borderBottom: '0.5px solid #F1EFE8' }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: l.type === 'arrive' ? '#EAF3DE' : '#FBEAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                {l.type === 'arrive' ? '↓' : '↑'}
              </div>
              <span style={{ fontSize: 13, color: '#444441' }}>{l.text} · {l.time}</span>
            </div>
          )) : <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 13, color: '#888780' }}>알림 기록이 없어요</div>}
        </div>
        <div style={{ height: 8 }} />
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="장소 등록">
        <div style={{ fontSize: 13, color: '#888780', lineHeight: 1.6, marginBottom: 14 }}>등록하면 아이가 도착하거나 출발할 때 바로 알림을 받을 수 있어요.</div>
        <input className="input" placeholder="장소 이름 (예: 수학학원)" value={plName} onChange={e => setPlName(e.target.value)} style={{ marginBottom: 10 }} />
        <input className="input" placeholder="주소" value={plAddr} onChange={e => setPlAddr(e.target.value)} style={{ marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[['both', '도착 + 출발 알림'], ['arrive', '도착만']].map(([t, label]) => (
            <button key={t} onClick={() => setPlType(t)} style={{ flex: 1, padding: 11, borderRadius: 14, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: plType === t ? '#EAF3DE' : '#F1EFE8', color: plType === t ? '#27500A' : '#888780', border: plType === t ? '0.5px solid #1D9E75' : '0.5px solid #D3D1C7' }}>
              {label}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>등록하기</button>
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}

export function SettingsPage() {
  const navigate = useNavigate()
  const { childName, childAge, level, points, streak, pin, setProfile } = useAppStore()
  const { show, ToastEl } = useToast()
  const [nameInput, setNameInput] = useState('')
  const [notifs, setNotifs] = useState({ mission: true, mood: true, gps: true, shopping: true })

  const saveName = () => {
    if (!nameInput.trim()) { show('이름을 입력해주세요'); return }
    setProfile({ childName: nameInput.trim() })
    setNameInput('')
    show('이름이 변경됐어요!')
  }

  const handleLogout = () => {
    navigate('/login')
    show('로그아웃 됐어요')
  }

  return (
    <div className="page">
      <div className="page-header">
        <span style={{ fontSize: 18, fontWeight: 500, color: '#2C2C2A' }}>설정</span>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 12 }}>아이 계정</div>
          <div className="row">
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🐣</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{childName} · {childAge}세 · Lv.{level}</div>
              <div style={{ fontSize: 12, color: '#888780' }}>{points}P · {streak}일 연속</div>
            </div>
          </div>
          <div style={{ height: 0.5, background: '#EDE9FE', margin: '14px 0' }} />
          <input className="input" placeholder="아이 이름 변경" value={nameInput} onChange={e => setNameInput(e.target.value)} style={{ marginBottom: 10 }} />
          <button className="btn btn-outline" onClick={saveName}>저장</button>
        </div>

        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 14 }}>알림 설정</div>
          {[['mission', '미션 완료 알림', '#7F77DD'], ['mood', '감정 리포트 알림', '#7F77DD'], ['gps', '안심 위치 알림', '#1D9E75'], ['shopping', '목표 달성 쇼핑 알림', '#BA7517']].map(([key, label, color]) => (
            <div key={key} className="spb" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#444441' }}>{label}</span>
              <Toggle checked={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} color={color} />
            </div>
          ))}
        </div>

        <div style={{ background: '#EEEDFE', borderRadius: 20, padding: 16, marginBottom: 10, border: '0.5px solid #AFA9EC' }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#3C3489' }}>👑 프리미엄 이용 중</div>
          <div style={{ fontSize: 12, color: '#534AB7', marginTop: 3 }}>월 9,900원 · 다음 결제 6월 1일</div>
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>로그아웃</button>
        <div style={{ height: 8 }} />
      </div>

      <TabBar />
      {ToastEl}
    </div>
  )
}
