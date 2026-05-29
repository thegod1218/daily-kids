import React, { useState } from 'react'
import { useAppStore } from '../../store'
import { useToast } from '../../hooks/useToast'
import TabBar from '../../components/TabBar'
import { Sheet, ProgBar } from '../../components/Common'

// 나이별 최소 글자수 & 포인트
const AGE_CONFIG = [
  { maxAge: 7,  minLen: 50,  pts: 20,  label: '50자 이상' },
  { maxAge: 9,  minLen: 150, pts: 40,  label: '150자 이상' },
  { maxAge: 11, minLen: 300, pts: 60,  label: '300자 이상' },
  { maxAge: 99, minLen: 500, pts: 100, label: '500자 이상' },
]

function getConfig(age) {
  return AGE_CONFIG.find(c => age <= c.maxAge) || AGE_CONFIG[AGE_CONFIG.length - 1]
}

// 무료 도서 추천 (알라딘 API 대신 큐레이션 데이터)
const BOOK_RECS = {
  '7':  [{ title: '강아지똥', author: '권정생', genre: '그림책', emoji: '🐕' }, { title: '괴물들이 사는 나라', author: '모리스 샌닥', genre: '그림책', emoji: '👾' }, { title: '100만번 산 고양이', author: '사노 요코', genre: '그림책', emoji: '🐱' }],
  '10': [{ title: '어린왕자', author: '생텍쥐페리', genre: '소설', emoji: '🌹' }, { title: '해리포터와 마법사의 돌', author: 'J.K. 롤링', genre: '판타지', emoji: '🧙' }, { title: '오즈의 마법사', author: 'L.F. 바움', genre: '동화', emoji: '🌈' }],
  '13': [{ title: '파친코', author: '이민진', genre: '역사소설', emoji: '📖' }, { title: '채식주의자', author: '한강', genre: '소설', emoji: '🌿' }, { title: '데미안', author: '헤르만 헤세', genre: '성장소설', emoji: '🦅' }],
}

function getRecommendations(age) {
  if (age <= 8)  return BOOK_RECS['7']
  if (age <= 12) return BOOK_RECS['10']
  return BOOK_RECS['13']
}

const STATUS_CONFIG = {
  reading:       { label: '읽는 중',  color: '#6B7280', bg: '#F3F4F6' },
  pendingReview: { label: '검수 요청', color: '#D97706', bg: '#FFFBEB' },
  approved:      { label: '완료',     color: '#16A34A', bg: '#F0FDF4' },
  rejected:      { label: '다시 쓰기', color: '#DC2626', bg: '#FEF2F2' },
}

