import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { Sheet } from '../../components/Common'
import dayjs from 'dayjs'

const MOOD_EMOJI = { happy:'😊', good:'🙂', neutral:'😐', sad:'😢', angry:'😠' }
const MOOD_LABEL = { happy:'행복', good:'좋음', neutral:'보통', sad:'슬픔', angry:'화남' }

export default function DashboardPage() {
  const navigate = useNavigate()
  const [shopSheet, setShopSheet] = useState(false)
  const [reviewSheet, setReviewSheet] = useState(null)
  const [reviewComment, setReviewComment] = useState('')

  const {
    childName, points, level, streak,
    missions, piggies, moodLogs,
    pendingMissions, books,
    gpsLogs, approveMission, approveReview, rejectReview,
    moneyLogs
  } = useAppStore()

  const done = missions.filter(m => m.done).length
  const mainPiggy = piggies[0]
  const piggyPct = mainPiggy ? Math.round(mainPiggy.current / mainPiggy.target * 100) : 0
  const recentMoods = moodLogs.slice(0, 5)
  const pendingBooks = books.filter(b => b.status === 'pendingReview')
  const allPending = pendingMissions.length + pendingBooks.length

  const income  = moneyLogs.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0)
  const expense = moneyLogs.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0)
  const balance = income - expense

  const handleApproveReview = () => {
    if (!reviewSheet) return
    approveReview(reviewSheet.id, reviewComment)
    setReviewSheet(null)
    setReviewComment('')
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.title}>부모 리포트</div>
          <div style={styles.sub}>{childName}의 성장 데이터를 한눈에</div>
        </div>
        <div style={styles.mode}>부모 모드</div>
      </header>

      <section style={styles.summaryGrid}>
        <Summary label="미션" value={`${done}/${missions.length}`} />
        <Summary label="연속" value={`${streak}일`} />
        <Summary label="포인트" value={`${points}P`} />
        <Summary label="레벨" value={`Lv.${level}`} />
      </section>

      {allPending > 0 && (
        <Card title={`🔔 승인 대기 (${allPending}건)`}>
          {pendingMissions.map(p => (
            <Approval key={p.id} text={`${p.title} 완료 → +${p.pts}P`} onApprove={() => approveMission(p.id)} />
          ))}
          {pendingBooks.map(b => (
            <div key={b.id} style={{ ...styles.approval, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>📚 {b.title} 독후감</div>
                <div style={{ fontSize: 13, color: '#777', lineHeight: 1.5 }}>{b.review.slice(0, 60)}...</div>
              </div>
              <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                <button style={{ ...styles.button, flex: 1, background: '#eee', color: '#444' }} onClick={() => rejectReview(b.id)}>다시 쓰기</button>
                <button style={{ ...styles.button, flex: 2 }} onClick={() => setReviewSheet(b)}>검수하기</button>
              </div>
            </div>
          ))}
        </Card>
      )}

      <Card title="😊 감정 리포트">
        {recentMoods.length > 0 ? (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              {recentMoods.map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{MOOD_EMOJI[m.type] || '😐'}</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 4 }}>{i === 0 ? '오늘' : `${i}일전`}</div>
                  <div style={{ fontSize: 10, color: '#555', fontWeight: 600 }}>{MOOD_LABEL[m.type]}</div>
                </div>
              ))}
            </div>
            {recentMoods[0]?.note && <div style={styles.note}>💬 "{recentMoods[0].note}"</div>}
          </>
        ) : (
          <div style={{ color: '#aaa', fontSize: 14 }}>아직 감정 기록이 없어요</div>
        )}
      </Card>

      <Card title="💰 용돈 리포트">
        <Row label="현재 잔액" value={`${balance.toLocaleString('ko-KR')}원`} />
        <Row label="총 수입" value={`+${income.toLocaleString('ko-KR')}원`} />
        <Row label="총 지출" value={`-${expense.toLocaleString('ko-KR')}원`} />
        {mainPiggy && (
          <div style={styles.goalBox}>
            <div style={styles.goalTop}><b>🐷 {mainPiggy.name}</b><span>{piggyPct}%</span></div>
            <Progress percent={piggyPct} />
            <div style={styles.smallText}>{mainPiggy.target.toLocaleString('ko-KR')}원 중 {mainPiggy.current.toLocaleString('ko-KR')}원 모았어요</div>
            {piggyPct >= 100 && (
              <button style={{ ...styles.button, width: '100%', marginTop: 12 }} onClick={() => setShopSheet(true)}>🛒 목표 달성! 선물 쇼핑하기</button>
            )}
          </div>
        )}
      </Card>

      <Card title="📚 독서 리포트">
        <Row label="읽은 책" value={`${books.length}권`} />
        <Row label="완료된 책" value={`${books.filter(b => b.status === 'approved').length}권`} />
        <Row label="검수 대기" value={`${pendingBooks.length}권`} />
      </Card>

      <Card title="📍 안심 위치 알림">
        {gpsLogs.slice(0, 3).map(l => (
          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f1f1' }}>
            <span style={{ fontSize: 20 }}>{l.type === 'arrive' ? '🟢' : '🔴'}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{l.text}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{l.time}</div>
            </div>
          </div>
        ))}
        {gpsLogs.length === 0 && <div style={{ color: '#aaa', fontSize: 14 }}>알림 기록이 없어요</div>}
      </Card>

      <Card title="✅ 생활 습관 달성률">
        {missions.slice(0, 5).map(m => (
          <div key={m.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{m.title}</span>
              <b style={{ fontSize: 13, color: m.done ? '#4A7C59' : '#aaa' }}>{m.done ? '완료' : '대기'}</b>
            </div>
            <Progress percent={m.done ? 100 : 0} color={m.done ? '#4A7C59' : '#eee'} />
          </div>
        ))}
      </Card>

      <nav style={styles.nav}>
        <Tab active icon="📊" label="리포트" />
        <Tab icon="💬" label="커뮤니티" />
        <Tab icon="📍" label="GPS" onClick={() => navigate('/parent/gps')} />
        <Tab icon="👧" label="아이" onClick={() => navigate('/child/home')} />
        <Tab icon="⚙️" label="설정" onClick={() => navigate('/parent/settings')} />
      </nav>

      <Sheet open={shopSheet} onClose={() => setShopSheet(false)} title="선물 쇼핑하기">
        {mainPiggy && (
          <div style={{ background: '#EDF4EF', borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>🐷 {mainPiggy.name}</div>
            <Progress percent={piggyPct} color="#4A7C59" />
            <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>{mainPiggy.current.toLocaleString('ko-KR')}원 / {mainPiggy.target.toLocaleString('ko-KR')}원</div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{ ...styles.button, background: '#C00', color: '#fff', padding: 14 }}>🛒 쿠팡에서 찾기</button>
          <button style={{ ...styles.button, background: '#03C75A', color: '#fff', padding: 14 }}>🔍 네이버 쇼핑</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...styles.button, flex: 1, background: '#FFC200', color: '#222', padding: 12 }}>G마켓</button>
            <button style={{ ...styles.button, flex: 1, background: '#F5252C', color: '#fff', padding: 12 }}>11번가</button>
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: '#888', textAlign: 'center' }}>구매 후 영수증 인증 시 아이에게 100P 자동 지급돼요!</div>
      </Sheet>

      <Sheet open={!!reviewSheet} onClose={() => setReviewSheet(null)} title={reviewSheet?.title || '독후감 검수'}>
        {reviewSheet && (
          <>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>독후감 {reviewSheet.review.length}자</div>
            <div style={{ background: '#F8F7F3', borderRadius: 14, padding: 14, fontSize: 14, lineHeight: 1.7, maxHeight: 150, overflowY: 'auto', marginBottom: 14 }}>{reviewSheet.review}</div>
            <input style={{ width: '100%', height: 48, border: '1.5px solid #eee', borderRadius: 12, padding: '0 14px', fontSize: 14, marginBottom: 14, fontFamily: 'inherit', outline: 'none' }} placeholder="칭찬 한마디 (선택)" value={reviewComment} onChange={e => setReviewComment(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...styles.button, flex: 1, background: '#eee', color: '#444' }} onClick={() => { rejectReview(reviewSheet.id); setReviewSheet(null) }}>다시 쓰기</button>
              <button style={{ ...styles.button, flex: 2 }} onClick={handleApproveReview}>도장 승인 +30P</button>
            </div>
          </>
        )}
      </Sheet>
    </div>
  )
}

