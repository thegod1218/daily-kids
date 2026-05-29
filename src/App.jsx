import React from 'react';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F6F1E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          background: '#ffffff',
          padding: '48px 32px',
          borderRadius: '28px',
          width: '340px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontSize: '72px' }}>🐘</div>

        <h1
          style={{
            fontSize: '34px',
            marginBottom: '8px',
            color: '#222',
          }}
        >
          Daily Kids
        </h1>

        <p
          style={{
            color: '#666',
            fontSize: '16px',
            marginBottom: '32px',
          }}
        >
          Small habits, big growth
        </p>

        <button
          style={{
            width: '100%',
            background: '#FF8E72',
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '14px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          이메일로 시작하기
        </button>

        <button
          style={{
            width: '100%',
            background: '#fff',
            color: '#222',
            border: '1px solid #ddd',
            borderRadius: '16px',
            padding: '14px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
