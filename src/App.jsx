import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');

  const Elephant = () => <div style={{ fontSize: 64 }}>🐘</div>;

  const Page = ({ children }) => (
    <div style={{
      minHeight: '100vh',
      background: '#F6F1E8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: 20
    }}>
      <div style={{
        width: '100%',
        maxWidth: 390,
        background: '#fff',
        borderRadius: 30,
        padding: 28,
        boxShadow: '0 12px 40px rgba(0,0,0,.08)',
        textAlign: 'center'
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
        <PrimaryButton onClick={() => setScreen('parent')}>
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
          인증이 끝나면 다음 단계로 이동할 수 있어요.
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
    <Page>
      <Elephant />
      <h2>오늘도 잘 자라고 있어요 🌱</h2>
      <p style={{ color: '#777' }}>Daily Kids 홈 화면 준비 완료</p>
      <PrimaryButton onClick={() => setScreen('start')}>
        처음으로
      </PrimaryButton>
    </Page>
  );
}
