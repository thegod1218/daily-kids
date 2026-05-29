import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [userType, setUserType] = useState(null);
  const [tab, setTab] = useState('home');
  const [emotion, setEmotion] = useState('happy');
  const [diary, setDiary] = useState('');
  const [planDiary, setPlanDiary] = useState('');
  const [bookReport, setBookReport] = useState('');
  const [selectedBook, setSelectedBook] = useState('오늘의 마음 사전');

  const colors = {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    soft: '#F8F2EA',
    primary: '#D98C5F',
    primarySoft: '#F4DFD0',
    blue: '#C8D9E6',
    blueDark: '#91AFC4',
    text: '#232323',
    sub: '#7A756F',
    line: '#E8DED2',
    green: '#9BAF92'
  };

  const emotionMap = {
    happy: {
      label: '행복',
      icon: '😊',
      solution: '오늘 기분이 좋아 보여요. 좋았던 순간을 짧게 기록해보면 좋아요.',
      content: ['좋았던 일 3가지 말하기', '가족 산책 15분', '잠들기 전 칭찬 카드']
    },
    calm: {
      label: '보통',
      icon: '😐',
      solution: '평온한 하루예요. 조용한 독서나 가벼운 정리 루틴이 잘 맞아요.',
      content: ['10분 독서 루틴', '방 정리 미션', '차분한 음악 듣기']
    },
    sad: {
      label: '속상',
      icon: '😢',
      solution: '속상한 마음이 있었나 봐요. 먼저 마음을 들어주고 쉬는 시간이 필요해요.',
      content: ['토리와 3번 숨쉬기', '기분 그림 그리기', '부모님과 산책하기']
    },
    tired: {
      label: '피곤',
      icon: '😴',
      solution: '몸이 쉬고 싶다는 신호예요. 오늘은 루틴을 조금 가볍게 줄여보세요.',
      content: ['취침 20분 앞당기기', '따뜻한 물 마시기', '짧은 스트레칭']
    }
  };

  const books = [
    { title: '오늘의 마음 사전', age: '초등 저학년', desc: '감정을 말로 표현하는 연습을 도와주는 책' },
    { title: '작은 습관의 힘', age: '초등 고학년', desc: '매일의 습관과 성장에 대해 생각해보는 책' },
    { title: '토리의 별 모으기', age: '유아~초등', desc: '성취감과 보상을 재미있게 이해하는 이야기' }
  ];

  const schedule = [
    { group: '아침', icon: '☀️', items: [
      { time: '07:30', title: '기상하기', done: true },
      { time: '07:40', title: '양치하기', done: true },
      { time: '08:20', title: '가방 챙기기', done: false }
    ]},
    { group: '오후', icon: '🏫', items: [
      { time: '15:00', title: '숙제하기', done: false },
      { time: '16:00', title: '태권도 가기', done: false }
    ]},
    { group: '저녁', icon: '🌙', items: [
      { time: '20:00', title: '독서 10분', done: false },
      { time: '21:00', title: '잠자리 준비', done: false }
    ]}
  ];

  const allPlans = schedule.flatMap(s => s.items);
  const donePlans = allPlans.filter(i => i.done).length;
  const planRate = Math.round((donePlans / allPlans.length) * 100);
  const currentEmotion = emotionMap[emotion];

  const Tori = ({ small = false }) => (
    <div style={{ width: small ? 70 : 118, height: small ? 70 : 118, position: 'relative', margin: small ? 0 : '0 auto' }}>
      <div style={{ position:'absolute', left:4, top:36, width:46, height:58, borderRadius:'50%', background:colors.blue, border:`2px solid ${colors.blueDark}`, transform:'rotate(-18deg)' }} />
      <div style={{ position:'absolute', right:4, top:36, width:46, height:58, borderRadius:'50%', background:colors.blue, border:`2px solid ${colors.blueDark}`, transform:'rotate(18deg)' }} />
      <div style={{ position:'absolute', left:25, top:22, width:70, height:74, borderRadius:'48% 48% 52% 52%', background:'#D8E8F3', border:`2.5px solid ${colors.blueDark}` }}>
        <div style={{ position:'absolute', left:18, top:28, width:6, height:6, borderRadius:'50%', background:colors.text }} />
        <div style={{ position:'absolute', right:18, top:28, width:6, height:6, borderRadius:'50%', background:colors.text }} />
        <div style={{ position:'absolute', left:29, top:40, width:14, height:32, borderRadius:12, background:'#BFD9EA', border:`2px solid ${colors.blueDark}` }} />
        <div style={{ position:'absolute', left:26, top:51, width:22, height:7, borderBottom:`2.5px solid ${colors.primary}`, borderRadius:'50%' }} />
      </div>
      <div style={{ position:'absolute', right:8, top:6, fontSize:22 }}>✦</div>
    </div>
  );

  const Shell = ({ children, center = false }) => (
    <div style={{
      minHeight:'100vh', background:colors.bg, display:'flex', justifyContent:'center',
      alignItems:center ? 'center' : 'flex-start', padding:20,
      fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', boxSizing:'border-box'
    }}>
      <div style={{
        width:'100%', maxWidth:430, background:center ? colors.surface : 'transparent',
        borderRadius:center ? 34 : 0, padding:center ? 30 : 0,
        boxSizing:'border-box', boxShadow:center ? '0 20px 60px rgba(90,70,45,.12)' : 'none',
        border:center ? `1px solid ${colors.line}` : 'none',
        textAlign:center ? 'center' : 'left', paddingBottom:center ? 30 : 90
      }}>
        {children}
      </div>
    </div>
  );

  const Button = ({ children, onClick, secondary=false }) => (
    <button onClick={onClick} style={{
      width:'100%', padding:16, marginTop:10, borderRadius:18,
      border: secondary ? `1px solid ${colors.line}` : 'none',
      background: secondary ? colors.surface : colors.primary,
      color: secondary ? colors.text : '#fff', fontSize:16, fontWeight:800, cursor:'pointer'
    }}>{children}</button>
  );

  const Input = ({ placeholder, type='text' }) => (
    <input type={type} placeholder={placeholder} style={{
      width:'100%', padding:'16px 17px', marginBottom:12, borderRadius:18,
      border:`1px solid ${colors.line}`, background:'#FFFCF8', fontSize:15,
      boxSizing:'border-box', outline:'none', color:colors.text
    }} />
  );

  const TextArea = ({ value, onChange, placeholder, maxLength }) => (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} style={{
      width:'100%', minHeight:92, padding:16, borderRadius:20, border:`1px solid ${colors.line}`,
      background:'#FFFCF8', boxSizing:'border-box', resize:'none', outline:'none',
      fontSize:14, lineHeight:1.6, color:colors.text
    }} />
  );

  const Panel = ({ children, style={} }) => (
    <div style={{
      background:colors.surface, borderRadius:28, padding:20, border:`1px solid ${colors.line}`,
      boxShadow:'0 14px 40px rgba(90,70,45,.07)', ...style
    }}>{children}</div>
  );

  const Section = ({ title, caption, children }) => (
    <section style={{ marginTop:22 }}>
      <h3 style={{ margin:0, fontSize:18, color:colors.text }}>{title}</h3>
      {caption && <p style={{ margin:'5px 0 12px', fontSize:13, color:colors.sub }}>{caption}</p>}
      {children}
    </section>
  );

  if (screen === 'start') return (
    <Shell center>
      <Tori />
      <h1 style={{ margin:'18px 0 8px', fontSize:38, color:colors.text }}>Daily Kids</h1>
      <p style={{ margin:'0 0 28px', color:colors.sub, lineHeight:1.6 }}>
        아이의 작은 습관과 마음을<br />매일 성장 데이터로 기록해요.
      </p>
      <Button onClick={() => setScreen('select')}>시작하기</Button>
    </Shell>
  );

  if (screen === 'select') return (
    <Shell center>
      <Tori small />
      <h2>누가 접속하나요?</h2>
      <p style={{ color:colors.sub, lineHeight:1.6 }}>부모님과 아이 화면을 다르게 보여드려요.</p>
      <Button onClick={() => { setUserType('parent'); setScreen('login'); }}>부모님으로 시작하기</Button>
      <Button secondary onClick={() => { setUserType('child'); setScreen('childLogin'); }}>아이로 시작하기</Button>
    </Shell>
  );

  if (screen === 'login') return (
    <Shell center>
      <Tori small />
      <h2>부모님 로그인</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Button onClick={() => setScreen('home')}>로그인</Button>
      <Button secondary onClick={() => setScreen('signup')}>회원가입</Button>
    </Shell>
  );

  if (screen === 'childLogin') return (
    <Shell center>
      <Tori small />
      <h2>아이 접속</h2>
      <p style={{ color:colors.sub }}>가족 코드나 PIN으로 간단히 접속해요.</p>
      <Input placeholder="가족 코드 예: DK-2026" />
      <Input placeholder="아이 PIN 4자리" type="password" />
      <Button onClick={() => setScreen('home')}>아이 화면으로 들어가기</Button>
      <Button secondary onClick={() => setScreen('select')}>뒤로</Button>
    </Shell>
  );

  if (screen === 'signup') return (
    <Shell center>
      <Tori small />
      <h2>Daily Kids 시작하기</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Input placeholder="비밀번호 확인" type="password" />
      <Button onClick={() => setScreen('verify')}>인증 메일 보내기</Button>
    </Shell>
  );

  if (screen === 'verify') return (
    <Shell center>
      <div style={{ fontSize:46 }}>✉️</div>
      <h2>인증 메일을 보냈어요</h2>
      <p style={{ color:colors.sub }}>이메일 인증 후 아래 버튼을 눌러주세요.</p>
      <Button onClick={() => setScreen('parent')}>인증 완료했어요</Button>
    </Shell>
  );

  if (screen === 'parent') return (
    <Shell center>
      <Tori small />
      <h2>부모 프로필 설정</h2>
      <Input placeholder="보호자 이름" />
      <Input placeholder="아이와의 관계 예: 엄마, 아빠" />
      <Button onClick={() => setScreen('child')}>다음</Button>
    </Shell>
  );

  if (screen === 'child') return (
    <Shell center>
      <Tori small />
      <h2>아이 등록</h2>
      <Input placeholder="아이 이름" />
      <Input placeholder="생년월일 예: 2018.05.12" />
      <Input placeholder="학교 단계 예: 유아 / 초등 / 중등" />
      <Button onClick={() => setScreen('home')}>우리 아이 루틴 만들기</Button>
    </Shell>
  );

  const Header = () => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
      <div>
        <div style={{ fontSize:13, color:colors.sub, fontWeight:700 }}>{userType === 'parent' ? 'Parent Dashboard' : 'Daily Kids'}</div>
        <h2 style={{ margin:'4px 0 0', color:colors.text }}>
          {userType === 'parent' ? '도윤이 리포트' : '좋은 아침, 도윤아'}
        </h2>
      </div>
      <div style={{ width:42, height:42, borderRadius:'50%', background:colors.surface, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${colors.line}` }}>🔔</div>
    </div>
  );

  const Home = () => (
    <>
      <Header />
      <Panel style={{ padding:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <Tori />
          <div>
            <div style={{ fontSize:13, color:colors.sub, fontWeight:800 }}>Tori Growth</div>
            <h1 style={{ margin:'6px 0', fontSize:30, color:colors.text }}>토리 Lv.4</h1>
            <p style={{ margin:0, color:colors.sub, fontSize:14 }}>오늘도 조금 자라고 있어요.</p>
          </div>
        </div>
      </Panel>

      <Section title="오늘의 마음" caption="감정 상태에 맞춰 AI 솔루션을 추천해요.">
        <Panel>
          <div style={{ display:'flex', gap:8, marginBottom:16 }}>
            {Object.keys(emotionMap).map(key => (
              <button key={key} onClick={() => setEmotion(key)} style={{
                flex:1, border:emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`,
                background:emotion === key ? colors.primarySoft : colors.surface,
                borderRadius:18, padding:'12px 4px', cursor:'pointer'
              }}>
                <div style={{ fontSize:22 }}>{emotionMap[key].icon}</div>
                <div style={{ fontSize:11, color:colors.sub, marginTop:4, fontWeight:800 }}>{emotionMap[key].label}</div>
              </button>
            ))}
          </div>
          <div style={{ background:colors.soft, borderRadius:22, padding:16 }}>
            <div style={{ fontSize:13, color:colors.primary, fontWeight:900, marginBottom:8 }}>AI 추천 솔루션</div>
            <p style={{ margin:0, color:colors.text, fontSize:14, lineHeight:1.65 }}>{currentEmotion.solution}</p>
          </div>
        </Panel>
      </Section>

      <Section title="오늘의 일기" caption="짧게라도 오늘의 마음을 남겨요.">
        <Panel>
          <TextArea value={diary} onChange={setDiary} placeholder="오늘 좋았던 일이나 속상했던 일을 적어보세요." maxLength={120} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, color:colors.sub, fontSize:12 }}>
            <span>{diary.length}/120자</span>
            <button onClick={() => alert('일기가 저장되었어요.')} style={{ border:'none', background:colors.primary, color:'#fff', borderRadius:999, padding:'8px 14px', fontWeight:800 }}>저장</button>
          </div>
        </Panel>
      </Section>

      <Section title="맞춤 콘텐츠" caption="아이 상태에 맞춰 오늘 해볼 활동을 추천해요.">
        <div style={{ display:'grid', gap:12 }}>
          {currentEmotion.content.map((item, idx) => (
            <Panel key={item} style={{ padding:16, background:idx === 0 ? '#F4EEE6' : colors.surface }}>
              <div style={{ fontWeight:900, color:colors.text }}>{idx + 1}. {item}</div>
              <div style={{ color:colors.sub, fontSize:13, marginTop:6 }}>3분 안에 시작할 수 있는 작은 활동이에요.</div>
              <button onClick={() => alert(`${item} 콘텐츠를 시작합니다.`)} style={{ marginTop:12, border:'none', background:colors.primarySoft, color:colors.primary, borderRadius:999, padding:'8px 13px', fontWeight:850 }}>시작하기</button>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );

  const Plan = () => (
    <>
      <Header />
      <Panel style={{ padding:24 }}>
        <div style={{ color:colors.sub, fontSize:13, fontWeight:800 }}>오늘의 생활계획표</div>
        <h1 style={{ margin:'8px 0 6px', color:colors.text, fontSize:30 }}>{allPlans.length}개 중 {donePlans}개 완료</h1>
        <div style={{ height:10, borderRadius:999, background:'#EEE4D8', marginTop:14, overflow:'hidden' }}>
          <div style={{ width:`${planRate}%`, height:'100%', background:colors.primary, borderRadius:999 }} />
        </div>
      </Panel>

      <Section title="엄마가 정한 루틴">
        {schedule.map(block => (
          <Panel key={block.group} style={{ marginBottom:14 }}>
            <div style={{ fontWeight:900, color:colors.text, marginBottom:12 }}>{block.icon} {block.group}</div>
            {block.items.map(item => (
              <div key={item.title} style={{ display:'flex', alignItems:'center', padding:'11px 0', borderTop:`1px solid ${colors.line}` }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:item.done ? colors.green : colors.soft, marginRight:12, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>{item.done ? '✓' : ''}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:850, color:colors.text }}>{item.title}</div>
                  <div style={{ fontSize:13, color:colors.sub }}>{item.time}</div>
                </div>
                <button onClick={() => alert(`${item.title} 완료 요청이 부모님께 전송되었어요.`)} style={{ border:'none', borderRadius:999, padding:'8px 12px', background:colors.primarySoft, color:colors.primary, fontWeight:850 }}>하기</button>
              </div>
            ))}
          </Panel>
        ))}
      </Section>

      <Section title="오늘 돌아보기" caption="계획을 마친 뒤 한 줄 일기를 남겨요.">
        <Panel>
          <TextArea value={planDiary} onChange={setPlanDiary} placeholder="오늘 계획 중 가장 잘한 일은 무엇인가요?" maxLength={100} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, color:colors.sub, fontSize:12 }}>
            <span>{planDiary.length}/100자</span>
            <button onClick={() => alert('계획 일기가 저장되었어요.')} style={{ border:'none', background:colors.primary, color:'#fff', borderRadius:999, padding:'8px 14px', fontWeight:800 }}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const Book = () => (
    <>
      <Header />
      <Section title="독서통장" caption="책을 고르고, 읽고, 독후감을 남겨요.">
        <Panel>
          <div style={{ fontWeight:900, color:colors.text, marginBottom:12 }}>연령별 추천 도서</div>
          {books.map(book => (
            <button key={book.title} onClick={() => setSelectedBook(book.title)} style={{
              width:'100%', textAlign:'left', border:`1px solid ${selectedBook === book.title ? colors.primary : colors.line}`,
              background:selectedBook === book.title ? colors.primarySoft : colors.surface,
              borderRadius:20, padding:14, marginBottom:10, cursor:'pointer'
            }}>
              <div style={{ fontWeight:900, color:colors.text }}>{book.title}</div>
              <div style={{ color:colors.sub, fontSize:12, marginTop:4 }}>{book.age} · {book.desc}</div>
            </button>
          ))}
          <button onClick={() => alert('추후 도서관/도서 검색 API와 연결할 예정이에요.')} style={{ width:'100%', border:'none', background:colors.primary, color:'#fff', borderRadius:18, padding:14, fontWeight:900 }}>
            무료 도서 검색하기
          </button>
        </Panel>
      </Section>

      <Section title="독후감 작성" caption="초등 저학년 기준 50~100자 권장">
        <Panel>
          <div style={{ color:colors.sub, fontSize:13, marginBottom:10 }}>선택한 책: <b style={{ color:colors.text }}>{selectedBook}</b></div>
          <TextArea value={bookReport} onChange={setBookReport} placeholder="이 책에서 가장 기억에 남는 장면을 적어보세요." maxLength={100} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, color:colors.sub, fontSize:12 }}>
            <span>{bookReport.length}/100자</span>
            <button onClick={() => alert('독후감이 저장되었어요.')} style={{ border:'none', background:colors.primary, color:'#fff', borderRadius:999, padding:'8px 14px', fontWeight:800 }}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const Placeholder = ({ title, desc }) => (
    <>
      <Header />
      <Panel>
        <Tori small />
        <h2 style={{ color:colors.text }}>{title}</h2>
        <p style={{ color:colors.sub, lineHeight:1.6 }}>{desc}</p>
      </Panel>
    </>
  );

  const BottomNav = () => {
    const menus = [
      { key:'home', label:'홈' },
      { key:'plan', label:'계획' },
      { key:'money', label:'용돈' },
      { key:'book', label:'독서' },
      { key:'tori', label:'토리' }
    ];
    return (
      <div style={{
        position:'fixed', left:'50%', bottom:14, transform:'translateX(-50%)',
        width:'calc(100% - 32px)', maxWidth:430, background:'rgba(255,255,255,.94)',
        border:`1px solid ${colors.line}`, borderRadius:24, padding:8,
        display:'grid', gridTemplateColumns:'repeat(5, 1fr)',
        boxShadow:'0 16px 45px rgba(90,70,45,.16)', zIndex:10
      }}>
        {menus.map(menu => (
          <button key={menu.key} onClick={() => setTab(menu.key)} style={{
            border:'none', background:tab === menu.key ? colors.primarySoft : 'transparent',
            color:tab === menu.key ? colors.primary : colors.sub,
            borderRadius:17, padding:'10px 0', fontWeight:900, fontSize:13, cursor:'pointer'
          }}>{menu.label}</button>
        ))}
      </div>
    );
  };

  return (
    <Shell>
      {tab === 'home' && <Home />}
      {tab === 'plan' && <Plan />}
      {tab === 'money' && <Placeholder title="용돈" desc="미션 성공 보상으로 받은 용돈과 포인트를 확인하는 공간이에요." />}
      {tab === 'book' && <Book />}
      {tab === 'tori' && <Placeholder title="토리 성장방" desc="토리의 레벨, 배지, 아이템을 확인하고 꾸밀 수 있어요." />}
      <BottomNav />
    </Shell>
  );
}
