import React from 'react'

// 바텀 시트
export function Sheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        {title && <div className="sheet-title">{title}</div>}
        {children}
      </div>
    </div>
  )
}

// 레벨업 오버레이
export function LevelUpOverlay({ level, onClose }) {
  return (
    <div className="levelup-overlay">
      <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FAC775" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: 'white', marginBottom: 8 }}>레벨업!</div>
      <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 6 }}>Lv.{level} 달성</div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 34, lineHeight: 1.7, textAlign: 'center' }}>계속 미션을 완료해서<br />캐릭터를 키워봐요!</div>
      <button onClick={onClose} style={{ padding: '14px 44px', borderRadius: 18, background: 'white', border: 'none', color: '#534AB7', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
        신난다!
      </button>
    </div>
  )
}

// 프로그레스 바
export function ProgressBar({ value, color = '#7F77DD', style }) {
  return (
    <div className="pb" style={style}>
      <div className="pf" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  )
}

// 칩/배지
export function Chip({ children, variant = 'p' }) {
  return <span className={`chip chip-${variant}`}>{children}</span>
}

// 아이콘 아바타
export function Avatar({ emoji = '🐣', level }) {
  return (
    <div className="avatar">
      <span style={{ fontSize: 22 }}>{emoji}</span>
      {level && <div className="avatar-lv">Lv.{level}</div>}
    </div>
  )
}

// 토글 스위치
export function Toggle({ checked, onChange, color = '#7F77DD' }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 26, borderRadius: 13,
        background: checked ? color : '#D3D1C7',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
      }}
    >
      <div style={{
        width: 22, height: 22, background: 'white', borderRadius: '50%',
        position: 'absolute', top: 2,
        left: checked ? 20 : 2,
        transition: 'left 0.2s'
      }} />
    </div>
  )
}

// 섹션 레이블
export function SectionLabel({ children, style }) {
  return (
    <div className="sec-label" style={{ padding: '0 16px', marginBottom: 8, ...style }}>
      {children}
    </div>
  )
}

// 빈 상태
export function EmptyState({ icon, message }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px', background: 'white', borderRadius: 20, border: '0.5px solid #EDE9FE', margin: '0 16px', color: '#888780', fontSize: 13 }}>
      {icon && <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>}
      {message}
    </div>
  )
}
