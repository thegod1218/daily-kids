import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet, ProgressBar } from '../../components/Common'
import dayjs from 'dayjs'

const MOOD_ICON = { happy: '😊', neutral: '😐', sad: '😢', angry: '😠', excited: '🤩' }
const MOOD_LABEL = { happy: '행복', neutral: '보통', sad: '슬픔', angry: '화남', excited: '신남' }

export default function ParentDashboard() {
  const navigate = useNavigate()
  const { show, ToastEl } = useToast()
  const [shopSheet, setShopSheet] = useState(false)
  const [placesSheet, setPlacesSheet] = useState(false)
  const [reviewSheet, setReviewSheet] = useState(null)
  const [reviewComment, setReviewComment] = useState('')

  const {
    childName, childAge, points, level, streak,
    missions, piggies, moodLogs, pendingMissions, books,
    gpsLogs, approveMission, approveReview, rejectReview
  } = useAppStore()

  const done = missions.filter(m => m.done).length
  const mainPiggy = piggies[0]
  const piggyPct = mainPiggy ? Math.round(mainPiggy.current / mainPiggy.target * 100) : 0

  const recentMoods = moodLogs.slice(0, 5)
  const isNegativeAlert = recentMoods.slice(0, 3).filter(m => m.type === 'sad' || m.type === 'angry').length >= 2

  const pendingBooks = books.filter(b => b.status === 'pendingReview')
  const allPending = pendingMissions.length + pendingBooks.length

  const PLACES = [
    { name: '하늘공원', tag: '공원', dist: '1.2km', emoji: '🌳' },
    { name: '볼링장', tag: '스포츠', dist: '0.8km', emoji: '🎳' },
    { name: '롯데월드', tag: '테마파크', dist: '12km', emoji: '🎡' },
    { name: '카카오프렌즈', tag: '카페', dist: '0.4km', emoji: '☕' },
    { name: '어린이 미술관', tag: '문화', dist: '2.1km', emoji: '🎨' },
  ]

  const openReview = (book) => {
    setReviewSheet(book)
    setReviewComment('')
  }

  const handleApproveReview = () => {
    if (!reviewSheet) return
    approveReview(reviewSheet.id, reviewComment)
    setReviewSheet(null)
    show('도장 승인! +30P')
  }

  const handleRejectReview = () => {
    if (!reviewSheet) return
    rejectReview(reviewSheet.id)
    setReviewSheet(null)
    show('다시 쓰기 요청')
  }

  return (
    <div className="page">
      {/* 헤더 */}
      <div className="page-header">
        <div className="row">
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FBEAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #D4537E' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4537E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>부모 대시보드</div>
            <div style={{ fontSize: 12, color: '#888780' }}>{childName} 활동 현황</div>
          </div>
        </div>
        <span className="chip chip-pk">부모 모드</span>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        {/* 주간 리포트 */}
        <div className="fill-p" style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#534AB7', marginBottom: 12 }}>📊 이번 주 리포트</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {[['미션', `${done}/${missions.length}`], ['연속', `${streak}일`], ['포인트', `${points}P`], ['레벨', `Lv.${level}`]].map(([label, val]) => (
              <div key={label} style={{ background: 'white', borderRadius: 12, padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#534AB7', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 17, fontWeight: 500, color: '#2C2C2A' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 승인 대기 */}
        {allPending > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div className="spb" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>승인 대기</span>
              <span className="chip chip-pk">{allPending}건</span>
            </div>
            {pendingMissions.map(p => (
              <div key={p.id} className="fill-a" style={{ marginBottom: 8 }}>
                <div className="spb">
                  <div className="row">
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: '#FAC775', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✅</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{p.title} 완료</div>
                      <div style={{ fontSize: 11, color: '#633806' }}>방금 전</div>
                    </div>
                  </div>
                  <button onClick={() => { approveMission(p.id); show('승인! +' + p.pts + 'P') }} style={{ padding: '8px 14px', borderRadius: 12, background: '#EAF3DE', border: '0.5px solid #1D9E75', color: '#27500A', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                    승인 +{p.pts}P
                  </button>
                </div>
              </div>
            ))}
            {pendingBooks.map(b => (
              <div key={b.id} className="fill-p" style={{ marginBottom: 8 }}>
                <div className="spb" style={{ marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: '#534AB7' }}>독후감 {b.review.length}자</div>
                  </div>
                  <span className="chip chip-a">검수 요청</span>
                </div>
                <div style={{ background: 'white', borderRadius: 12, padding: '10px', fontSize: 12, color: '#2C2C2A', lineHeight: 1.6, marginBottom: 10, maxHeight: 80, overflow: 'hidden' }}>
                  {b.review.slice(0, 90)}...
                </div>
                <button className="btn btn-teal" style={{ padding: 10 }} onClick={() => openReview(b)}>검수하기</button>
              </div>
            ))}
          </div>
        )}

        {/* 감정 리포트 */}
        <div className="card-pk" style={{ padding: 14, marginBottom: 10, borderRadius: 20 }}>
          <div className="spb" style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A' }}>💗 감정 리포트</span>
            <span className={`chip ${isNegativeAlert ? 'chip-pk' : 'chip-g'}`}>{isNegativeAlert ? '주의 필요' : '양호'}</span>
          </div>
          {recentMoods.length > 0 ? (
            <div style={{ display: 'flex', gap: 12, marginBottom: isNegativeAlert ? 12 : 0 }}>
              {recentMoods.map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22 }}>{MOOD_ICON[m.type] || '😐'}</div>
                  <div style={{ fontSize: 10, color: '#888780', marginTop: 3 }}>{i === 0 ? '오늘' : `${i + 1}일전`}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#888780', marginBottom: isNegativeAlert ? 10 : 0 }}>아직 감정 기록이 없어요</div>
          )}
          {isNegativeAlert && (
            <div style={{ background: 'white', borderRadius: 14, padding: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#72243E', marginBottom: 6 }}>이번 주말 기분 전환 어떨까요?</div>
              <button onClick={() => setPlacesSheet(true)} style={{ fontSize: 13, color: '#D4537E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>
                근처 장소 추천 보기 →
              </button>
            </div>
          )}
        </div>

        {/* 저금통 + 쇼핑 */}
        {mainPiggy && (
          <div style={{ background: '#EAF3DE', borderRadius: 20, padding: 16, marginBottom: 10, border: '0.5px solid #C0DD97' }}>
            <div className="spb" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#27500A' }}>🐷 {mainPiggy.name} 목표</span>
              <span className="chip chip-g">{piggyPct}%</span>
            </div>
            <ProgressBar value={piggyPct} color="#1D9E75" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: '#27500A', marginBottom: 14 }}>
              {mainPiggy.current.toLocaleString('ko-KR')}원 / {mainPiggy.target.toLocaleString('ko-KR')}원
            </div>
            <div className="shop-grid">
              <button className="btn btn-coupang" onClick={() => setShopSheet(true)}>🛒 쿠팡에서 찾기</button>
              <div className="shop-pair">
                <button className="btn btn-naver" onClick={() => setShopSheet(true)}>🔍 네이버</button>
                <button className="btn btn-gmarket" onClick={() => setShopSheet(true)}>🏷 G마켓</button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#27500A', marginTop: 8, opacity: 0.8 }}>구매 후 영수증 인증 시 아이에게 100P 지급</div>
          </div>
        )}

        {/* GPS 미리보기 */}
        <div className="fill-b" style={{ marginBottom: 10 }}>
          <div className="spb" style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#0C447C' }}>📍 안심 위치 알림</span>
            <button onClick={() => navigate('/parent/gps')} style={{ fontSize: 13, color: '#378ADD', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>설정 →</button>
          </div>
          {gpsLogs.slice(0, 2).map(l => (
            <div key={l.id} className="row" style={{ padding: '9px 0', borderBottom: '0.5px solid #B5D4F4' }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: l.type === 'arrive' ? '#EAF3DE' : '#FBEAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                {l.type === 'arrive' ? '↓' : '↑'}
              </div>
              <span style={{ fontSize: 13, color: '#185FA5' }}>{l.text} · {l.time}</span>
            </div>
          ))}
        </div>

        {/* 습관 달성률 */}
        <div className="card" style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2A', marginBottom: 14 }}>생활 습관 달성률</div>
          {missions.slice(0, 5).map(m => (
            <div key={m.id} className="row" style={{ marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: m.done ? '#EAF3DE' : '#F1EFE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>{m.done ? '✅' : '⬜'}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#444441', marginBottom: 4 }}>{m.title}</div>
                <ProgressBar value={m.done ? 100 : 0} color={m.done ? '#1D9E75' : '#D3D1C7'} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: m.done ? '#1D9E75' : '#B4B2A9' }}>{m.done ? '완료' : '대기'}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>

      {/* 쇼핑 시트 */}
      <Sheet open={shopSheet} onClose={() => setShopSheet(false)} title={mainPiggy ? mainPiggy.name + ' 선물 쇼핑' : '선물 쇼핑'}>
        {mainPiggy && (
          <div style={{ background: '#EAF3DE', borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <div className="spb" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#27500A' }}>{mainPiggy.name}</span>
              <span className="chip chip-g">{piggyPct}%</span>
            </div>
            <ProgressBar value={piggyPct} color="#1D9E75" />
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A', marginBottom: 10 }}>바로 쇼핑하기</div>
        <div className="shop-grid">
          <button className="btn btn-coupang" onClick={() => show('쿠팡으로 이동합니다!')}>🛒 쿠팡에서 찾기 <span style={{ fontSize: 11, opacity: 0.8 }}>로켓배송 가능</span></button>
          <button className="btn btn-naver" onClick={() => show('네이버 쇼핑으로 이동합니다!')}>🔍 네이버 쇼핑에서 찾기</button>
          <div className="shop-pair">
            <button className="btn btn-gmarket" onClick={() => show('G마켓으로 이동합니다!')}>🏷 G마켓</button>
            <button className="btn" style={{ flex: 1, background: '#F5252C', color: 'white', padding: 11, fontSize: 12 }} onClick={() => show('11번가로 이동합니다!')}>11번가</button>
          </div>
        </div>
        <div style={{ background: '#EEEDFE', borderRadius: 14, padding: 12, fontSize: 12, color: '#3C3489', lineHeight: 1.6, marginTop: 14 }}>
          ℹ️ 구매 완료 후 영수증 인증 시 아이에게 <strong>100P 자동 지급</strong>돼요!
        </div>
      </Sheet>

      {/* 장소 추천 시트 */}
      <Sheet open={placesSheet} onClose={() => setPlacesSheet(false)} title="이번 주말 어디 가볼까요?">
        <div style={{ fontSize: 13, color: '#888780', marginBottom: 16 }}>아이 기분 기반 추천</div>
        {PLACES.map(p => (
          <div key={p.name} onClick={() => show('카카오맵으로 이동!')} style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 14, border: '0.5px solid #EDE9FE', overflow: 'hidden', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ width: 68, height: 68, background: '#F5F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 28 }}>{p.emoji}</div>
            <div style={{ flex: 1, padding: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#888780' }}>{p.tag} · {p.dist}</div>
            </div>
            <span style={{ color: '#B4B2A9', padding: '0 12px', fontSize: 18 }}>›</span>
          </div>
        ))}
      </Sheet>

      {/* 독후감 검수 시트 */}
      <Sheet open={!!reviewSheet} onClose={() => setReviewSheet(null)} title={reviewSheet?.title || '독후감 검수'}>
        {reviewSheet && (
          <>
            <div style={{ fontSize: 12, color: '#888780', marginBottom: 10 }}>독후감 {reviewSheet.review.length}자</div>
            <div style={{ background: '#F1EFE8', borderRadius: 14, padding: 12, fontSize: 13, color: '#2C2C2A', lineHeight: 1.6, maxHeight: 130, overflowY: 'auto', marginBottom: 14 }}>
              {reviewSheet.review}
            </div>
            <input className="input" placeholder="칭찬 한마디 (선택)" value={reviewComment} onChange={e => setReviewComment(e.target.value)} style={{ marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleRejectReview}>다시 쓰기</button>
              <button className="btn btn-teal" style={{ flex: 2 }} onClick={handleApproveReview}>도장 승인 +30P</button>
            </div>
          </>
        )}
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}