function Card({ title, children }) {
  return <section style={styles.card}><h2 style={styles.cardTitle}>{title}</h2>{children}</section>
}
function Summary({ label, value }) {
  return <div style={styles.summary}><div style={styles.summaryLabel}>{label}</div><div style={styles.summaryValue}>{value}</div></div>
}
function Row({ label, value }) {
  return <div style={styles.row}><span>{label}</span><b>{value}</b></div>
}
function Progress({ percent, color = '#FFC857' }) {
  return <div style={styles.progressBg}><div style={{ ...styles.progressFill, width: `${Math.min(100, percent)}%`, background: color }} /></div>
}
function Approval({ text, onApprove }) {
  return <div style={styles.approval}><span style={{ fontSize: 14, flex: 1 }}>{text}</span><button style={styles.button} onClick={onApprove}>승인</button></div>
}
function Tab({ icon, label, active, onClick }) {
  return <button onClick={onClick} style={{ ...styles.tab, color: active ? '#111' : '#888', background: 'none', border: 'none' }}><div style={{ fontSize: 22 }}>{icon}</div><span>{label}</span></button>
}

const styles = {
  page: { minHeight: '100vh', background: '#F8F7F3', padding: '20px 18px 120px', fontFamily: 'sans-serif', color: '#222' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 800 },
  sub: { fontSize: 13, color: '#777', marginTop: 4 },
  mode: { fontWeight: 700 },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 },
  summary: { background: '#fff', borderRadius: 16, padding: 14, textAlign: 'center' },
  summaryLabel: { fontSize: 12, color: '#7B61FF', fontWeight: 700 },
  summaryValue: { fontSize: 22, fontWeight: 800, marginTop: 4 },
  card: { background: '#fff', borderRadius: 22, padding: 18, marginBottom: 16, border: '1px solid #eee' },
  cardTitle: { fontSize: 20, marginBottom: 14 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f1f1' },
  note: { background: '#FFF4D9', padding: 14, borderRadius: 14, marginTop: 12, lineHeight: 1.5, fontSize: 14 },
  progressBg: { height: 8, background: '#eee', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%' },
  goalBox: { background: '#F8F7F3', padding: 14, borderRadius: 16, marginTop: 14 },
  goalTop: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  smallText: { fontSize: 12, color: '#777', marginTop: 6 },
  approval: { background: '#F8F7F3', borderRadius: 14, padding: 12, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  button: { border: 'none', background: '#FFC857', borderRadius: 12, padding: '8px 14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  nav: { position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 },
  tab: { textAlign: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer' },
}
