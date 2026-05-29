import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [emotion, setEmotion] = useState('happy');

  const colors = {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceSoft: '#F8F2EA',
    primary: '#D98C5F',
    primarySoft: '#F4DFD0',
    blue: '#C8D9E6',
    blueDark: '#91AFC4',
    text: '#232323',
    sub: '#7A756F',
    line: '#E8DED2',
    green: '#9BAF92',
    yellow: '#F2C94C'
  };

  const routineTasks = [
    { title: '양치하기', desc: '아침 루틴', done: true },
    { title: '숙제하기', desc: '수학 3페이지', done: false },
    { title: '물 마시기', desc: '오늘 4컵 목표', done: true }
  ];

  const challengeTasks = [
    { title: '책 10분 읽기', tag: '집중력' },
    { title: '방 정리하기', tag: '생활습관' },
    { title: '그림으로 기분 표현', tag: '감정표현' }
  ];

  const emotionMap = {
    happy: {
      label: '행복해요',
      icon: '😊',
      solution: '오늘 기분이 좋아 보여요. 기분 좋았던 순간을 그림이나 짧은 말로 남겨보면 좋아요.',
      content: '오늘의 추천: 잠들기 전 “좋았던 일 3가지” 말하기'
    },
    calm: {
      label: '괜찮아요',
      icon: '😐',
      solution: '평온한 하루예요. 짧은 독서나 조용한 놀이로 하루를 마무리해보세요.',
      content: '오늘의 추천: 10분 독서 루틴'
    },
    sad: {
      label: '속상해요',
      icon: '😢',
      solution: '조금 속상한 마음이 있었나 봐요. 먼저 마음을 인정해주고, 깊게 숨 쉬는 시간을 가져보세요.',
      content: '오늘의 추천: 토리와 3번 숨쉬기'
    },
    tired: {
      label: '피곤해요',
      icon: '😴',
      solution: '몸이 쉬고 싶다는 신호일 수 있어요. 오늘은 루틴을 가볍게 줄이고 일찍 쉬는 걸 추천해요.',
      content: '오늘의 추천: 취침 20분 앞당기기'
    }
  };

  const completed = routineTasks.filter(t => t.done).length;
  const growth = 72 + completed * 4;

  const Tori = ({ small = false }) => (
    <div style={{
      width: small ? 72 : 128,
      height: small ? 72 : 128,
      position: 'relative',
      margin: small ? 0 : '0 auto'
    }}>
      <div style={{
        position: 'absolute',
        left: small ? 2 : 4,
        top: small ? 22 : 38,
        width: small ? 26 : 48,
        height: small ? 34 : 60,
        borderRadius: '50%',
        background: colors.blue,
        border: `2px solid ${colors.blueDark}`,
        transform: 'rotate(-18deg)'
      }} />
      <div style={{
        position: 'absolute',
        right: small ? 2 : 4,
        top: small ? 22 : 38,
        width: small ? 26 : 48,
        height: small ? 34 : 60,
        borderRadius: '50%',
        background: colors.blue,
        border: `2px solid ${colors.blueDark}`,
        transform: 'rotate(18deg)'
      }} />
      <div style={{
        position: 'absolute',
        left: small ? 14 : 27,
        top: small ? 12 : 24,
        width: small ? 44 : 74,
        height: small ? 48 : 78,
        borderRadius: '48% 48% 52% 52%',
        background: '#D8E8F3',
        border: `2.5px solid ${colors.blueDark}`,
        boxShadow: '0 18px 35px rgba(145,175,196,.22)'
      }}>
        <div style={{
          position: 'absolute',
          left: small ? 11 : 19,
          top: small ? 17 : 29,
          width: small ? 5 : 7,
          height: small ? 5 : 7,
          borderRadius: '50%',
          background: colors.text
        }} />
        <div style={{
          position: 'absolute',
          right: small ? 11 : 19,
          top: small ? 17 : 29,
          width: small ? 5 : 7,
          height: small ? 5 : 7,
          borderRadius: '50%',
          background: colors.text
        }} />
        <div style={{
          position: 'absolute',
          left: small ? 18 : 31,
          top: small ? 25 : 42,
          width: small ? 10 : 14,
          height: small ? 22 : 34,
          borderRadius: 12,
          background: '#BFD9EA',
          border: `2px solid ${colors.blueDark}`
        }} />
        <div style={{
          position: 'absolute',
          left: small ? 16 : 28,
          top: small ? 33 : 54,
          width: small ? 15 : 22,
          height: small ? 7 : 9,
          borderBottom: `2.5px solid ${colors.primary}`,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          left: small ? 7 : 12,
          top: small ? 28 : 45,
          width: small ? 6 : 9,
          height: small ? 3 : 5,
          borderRadius: '50%',
          background: '#E9A98A'
        }} />
        <div style={{
          position: 'absolute',
          right: small ? 7 : 12,
          top: small ? 28 : 45,
          width: small ? 6 : 9,
          height: small ? 3 : 5,
          borderRadius: '50%',
          background: '#E9A98A'
        }} />
      </div>
      <div style={{
        position: 'absolute',
        right: small ? 4 : 8,
        top: small ? 2 : 6,
        fontSize: small ? 14 : 24
      }}>
        ✦
      </div>
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
        minHeight: center ? 'auto' : 'calc(100vh - 40px)',
        background: center ? colors.surface : 'transparent',
        borderRadius: center ? 34 : 0,
        padding: center ? 30 : 0,
        boxSizing: 'border-box',
        boxShadow: center ? '0 20px 60px rgba(90,70,45,.12)' : 'none',
        border: center ? `1px solid ${colors.line}` : 'none',
        textAlign: center ? 'center' : 'left'
      }}>
        {children}
      </div>
    </div>
  );

  const Input = ({ placeholder, type = 'text' }) => (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '16px 17px',
        marginBottom: 12,
        borderRadius: 18,
        border: `1px solid ${colors.line}`,
        background: '#FFFCF8',
        fontSize: 15,
        boxSizing: 'border-box',
        outline: 'none',
        color: colors.text
      }}
    />
  );

  const Button = ({ children, onClick, secondary = false }) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 16,
        marginTop: 10,
        borderRadius: 18,
        border: secondary ? `1px solid ${colors.line}` : 'none',
        background: secondary ? colors.surface : colors.primary,
        color: secondary ? colors.text : '#fff',
        fontSize: 16,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: secondary ? 'none' : '0 10px 25px rgba(217,140,95,.25)'
      }}
    >
      {children}
    </button>
  );

  const Section = ({ title, caption, children }) => (
    <section style={{ marginTop: 22 }}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18, color: colors.text }}>{title}</h3>
        {caption && <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.sub }}>{caption}</p>}
      </div>
      {children}
    </section>
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

  if (screen === 'start') {
    return (
      <Shell center>
        <Tori />
        <h1 style={{ margin: '18px 0 8px', fontSize: 38, color: colors.text, letterSpacing: '-1px' }}>
          Daily Kids
        </h1>
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
        <h2 style={{ color: colors.text }}>Daily Kids 시작하기</h2>
        <p style={{ color: colors.sub, fontSize: 14 }}>이메일 인증으로 간편하게 가입해요.</p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        <Button onClick={() => setScreen('verify')}>인증 메일 보내기</Button>
        <p style={{ fontSize: 14, color: colors.sub }}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => setScreen('login')} style={{ color: colors.primary, fontWeight: 800, cursor: 'pointer' }}>
            로그인
          </span>
        </p>
      </Shell>
    );
  }

  if (screen === 'login') {
    return (
      <Shell center>
        <Tori small />
        <h2 style={{ color: colors.text }}>다시 만나서 반가워요</h2>
        <p style={{ color: colors.sub, fontSize: 14 }}>Daily Kids에 로그인하세요.</p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Button onClick={() => setScreen('home')}>로그인</Button>
        <p style={{ fontSize: 14, color: colors.sub }}>
          처음이신가요?{' '}
          <span onClick={() => setScreen('signup')} style={{ color: colors.primary, fontWeight: 800, cursor: 'pointer' }}>
            회원가입
          </span>
        </p>
      </Shell>
    );
  }

  if (screen === 'verify') {
    return (
      <Shell center>
        <div style={{ fontSize: 46 }}>✉️</div>
        <h2 style={{ color: colors.text }}>인증 메일을 보냈어요</h2>
        <p style={{ color: colors.sub, lineHeight: 1.6 }}>
          이메일에서 인증 버튼을 누른 뒤<br />아래 버튼을 눌러주세요.
        </p>
        <Button onClick={() => setScreen('parent')}>인증 완료했어요</Button>
        <Button secondary onClick={() => setScreen('signup')}>메일 다시 보내기</Button>
      </Shell>
    );
  }

  if (screen === 'parent') {
    return (
      <Shell center>
        <Tori small />
        <h2 style={{ color: colors.text }}>부모 프로필 설정</h2>
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
        <h2 style={{ color: colors.text }}>아이 등록</h2>
        <Input placeholder="아이 이름" />
        <Input placeholder="생년월일 예: 2018.05.12" />
        <Input placeholder="학교 단계 예: 유아 / 초등 / 중등" />
        <Button onClick={() => setScreen('home')}>우리 아이 루틴 만들기</Button>
      </Shell>
    );
  }

  const currentEmotion = emotionMap[emotion];

  return (
    <Shell>
      <div style={{ paddingBottom: 34 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18
        }}>
          <div>
            <div style={{ fontSize: 13, color: colors.sub, fontWeight: 700 }}>Daily Kids</div>
            <h2 style={{ margin: '4px 0 0', color: colors.text, letterSpacing: '-.5px' }}>
              좋은 아침, 도윤아
            </h2>
          </div>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: colors.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${colors.line}`
          }}>
            🔔
          </div>
        </div>

        <Panel style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Tori />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: colors.sub, fontWeight: 800 }}>Tori Growth</div>
              <h1 style={{ margin: '6px 0', fontSize: 30, color: colors.text, letterSpacing: '-1px' }}>
                토리 Lv.4
              </h1>
              <p style={{ margin: 0, color: colors.sub, fontSize: 14, lineHeight: 1.5 }}>
                미션을 완료할수록 토리가 조금씩 자라요.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: colors.sub, marginBottom: 8 }}>
              <span>오늘의 성장률</span>
              <strong style={{ color: colors.text }}>{growth}%</strong>
            </div>
            <div style={{ height: 10, borderRadius: 999, background: '#EEE4D8', overflow: 'hidden' }}>
              <div style={{
                width: `${growth}%`,
                height: '100%',
                borderRadius: 999,
                background: colors.primary
              }} />
            </div>
          </div>
        </Panel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginTop: 14
        }}>
          <Panel style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: colors.sub, fontWeight: 800 }}>오늘 받은 별</div>
            <div style={{ fontSize: 25, marginTop: 8 }}>⭐⭐⭐</div>
          </Panel>
          <Panel style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: colors.sub, fontWeight: 800 }}>연속 달성</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8, color: colors.text }}>7일</div>
          </Panel>
        </div>

        <Section title="오늘의 루틴" caption="부모가 정해준 기본 미션이에요.">
          <Panel>
            {routineTasks.map((task, idx) => (
              <div key={task.title} style={{
                display: 'flex',
                alignItems: 'center',
                padding: idx === 0 ? '0 0 14px' : idx === routineTasks.length - 1 ? '14px 0 0' : '14px 0',
                borderBottom: idx === routineTasks.length - 1 ? 'none' : `1px solid ${colors.line}`
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: task.done ? colors.green : colors.primarySoft,
                  marginRight: 12
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 850, color: colors.text }}>{task.title}</div>
                  <div style={{ fontSize: 13, color: colors.sub, marginTop: 3 }}>{task.desc}</div>
                </div>
                <button style={{
                  border: 'none',
                  borderRadius: 999,
                  padding: '9px 13px',
                  background: task.done ? '#EEF3EA' : colors.primarySoft,
                  color: task.done ? colors.green : colors.primary,
                  fontWeight: 850
                }}>
                  {task.done ? '완료' : '하기'}
                </button>
              </div>
            ))}
          </Panel>
        </Section>

        <Section title="오늘의 도전" caption="아이가 직접 고르는 자율 미션이에요.">
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 2 }}>
            {challengeTasks.map((item) => (
              <div key={item.title} style={{
                minWidth: 150,
                background: colors.surface,
                border: `1px solid ${colors.line}`,
                borderRadius: 24,
                padding: 16,
                boxShadow: '0 10px 30px rgba(90,70,45,.06)'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '5px 9px',
                  borderRadius: 999,
                  background: colors.surfaceSoft,
                  color: colors.sub,
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 16
                }}>
                  {item.tag}
                </div>
                <div style={{ fontWeight: 900, color: colors.text, lineHeight: 1.4 }}>{item.title}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="오늘의 마음" caption="아이의 감정 상태를 기록하고 맞춤 솔루션을 받아요.">
          <Panel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {Object.keys(emotionMap).map((key) => (
                <button key={key} onClick={() => setEmotion(key)} style={{
                  flex: 1,
                  border: emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`,
                  background: emotion === key ? colors.primarySoft : colors.surface,
                  borderRadius: 18,
                  padding: '12px 4px',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: 22 }}>{emotionMap[key].icon}</div>
                  <div style={{ fontSize: 11, color: colors.sub, marginTop: 4, fontWeight: 800 }}>
                    {emotionMap[key].label}
                  </div>
                </button>
              ))}
            </div>

            <div style={{
              background: colors.surfaceSoft,
              borderRadius: 22,
              padding: 16,
              border: `1px solid ${colors.line}`
            }}>
              <div style={{ fontSize: 13, color: colors.primary, fontWeight: 900, marginBottom: 8 }}>
                AI 추천 솔루션
              </div>
              <p style={{ margin: 0, color: colors.text, fontSize: 14, lineHeight: 1.65 }}>
                {currentEmotion.solution}
              </p>
            </div>
          </Panel>
        </Section>

        <Section title="맞춤 콘텐츠" caption="오늘의 상태에 맞춰 가볍게 실천할 수 있어요.">
          <Panel style={{
            background: '#F4EEE6'
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 18,
                background: colors.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>
                ✨
              </div>
              <div>
                <div style={{ fontWeight: 900, color: colors.text }}>{currentEmotion.content}</div>
                <div style={{ color: colors.sub, fontSize: 13, marginTop: 5 }}>
                  3분 안에 할 수 있는 작은 활동이에요.
                </div>
              </div>
            </div>
          </Panel>
        </Section>
      </div>
    </Shell>
  );
}
