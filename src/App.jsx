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

  const [plans, setPlans] = useState([
    { group: '아침', icon: '☀️', time: '07:30', title: '기상하기', status: 'approved' },
    { group: '아침', icon: '☀️', time: '07:40', title: '양치하기', status: 'approved' },
    { group: '아침', icon: '☀️', time: '08:20', title: '가방 챙기기', status: 'ready' },
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
    happy: { icon: '😊', label: '행복', text: '오늘 기분이 좋아 보여요. 좋았던 순간을 짧게 기록해보면 좋아요.', contents: ['좋았던 일 3가지 말하기', '가족 산책 15분', '잠들기 전 칭찬 카드'] },
    calm: { icon: '😐', label: '보통', text: '평온한 하루예요. 조용한 독서나 가벼운 정리 루틴이 잘 맞아요.', contents: ['10분 독서 루틴', '방 정리 미션', '차분한 음악 듣기'] },
    sad: { icon: '😢', label: '속상', text: '속상한 마음이 있었나 봐요. 먼저 마음을 들어주고 쉬는 시간이 필요해요.', contents: ['토리와 3번 숨쉬기', '기분 그림 그리기', '부모님과 산책하기'] },
    tired: { icon: '😴', label: '피곤', text: '몸이 쉬고 싶다는 신호예요. 오늘은 루틴을 조금 가볍게 줄여보세요.', contents: ['취침 20분 앞당기기', '따뜻한 물 마시기', '짧은 스트레칭'] },
  };

  const books = [
    { title: '오늘의 마음 사전', age: '초등 저학년', desc: '감정을 말로 표현하는 연습을 도와주는 책' },
    { title: '작은 습관의 힘', age: '초등 고학년', desc: '매일의 습관과 성장에 대해 생각해보는 책' },
    { title: '토리의 별 모으기', age: '유아~초등', desc: '성취감과 보상을 재미있게 이해하는 이야기' },
  ];

  const ageLimits = {
    preschool: { label: '유아', max: 30, guide: '한 문장 또는 그림 설명' },
    lower: { label: '초등 저학년', max: 100, guide: '50~100자 권장' },
    upper: { label: '초등 고학년', max: 300, guide: '150~300자 권장' },
    middle: { label: '중등', max: 600, guide: '300~600자 권장' },
  };

  const checkins = [
    { place: '학교', time: '08:34', status: '도착 확인' },
    { place: '태권도장', time: '16:02', status: '도착 확인' },
    { place: '집', time: '17:21', status: '도착 예정' },
  ];

  const communityPosts = [
    {
      category: '식사',
      title: '우리 아이가 오늘 밥을 너무 잘 먹었어요 😊',
      body: '계란찜이랑 소고기무국 해줬더니 평소보다 훨씬 잘 먹네요.',
      comments: ['오 어떤 메뉴 해주셨어요?', '소고기무국 좋네요. 저도 내일 해봐야겠어요!'],
    },
    {
      category: '수면',
      title: '잠들기 전 루틴 뭐 하세요?',
      body: '요즘 잠드는 시간이 늦어져서 독서 루틴을 넣어볼까 고민 중이에요.',
      comments: ['저희는 조명 낮추고 10분 책 읽어요.', '따뜻한 물 마시는 것도 도움 됐어요.'],
    },
    {
      category: '독서',
      title: '초등 저학년 책 추천 부탁드려요',
      body: '글밥이 너무 많지 않고 감정 표현에 도움 되는 책이면 좋겠어요.',
      comments: ['마음 사전류 책 괜찮았어요!', '그림 많은 책부터 시작하면 좋아요.'],
    },
  ];

  const currentEmotion = emotionMap[emotion];
  const donePlans = plans.filter((p) => p.status === 'approved').length;
  const pendingPlans = plans.filter((p) => p.status === 'pending');
  const planRate = Math.round((donePlans / plans.length) * 100);
  const stars = donePlans;
  const growth = Math.min(100, 50 + donePlans * 7);

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
      <div style={{ position: 'absolute', left: small ? 14 : 27, top: small ? 12 : 24, width: small ? 44 : 74, height: small ? 48 : 78, borderRadius: '48% 48% 52% 52%', background: '#D8E8F3', border: `2.5px solid ${colors.blueDark}`, boxShadow: '0 18px 35px rgba(145,175,196,.22)' }}>
        <div style={{ position: 'absolute', left: small ? 11 : 19, top: small ? 17 : 29, width: small ? 5 : 7, height: small ? 5 : 7, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', right: small ? 11 : 19, top: small ? 17 : 29, width: small ? 5 : 7, height: small ? 5 : 7, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', left: small ? 18 : 31, top: small ? 25 : 42, width: small ? 10 : 14, height: small ? 22 : 34, borderRadius: 12, background: '#BFD9EA', border: `2px solid ${colors.blueDark}` }} />
        <div style={{ position: 'absolute', left: small ? 16 : 28, top: small ? 33 : 54, width: small ? 15 : 22, height: small ? 7 : 9, borderBottom: `2.5px solid ${colors.primary}`, borderRadius: '50%' }} />
      </div>
      <div style={{ position: 'absolute', right: small ? 4 : 8, top: small ? 2 : 6, fontSize: small ? 14 : 24 }}>✦</div>
    </div>
  );

  const Shell = ({ children, center = false }) => (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', justifyContent: 'center', alignItems: center ? 'center' : 'flex-start', padding: 20, boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 430, minHeight: center ? 'auto' : 'calc(100vh - 40px)', background: center ? colors.surface : 'transparent', borderRadius: center ? 34 : 0, padding: center ? 30 : 0, boxSizing: 'border-box', boxShadow: center ? '0 20px 60px rgba(90,70,45,.12)' : 'none', border: center ? `1px solid ${colors.line}` : 'none', textAlign: center ? 'center' : 'left', paddingBottom: center ? 30 : 96 }}>
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
    <button onClick={onClick} style={{ width: '100%', padding: 16, marginTop: 10, borderRadius: 18, border: secondary ? `1px solid ${colors.line}` : 'none', background: secondary ? colors.surface : colors.primary, color: secondary ? colors.text : '#fff', fontSize: 16, fontWeight: 850, cursor: 'pointer', boxShadow: secondary ? 'none' : '0 10px 25px rgba(217,140,95,.25)' }}>{children}</button>
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
        <h2 style={{ margin: '4px 0 0', color: colors.text, letterSpacing: '-.5px' }}>{title}</h2>
      </div>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.line}` }}>🔔</div>
    </div>
  );

  const statusButton = (plan) => {
    const base = { border: 'none', borderRadius: 999, padding: '8px 12px', fontWeight: 850, fontSize: 12, cursor: 'pointer' };
    if (plan.status === 'ready') return <button onClick={() => updatePlanStatus(plan.title, 'doing')} style={{ ...base, background: colors.primarySoft, color: colors.primary }}>하기</button>;
    if (plan.status === 'doing') return <button onClick={() => updatePlanStatus(plan.title, 'pending')} style={{ ...base, background: colors.primary, color: '#fff' }}>완료했어요</button>;
    if (plan.status === 'pending') return <span style={{ ...base, background: '#EEF3EA', color: colors.green, cursor: 'default' }}>확인 중</span>;
    if (plan.status === 'approved') return <span style={{ ...base, background: '#EEF3EA', color: colors.green, cursor: 'default' }}>승인 완료</span>;
  };

  if (screen === 'start') return (
    <Shell center>
      <Tori />
      <h1 style={{ margin: '18px 0 8px', fontSize: 38, color: colors.text, letterSpacing: '-1px' }}>Daily Kids</h1>
      <p style={{ margin: '0 0 28px', color: colors.sub, lineHeight: 1.6 }}>아이의 작은 습관과 마음을<br />매일 성장 데이터로 기록해요.</p>
      <Button onClick={() => setScreen('select')}>시작하기</Button>
    </Shell>
  );

  if (screen === 'select') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>누가 접속하나요?</h2>
      <p style={{ color: colors.sub }}>부모님과 아이 화면을 다르게 보여드려요.</p>
      <Button onClick={() => { setUserType('parent'); setTab('home'); setScreen('login'); }}>부모님으로 시작하기</Button>
      <Button secondary onClick={() => { setUserType('child'); setTab('home'); setScreen('childLogin'); }}>아이로 시작하기</Button>
    </Shell>
  );

  if (screen === 'login') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>부모님 로그인</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Button onClick={() => setScreen('app')}>로그인</Button>
      <Button secondary onClick={() => setScreen('signup')}>회원가입</Button>
    </Shell>
  );

  if (screen === 'childLogin') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>아이 접속</h2>
      <p style={{ color: colors.sub }}>가족 코드나 PIN으로 간단히 접속해요.</p>
      <Input placeholder="가족 코드 예: DK-2026" />
      <Input placeholder="아이 PIN 4자리" type="password" />
      <Button onClick={() => setScreen('app')}>아이 화면으로 들어가기</Button>
      <Button secondary onClick={() => setScreen('select')}>뒤로</Button>
    </Shell>
  );

  if (screen === 'signup') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>Daily Kids 시작하기</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Input placeholder="비밀번호 확인" type="password" />
      <Button onClick={() => setScreen('parent')}>인증 메일 보내기</Button>
    </Shell>
  );

  if (screen === 'parent') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>부모 프로필 설정</h2>
      <Input placeholder="보호자 이름" />
      <Input placeholder="아이와의 관계 예: 엄마, 아빠" />
      <Button onClick={() => setScreen('child')}>다음</Button>
    </Shell>
  );

  if (screen === 'child') return (
    <Shell center>
      <Tori small />
      <h2 style={{ color: colors.text }}>아이 등록</h2>
      <Input placeholder="아이 이름" />
      <Input placeholder="생년월일 예: 2018.05.12" />
      <Input placeholder="학교 단계 예: 유아 / 초등 / 중등" />
      <Button onClick={() => { setUserType('parent'); setTab('home'); setScreen('app'); }}>우리 아이 루틴 만들기</Button>
    </Shell>
  );

  const ChildHome = () => (
    <>
      <Header title="좋은 아침, 도윤아" sub="Daily Kids" />
      <Panel style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Tori />
          <div>
            <div style={{ fontSize: 13, color: colors.sub, fontWeight: 800 }}>Tori Growth</div>
            <h1 style={{ margin: '6px 0', fontSize: 30, color: colors.text }}>토리 Lv.4</h1>
            <p style={{ margin: 0, color: colors.sub, fontSize: 14 }}>별 {stars}개 · 성장률 {growth}%</p>
          </div>
        </div>
      </Panel>

      <Section title="오늘의 마음" caption="감정 상태에 맞춰 AI 솔루션을 추천해요.">
        <Panel>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {Object.entries(emotionMap).map(([key, value]) => (
              <button key={key} onClick={() => setEmotion(key)} style={{ flex: 1, border: emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`, background: emotion === key ? colors.primarySoft : colors.surface, borderRadius: 18, padding: '12px 4px', cursor: 'pointer' }}>
                <div style={{ fontSize: 22 }}>{value.icon}</div>
                <div style={{ fontSize: 11, color: colors.sub, marginTop: 4, fontWeight: 800 }}>{value.label}</div>
              </button>
            ))}
          </div>
          <div style={{ background: colors.soft, borderRadius: 22, padding: 16 }}>
            <div style={{ fontSize: 13, color: colors.primary, fontWeight: 900, marginBottom: 8 }}>AI 추천 솔루션</div>
            <p style={{ margin: 0, color: colors.text, fontSize: 14, lineHeight: 1.65 }}>{currentEmotion.text}</p>
          </div>
        </Panel>
      </Section>

      <Section title="오늘의 일기" caption="짧게라도 오늘의 마음을 남겨요.">
        <Panel>
          <TextArea value={diary} onChange={setDiary} placeholder="오늘 좋았던 일이나 속상했던 일을 적어보세요." maxLength={120} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: colors.sub, fontSize: 12 }}>
            <span>{diary.length}/120자</span>
            <button onClick={() => alert('일기가 저장되었어요.')} style={{ border: 'none', background: colors.primary, color: '#fff', borderRadius: 999, padding: '8px 14px', fontWeight: 800 }}>저장</button>
          </div>
        </Panel>
      </Section>

      <Section title="맞춤 콘텐츠" caption="아이 상태에 맞춰 오늘 해볼 활동을 추천해요.">
        <div style={{ display: 'grid', gap: 12 }}>
          {currentEmotion.contents.map((item, idx) => (
            <Panel key={item} style={{ padding: 16, background: idx === 0 ? '#F4EEE6' : colors.surface }}>
              <div style={{ fontWeight: 900, color: colors.text }}>{idx + 1}. {item}</div>
              <div style={{ color: colors.sub, fontSize: 13, marginTop: 6 }}>3분 안에 시작할 수 있는 작은 활동이에요.</div>
              <button onClick={() => alert(`${item} 콘텐츠를 시작합니다.`)} style={{ marginTop: 12, border: 'none', background: colors.primarySoft, color: colors.primary, borderRadius: 999, padding: '8px 13px', fontWeight: 850 }}>시작하기</button>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );

  const ChildPlan = () => (
    <>
      <Header title="오늘의 생활계획표" sub="아이 화면" />
      <Panel style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ color: colors.sub, fontSize: 13, fontWeight: 800 }}>오늘의 진행률</div>
        <h1 style={{ margin: '8px 0 6px', color: colors.text, fontSize: 30 }}>{plans.length}개 중 {donePlans}개 완료</h1>
        <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', marginTop: 14, overflow: 'hidden' }}>
          <div style={{ width: `${planRate}%`, height: '100%', background: colors.primary, borderRadius: 999 }} />
        </div>
      </Panel>

      {groupedPlans.map((block) => (
        <Panel key={block.group} style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 900, color: colors.text, marginBottom: 12 }}>{block.icon} {block.group}</div>
          {block.items.map((item, idx) => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', padding: idx === 0 ? '0 0 13px' : '13px 0', borderTop: idx === 0 ? 'none' : `1px solid ${colors.line}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 850, color: colors.text }}>{item.title}</div>
                <div style={{ fontSize: 13, color: colors.sub, marginTop: 3 }}>{item.time}</div>
              </div>
              {statusButton(item)}
            </div>
          ))}
        </Panel>
      ))}

      <Section title="오늘 돌아보기" caption="계획을 마친 뒤 한 줄 일기를 남겨요.">
        <Panel>
          <TextArea value={planDiary} onChange={setPlanDiary} placeholder="오늘 계획 중 가장 잘한 일은 무엇인가요?" maxLength={100} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: colors.sub, fontSize: 12 }}>
            <span>{planDiary.length}/100자</span>
            <button onClick={() => alert('계획 일기가 저장되었어요.')} style={{ border: 'none', background: colors.primary, color: '#fff', borderRadius: 999, padding: '8px 14px', fontWeight: 800 }}>저장</button>
          </div>
        </Panel>
      </Section>

      <Section title="안심 체크인" caption="학교·학원·집 등 지정 장소 도착을 확인해요.">
        <Panel>
          <p style={{ color: colors.sub, lineHeight: 1.6, marginTop: 0 }}>실시간 감시가 아니라 지정 장소 도착 여부만 확인하는 방식이에요.</p>
          <Button onClick={() => alert('실제 앱 단계에서 위치 권한 동의 후 연결됩니다.')}>현재 위치 체크인</Button>
        </Panel>
      </Section>
    </>
  );

  const ChildBook = () => {
    const limit = ageLimits[ageGroup];
    return (
      <>
        <Header title="독서통장" sub="Daily Kids" />
        <Section title="연령별 추천 도서" caption="추후 무료 도서 API와 연결해 실제 도서를 추천할 예정이에요.">
          <Panel>
            {books.map((book) => (
              <button key={book.title} onClick={() => setSelectedBook(book.title)} style={{ width: '100%', textAlign: 'left', border: `1px solid ${selectedBook === book.title ? colors.primary : colors.line}`, background: selectedBook === book.title ? colors.primarySoft : colors.surface, borderRadius: 20, padding: 14, marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ fontWeight: 900, color: colors.text }}>{book.title}</div>
                <div style={{ color: colors.sub, fontSize: 12, marginTop: 4 }}>{book.age} · {book.desc}</div>
              </button>
            ))}
            <Button onClick={() => alert('추후 도서관 정보나루/국립중앙도서관 API와 연결 예정입니다.')}>무료 도서 검색하기</Button>
          </Panel>
        </Section>

        <Section title="독후감 작성" caption={`${limit.label} 기준 · ${limit.guide}`}>
          <Panel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
              {Object.entries(ageLimits).map(([key, value]) => (
                <button key={key} onClick={() => { setAgeGroup(key); setBookReport(''); }} style={{ border: ageGroup === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`, background: ageGroup === key ? colors.primarySoft : colors.surface, borderRadius: 16, padding: '10px 4px', color: colors.sub, fontWeight: 800, fontSize: 12 }}>
                  {value.label}
                </button>
              ))}
            </div>
            <div style={{ color: colors.sub, fontSize: 13, marginBottom: 10 }}>선택한 책: <b style={{ color: colors.text }}>{selectedBook}</b></div>
            <TextArea value={bookReport} onChange={setBookReport} placeholder="이 책에서 가장 기억에 남는 장면을 적어보세요." maxLength={limit.max} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: colors.sub, fontSize: 12 }}>
              <span>{bookReport.length}/{limit.max}자</span>
              <button onClick={() => alert('독후감이 저장되었어요.')} style={{ border: 'none', background: colors.primary, color: '#fff', borderRadius: 999, padding: '8px 14px', fontWeight: 800 }}>저장</button>
            </div>
          </Panel>
        </Section>
      </>
    );
  };

  const ParentHome = () => (
    <>
      <Header title="도윤이 오늘 요약" sub="Parent Dashboard" />
      <Panel>
        <h3 style={{ marginTop: 0 }}>오늘 상태</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: colors.soft, borderRadius: 20, padding: 16, color: colors.sub }}>미션 성공률<br /><b style={{ color: colors.text, fontSize: 24 }}>{planRate}%</b></div>
          <div style={{ background: colors.soft, borderRadius: 20, padding: 16, color: colors.sub }}>오늘 감정<br /><b style={{ color: colors.text, fontSize: 24 }}>{currentEmotion.icon}</b></div>
        </div>
      </Panel>
      <Section title="오늘의 추천" caption="오늘 바로 해볼 수 있는 행동 추천이에요.">
        <Panel style={{ background: '#F4EEE6' }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: colors.text }}>도윤이의 오늘 감정은 <b>{currentEmotion.label}</b> 상태예요. 오늘은 무리한 루틴보다 짧은 대화와 가벼운 활동을 추천해요.</p>
        </Panel>
      </Section>
      <Section title="안심 체크인">
        <Panel>
          {checkins.map((item, idx) => (
            <div key={item.place} style={{ display: 'flex', justifyContent: 'space-between', padding: idx === 0 ? '0 0 13px' : '13px 0', borderTop: idx === 0 ? 'none' : `1px solid ${colors.line}` }}>
              <div><b>{item.place}</b><div style={{ color: colors.sub, fontSize: 13 }}>{item.status}</div></div>
              <b>{item.time}</b>
            </div>
          ))}
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
      <Section title="AI 패턴 코멘트">
        <Panel>
          <p style={{ margin: 0, lineHeight: 1.7 }}>최근 오후 루틴 완료율이 낮아요. 학원 이후 피로도가 높을 수 있어 저녁 루틴을 1개 줄이는 것을 추천해요.</p>
        </Panel>
      </Section>
    </>
  );

  const ParentApprove = () => (
    <>
      <Header title="승인 대기" sub="Parent Dashboard" />
      <Panel>
        <h3 style={{ marginTop: 0 }}>미션 완료 요청</h3>
        {pendingPlans.length === 0 && <p style={{ color: colors.sub }}>현재 승인 대기 중인 미션이 없어요.</p>}
        {pendingPlans.map((plan) => (
          <div key={plan.title} style={{ borderTop: `1px solid ${colors.line}`, padding: '14px 0' }}>
            <b>{plan.title}</b>
            <p style={{ color: colors.sub, fontSize: 13 }}>{plan.time} · 도윤이가 완료했다고 요청했어요.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => updatePlanStatus(plan.title, 'approved')} style={{ border: 'none', background: colors.primary, color: '#fff', borderRadius: 999, padding: '9px 14px', fontWeight: 850 }}>승인</button>
              <button onClick={() => updatePlanStatus(plan.title, 'ready')} style={{ border: 'none', background: colors.primarySoft, color: colors.primary, borderRadius: 999, padding: '9px 14px', fontWeight: 850 }}>반려</button>
            </div>
          </div>
        ))}
      </Panel>
    </>
  );

  const ParentCommunity = () => (
    <>
      <Header title="커뮤니티" sub="Parent Talk" />
      <Section title="맘톡" caption="식사·수면·학습·감정에 대한 경험을 나눠요.">
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 12 }}>
          {['전체', '식사', '수면', '독서', '학원/학교', '감정/훈육'].map((tag, idx) => (
            <button key={tag} style={{ border: 'none', borderRadius: 999, padding: '9px 13px', background: idx === 0 ? colors.primary : colors.primarySoft, color: idx === 0 ? '#fff' : colors.primary, fontWeight: 850, whiteSpace: 'nowrap' }}>{tag}</button>
          ))}
        </div>
        {communityPosts.map((post) => (
          <Panel key={post.title} style={{ marginBottom: 14 }}>
            <div style={{ display: 'inline-block', padding: '5px 9px', borderRadius: 999, background: colors.primarySoft, color: colors.primary, fontSize: 12, fontWeight: 850 }}>{post.category}</div>
            <h3 style={{ color: colors.text, marginBottom: 6 }}>{post.title}</h3>
            <p style={{ color: colors.sub, lineHeight: 1.6 }}>{post.body}</p>
            <div style={{ background: colors.soft, borderRadius: 18, padding: 12 }}>
              {post.comments.map((comment) => (
                <div key={comment} style={{ color: colors.text, fontSize: 13, marginBottom: 6 }}>ㄴ {comment}</div>
              ))}
            </div>
          </Panel>
        ))}
        <Button onClick={() => alert('글쓰기 기능은 추후 계정/DB 연결 후 저장됩니다.')}>글쓰기</Button>
      </Section>
    </>
  );

  const ParentGift = () => (
    <>
      <Header title="선물" sub="Parent Dashboard" />
      <Section title="보상 추천" caption="미션 달성률에 맞춰 선물을 추천해요.">
        {['편의점 아이스크림 쿠폰', '어린이 도서 쿠폰', '문구 세트'].map((item) => (
          <Panel key={item} style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontWeight: 900 }}>🎁 {item}</div>
            <div style={{ color: colors.sub, fontSize: 13, marginTop: 6 }}>추후 쇼핑몰/e쿠폰몰 연동 예정</div>
          </Panel>
        ))}
      </Section>
    </>
  );

  const Placeholder = ({ title }) => (
    <>
      <Header title={title} sub={userType === 'parent' ? 'Parent Dashboard' : 'Daily Kids'} />
      <Panel><Tori small /><p style={{ textAlign: 'center', color: colors.sub }}>준비 중인 화면이에요.</p></Panel>
    </>
  );

  const navs = userType === 'parent'
    ? [['home', '홈'], ['report', '리포트'], ['approve', '승인'], ['community', '커뮤니티'], ['gift', '선물']]
    : [['home', '홈'], ['plan', '계획'], ['money', '용돈'], ['book', '독서'], ['tori', '토리']];

  const BottomNav = () => (
    <div style={{ position: 'fixed', left: '50%', bottom: 14, transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 430, background: 'rgba(255,255,255,.94)', border: `1px solid ${colors.line}`, borderRadius: 24, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', boxShadow: '0 16px 45px rgba(90,70,45,.16)', backdropFilter: 'blur(12px)' }}>
      {navs.map(([key, label]) => (
        <button key={key} onClick={() => setTab(key)} style={{ border: 'none', borderRadius: 17, padding: '10px 0', background: tab === key ? colors.primarySoft : 'transparent', color: tab === key ? colors.primary : colors.sub, fontWeight: 900, fontSize: 13, cursor: 'pointer' }}>
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <Shell>
      {userType === 'child' && tab === 'home' && <ChildHome />}
      {userType === 'child' && tab === 'plan' && <ChildPlan />}
      {userType === 'child' && tab === 'book' && <ChildBook />}
      {userType === 'child' && !['home', 'plan', 'book'].includes(tab) && <Placeholder title={navs.find((n) => n[0] === tab)?.[1]} />}

      {userType === 'parent' && tab === 'home' && <ParentHome />}
      {userType === 'parent' && tab === 'report' && <ParentReport />}
      {userType === 'parent' && tab === 'approve' && <ParentApprove />}
      {userType === 'parent' && tab === 'community' && <ParentCommunity />}
      {userType === 'parent' && tab === 'gift' && <ParentGift />}

      <BottomNav />
    </Shell>
  );
}
