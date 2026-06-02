import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'

const AGE_CONFIG = [
  { maxAge:7,  minLen:50,  pts:20  },
  { maxAge:9,  minLen:150, pts:40  },
  { maxAge:11, minLen:300, pts:60  },
  { maxAge:99, minLen:500, pts:100 },
]

const BOOK_RECS = {
  '7':  [{ title:'강아지똥',       author:'권정생',   genre:'그림책', emoji:'🐕' },
         { title:'100만번 산 고양이', author:'사노 요코', genre:'그림책', emoji:'🐱' },
         { title:'구름빵',          author:'백희나',   genre:'그림책', emoji:'☁️' }],
  '10': [{ title:'어린왕자',        author:'생텍쥐페리', genre:'소설',   emoji:'🌹' },
         { title:'해리포터',         author:'J.K. 롤링', genre:'판타지', emoji:'🧙' },
         { title:'오즈의 마법사',    author:'L.F. 바움', genre:'동화',   emoji:'🌈' }],
  '13': [{ title:'데미안',          author:'헤르만 헤세', genre:'성장소설', emoji:'🦅' },
         { title:'어린왕자',        author:'생텍쥐페리', genre:'소설',    emoji:'🌹' },
         { title:'파친코',          author:'이민진',    genre:'역사소설', emoji:'📖' }],
}

const STATUS = {
  reading:       { label:'읽는 중',  color:'#7C746D', bg:'#F7F3EE' },
  pendingReview: { label:'검수 요청', color:'#C06000', bg:'#FFF8EE' },
  approved:      { label:'완료',     color:'#4A7C59', bg:'#EDF9F0' },
  rejected:      { label:'다시 쓰기', color:'#C0395A', bg:'#FFF0F4' },
}

function Toast({ msg }) {
  if (!msg) return null
  return <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', background:'#2C2926', color:'white', padding:'12px 20px', borderRadius:24, fontSize:14, fontWeight:600, whiteSpace:'nowrap', zIndex:999, pointerEvents:'none', maxWidth:'90%' }}>{msg}</div>
}

