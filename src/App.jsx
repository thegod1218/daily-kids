import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [tab, setTab] = useState('home');
  const [emotion, setEmotion] = useState('happy');

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

  const routineTasks = [
    { title: '양치하기', desc: '아침 루틴', done: true },
    { title: '숙제하기', desc: '수학 3페이지', done: false },
    { title: '물 마시기', desc: '오늘 4컵 목표', done: true }
  ];

  const schedule = [
    {
      group: '아침',
      icon: '☀️',
      items: [
        { time: '07:30', title: '기상하기', done: true },
        { time: '07:40', title: '양치하기', done: true },
        { time: '08:00', title: '아침 먹기', done: true },
        { time: '08:20', title: '가방 챙기기', done: false }
      ]
    },
    {
      group: '오후',
      icon: '🏫',
      items: [
        { time: '15:00', title: '숙제하기', done: false },
        { time: '16:00', title: '태권도 가기', done: false }
      ]
    },
    {
      group: '저녁',
      icon: '🌙',
      items: [
        { time: '19:00', title: '저녁 먹기', done: true },
        { time: '20:00', title: '독서 10분', done: false },
        { time: '21:00', title: '잠자리 준비', done: false }
      ]
    }
  ];

  const allPlans = schedule.flatMap(s => s.items);
  const donePlans = allPlans.filter(i => i.done).length;
  const planRate = Math.round((donePlans / allPlans.length) * 100);

  const emotionMap = {
    happy: {
      label: '행복',
      icon: '😊',
      solution: '오늘 기분이 좋아 보여요. 좋았던 순간을 짧게 기록해보면 좋아요.',
      content: '좋았던 일 3가지 말하기'
    },
    calm: {
      label: '보통',
      icon: '😐',
      solution: '평온한 하루예요. 조용한 독서나 산책으로 마무리해보세요.',
      content: '10분 독서 루틴'
    },
    sad: {
      label: '속상',
      icon: '😢',
      solution: '속상한 마음이 있었나 봐요. 먼저 마음을 들어주고 쉬는 시간이 필요해요.',
      content: '토리와 3번 숨쉬기'
    },
    tired: {
      label: '피곤',
      icon: '😴',
      solution: '몸이 쉬고 싶다는 신호예요. 오늘은 루틴을 조금 가볍게 줄여보세요.',
      content: '취침 20분 앞당기기'
    }
  };

  const Tori = ({ small = false }) => (
    <div style={{
      width: small ? 70 : 118,
      height: small ? 70 : 118,
      position: 'relative',
      margin: small ? 0 : '0 auto'
    }}>
      <div style={{
        position: 'absolute', left: small ? 2 : 4, top: small ? 22 : 36,
        width: small ? 26 : 46, height: small ? 34 : 58,
        borderRadius: '50%', background: colors.blue,
        border: `2px solid ${colors.blueDark}`, transform: 'rotate(-18deg)'
      }} />
      <div style={{
        position: 'absolute', right: small ? 2 : 4, top: small ? 22 : 36,
        width: small ? 26 : 46, height: small ? 34 : 58,
        borderRadius: '50%', background: colors.blue,
        border: `2px solid ${colors.blueDark}`, transform: 'rotate(18deg)'
      }} />
      <div style={{
        position: 'absolute', left: small ? 14 : 25, top: small ? 12 : 22,
        width: small ? 44 : 70, height: small ? 48 : 74,
        borderRadius: '48% 48% 52% 52%', background: '#D8E8F3',
        border: `2.5px solid ${colors.blueDark}`
      }}>
        <div style={{ position: 'absolute', left: small ? 11 : 18, top: small ? 17 : 28, width: 6, height: 6, borderRadius: '50%', background: colors.text }} />
        <div style={{ position: 'absolute', right: small ? 11 : 18, top: small ? 17 : 28, width: 6, height: 6, borderRadius: '50%', background: colors.text }} />
        <div style={{
          position: 'absolute', left: small ? 18 : 29, top: small ? 25 : 40,
          width: small ? 10 : 14, height: small ? 22 : 32,
          borderRadius: 12, background: '#BFD9EA', border: `2px solid ${colors.blueDark}`
        }} />
        <div style={{
          position: 'absolute', left: small ? 16 : 26, top: small ? 33 : 51,
          width: small ? 15 : 22, height: 7,
          borderBottom: `2.5px solid ${colors.primary}`, borderRadius: '50%'
        }} />
      </div>
      <div style={{ position: 'absolute', right: small ? 4 : 8, top: small ? 2 : 6, fontSize: small ? 14 : 22 }}>✦</div>
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        background: center ? colors.surface : 'transparent',
        borderRadius: center ? 34 : 0,
        padding: center ? 30 : 0,
        boxSizing: 'border-box',
        boxShadow: center ? '0 20px 60px rgba(90,70,45,.12)' : 'none',
        border: center ? `1px solid ${colors.line}` : 'none',
        textAlign: center ? 'center' : 'left',
        paddingBottom: center ? 30 : 90
      }}>
        {children}
      </div>
    </div>
  );

  const Input = ({ placeholder, type = 'text' }) => (
    <input type={type} placeholder={placeholder} style={{
      width: '100%', padding: '16px 17px', marginBottom: 12,
      borderRadius: 18, border: `1px solid ${colors.line}`,
      background: '#FFFCF8', fontSize: 15, boxSizing: 'border-box',
      outline: 'none', color: colors.text
    }} />
  );

  const Button = ({ children, onClick, secondary = false }) => (
    <button onClick={onClick} style={{
      width: '100%', padding: 16, marginTop: 10, borderRadius: 18,
      border: secondary ? `1px solid ${colors.line}` : 'none',
      background: secondary ? colors.surface : colors.primary,
      color: secondary ? colors.text : '#fff',
      fontSize: 16, fontWeight: 800, cursor: 'pointer'
    }}>
      {children}
    </button>
  );

  const Panel = ({ children, style = {} }) => (
    <div style={{
      background: colors.surface,
      borderRadius: 28,
      padding: 20,
      border: `1px solid ${colors.line}`,
      boxShadow: '0 14px 40px rgba(90,70,45,.07)',
      ...style
    }}>
      {children}
    </div>
  );

  const Section = ({ title, caption, children }) => (
    <section style={{ marginTop: 22 }}>
      <h3 style={{ margin: 0, fontSize: 18, color: colors.text }}>{title}</h3>
      {caption && <p style={{ margin: '5px 0 12px', fontSize: 13, color: colors.sub }}>{caption}</p>}
      {children}
    </section>
  );

  if (screen === 'start') {
    return (
      <Shell center>
        <Tori />
        <h1 style={{ margin: '18px 0 8px', fontSize: 38, color: colors.text }}>Daily Kids</h1>
        <p style={{ margin: '0 0 28px', color: colors.sub, lineHeight: 1.6 }}>
          아이의 작은 습관과 마음을<br />매일 성장 데이터로 기록해요.
        </p>
        <Button onClick={() => setScreen('signup')}>이메일로 시작하기</Button>
        <Button secondary onClick={() => setScreen('login')}>로그인</Button>
      </Shell>
    );
  }

  if (screen === 'signup') {
    return (
      <Shell center>
        <Tori small />
        <h2>Daily Kids 시작하기</h2>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        <Button onClick={() => setScreen('verify')}>인증 메일 보내기</Button>
        <p style={{ fontSize: 14, color: colors.sub }}>
          이미 계정이 있으신가요? <span onClick={() => setScreen('login')} style={{ color: colors.primary, fontWeight: 800 }}>로그인</span>
        </p>
      </Shell>
    );
  }

  if (screen === 'login') {
    return (
      <Shell center>
        <Tori small />
        <h2>다시 만나서 반가워요</h2>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Button onClick={() => setScreen('home')}>로그인</Button>
      </Shell>
    );
  }

  if (screen === 'verify') {
    return (
      <Shell center>
        <div style={{ fontSize: 46 }}>✉️</div>
        <h2>인증 메일을 보냈어요</h2>
        <p style={{ color: colors.sub }}>이메일 인증 후 아래 버튼을 눌러주세요.</p>
        <Button onClick={() => setScreen('parent')}>인증 완료했어요</Button>
      </Shell>
    );
  }

  if (screen === 'parent') {
    return (
      <Shell center>
        <Tori small />
        <h2>부모 프로필 설정</h2>
        <Input placeholder="보호자 이름" />
        <Input placeholder="아이와의 관계 예: 엄마, 아빠" />
        <Button onClick={() => setScreen('child')}>다음</Button>
      </Shell>
    );
  }

  if (screen === 'child') {
    return (
      <Shell center>
        <Tori small />
        <h2>아이 등록</h2>
        <Input placeholder="아이 이름" />
        <Input placeholder="생년월일 예: 2018.05.12" />
        <Input placeholder="학교 단계 예: 유아 / 초등 / 중등" />
        <Button onClick={() => setScreen('home')}>우리 아이 루틴 만들기</Button>
      </Shell>
    );
  }

  const currentEmotion = emotionMap[emotion];

  const Header = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 13, color: colors.sub, fontWeight: 700 }}>Daily Kids</div>
        <h2 style={{ margin: '4px 0 0', color: colors.text }}>좋은 아침, 도윤아</h2>
      </div>
      <div style={{
        width: 42, height: 42, borderRadius: '50%', background: colors.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${colors.line}`
      }}>🔔</div>
    </div>
  );

  const Home = () => (
    <>
      <Header />
      <Panel style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Tori />
          <div>
            <div style={{ fontSize: 13, color: colors.sub, fontWeight: 800 }}>Tori Growth</div>
            <h1 style={{ margin: '6px 0', fontSize: 30, color: colors.text }}>토리 Lv.4</h1>
            <p style={{ margin: 0, color: colors.sub, fontSize: 14 }}>오늘도 조금 자라고 있어요.</p>
          </div>
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        <Panel style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: colors.sub, fontWeight: 800 }}>오늘 받은 별</div>
          <div style={{ fontSize: 25, marginTop: 8 }}>⭐⭐⭐</div>
        </Panel>
        <Panel style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: colors.sub, fontWeight: 800 }}>성장률</div>
          <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8, color: colors.text }}>84%</div>
        </Panel>
      </div>

      <Section title="오늘의 마음" caption="감정 상태에 맞춰 AI 솔루션을 추천해요.">
        <Panel>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {Object.keys(emotionMap).map(key => (
              <button key={key} onClick={() => setEmotion(key)} style={{
                flex: 1, border: emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`,
                background: emotion === key ? colors.primarySoft : colors.surface,
                borderRadius: 18, padding: '12px 4px'
              }}>
                <div style={{ fontSize: 22 }}>{emotionMap[key].icon}</div>
                <div style={{ fontSize: 11, color: colors.sub, marginTop: 4, fontWeight: 800 }}>{emotionMap[key].label}</div>
              </button>
            ))}
          </div>
          <div style={{ background: colors.soft, borderRadius: 22, padding: 16 }}>
            <div style={{ fontSize: 13, color: colors.primary, fontWeight: 900, marginBottom: 8 }}>AI 추천 솔루션</div>
            <p style={{ margin: 0, color: colors.text, fontSize: 14, lineHeight: 1.65 }}>{currentEmotion.solution}</p>
          </div>
        </Panel>
      </Section>

      <Section title="맞춤 콘텐츠">
        <Panel style={{ background: '#F4EEE6' }}>
          <strong>{currentEmotion.content}</strong>
          <div style={{ color: colors.sub, fontSize: 13, marginTop: 6 }}>3분 안에 할 수 있는 작은 활동이에요.</div>
        </Panel>
      </Section>
    </>
  );

  const Plan = () => (
    <>
      <Header />
      <Panel style={{ padding: 24 }}>
        <div style={{ color: colors.sub, fontSize: 13, fontWeight: 800 }}>오늘의 생활계획표</div>
        <h1 style={{ margin: '8px 0 6px', color: colors.text, fontSize: 30 }}>
          {allPlans.length}개 중 {donePlans}개 완료
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: colors.sub, marginTop: 14 }}>
          <span>진행률</span>
          <strong style={{ color: colors.text }}>{planRate}%</strong>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', marginTop: 8, overflow: 'hidden' }}>
          <div style={{ width: `${planRate}%`, height: '100%', background: colors.primary, borderRadius: 999 }} />
        </div>
      </Panel>

      <Section title="엄마가 정한 루틴" caption="오늘 하루의 기본 생활 리듬이에요.">
        {schedule.map(block => (
          <Panel key={block.group} style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 900, color: colors.text, marginBottom: 12 }}>
              {block.icon} {block.group}
            </div>
            {block.items.map((item, idx) => (
              <div key={item.title} style={{
                display: 'flex',
                alignItems: 'center',
                padding: idx === 0 ? '0 0 13px' : idx === block.items.length - 1 ? '13px 0 0' : '13px 0',
                borderBottom: idx === block.items.length - 1 ? 'none' : `1px solid ${colors.line}`
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: item.done ? colors.green : colors.soft,
                  border: item.done ? 'none' : `1px solid ${colors.line}`,
                  marginRight: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13
                }}>
                  {item.done ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 850, color: colors.text }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: colors.sub, marginTop: 3 }}>{item.time}</div>
                </div>
                <button style={{
                  border: 'none', borderRadius: 999, padding: '8px 12px',
                  background: item.done ? '#EEF3EA' : colors.primarySoft,
                  color: item.done ? colors.green : colors.primary,
                  fontWeight: 850
                }}>
                  {item.done ? '완료' : '하기'}
                </button>
              </div>
            ))}
          </Panel>
        ))}
      </Section>

      <Section title="내가 고른 도전" caption="스스로 선택한 오늘의 작은 도전이에요.">
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: colors.text }}>그림으로 기분 표현</strong>
              <div style={{ color: colors.sub, fontSize: 13, marginTop: 5 }}>감정표현 미션</div>
            </div>
            <button style={{
              border: 'none', borderRadius: 999, padding: '9px 13px',
              background: colors.primarySoft, color: colors.primary, fontWeight: 850
            }}>
              시작
            </button>
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
        <h2 style={{ color: colors.text }}>{title}</h2>
        <p style={{ color: colors.sub, lineHeight: 1.6 }}>{desc}</p>
      </Panel>
    </>
  );

  const BottomNav = () => {
    const menus = [
      { key: 'home', label: '홈' },
      { key: 'plan', label: '계획' },
      { key: 'money', label: '용돈' },
      { key: 'book', label: '독서' },
      { key: 'tori', label: '토리' }
    ];

    return (
      <div style={{
        position: 'fixed',
        left: '50%',
        bottom: 14,
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 430,
        background: 'rgba(255,255,255,.94)',
        border: `1px solid ${colors.line}`,
        borderRadius: 24,
        padding: 8,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        boxShadow: '0 16px 45px rgba(90,70,45,.16)',
        backdropFilter: 'blur(12px)',
        zIndex: 10
      }}>
        {menus.map(menu => (
          <button key={menu.key} onClick={() => setTab(menu.key)} style={{
            border: 'none',
            background: tab === menu.key ? colors.primarySoft : 'transparent',
            color: tab === menu.key ? colors.primary : colors.sub,
            borderRadius: 17,
            padding: '10px 0',
            fontWeight: 900,
            fontSize: 13
          }}>
            {menu.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <Shell>
      {tab === 'home' && <Home />}
      {tab === 'plan' && <Plan />}
      {tab === 'money' && <Placeholder title="용돈" desc="미션 성공 보상으로 받은 용돈과 포인트를 확인하는 공간이에요." />}
      {tab === 'book' && <Placeholder title="독서통장" desc="읽은 책과 한 줄 감상을 기록하고 독서 별을 모을 수 있어요." />}
      {tab === 'tori' && <Placeholder title="토리 성장방" desc="토리의 레벨, 배지, 아이템을 확인하고 꾸밀 수 있어요." />}
      <BottomNav />
    </Shell>
  );
}
