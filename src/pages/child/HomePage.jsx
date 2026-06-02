import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7F3', padding: '20px 18px 100px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>우리아이 홈</h1>
      <p style={{ color: '#777', marginBottom: 20 }}>오늘도 미션을 완료해봐요!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#7B61FF', fontWeight: 700 }}>미션</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>0/8</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#7B61FF', fontWeight: 700 }}>포인트</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>0P</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 18, marginBottom: 16, border: '1px solid #eee' }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>😊 오늘 기분은?</h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {['😊','🙂','😐','😢','😠'].map(e => (
            <button key={e} style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid #eee', background: '#F8F7F3', fontSize: 24, cursor: 'pointer' }}>{e}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 18, marginBottom: 16, border: '1px solid #eee' }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📅 출석 체크</h2>
        <button style={{ width: '100%', padding: 14, borderRadius: 14, background: '#4A7C59', border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          오늘 출석 체크 +5P
        </button>
      </div>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
        {[['🏠','홈','/child/home'],['⭐','미션','/child/missions'],['💰','용돈','/child/money'],['📚','독서','/child/books'],['👨‍👩‍👧','부모','/parent/dashboard']].map(([icon, label, path]) => (
          <button key={path} onClick={() => navigate(path)} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', color: window.location.pathname === path ? '#111' : '#888' }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
