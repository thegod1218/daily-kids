import React from 'react'

export function Sheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '26px 26px 0 0', padding: '0 20px 36px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E7EB', margin: '14px auto 20px' }} />
        {title && <div style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 18 }}>{title}</div>}
        {children}
      </div>
    </div>
  )
}

export function ProgBar({ value, color = '#D28A6A', style }) {
  return (
    <div style={{ height: 6, background: '#F1EFE8', borderRadius: 3, overflow: 'hidden', ...style }}>
      <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, value))}%`, background: color, borderRadius: 3, transition: 'width 0.5s' }} />
    </div>
  )
}

export function Empty({ emoji, message, msg }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 20px', color: '#9CA3AF', fontSize: 14 }}>
      {emoji && <div style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</div>}
      {message || msg}
    </div>
  )
}

export function LevelUp({ level, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#D28A6A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 500, textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 14 }}>🏆</div>
      <div style={{ fontSize: 34, fontWeight: 800, color: 'white', marginBottom: 8 }}>레벨업!</div>
      <div style={{ fontSize: 20, color: 'rgba(255,255,255,.85)', marginBottom: 36 }}>Lv.{level} 달성</div>
      <button onClick={onClose} style={{ padding: '15px 48px', borderRadius: 20, background: 'white', border: 'none', color: '#D28A6A', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>신난다!</button>
    </div>
  )
}

export function Toggle({ checked, onChange, color = '#D28A6A' }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ width: 46, height: 28, borderRadius: 14, background: checked ? color : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 22, height: 22, background: 'white', borderRadius: '50%', position: 'absolute', top: 3, left: checked ? 21 : 3, transition: 'left 0.2s' }} />
    </div>
  )
}