export default function BooksPage() {
  const nav = useNavigate()
  const { childAge, books, addBook, submitReview } = useAppStore()
  const [addOpen, setAddOpen]       = useState(false)
  const [reviewBook, setReviewBook] = useState(null)
  const [bkTitle, setBkTitle]       = useState('')
  const [bkAuthor, setBkAuthor]     = useState('')
  const [review, setReview]         = useState('')
  const [toast, setToast]           = useState(null)

  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400) }

  const cfg    = AGE_CONFIG.find(c => childAge <= c.maxAge) || AGE_CONFIG[AGE_CONFIG.length-1]
  const recs   = childAge <= 8 ? BOOK_RECS['7'] : childAge <= 12 ? BOOK_RECS['10'] : BOOK_RECS['13']
  const stamps = books.filter(b => b.status==='approved').length
  const path   = window.location.pathname

  const handleAdd = (t = bkTitle, a = bkAuthor) => {
    if (!t.trim()) { show('책 제목을 입력해주세요'); return }
    addBook({ title:t.trim(), author:a||'미상' })
    setBkTitle(''); setBkAuthor(''); setAddOpen(false)
    show('책 추가 완료! 열심히 읽어봐요 📚')
  }

  const handleSubmit = () => {
    if (review.length < cfg.minLen) { show(`${cfg.minLen - review.length}자 더 써야 해요!`); return }
    submitReview(reviewBook.id, review)
    setReviewBook(null); setReview('')
    show('독후감 제출! 부모님 검수를 기다려요 🎉')
  }

  const inputStyle = { width:'100%', height:50, border:'1.5px solid #E6DDD3', borderRadius:12, padding:'0 16px', fontSize:16, outline:'none', fontFamily:'inherit', marginBottom:12, boxSizing:'border-box', background:'white' }

  const tabs = [
    { icon:'🏠', label:'홈',   to:'/child/home'      },
    { icon:'⭐', label:'미션', to:'/child/missions'   },
    { icon:'💰', label:'용돈', to:'/child/money'      },
    { icon:'📚', label:'독서', to:'/child/books'      },
    { icon:'👪', label:'부모', to:'/parent/dashboard' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#F7F3EE', paddingBottom:90, fontFamily:'sans-serif', color:'#2C2926' }}>

      {/* 헤더 */}
      <div style={{ background:'#F7F3EE', padding:'18px 20px 16px', borderBottom:'1px solid #E6DDD3', position:'sticky', top:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.8px' }}>독서 통장</div>
          <div style={{ fontSize:13, color:'#7C746D', marginTop:2 }}>{stamps}/10 도장 완성</div>
        </div>
        <button onClick={() => setAddOpen(true)} style={{ width:40, height:40, borderRadius:'50%', border:'none', background:'#F7E6DD', cursor:'pointer', fontSize:22, color:'#D28A6A', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
      </div>

      <div style={{ padding:'16px 20px 0' }}>

        {/* 도장판 */}
        <div style={{ background: stamps>=10 ? '#EDF9F0' : '#FFFDF9', borderRadius:20, border: stamps>=10 ? '1px solid #B8DBBF' : '1px solid #E6DDD3', padding:18, marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
            <div style={{ fontSize:17, fontWeight:700 }}>이번 달 도장</div>
            <span style={{ fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:20, background: stamps>=10 ? '#EDF9F0' : '#EEEEFF', color: stamps>=10 ? '#4A7C59' : '#5B5FEF' }}>Lv.{Math.floor(stamps/10)+1}</span>
          </div>
          <div style={{ fontSize:13, color:'#7C746D', marginBottom:14 }}>
            {stamps}/10 — {stamps>=10 ? '🎉 이번 달 목표 달성!' : `${10-stamps}권 더 읽으면 보상!`}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
            {Array.from({length:10}).map((_,i) => (
              <div key={i} style={{ aspectRatio:'1', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: i<stamps ? '#EDF9F0' : '#F1EFE8', border: i<stamps ? '2px solid #4A7C59' : '1.5px dashed #C7C7CC', fontSize: i<stamps ? 18 : 11, color: i<stamps ? '#4A7C59' : '#C7C7CC' }}>
                {i < stamps ? '📚' : i+1}
              </div>
            ))}
          </div>
        </div>

        {/* 나이별 기준 */}
        <div style={{ background:'#EEEEFF', borderRadius:14, padding:'12px 14px', marginBottom:12, border:'1px solid #C5CAF5' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#3730A3', marginBottom:3 }}>{childAge}세 독후감 기준</div>
          <div style={{ fontSize:13, color:'#4338CA' }}>최소 <strong>{cfg.minLen}자</strong> 이상 → <strong>+{cfg.pts}P</strong> 지급</div>
        </div>

        {/* 추천 도서 */}
        <div style={{ fontSize:17, fontWeight:700, marginBottom:10 }}>📖 추천 도서</div>
        <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:8, marginBottom:4 }}>
          {recs.map((r,i) => (
            <div key={i} onClick={() => { setBkTitle(r.title); setBkAuthor(r.author); setAddOpen(true) }}
              style={{ flexShrink:0, width:100, background:'#FFFDF9', borderRadius:16, border:'1px solid #E6DDD3', padding:12, cursor:'pointer', textAlign:'center' }}>
              <div style={{ fontSize:30, marginBottom:6 }}>{r.emoji}</div>
              <div style={{ fontSize:12, fontWeight:700, lineHeight:1.3, marginBottom:3 }}>{r.title}</div>
              <div style={{ fontSize:10, color:'#9CA3AF' }}>{r.author}</div>
              <div style={{ marginTop:6 }}>
                <span style={{ background:'#EEEEFF', color:'#5B5FEF', padding:'2px 7px', borderRadius:8, fontSize:10, fontWeight:600 }}>{r.genre}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 읽은 책 */}
        <div style={{ fontSize:17, fontWeight:700, margin:'12px 0 10px' }}>읽은 책</div>
        {books.length > 0 ? books.map(b => {
          const sc = STATUS[b.status] || STATUS.reading
          return (
            <div key={b.id} onClick={() => { setReviewBook(b); setReview(b.review||'') }}
              style={{ display:'flex', alignItems:'center', gap:12, background:'#FFFDF9', borderRadius:16, border:'1px solid #E6DDD3', padding:'14px 16px', marginBottom:10, cursor:'pointer' }}>
              <div style={{ width:42, height:54, borderRadius:10, background:'#EDF9F0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>📗</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:2 }}>{b.title}</div>
                <div style={{ fontSize:12, color:'#9CA3AF' }}>{b.author}</div>
                {b.review && <div style={{ fontSize:11, color:'#7C746D', marginTop:3 }}>{b.review.length}자 작성</div>}
              </div>
              <span style={{ fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:20, background:sc.bg, color:sc.color, flexShrink:0 }}>{sc.label}</span>
            </div>
          )
        }) : (
          <div style={{ textAlign:'center', padding:'32px 20px', background:'#FFFDF9', borderRadius:16, border:'1px solid #E6DDD3', color:'#9CA3AF', fontSize:14 }}>
            <div style={{ fontSize:40, marginBottom:10 }}>📚</div>
            추천 도서를 눌러 첫 번째 책을 추가해봐요!
          </div>
        )}
      </div>

      {/* 책 추가 시트 */}
      {addOpen && (
        <div onClick={() => setAddOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            <div style={{ fontSize:20, fontWeight:700, marginBottom:18 }}>책 추가</div>
            <input placeholder="책 제목" value={bkTitle} onChange={e => setBkTitle(e.target.value)} style={inputStyle} />
            <input placeholder="지은이 (선택)" value={bkAuthor} onChange={e => setBkAuthor(e.target.value)} style={{ ...inputStyle, marginBottom:20 }} />
            <button onClick={() => handleAdd()} style={{ width:'100%', padding:15, borderRadius:16, background:'#D28A6A', border:'none', color:'white', fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>추가하기</button>
          </div>
        </div>
      )}

      {/* 독후감 시트 */}
      {reviewBook && (
        <div onClick={() => setReviewBook(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200, display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:'26px 26px 0 0', padding:'0 20px 36px', width:'100%', maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#E5E7EB', margin:'14px auto 20px' }} />
            <div style={{ fontSize:20, fontWeight:700, marginBottom:6 }}>{reviewBook.title}</div>
            <div style={{ background:'#EEEEFF', borderRadius:12, padding:'10px 14px', marginBottom:14, fontSize:13, color:'#3730A3', fontWeight:600 }}>
              최소 {cfg.minLen}자 이상 → +{cfg.pts}P ({childAge}세 기준)
            </div>
            <textarea
              placeholder={`독후감을 써봐요...\n(최소 ${cfg.minLen}자 이상)`}
              value={review}
              onChange={e => setReview(e.target.value)}
              disabled={reviewBook.status==='approved'}
              style={{ width:'100%', minHeight:160, border:'1.5px solid #E6DDD3', borderRadius:14, padding:14, fontSize:15, resize:'none', outline:'none', fontFamily:'inherit', lineHeight:1.7, marginBottom:10, boxSizing:'border-box', background:'white' }}
            />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ fontSize:13, color: review.length>=cfg.minLen ? '#4A7C59' : '#9CA3AF', fontWeight:600 }}>
                {review.length}자 / {cfg.minLen}자
              </span>
              {review.length >= cfg.minLen && <span style={{ fontSize:12, color:'#4A7C59', fontWeight:600 }}>✓ 기준 충족!</span>}
            </div>
            {/* 진행바 */}
            <div style={{ height:6, background:'#F1EFE8', borderRadius:3, overflow:'hidden', marginBottom:16 }}>
              <div style={{ height:'100%', background: review.length>=cfg.minLen ? '#4A7C59' : '#D28A6A', borderRadius:3, width:`${Math.min(100, review.length/cfg.minLen*100)}%`, transition:'width 0.3s' }} />
            </div>
            {reviewBook.status !== 'approved' && (
              <button onClick={handleSubmit} disabled={review.length < cfg.minLen}
                style={{ width:'100%', padding:15, borderRadius:16, background: review.length>=cfg.minLen ? '#D28A6A' : '#E6DDD3', border:'none', color: review.length>=cfg.minLen ? 'white' : '#9CA3AF', fontSize:16, fontWeight:700, cursor: review.length>=cfg.minLen ? 'pointer' : 'not-allowed', fontFamily:'inherit' }}>
                {review.length < cfg.minLen ? `${cfg.minLen - review.length}자 더 써요` : '부모님께 검수 요청 →'}
              </button>
            )}
            {reviewBook.parentComment && (
              <div style={{ marginTop:14, padding:'14px 16px', background:'#EDF9F0', borderRadius:14, border:'1px solid #B8DBBF' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#4A7C59', marginBottom:5 }}>부모님 한마디 💬</div>
                <div style={{ fontSize:14, color:'#2C5F3F' }}>{reviewBook.parentComment}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <nav style={{ position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:'1px solid #E6DDD3', display:'flex', justifyContent:'space-around', padding:'10px 0', zIndex:100 }}>
        {tabs.map(t => (
          <button key={t.to} onClick={() => nav(t.to)} style={{ textAlign:'center', fontSize:12, fontWeight:700, cursor:'pointer', background:'none', border:'none', color: path===t.to ? '#D28A6A' : '#888', fontFamily:'inherit' }}>
            <div style={{ fontSize:20 }}>{t.icon}</div>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <Toast msg={toast} />
    </div>
  )
}
