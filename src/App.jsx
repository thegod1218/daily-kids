import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [userType, setUserType] = useState(null);
  const [tab, setTab] = useState('home');
  const [emotion, setEmotion] = useState('happy');
  const [diary, setDiary] = useState('');
  const [planDiary, setPlanDiary] = useState('');
  const [ageGroup, setAgeGroup] = useState('lower');
  const [selectedBook, setSelectedBook] = useState('오늘의 마음 사전');
  const [bookReport, setBookReport] = useState('');
  const [feedback, setFeedback] = useState('');

  const [plans, setPlans] = useState([
    { group: '아침', icon: '☀️', time: '07:30', title: '기상하기', status: 'approved' },
    { group: '아침', icon: '☀️', time: '07:40', title: '양치하기', status: 'approved' },
    { group: '오후', icon: '🏫', time: '15:00', title: '숙제하기', status: 'ready' },
    { group: '오후', icon: '🏫', time: '16:00', title: '태권도 가기', status: 'ready' },
    { group: '저녁', icon: '🌙', time: '20:00', title: '독서 10분', status: 'ready' },
    { group: '저녁', icon: '🌙', time: '21:00', title: '잠자리 준비', status: 'ready' },
  ]);

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
    green: '#9BAF92',
  };

  const emotionMap = {
    happy: { icon: '😊', label: '좋아', text: '좋았던 일을 하나만 적어볼까요?' },
    calm: { icon: '😐', label: '보통', text: '조용히 책 10분 읽기가 잘 맞아요.' },
    sad: { icon: '😢', label: '속상', text: '토리와 함께 깊게 숨 쉬어봐요.' },
    tired: { icon: '😴', label: '피곤', text: '오늘은 조금 일찍 쉬어도 좋아요.' },
  };

  const books = [
    { title: '오늘의 마음 사전', age: '초등 저학년', desc: '감정을 말로 표현하는 연습' },
    { title: '작은 습관의 힘', age: '초등 고학년', desc: '작은 루틴과 성장 이야기' },
    { title: '토리의 별 모으기', age: '유아~초등', desc: '성취감과 보상 이야기' },
  ];

  const ageLimits = {
    preschool: { label: '유아', max: 30, guide: '한 문장' },
    lower: { label: '저학년', max: 100, guide: '50~100자' },
    upper: { label: '고학년', max: 300, guide: '150~300자' },
    middle: { label: '중등', max: 600, guide: '300~600자' },
  };

  const communityPosts = [
    { category: '식사', title: '오늘 밥을 너무 잘 먹었어요 😊', body: '계란찜이랑 소고기무국 해줬더니 평소보다 잘 먹네요.', comments: ['오 어떤 메뉴 해주셨어요?', '소고기무국 좋네요!'] },
    { category: '수면', title: '잠들기 전 루틴 뭐 하세요?', body: '요즘 잠드는 시간이 늦어져서 독서 루틴 고민 중이에요.', comments: ['저희는 조명 낮추고 책 읽어요.', '따뜻한 물도 도움 됐어요.'] },
  ];

  const currentEmotion = emotionMap[emotion];
  const donePlans = plans.filter((p) => p.status === 'approved').length;
  const pendingPlans = plans.filter((p) => p.status === 'pending');
  const planRate = Math.round((donePlans / plans.length) * 100);
  const stars = donePlans;
  const growth = Math.min(100, 45 + donePlans * 8);
  const todayGoal = plans.find((p) => p.status === 'ready' || p.status === 'doing' || p.status === 'pending') || plans[0];

  const updatePlanStatus = (title, status) => {
    setPlans((prev) => prev.map((p) => (p.title === title ? { ...p, status } : p)));
  };

  const groupedPlans = ['아침', '오후', '저녁'].map((group) => ({
    group,
    icon: plans.find((p) => p.group === group)?.icon,
    items: plans.filter((p) => p.group === group),
  }));

  const Tori = ({ small = false }) => (
    <div style={{ width: small ? 72 : 128, height: small ? 72 : 128, position: 'relative', margin: small ? 0 : '0 auto' }}>
      <div style={{ position: 'absolute', left: small ? 2 : 4, top: small ? 22 : 38, width: small ? 26 : 48, height: small ? 34 : 60, borderRadius: '50%', background: colors.blue, border: `2px solid ${colors.blueDark}`, transform: 'rotate(-18deg)' }} />
      <div style={{ position: 'absolute', right: small ? 2 : 4, top: small ? 22 : 38, width: small ? 26 : 48, height: small ? 34 : 60, borderRadius: '50%', background: colors.blue, border: `2px solid ${colors.blueDark}`, transform: 'rotate(18deg)' }} />
      <div style={{ position: 'absolute', left: small ? 14 : 27, top: small ? 12 : 24, width: small ? 44 : 74, height: small ? 48 : 78, borderRadius: '48% 48% 52% 52%', background: '#D8E8F3', border: `2.5px solid ${colors.blueDark}` }}>
        <div style={{ position: 'absolute', left: small ? 11 : 19, top: small ? 17 : 29, width: 6, height: 6, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', right: small ? 11 : 19, top: small ? 17 : 29, width: 6, height: 6, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', left: small ? 18 : 31, top: small ? 25 : 42, width: small ? 10 : 14, height: small ? 22 : 34, borderRadius: 12, background: '#BFD9EA', border: `2px solid ${colors.blueDark}` }} />
        <div style={{ position: 'absolute', left: small ? 16 : 28, top: small ? 33 : 54, width: small ? 15 : 22, height: 8, borderBottom: `2.5px solid ${colors.primary}`, borderRadius: '50%' }} />
      </div>
      <div style={{ position: 'absolute', right: 8, top: 4, fontSize: small ? 14 : 24 }}>✦</div>
    </div>
  );

  const Shell = ({ children, center = false }) => (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', justifyContent: 'center', alignItems: center ? 'center' : 'flex-start', padding: 20, boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 430, background: center ? colors.surface : 'transparent', borderRadius: center ? 34 : 0, padding: center ? 30 : 0, boxSizing: 'border-box', boxShadow: center ? '0 20px 60px rgba(90,70,45,.12)' : 'none', border: center ? `1px solid ${colors.line}` : 'none', textAlign: center ? 'center' : 'left', paddingBottom: center ? 30 : 96 }}>
        {children}
      </div>
    </div>
  );

  const Panel = ({ children, style = {} }) => (
    <div style={{ background: colors.surface, borderRadius: 28, padding: 20, border: `1px solid ${colors.line}`, boxShadow: '0 14px 40px rgba(90,70,45,.07)', ...style }}>{children}</div>
  );

  const Section = ({ title, caption, children }) => (
    <section style={{ marginTop: 22 }}>
      <h3 style={{ margin: 0, fontSize: 18, color: colors.text }}>{title}</h3>
      {caption && <p style={{ margin: '5px 0 12px', fontSize: 13, color: colors.sub }}>{caption}</p>}
      {children}
    </section>
  );

  const Button = ({ children, onClick, secondary = false }) => (
    <button onClick={onClick} style={{ width: '100%', padding: 16, marginTop: 10, borderRadius: 18, border: secondary ? `1px solid ${colors.line}` : 'none', background: secondary ? colors.surface : colors.primary, color: secondary ? colors.text : '#fff', fontSize: 16, fontWeight: 850, cursor: 'pointer' }}>{children}</button>
  );

  const Input = ({ placeholder, type = 'text' }) => (
    <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '16px 17px', marginBottom: 12, borderRadius: 18, border: `1px solid ${colors.line}`, background: '#FFFCF8', fontSize: 15, boxSizing: 'border-box', outline: 'none', color: colors.text }} />
  );

  const TextArea = ({ value, onChange, placeholder, maxLength }) => (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} style={{ width: '100%', minHeight: 96, padding: 16, borderRadius: 20, border: `1px solid ${colors.line}`, background: '#FFFCF8', boxSizing: 'border-box', resize: 'none', outline: 'none', fontSize: 14, lineHeight: 1.6, color: colors.text }} />
  );

  const Header = ({ title, sub }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 13, color: colors.sub, fontWeight: 750 }}>{sub}</div>
        <h2 style={{ margin: '4px 0 0', color: colors.text }}>{title}</h2>
      </div>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.line}` }}>🔔</div>
    </div>
  );

  const statusButton = (plan) => {
    const base = { border: 'none', borderRadius: 999, padding: '9px 14px', fontWeight: 850, fontSize: 13, cursor: 'pointer' };

    if (plan.status === 'ready') return <button onClick={() => updatePlanStatus(plan.title, 'doing')} style={{ ...base, background: colors.primarySoft, color: colors.primary }}>시작</button>;
    if (plan.status === 'doing') return <button onClick={() => { updatePlanStatus(plan.title, 'pending'); setFeedback('잘했어! 부모님 확인을 기다리고 있어 ⭐'); }} style={{ ...base, background: colors.primary, color: '#fff' }}>완료</button>;
    if (plan.status === 'pending') return <span style={{ ...base, background: '#EEF3EA', color: colors.green, cursor: 'default' }}>확인 중</span>;
    if (plan.status === 'approved') return <span style={{ ...base, background: '#EEF3EA', color: colors.green, cursor: 'default' }}>완료</span>;
  };

  if (screen === 'start') return (
    <Shell center>
      <Tori />
      <h1 style={{ margin: '18px 0 8px', fontSize: 38, color: colors.text }}>Daily Kids</h1>
      <p style={{ color: colors.sub, lineHeight: 1.6 }}>아이의 작은 습관과 마음을<br />매일 성장 데이터로 기록해요.</p>
      <Button onClick={() => setScreen('select')}>시작하기</Button>
    </Shell>
  );

  if (screen === 'select') return (
    <Shell center>
      <Tori small />
      <h2>누가 접속하나요?</h2>
      <Button onClick={() => { setUserType('parent'); setTab('home'); setScreen('login'); }}>부모님으로 시작하기</Button>
      <Button secondary onClick={() => { setUserType('child'); setTab('home'); setScreen('childLogin'); }}>아이로 시작하기</Button>
    </Shell>
  );

  if (screen === 'login') return (
    <Shell center>
      <Tori small />
      <h2>부모님 로그인</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Button onClick={() => setScreen('app')}>로그인</Button>
      <Button secondary onClick={() => setScreen('signup')}>회원가입</Button>
    </Shell>
  );

  if (screen === 'childLogin') return (
    <Shell center>
      <Tori small />
      <h2>아이 접속</h2>
      <Input placeholder="가족 코드 예: DK-2026" />
      <Input placeholder="아이 PIN 4자리" type="password" />
      <Button onClick={() => setScreen('app')}>아이 화면으로 들어가기</Button>
    </Shell>
  );

  if (screen === 'signup') return (
    <Shell center>
      <Tori small />
      <h2>Daily Kids 시작하기</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Input placeholder="비밀번호 확인" type="password" />
      <Button onClick={() => setScreen('parent')}>인증 메일 보내기</Button>
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
      <Button onClick={() => { setUserType('parent'); setTab('home'); setScreen('app'); }}>우리 아이 루틴 만들기</Button>
    </Shell>
  );

  const ChildHome = () => (
    <>
      <Header title="오늘 뭐 해볼까?" sub="Daily Kids" />

      <Panel style={{ padding: 24, background: '#F4EEE6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Tori small />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: colors.sub, fontWeight: 800 }}>오늘의 목표</div>
            <h1 style={{ margin: '6px 0', fontSize: 28, color: colors.text }}>{todayGoal.title}</h1>
            <p style={{ margin: 0, color: colors.sub, fontSize: 14 }}>{todayGoal.time}</p>
          </div>
          {statusButton(todayGoal)}
        </div>
      </Panel>

      {feedback && (
        <div style={{ marginTop: 14, background: colors.primary, color: '#fff', borderRadius: 22, padding: 14, fontWeight: 850, textAlign: 'center' }}>
          {feedback}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <button onClick={() => setTab('plan')} style={bigCardStyle(colors)}>
          <div style={{ fontSize: 30 }}>🗓️</div>
          <b>계획</b>
          <span>할 일 보기</span>
        </button>
        <button onClick={() => setTab('tori')} style={bigCardStyle(colors)}>
          <div style={{ fontSize: 30 }}>🐘</div>
          <b>토리</b>
          <span>별 {stars}개</span>
        </button>
      </div>

      <Section title="오늘의 마음" caption="하나만 골라봐요.">
        <Panel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {Object.entries(emotionMap).map(([key, value]) => (
              <button key={key} onClick={() => setEmotion(key)} style={{ border: emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`, background: emotion === key ? colors.primarySoft : colors.surface, borderRadius: 18, padding: '12px 4px' }}>
                <div style={{ fontSize: 22 }}>{value.icon}</div>
                <div style={{ fontSize: 11, color: colors.sub, fontWeight: 800 }}>{value.label}</div>
              </button>
            ))}
          </div>
          <p style={{ color: colors.text, lineHeight: 1.6, marginBottom: 0 }}>{currentEmotion.text}</p>
        </Panel>
      </Section>

      <Section title="짧은 일기">
        <Panel>
          <TextArea value={diary} onChange={setDiary} placeholder="오늘 좋았던 일을 한 줄만 적어봐요." maxLength={120} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: colors.sub }}>
            <span>{diary.length}/120자</span>
            <button onClick={() => alert('일기가 저장되었어요.')} style={smallButton(colors)}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const ChildPlan = () => (
    <>
      <Header title="생활계획표" sub="오늘의 계획" />

      <Panel style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ color: colors.sub, fontSize: 13, fontWeight: 800 }}>오늘 진행률</div>
        <h1 style={{ margin: '8px 0 6px', color: colors.text }}>{plans.length}개 중 {donePlans}개 완료</h1>
        <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', marginTop: 14, overflow: 'hidden' }}>
          <div style={{ width: `${planRate}%`, height: '100%', background: colors.primary, borderRadius: 999 }} />
        </div>
      </Panel>

      {['아침', '오후', '저녁'].map((group) => {
        const block = plans.filter((p) => p.group === group);
        return (
          <Panel key={group} style={{ marginBottom: 14 }}>
            <b>{block[0]?.icon} {group}</b>
            {block.map((item) => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'center', padding: '13px 0', borderTop: `1px solid ${colors.line}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 850 }}>{item.title}</div>
                  <div style={{ color: colors.sub, fontSize: 13 }}>{item.time}</div>
                </div>
                {statusButton(item)}
              </div>
            ))}
          </Panel>
        );
      })}

      <Section title="오늘 돌아보기">
        <Panel>
          <TextArea value={planDiary} onChange={setPlanDiary} placeholder="오늘 가장 잘한 일은 뭐였나요?" maxLength={100} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: colors.sub }}>
            <span>{planDiary.length}/100자</span>
            <button onClick={() => alert('계획 일기가 저장되었어요.')} style={smallButton(colors)}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const ChildTori = () => (
    <>
      <Header title="토리 성장방" sub="별을 모아 토리를 키워요" />
      <Panel style={{ textAlign: 'center' }}>
        <Tori />
        <h1>토리 Lv.4</h1>
        <p style={{ color: colors.sub }}>별 {stars}개 · 성장률 {growth}%</p>
        <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', overflow: 'hidden' }}>
          <div style={{ width: `${growth}%`, height: '100%', background: colors.primary }} />
        </div>
      </Panel>

      <Section title="독서통장">
        <Panel>
          {books.map((book) => (
            <button key={book.title} onClick={() => setSelectedBook(book.title)} style={{ width: '100%', textAlign: 'left', border: `1px solid ${selectedBook === book.title ? colors.primary : colors.line}`, background: selectedBook === book.title ? colors.primarySoft : colors.surface, borderRadius: 18, padding: 13, marginBottom: 10 }}>
              <b>{book.title}</b>
              <div style={{ color: colors.sub, fontSize: 12 }}>{book.age} · {book.desc}</div>
            </button>
          ))}
          <Button onClick={() => alert('추후 무료 도서 API와 연결 예정입니다.')}>무료 도서 검색</Button>
        </Panel>
      </Section>

      <Section title="독후감">
        <Panel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
            {Object.entries(ageLimits).map(([key, value]) => (
              <button key={key} onClick={() => { setAgeGroup(key); setBookReport(''); }} style={{ border: ageGroup === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`, background: ageGroup === key ? colors.primarySoft : colors.surface, borderRadius: 14, padding: 9, fontWeight: 800, color: colors.sub, fontSize: 11 }}>
                {value.label}
              </button>
            ))}
          </div>
          <TextArea value={bookReport} onChange={setBookReport} placeholder="책에서 기억나는 장면을 적어봐요." maxLength={ageLimits[ageGroup].max} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: colors.sub }}>
            <span>{bookReport.length}/{ageLimits[ageGroup].max}자</span>
            <button onClick={() => alert('독후감이 저장되었어요.')} style={smallButton(colors)}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const ParentHome = () => (
    <>
      <Header title="도윤이 오늘 요약" sub="Parent Dashboard" />
      <Panel>
        <h3 style={{ marginTop: 0 }}>오늘 상태</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={statCard(colors)}>미션 성공률<br /><b>{planRate}%</b></div>
          <div style={statCard(colors)}>오늘 감정<br /><b>{currentEmotion.icon}</b></div>
        </div>
      </Panel>
      <Section title="오늘의 추천">
        <Panel style={{ background: '#F4EEE6' }}>
          <p style={{ margin: 0, lineHeight: 1.7 }}>오늘은 무리한 루틴보다 짧은 대화와 가벼운 활동을 추천해요.</p>
        </Panel>
      </Section>
    </>
  );

  const ParentReport = () => (
    <>
      <Header title="주간 리포트" sub="Parent Dashboard" />
      <Panel>
        <h3 style={{ marginTop: 0 }}>미션 성공 그래프</h3>
        {['월', '화', '수', '목', '금', '토', '일'].map((d, i) => (
          <div key={d} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: colors.sub }}><span>{d}</span><b>{55 + i * 6}%</b></div>
            <div style={{ height: 9, background: colors.soft, borderRadius: 999, marginTop: 5 }}>
              <div style={{ width: `${55 + i * 6}%`, height: '100%', background: colors.primary, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </Panel>
    </>
  );

  const ParentApprove = () => (
    <>
      <Header title="승인 대기" sub="Parent Dashboard" />
      <Panel>
        {pendingPlans.length === 0 && <p style={{ color: colors.sub }}>현재 승인 대기 중인 미션이 없어요.</p>}
        {pendingPlans.map((plan) => (
          <div key={plan.title} style={{ borderTop: `1px solid ${colors.line}`, padding: '14px 0' }}>
            <b>{plan.title}</b>
            <p style={{ color: colors.sub, fontSize: 13 }}>{plan.time} · 완료 요청</p>
            <button onClick={() => updatePlanStatus(plan.title, 'approved')} style={smallButton(colors)}>승인</button>
            <button onClick={() => updatePlanStatus(plan.title, 'ready')} style={{ ...smallButton(colors), background: colors.primarySoft, color: colors.primary, marginLeft: 8 }}>반려</button>
          </div>
        ))}
      </Panel>
    </>
  );

  const ParentCommunity = () => (
    <>
      <Header title="커뮤니티" sub="Parent Talk" />
      {communityPosts.map((post) => (
        <Panel key={post.title} style={{ marginBottom: 14 }}>
          <span style={{ padding: '5px 9px', borderRadius: 999, background: colors.primarySoft, color: colors.primary, fontSize: 12, fontWeight: 850 }}>{post.category}</span>
          <h3>{post.title}</h3>
          <p style={{ color: colors.sub }}>{post.body}</p>
          <div style={{ background: colors.soft, borderRadius: 18, padding: 12 }}>
            {post.comments.map((c) => <div key={c} style={{ fontSize: 13, marginBottom: 6 }}>ㄴ {c}</div>)}
          </div>
        </Panel>
      ))}
      <Button onClick={() => alert('글쓰기 기능은 DB 연결 후 저장됩니다.')}>글쓰기</Button>
    </>
  );

  const ParentGift = () => (
    <>
      <Header title="선물" sub="Parent Dashboard" />
      {['편의점 아이스크림 쿠폰', '어린이 도서 쿠폰', '문구 세트'].map((item) => (
        <Panel key={item} style={{ marginBottom: 12 }}>
          <b>🎁 {item}</b>
          <p style={{ color: colors.sub }}>추후 쇼핑몰/e쿠폰몰 연동 예정</p>
        </Panel>
      ))}
    </>
  );

  const childNavs = [['home', '홈'], ['plan', '계획'], ['tori', '토리']];
  const parentNavs = [['home', '홈'], ['report', '리포트'], ['approve', '승인'], ['community', '커뮤니티'], ['gift', '선물']];
  const navs = userType === 'parent' ? parentNavs : childNavs;

  const BottomNav = () => (
    <div style={{ position: 'fixed', left: '50%', bottom: 14, transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 430, background: 'rgba(255,255,255,.94)', border: `1px solid ${colors.line}`, borderRadius: 24, padding: 8, display: 'grid', gridTemplateColumns: `repeat(${navs.length},1fr)`, boxShadow: '0 16px 45px rgba(90,70,45,.16)' }}>
      {navs.map(([key, label]) => (
        <button key={key} onClick={() => setTab(key)} style={{ border: 'none', borderRadius: 17, padding: '10px 0', background: tab === key ? colors.primarySoft : 'transparent', color: tab === key ? colors.primary : colors.sub, fontWeight: 900, cursor: 'pointer' }}>
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <Shell>
      {userType === 'child' && tab === 'home' && <ChildHome />}
      {userType === 'child' && tab === 'plan' && <ChildPlan />}
      {userType === 'child' && tab === 'tori' && <ChildTori />}

      {userType === 'parent' && tab === 'home' && <ParentHome />}
      {userType === 'parent' && tab === 'report' && <ParentReport />}
      {userType === 'parent' && tab === 'approve' && <ParentApprove />}
      {userType === 'parent' && tab === 'community' && <ParentCommunity />}
      {userType === 'parent' && tab === 'gift' && <ParentGift />}

      <BottomNav />
    </Shell>
  );
}

function bigCardStyle(colors) {
  return {
    border: `1px solid ${colors.line}`,
    background: colors.surface,
    borderRadius: 26,
    padding: 20,
    textAlign: 'left',
    boxShadow: '0 14px 40px rgba(90,70,45,.07)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    color: colors.text,
  };
}

function smallButton(colors) {
  return {
    border: 'none',
    background: colors.primary,
    color: '#fff',
    borderRadius: 999,
    padding: '8px 14px',
    fontWeight: 850,
    cursor: 'pointer',
  };
}

function statCard(colors) {
  return {
    background: colors.soft,
    borderRadius: 20,
    padding: 16,
    color: colors.sub,
    lineHeight: 1.8,
  };
}