export default function BooksPage() {
  const { childAge, books, addBook, submitReview } = useAppStore()
  const { show, ToastEl } = useToast()
  const cfg = getConfig(childAge)
  const recs = getRecommendations(childAge)
  const stamps = books.filter(b => b.status === 'approved').length

  const [addOpen, setAddOpen] = useState(false)
  const [reviewBook, setReviewBook] = useState(null)
  const [bkTitle, setBkTitle] = useState('')
  const [bkAuthor, setBkAuthor] = useState('')
  const [review, setReview] = useState('')

  const handleAdd = (title = bkTitle, author = bkAuthor) => {
    if (!title.trim()) { show('책 제목을 입력해주세요'); return }
    addBook({ title: title.trim(), author: author || '미상' })
    setBkTitle(''); setBkAuthor(''); setAddOpen(false)
    show('책 추가 완료! 열심히 읽어봐요 📚')
  }

  const handleSubmit = () => {
    if (review.length < cfg.minLen) { show(`${cfg.minLen - review.length}자 더 써야 해요!`); return }
    submitReview(reviewBook.id, review)
    setReviewBook(null); setReview('')
    show('독후감 제출! 부모님 검수를 기다려요 🎉')
  }

  const openReview = (book) => {
    setReviewBook(book)
    setReview(book.review || '')
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="header-title">독서 통장</div>
          <div className="header-sub">{stamps}/10 도장 완성</div>
        </div>
        <button onClick={() => setAddOpen(true)} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#EEEEFF', cursor: 'pointer', fontSize: 20, color: '#5B5FEF' }} aria-label="추가">+</button>
      </div>

      {/* 도장판 */}
      <div className="card" style={{ borderColor: stamps >= 10 ? '#22C55E' : '#E5E7EB', background: stamps >= 10 ? '#F0FDF4' : 'white' }}>
        <div className="spb" style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>이번 달 도장</div>
          <span className={`badge ${stamps >= 10 ? 'badge-green' : 'badge-accent'}`}>Lv.{Math.floor(stamps / 10) + 1}</span>
        </div>
        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          {stamps}/10 — {stamps >= 10 ? '🎉 이번 달 목표 달성!' : `${10 - stamps}권 더 읽으면 보상!`}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`stamp ${i < stamps ? 'on' : 'off'}`} style={{ height: 44 }}>
              {i < stamps ? '📚' : <span style={{ fontSize: 11, color: '#9CA3AF' }}>{i + 1}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 나이별 독후감 안내 */}
      <div style={{ margin: '0 20px 12px', background: '#EEEEFF', borderRadius: 16, padding: '14px 16px', border: '1px solid #C7D2FE' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#3730A3', marginBottom: 4 }}>
          {childAge}세 독후감 기준
        </div>
        <div style={{ fontSize: 13, color: '#4338CA' }}>
          최소 <strong>{cfg.minLen}자</strong> 이상 → <strong>+{cfg.pts}P</strong> 지급
        </div>
      </div>

      {/* 책 추천 */}
      <div style={{ padding: '0 20px', marginBottom: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 10 }}>📖 추천 도서</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {recs.map((r, i) => (
            <div key={i} onClick={() => { setBkTitle(r.title); setBkAuthor(r.author); setAddOpen(true) }}
              style={{ flexShrink: 0, width: 110, background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', padding: 14, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{r.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 3, lineHeight: 1.3 }}>{r.title}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>{r.author}</div>
              <div style={{ fontSize: 10, marginTop: 6 }}>
                <span style={{ background: '#EEEEFF', color: '#5B5FEF', padding: '2px 7px', borderRadius: 8, fontWeight: 600 }}>{r.genre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 읽은 책 */}
      <div style={{ padding: '4px 20px 8px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 10 }}>읽은 책</div>
        {books.length > 0 ? books.map(b => {
          const sc = STATUS_CONFIG[b.status] || STATUS_CONFIG.reading
          return (
            <div key={b.id} onClick={() => openReview(b)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', padding: '14px 16px', marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 56, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📗</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 2 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: '#9CA3AF' }}>{b.author}</div>
                {b.review && (
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{b.review.length}자 작성</div>
                )}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, background: sc.bg, color: sc.color, flexShrink: 0 }}>{sc.label}</span>
            </div>
          )
        }) : (
          <div style={{ textAlign: 'center', padding: '32px 20px', background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', color: '#9CA3AF', fontSize: 14 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📚</div>
            추천 도서를 눌러 첫 번째 책을 추가해봐요!
          </div>
        )}
      </div>

      {/* 책 추가 시트 */}
      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="책 추가">
        <input className="input" placeholder="책 제목" value={bkTitle} onChange={e => setBkTitle(e.target.value)} style={{ marginBottom: 12 }} />
        <input className="input" placeholder="지은이 (선택)" value={bkAuthor} onChange={e => setBkAuthor(e.target.value)} style={{ marginBottom: 20 }} />
        <button className="btn btn-primary" onClick={() => handleAdd()}>추가하기</button>
      </Sheet>

      {/* 독후감 작성 시트 */}
      <Sheet open={!!reviewBook} onClose={() => setReviewBook(null)} title={reviewBook?.title || '독후감'}>
        {reviewBook && (
          <>
            <div style={{ background: '#EEEEFF', borderRadius: 14, padding: '12px 14px', marginBottom: 14, fontSize: 14, color: '#3730A3', fontWeight: 600 }}>
              {cfg.label} 작성 시 +{cfg.pts}P 지급 ({childAge}세 기준)
            </div>
            <textarea
              placeholder={`독후감을 써봐요...\n(최소 ${cfg.minLen}자 이상)`}
              value={review}
              onChange={e => setReview(e.target.value)}
              disabled={reviewBook.status === 'approved'}
              style={{ width: '100%', minHeight: 160, border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 16, fontSize: 15, resize: 'none', outline: 'none', fontFamily: 'inherit', color: '#111827', lineHeight: 1.7, marginBottom: 10 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: review.length >= cfg.minLen ? '#16A34A' : '#9CA3AF', fontWeight: 600 }}>
                {review.length}자 / {cfg.minLen}자
              </span>
              {review.length >= cfg.minLen && <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>✓ 기준 충족!</span>}
            </div>
            <ProgBar value={Math.min(100, review.length / cfg.minLen * 100)} color={review.length >= cfg.minLen ? '#22C55E' : '#5B5FEF'} style={{ marginBottom: 16 }} />
            {reviewBook.status !== 'approved' && (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={review.length < cfg.minLen}>
                {review.length < cfg.minLen ? `${cfg.minLen - review.length}자 더 써요` : '부모님께 검수 요청 →'}
              </button>
            )}
            {reviewBook.parentComment && (
              <div style={{ marginTop: 14, padding: '14px 16px', background: '#F0FDF4', borderRadius: 14, border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', marginBottom: 5 }}>부모님 한마디 💬</div>
                <div style={{ fontSize: 14, color: '#15803D' }}>{reviewBook.parentComment}</div>
              </div>
            )}
          </>
        )}
      </Sheet>

      <TabBar />
      {ToastEl}
    </div>
  )
}
