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
    bg: '#F7F3EE',
    surface: '#FFFDF9',
    soft: '#F8EFE8',
    accent: '#D28A6A',
    accentDeep: '#B96E4E',
    accentSoft: '#F7E6DD',
    text: '#2C2926',
    sub: '#7C746D',
    line: '#E6DDD3',
    green: '#8FA982',
    greenSoft: '#EEF3EA',
    blue: '#D7E3EA',
    blueDeep: '#9CB4C2',
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
    preschool: { label: '유아', max: 30 },
    lower: { label: '저학년', max: 100 },
    upper: { label: '고학년', max: 300 },
    middle: { label: '중등', max: 600 },
  };

  const communityPosts = [
    { category: '식사', title: '오늘 밥을 너무 잘 먹었어요', body: '계란찜이랑 소고기무국 해줬더니 평소보다 잘 먹네요.', comments: ['오 어떤 메뉴 해주셨어요?', '소고기무국 좋네요!'] },
    { category: '수면', title: '잠들기 전 루틴 뭐 하세요?', body: '요즘 잠드는 시간이 늦어져서 독서 루틴 고민 중이에요.', comments: ['저희는 조명 낮추고 책 읽어요.', '따뜻한 물도 도움 됐어요.'] },
  ];

  const currentEmotion = emotionMap[emotion];
  const donePlans = plans.filter((p) => p.status === 'approved').length;
  const pendingPlans = plans.filter((p) => p.status === 'pending');
  const planRate = Math.round((donePlans / plans.length) * 100);
  const stars = donePlans;
  const growth = Math.min(100, 45 + donePlans * 8);
  const todayGoal = plans.find((p) => ['ready', 'doing', 'pending'].includes(p.status)) || plans[0];

  const updatePlanStatus = (title, status) => {
    setPlans((prev) => prev.map((p) => (p.title === title ? { ...p, status } : p)));
  };

  const Tori = ({ small = false }) => (
    <div style={{
      width: small ? 64 : 104,
      height: small ? 64 : 104,
      position: 'relative',
      flexShrink: 0,
      margin: small ? 0 : '0 auto',
    }}>
      <div style={{
        position: 'absolute',
        left: small ? 3 : 4,
        top: small ? 22 : 34,
        width: small ? 24 : 40,
        height: small ? 30 : 52,
        borderRadius: '50%',
        background: colors.blue,
        border: `1.5px solid ${colors.blueDeep}`,
        transform: 'rotate(-16deg)',
      }} />
      <div style={{
        position: 'absolute',
        right: small ? 3 : 4,
        top: small ? 22 : 34,
        width: small ? 24 : 40,
        height: small ? 30 : 52,
        borderRadius: '50%',
        background: colors.blue,
        border: `1.5px solid ${colors.blueDeep}`,
        transform: 'rotate(16deg)',
      }} />
      <div style={{
        position: 'absolute',
        left: small ? 13 : 24,
        top: small ? 12 : 20,
        width: small ? 40 : 58,
        height: small ? 44 : 64,
        borderRadius: '48% 48% 52% 52%',
        background: '#E3EEF4',
        border: `2px solid ${colors.blueDeep}`,
      }}>
        <div style={{ position: 'absolute', left: small ? 10 : 15, top: small ? 16 : 24, width: 5, height: 5, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', right: small ? 10 : 15, top: small ? 16 : 24, width: 5, height: 5, borderRadius: '50%', background: colors.text }} />
        <div style={{
          position: 'absolute',
          left: small ? 17 : 25,
          top: small ? 24 : 35,
          width: small ? 9 : 11,
          height: small ? 20 : 26,
          borderRadius: 12,
          background: '#CADDE8',
          border: `1.5px solid ${colors.blueDeep}`,
        }} />
        <div style={{
          position: 'absolute',
          left: small ? 15 : 22,
          top: small ? 32 : 45,
          width: small ? 14 : 18,
          height: 7,
          borderBottom: `2px solid ${colors.accent}`,
          borderRadius: '50%',
        }} />
      </div>
      <div style={{ position: 'absolute', right: small ? 3 : 6, top: small ? 0 : 2, fontSize: small ? 12 : 18, color: colors.accentDeep }}>✦</div>
    </div>
  );

  const Shell = ({ children, center = false }) => (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      display: 'flex',
      justifyContent: 'center',
      alignItems: center ? 'center' : 'flex-start',
      padding: 20,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        background: center ? colors.surface : 'transparent',
        borderRadius: center ? 32 : 0,
        padding: center ? 30 : 0,
        boxSizing: 'border-box',
        boxShadow: center ? '0 18px 48px rgba(80,60,40,.08)' : 'none',
        border: center ? `1px solid ${colors.line}` : 'none',
        textAlign: center ? 'center' : 'left',
        paddingBottom: center ? 30 : 96,
      }}>
        {children}
      </div>
    </div>
  );

  const Panel = ({ children, style = {} }) => (
    <div style={{
      background: colors.surface,
      borderRadius: 28,
      padding: 20,
      border: `1px solid ${colors.line}`,
      boxShadow: '0 8px 24px rgba(80,60,40,.06)',
      ...style,
    }}>
      {children}
    </div>
  );

  const Section = ({ title, caption, children }) => (
    <section style={{ marginTop: 24 }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 750, color: colors.text }}>{title}</h3>
      {caption && <p style={{ margin: '5px 0 12px', fontSize: 13, lineHeight: 1.45, color: colors.sub }}>{caption}</p>}
      {children}
    </section>
  );

  const Button = ({ children, onClick, secondary = false }) => (
    <button onClick={onClick} style={{
      width: '100%',
      padding: 16,
      marginTop: 10,
      borderRadius: 18,
      border: secondary ? `1px solid ${colors.line}` : 'none',
      background: secondary ? colors.surface : colors.accentDeep,
      color: secondary ? colors.text : '#fff',
      fontSize: 15,
      fontWeight: 750,
      cursor: 'pointer',
    }}>
      {children}
    </button>
  );

  const Input = ({ placeholder, type = 'text' }) => (
    <input type={type} placeholder={placeholder} style={{
      width: '100%',
      padding: '16px 17px',
      marginBottom: 12,
      borderRadius: 18,
      border: `1px solid ${colors.line}`,
      background: '#FFFCF8',
      fontSize: 15,
      boxSizing: 'border-box',
      outline: 'none',
      color: colors.text,
    }} />
  );

  const TextArea = ({ value, onChange, placeholder, maxLength }) => (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} style={{
      width: '100%',
      minHeight: 94,
      padding: 0,
      border: 'none',
      background: 'transparent',
      boxSizing: 'border-box',
      resize: 'none',
      outline: 'none',
      fontSize: 15,
      lineHeight: 1.65,
      color: colors.text,
    }} />
  );

  const Header = ({ title, sub }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 12, color: colors.sub, fontWeight: 750, letterSpacing: '.2px' }}>{sub}</div>
        <h2 style={{ margin: '4px 0 0', color: colors.text, fontSize: 24, fontWeight: 760, letterSpacing: '-.5px' }}>{title}</h2>
      </div>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: colors.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${colors.line}`,
        color: colors.sub,
        fontSize: 18,
      }}>◦</div>
    </div>
  );

  const smallButton = {
    border: 'none',
    background: colors.accentDeep,
    color: '#fff',
    borderRadius: 999,
    padding: '8px 15px',
    fontWeight: 750,
    cursor: 'pointer',
  };

  const statusButton = (plan) => {
    const base = {
      border: 'none',
      borderRadius: 999,
      padding: '9px 15px',
      fontWeight: 750,
      fontSize: 13,
      cursor: 'pointer',
    };

    if (plan.status === 'ready') return <button onClick={() => updatePlanStatus(plan.title, 'doing')} style={{ ...base, background: colors.accentSoft, color: colors.accentDeep }}>시작</button>;
    if (plan.status === 'doing') return <button onClick={() => { updatePlanStatus(plan.title, 'pending'); setFeedback('잘했어. 부모님 확인을 기다리고 있어요.'); }} style={{ ...base, background: colors.accentDeep, color: '#fff' }}>완료</button>;
    if (plan.status === 'pending') return <span style={{ ...base, background: colors.greenSoft, color: colors.green, cursor: 'default' }}>확인 중</span>;
    if (plan.status === 'approved') return <span style={{ ...base, background: colors.greenSoft, color: colors.green, cursor: 'default' }}>완료</span>;
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

      <Panel style={{ padding: 24, background: colors.surface }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Tori small />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: colors.sub, fontWeight: 750, marginBottom: 4 }}>오늘의 목표</div>
            <h1 style={{ margin: 0, fontSize: 27, fontWeight: 780, color: colors.text, letterSpacing: '-.6px' }}>{todayGoal.title}</h1>
            <p style={{ margin: '6px 0 0', color: colors.sub, fontSize: 14 }}>{todayGoal.time}</p>
          </div>
          {statusButton(todayGoal)}
        </div>
      </Panel>

      {feedback && (
        <div style={{
          marginTop: 14,
          background: colors.accentDeep,
          color: '#fff',
          borderRadius: 22,
          padding: 14,
          fontWeight: 750,
          textAlign: 'center',
          fontSize: 14,
        }}>
          {feedback}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <button onClick={() => setTab('plan')} style={bigCardStyle(colors)}>
          <div style={iconCircle(colors)}>⌑</div>
          <b>계획</b>
          <span>오늘 할 일 보기</span>
        </button>
        <button onClick={() => setTab('tori')} style={bigCardStyle(colors)}>
          <div style={iconCircle(colors)}>✦</div>
          <b>토리</b>
          <span>별 {stars}개</span>
        </button>
      </div>

      <Section title="오늘의 마음" caption="하나만 골라봐요.">
        <Panel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {Object.entries(emotionMap).map(([key, value]) => (
              <button key={key} onClick={() => setEmotion(key)} style={{
                border: emotion === key ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                background: emotion === key ? colors.accentSoft : colors.surface,
                borderRadius: 18,
                padding: '12px 4px',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: 22 }}>{value.icon}</div>
                <div style={{ fontSize: 11, color: colors.sub, fontWeight: 750, marginTop: 4 }}>{value.label}</div>
              </button>
            ))}
          </div>
          <p style={{ color: colors.text, lineHeight: 1.6, margin: '16px 0 0', fontSize: 14 }}>{currentEmotion.text}</p>
        </Panel>
      </Section>

      <Section title="짧은 일기">
        <Panel>
          <TextArea value={diary} onChange={setDiary} placeholder="오늘 좋았던 일을 한 줄만 적어봐요." maxLength={120} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 12, color: colors.sub }}>
            <span>{diary.length}/120자</span>
            <button onClick={() => alert('일기가 저장되었어요.')} style={smallButton}>저장</button>
          </div>
        </Panel>
      </Section>
    </>
  );

  const ChildPlan = () => (
    <>
      <Header title="생활계획표" sub="오늘의 계획" />
      <Panel style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ color: colors.sub, fontSize: 13, fontWeight: 750 }}>오늘 진행률</div>
        <h1 style={{ margin: '8px 0 6px', color: colors.text }}>{plans.length}개 중 {donePlans}개 완료</h1>
        <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', marginTop: 14, overflow: 'hidden' }}>
          <div style={{ width: `${planRate}%`, height: '100%', background: colors.accentDeep, borderRadius: 999 }} />
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
                  <div style={{ fontWeight: 750 }}>{item.title}</div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: colors.sub }}>
            <span>{planDiary.length}/100자</span>
            <button onClick={() => alert('계획 일기가 저장되었어요.')} style={smallButton}>저장</button>
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
          <div style={{ width: `${growth}%`, height: '100%', background: colors.accentDeep }} />
        </div>
      </Panel>

      <Section title="독서통장">
        <Panel>
          {books.map((book) => (
            <button key={book.title} onClick={() => setSelectedBook(book.title)} style={{ width: '100%', textAlign: 'left', border: `1px solid ${selectedBook === book.title ? colors.accent : colors.line}`, background: selectedBook === book.title ? colors.accentSoft : colors.surface, borderRadius: 18, padding: 13, marginBottom: 10 }}>
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
              <button key={key} onClick={() => { setAgeGroup(key); setBookReport(''); }} style={{ border: ageGroup === key ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`, background: ageGroup === key ? colors.accentSoft : colors.surface, borderRadius: 14, padding: 9, fontWeight: 750, color: colors.sub, fontSize: 11 }}>
                {value.label}
              </button>
            ))}
          </div>
          <TextArea value={bookReport} onChange={setBookReport} placeholder="책에서 기억나는 장면을 적어봐요." maxLength={ageLimits[ageGroup].max} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: colors.sub }}>
            <span>{bookReport.length}/{ageLimits[ageGroup].max}자</span>
            <button onClick={() => alert('독후감이 저장되었어요.')} style={smallButton}>저장</button>
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
        <Panel style={{ background: colors.soft }}>
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
              <div style={{ width: `${55 + i * 6}%`, height: '100%', background: colors.accentDeep, borderRadius: 999 }} />
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
            <button onClick={() => updatePlanStatus(plan.title, 'approved')} style={smallButton}>승인</button>
            <button onClick={() => updatePlanStatus(plan.title, 'ready')} style={{ ...smallButton, background: colors.accentSoft, color: colors.accentDeep, marginLeft: 8 }}>반려</button>
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
          <span style={{ padding: '5px 9px', borderRadius: 999, background: colors.accentSoft, color: colors.accentDeep, fontSize: 12, fontWeight: 750 }}>{post.category}</span>
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
    <div style={{
      position: 'fixed',
      left: '50%',
      bottom: 16,
      transform: 'translateX(-50%)',
      width: 'calc(100% - 40px)',
      maxWidth: 430,
      background: 'rgba(255,253,249,.94)',
      border: `1px solid ${colors.line}`,
      borderRadius: 26,
      padding: 8,
      display: 'grid',
      gridTemplateColumns: `repeat(${navs.length},1fr)`,
      boxShadow: '0 10px 30px rgba(80,60,40,.10)',
      backdropFilter: 'blur(14px)',
    }}>
      {navs.map(([key, label]) => (
        <button key={key} onClick={() => setTab(key)} style={{
          border: 'none',
          borderRadius: 18,
          padding: '10px 0',
          background: tab === key ? colors.accentSoft : 'transparent',
          color: tab === key ? colors.accentDeep : colors.sub,
          fontWeight: 750,
          cursor: 'pointer',
        }}>
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
    borderRadius: 24,
    padding: 18,
    textAlign: 'left',
    boxShadow: '0 8px 24px rgba(80,60,40,.06)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    color: colors.text,
  };
}

function iconCircle(colors) {
  return {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: colors.accentSoft,
    color: colors.accentDeep,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 800,
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
