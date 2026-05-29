import React from 'react'

export function Sheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sh-handle" />
        {title && <div className="sh-title">{title}</div>}
        {children}
      </div>
    </div>
  )
}

export function LevelUp({ level, onClose }) {
  return (
    <div className="levelup">
      <div style={{ fontSize:64, marginBottom:14 }}>🏆</div>
      <div style={{ fontSize:34, fontWeight:800, color:'white', marginBottom:8, letterSpacing:'-.5px' }}>레벨업!</div>
      <div style={{ fontSize:20, color:'rgba(255,255,255,.85)', marginBottom:6 }}>Lv.{level} 달성</div>
      <div style={{ fontSize:15, color:'rgba(255,255,255,.6)', marginBottom:36, lineHeight:1.7, textAlign:'center' }}>계속 미션을 완료해서<br />캐릭터를 키워봐요!</div>
      <button onClick={onClose} style={{ padding:'15px 48px', borderRadius:20, background:'white', border:'none', color:'var(--indigo)', fontSize:17, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>신난다!</button>
    </div>
  )
}

export function ProgBar({ value, color = 'var(--indigo)', style }) {
  return (
    <div className="prog" style={style}>
      <div className="prog-f" style={{ width:`${Math.min(100,Math.max(0,value))}%`, background:color }} />
    </div>
  )
}

export function Toggle({ checked, onChange, color = 'var(--indigo)' }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ width:46, height:28, borderRadius:14, background: checked ? color : 'var(--bg2)', position:'relative', cursor:'pointer', transition:'background .2s', flexShrink:0 }}>
      <div style={{ width:22, height:22, background:'white', borderRadius:'50%', position:'absolute', top:3, left: checked ? 21 : 3, transition:'left .2s' }} />
    </div>
  )
}

export function Empty({ emoji, msg }) {
  return (
    <div style={{ textAlign:'center', padding:'36px 20px', color:'var(--ink3)', fontSize:14 }}>
      {emoji && <div style={{ fontSize:40, marginBottom:10 }}>{emoji}</div>}
      {msg}
    </div>
  )
}
