import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../store'

const CHILD_TABS = [
  { path: '/child/home',     label: '홈',   Icon: HomeIcon    },
  { path: '/child/missions', label: '미션', Icon: MissionIcon },
  { path: '/child/money',    label: '용돈', Icon: MoneyIcon   },
  { path: '/child/books',    label: '독서', Icon: BookIcon    },
]
const PARENT_TABS = [
  { path: '/parent/dashboard', label: '리포트',   Icon: ChartIcon   },
  { path: '/parent/community', label: '커뮤니티', Icon: MsgIcon     },
  { path: '/parent/gps',       label: 'GPS',      Icon: MapIcon     },
  { path: '/parent/settings',  label: '설정',     Icon: SetIcon     },
]

export default function TabBar() {
  const nav = useNavigate()
  const loc = useLocation()
  const { appMode, setMode } = useAppStore()
  const isParent = appMode === 'parent'
  const tabs = isParent ? PARENT_TABS : CHILD_TABS

  const switchMode = () => {
    if (isParent) { setMode('child'); nav('/child/home') }
    else nav('/pin-enter')
  }

  return (
    <>
      <div className="mode-bar" onClick={switchMode}>
        <TransferIcon />
        <span>{isParent ? '아이 화면으로' : '부모 화면으로'}</span>
      </div>
      <div className="tab-bar">
        {tabs.map(({ path, label, Icon }) => {
          const active = loc.pathname === path
          const cls = active ? (isParent ? 'on-p' : 'on') : ''
          return (
            <button key={path} className={`tab-item ${cls}`} onClick={() => nav(path)}>
              <Icon />
              <span className="tab-lbl">{label}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

const s = { fill:'none', strokeWidth:'1.8', strokeLinecap:'round', strokeLinejoin:'round' }
function HomeIcon()    { return <svg viewBox="0 0 24 24" {...s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function MissionIcon() { return <svg viewBox="0 0 24 24" {...s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function MoneyIcon()   { return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> }
function BookIcon()    { return <svg viewBox="0 0 24 24" {...s}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> }
function ChartIcon()   { return <svg viewBox="0 0 24 24" {...s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
function MsgIcon()     { return <svg viewBox="0 0 24 24" {...s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> }
function MapIcon()     { return <svg viewBox="0 0 24 24" {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function SetIcon()     { return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> }
function TransferIcon(){ return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg> }
