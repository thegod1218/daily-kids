import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TabBar() {
  const nav = useNavigate()
  const path = window.location.pathname

  const tabs = [
    { icon: '🏠', label: '홈',   to: '/child/home'      },
    { icon: '⭐', label: '미션', to: '/child/missions'   },
    { icon: '💰', label: '용돈', to: '/child/money'      },
    { icon: '📚', label: '독서', to: '/child/books'      },
    { icon: '👪', label: '부모', to: '/parent/dashboard' },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid #E6DDD3',
      display: 'flex', justifyContent: 'space-around',
      padding: '10px 0', zIndex: 100
    }}>
      {tabs.map(t => (
        <button key={t.to} onClick={() => nav(t.to)} style={{
          textAlign: 'center', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', background: 'none', border: 'none',
          color: path === t.to ? '#D28A6A' : '#888', fontFamily: 'inherit'
        }}>
          <div style={{ fontSize: 20 }}>{t.icon}</div>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
