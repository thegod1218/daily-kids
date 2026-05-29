import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [tasks, setTasks] = useState([
    { icon: '🪥', title: '양치하기', desc: '아침 양치 완료했나요?', done: false },
    { icon: '📚', title: '숙제하기', desc: '수학 문제집 3페이지', done: false },
    { icon: '💧', title: '물 마시기', desc: '오늘 4컵 마시기', done: true },
    { icon: '🌙', title: '잠옷 갈아입기', desc: '저녁 루틴 준비하기', done: false },
  ]);

  const completed = tasks.filter(t => t.done).length;
  const score = 60 + completed * 10;

  const Elephant = () => <div style={{ fontSize: 64 }}>🐘</div>;

  const Page = ({ children, full = false }) => (
    <div style={{
      minHeight: '100vh',
      background: '#F6F1E8',
      display: 'flex',
      alignItems: full ? 'flex-start' : 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: 20,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#fff',
        borderRadius: 30,
        padding: full ? 22 : 28,
        boxShadow: '0 12px 40px rgba(0,0,0,.08)',
        textAlign: full ? 'left' : 'center',
        boxSizing: 'border-box'
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
        padding: '15px 16px',
        borderRadius: 16,
        border: '1px solid #E6E0D6',
        marginBottom: 12,
        fontSize: 15,
        outline: 'none',
        background: '#FFFCF7'
      }}
    />
  );

  const PrimaryButton = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      width: '100%',
      border: 'none',
      borderRadius: 16,
      padding: 15,
      background: '#FF8E72',
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      marginTop: 8
    }}>
      {children}
    </button>
  );

  const SecondaryButton = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      width: '100%',
      border: '1px solid #E6E0D6',
      borderRadius: 16,
      padding: 15,
      background: '#fff',
      color: '#222',
      fontSize: 16,
      cursor: 'pointer',
      marginTop: 10
    }}>
      {children}
    </button>
  );

  const Card = ({ children }) => (
    <div style={{
      background: '#FFFCF7',
      border: '1px solid #F0E8DC',
      borderRadius: 22,
      padding: 18,
      marginBottom: 14
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
        <h1 style={{ margin: '12px 0 6px', fontSize: 34 }}>Daily Kids</h1>
        <p style={{ color: '#8A8A8A', marginBottom: 30 }}>
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
        <h2>Daily Kids 시작하기</h2>
        <p style={{ color: '#8A8A8A', fontSize: 14 }}>
          이메일 인증으로 간편하게 가입해요.
        </p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        <PrimaryButton onClick={() => setScreen('verify')}>
          인증 메일 보내기
        </PrimaryButton>
        <p style={{ fontSize: 14, color: '#777' }}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => setScreen('login')} style={{ color: '#FF8E72', fontWeight: 700, cursor: 'pointer' }}>
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
        <h2>다시 만나서 반가워요</h2>
        <p style={{ color: '#8A8A8A', fontSize: 14 }}>
          Daily Kids에 로그인하세요.
        </p>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <PrimaryButton onClick={() => setScreen('home')}>
          로그인
        </PrimaryButton>
        <p style={{ fontSize: 14, color: '#777' }}>
          처음이신가요?{' '}
          <span onClick={() => setScreen('signup')} style={{ color: '#FF8E72', fontWeight: 700, cursor: 'pointer' }}>
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
        <h2>인증 메일을 보냈어요</h2>
        <p style={{ color: '#777', lineHeight: 1.6 }}>
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
        <h2>부모 프로필 설정</h2>
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
        <h2>아이 등록</h2>
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
          <div style={{ color: '#8A8A8A', fontSize: 13 }}>Daily Kids</div>
          <h2 style={{ margin: '4px 0 0' }}>좋은 아침 ☀️ 도윤아</h2>
        </div>
        <div style={{ fontSize: 38 }}>🐘</div>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#8A8A8A', fontSize: 13 }}>오늘의 성장 점수</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 4 }}>{score}점</div>
          </div>
          <div style={{
            background: '#FFF0EA',
            color: '#FF8E72',
            padding: '8px 12px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13
          }}>
            🔥 7일 연속
          </div>
        </div>

        <div style={{ height: 10, background: '#EFE7DC', borderRadius: 999, marginTop: 16 }}>
          <div style={{
            width: `${score}%`,
            height: '100%',
            background: '#FF8E72',
            borderRadius: 999
          }} />
        </div>
      </Card>

      <h3 style={{ margin: '20px 0 12px' }}>오늘 할 일</h3>

      {tasks.map((task, index) => (
        <Card key={task.title}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 30 }}>{task.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800 }}>{task.title}</div>
              <div style={{ color: '#8A8A8A', fontSize: 13, marginTop: 3 }}>{task.desc}</div>
            </div>
            <button
              onClick={() => toggleTask(index)}
              style={{
                border: 'none',
                borderRadius: 14,
                padding: '10px 12px',
                background: task.done ? '#B8C4B2' : '#FFE4DA',
                color: task.done ? '#fff' : '#FF8E72',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {task.done ? '완료' : '하기'}
            </button>
          </div>
        </Card>
      ))}

      <Card>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>오늘 받은 별</div>
        <div style={{ fontSize: 26 }}>
          {'⭐'.repeat(completed)}{'☆'.repeat(4 - completed)}
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 48 }}>🐘</div>
          <div>
            <div style={{ fontWeight: 800 }}>토리 Lv.4 🌱</div>
            <div style={{ color: '#8A8A8A', fontSize: 13, marginTop: 4 }}>
              미션을 완료할수록 토리가 자라요.
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
}
