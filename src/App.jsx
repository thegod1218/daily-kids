import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [tasks, setTasks] = useState([
    { icon: '🪥', title: '양치하기', desc: '아침 양치 완료했나요?', done: false },
    { icon: '📚', title: '숙제하기', desc: '수학 문제집 3페이지', done: false },
    { icon: '💧', title: '물 마시기', desc: '오늘 4컵 마시기', done: true },
    { icon: '🌙', title: '잠옷 갈아입기', desc: '저녁 루틴 준비하기', done: false },
  ]);

  const colors = {
    bg: '#FFF7EA',
    card: '#FFFFFF',
    cardSoft: '#FFFCF7',
    primary: '#FF7A45',
    primarySoft: '#FFE4D6',
    blue: '#CDE7FF',
    blueDark: '#8DBCE8',
    text: '#1F2933',
    subText: '#6B7280',
    border: '#EADFCC',
    green: '#8FB99A'
  };

  const completed = tasks.filter(t => t.done).length;
  const score = 60 + completed * 10;

  const Elephant = () => (
    <div style={{
      width: 106,
      height: 106,
      margin: '0 auto',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        left: 2,
        top: 30,
        width: 42,
        height: 52,
        background: '#B9D7F2',
        borderRadius: '50%',
        transform: 'rotate(-18deg)',
        border: '3px solid #8DBCE8'
      }} />
      <div style={{
        position: 'absolute',
        right: 2,
        top: 30,
        width: 42,
        height: 52,
        background: '#B9D7F2',
        borderRadius: '50%',
        transform: 'rotate(18deg)',
        border: '3px solid #8DBCE8'
      }} />
      <div style={{
        position: 'absolute',
        left: 20,
        top: 18,
        width: 66,
        height: 68,
        background: colors.blue,
        borderRadius: '48% 48% 52% 52%',
        border: `3px solid ${colors.blueDark}`,
        boxShadow: '0 8px 18px rgba(141,188,232,.25)'
      }}>
        <div style={{
          position: 'absolute',
          left: 17,
          top: 25,
          width: 8,
          height: 8,
          background: colors.text,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          right: 17,
          top: 25,
          width: 8,
          height: 8,
          background: colors.text,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          left: 27,
          top: 35,
          width: 15,
          height: 32,
          background: '#A9D4F7',
          borderRadius: '12px',
          border: `2px solid ${colors.blueDark}`
        }} />
        <div style={{
          position: 'absolute',
          left: 23,
          top: 46,
          width: 22,
          height: 10,
          borderBottom: `3px solid ${colors.primary}`,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          left: 10,
          top: 36,
          width: 8,
          height: 4,
          background: '#FFB7A2',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          right: 10,
          top: 36,
          width: 8,
          height: 4,
          background: '#FFB7A2',
          borderRadius: '50%'
        }} />
      </div>
      <div style={{
        position: 'absolute',
        right: 7,
        top: 5,
        fontSize: 22,
        filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.12))'
      }}>
        ⭐
      </div>
    </div>
  );

  const Page = ({ children, full = false }) => (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      display: 'flex',
      alignItems: full ? 'flex-start' : 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: 20,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        background: colors.card,
        borderRadius: 32,
        padding: full ? 22 : 30,
        boxShadow: '0 14px 45px rgba(87,64,38,.12)',
        textAlign: full ? 'left' : 'center',
        boxSizing: 'border-box',
        border: `1px solid ${colors.border}`
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
        boxSizing: 'border-box',
        padding: '16px 17px',
        borderRadius: 18,
        border: `1.5px solid ${colors.border}`,
        marginBottom: 12,
        fontSize: 15,
        outline: 'none',
        background: colors.cardSoft,
        color: colors.text
      }}
    />
  );

  const PrimaryButton = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      width: '100%',
      border: 'none',
      borderRadius: 18,
      padding: 16,
      background: colors.primary,
      color: '#fff',
      fontSize: 16,
      fontWeight: 800,
      cursor: 'pointer',
      marginTop: 8,
      boxShadow: '0 8px 18px rgba(255,122,69,.28)'
    }}>
      {children}
    </button>
  );

  const SecondaryButton = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      width: '100%',
      border: `1.5px solid ${colors.border}`,
      borderRadius: 18,
      padding: 16,
      background: '#fff',
      color: colors.text,
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      marginTop: 10
    }}>
      {children}
    </button>
  );

  const Card = ({ children }) => (
    <div style={{
      background: colors.cardSoft,
      border: `1.5px solid ${colors.border}`,
      borderRadius: 24,
      padding: 18,
      marginBottom: 14,
      boxShadow: '0 5px 14px rgba(87,64,38,.04)'
    }}>
      {children}
    </div>
  );

  const toggleTask = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    ));
  };

  if (screen === 'start') {
    return (
      <Page>
        <Elephant />
        <h1 style={{ margin: '14px 0 6px', fontSize: 36, color: colors.text }}>
          Daily Kids
        </h1>
        <p style={{ color: colors.subText, marginBottom: 30, fontWeight: 600 }}>
          Small habits, big growth
        </p>
        <PrimaryButton onClick={() => setScreen('signup')}>
          이메일로 시작하기
        </PrimaryButton>
        <SecondaryButton onClick={() => setScreen('login')}>
          로그인
        </SecondaryButton>
      </Page>
    );
  }

  if (screen === 'signup') {
    return (
      <Page>
        <Elephant />
        <h2 style={{ color: colors.text }}>Daily Kids 시작하기</h2>
        <p style={{ color: colors.subText, fontSize: 14 }}>
          이메일 인증으로 간편하게 가입해요.
        </p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        <PrimaryButton onClick={() => setScreen('verify')}>
          인증 메일 보내기
        </PrimaryButton>
        <p style={{ fontSize: 14, color: colors.subText }}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => setScreen('login')} style={{ color: colors.primary, fontWeight: 800, cursor: 'pointer' }}>
            로그인
          </span>
        </p>
      </Page>
    );
  }

  if (screen === 'login') {
    return (
      <Page>
        <Elephant />
        <h2 style={{ color: colors.text }}>다시 만나서 반가워요</h2>
        <p style={{ color: colors.subText, fontSize: 14 }}>
          Daily Kids에 로그인하세요.
        </p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <PrimaryButton onClick={() => setScreen('home')}>
          로그인
        </PrimaryButton>
        <p style={{ fontSize: 14, color: colors.subText }}>
          처음이신가요?{' '}
          <span onClick={() => setScreen('signup')} style={{ color: colors.primary, fontWeight: 800, cursor: 'pointer' }}>
            회원가입
          </span>
        </p>
      </Page>
    );
  }

  if (screen === 'verify') {
    return (
      <Page>
        <div style={{ fontSize: 58 }}>✉️</div>
        <h2 style={{ color: colors.text }}>인증 메일을 보냈어요</h2>
        <p style={{ color: colors.subText, lineHeight: 1.6 }}>
          입력한 이메일에서 인증 버튼을 눌러주세요.
        </p>
        <PrimaryButton onClick={() => setScreen('parent')}>
          인증 완료했어요
        </PrimaryButton>
        <SecondaryButton onClick={() => setScreen('signup')}>
          메일 다시 보내기
        </SecondaryButton>
      </Page>
    );
  }

  if (screen === 'parent') {
    return (
      <Page>
        <Elephant />
        <h2 style={{ color: colors.text }}>부모 프로필 설정</h2>
        <Input placeholder="보호자 이름" />
        <Input placeholder="아이와의 관계 예: 엄마, 아빠" />
        <PrimaryButton onClick={() => setScreen('child')}>
          다음
        </PrimaryButton>
      </Page>
    );
  }

  if (screen === 'child') {
    return (
      <Page>
        <Elephant />
        <h2 style={{ color: colors.text }}>아이 등록</h2>
        <Input placeholder="아이 이름" />
        <Input placeholder="생년월일 예: 2018.05.12" />
        <Input placeholder="학교 단계 예: 유아 / 초등 / 중등" />
        <PrimaryButton onClick={() => setScreen('home')}>
          우리 아이 루틴 만들기
        </PrimaryButton>
      </Page>
    );
  }

  return (
    <Page full>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ color: colors.subText, fontSize: 13, fontWeight: 700 }}>Daily Kids</div>
          <h2 style={{ margin: '4px 0 0', color: colors.text }}>좋은 아침 ☀️ 도윤아</h2>
        </div>
        <div style={{ transform: 'scale(.62)', transformOrigin: 'right center' }}>
          <Elephant />
        </div>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: colors.subText, fontSize: 13, fontWeight: 700 }}>오늘의 성장 점수</div>
            <div style={{ fontSize: 38, fontWeight: 900, marginTop: 4, color: colors.text }}>{score}점</div>
          </div>
          <div style={{
            background: colors.primarySoft,
            color: colors.primary,
            padding: '8px 12px',
            borderRadius: 999,
            fontWeight: 900,
            fontSize: 13
          }}>
            🔥 7일 연속
          </div>
        </div>

        <div style={{ height: 12, background: '#EFE3D4', borderRadius: 999, marginTop: 16 }}>
          <div style={{
            width: `${score}%`,
            height: '100%',
            background: colors.primary,
            borderRadius: 999
          }} />
        </div>
      </Card>

      <h3 style={{ margin: '20px 0 12px', color: colors.text }}>오늘 할 일</h3>

      {tasks.map((task, index) => (
        <Card key={task.title}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 31 }}>{task.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, color: colors.text }}>{task.title}</div>
              <div style={{ color: colors.subText, fontSize: 13, marginTop: 3 }}>{task.desc}</div>
            </div>
            <button
              onClick={() => toggleTask(index)}
              style={{
                border: 'none',
                borderRadius: 15,
                padding: '10px 13px',
                background: task.done ? colors.green : colors.primarySoft,
                color: task.done ? '#fff' : colors.primary,
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              {task.done ? '완료' : '하기'}
            </button>
          </div>
        </Card>
      ))}

      <Card>
        <div style={{ fontWeight: 900, marginBottom: 8, color: colors.text }}>오늘 받은 별</div>
        <div style={{ fontSize: 27 }}>
          {'⭐'.repeat(completed)}{'☆'.repeat(4 - completed)}
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ transform: 'scale(.55)', width: 64, height: 64, transformOrigin: 'left top' }}>
            <Elephant />
          </div>
          <div>
            <div style={{ fontWeight: 900, color: colors.text }}>토리 Lv.4 🌱</div>
            <div style={{ color: colors.subText, fontSize: 13, marginTop: 4 }}>
              미션을 완료할수록 토리가 자라요.
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
}
