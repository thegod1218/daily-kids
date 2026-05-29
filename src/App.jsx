import React, { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState('home');
  const [emotion, setEmotion] = useState('happy');
  const [diary, setDiary] = useState('');

  const colors = {
    bg: '#F7F3EE',
    card: '#FFFDF9',
    text: '#2C2926',
    sub: '#7C746D',
    border: '#E6DDD3',
    accent: '#D28A6A',
    accentDeep: '#B96E4E',
    accentSoft: '#F7E6DD',
    shadow: '0 12px 34px rgba(80,60,40,.08)',
  };

  const moods = [
    { key: 'happy', label: '좋아', icon: '☺' },
    { key: 'normal', label: '보통', icon: '－' },
    { key: 'sad', label: '속상', icon: '⌒' },
    { key: 'tired', label: '피곤', icon: 'zZ' },
  ];

  const Tori = () => (
    <div style={{ width: 150, height: 120, position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 8, top: 38, width: 52, height: 58,
        borderRadius: '50%', border: '2px solid #8D7A68',
        background: '#F3E8DC'
      }} />
      <div style={{
        position: 'absolute', left: 74, top: 38, width: 52, height: 58,
        borderRadius: '50%', border: '2px solid #8D7A68',
        background: '#F3E8DC'
      }} />
      <div style={{
        position: 'absolute', left: 34, top: 20, width: 76, height: 82,
        borderRadius: '48% 48% 52% 52%',
        border: '2px solid #8D7A68',
        background: '#F5EDE3'
      }}>
        <div style={{ position: 'absolute', left: 24, top: 34, width: 6, height: 12, background: '#6F6258', borderRadius: 99 }} />
        <div style={{ position: 'absolute', right: 21, top: 34, width: 6, height: 12, background: '#6F6258', borderRadius: 99 }} />
        <div style={{
          position: 'absolute', left: 42, top: 42, width: 34, height: 20,
          borderBottom: '3px solid #8D7A68',
          borderRadius: '0 0 50% 50%',
          transform: 'rotate(-12deg)'
        }} />
        <div style={{
          position: 'absolute', left: 18, top: 50, width: 22, height: 18,
          borderRadius: '50%', background: '#F3B99F', opacity: .7
        }} />
      </div>
      <div style={{ position: 'absolute', left: 30, bottom: 0, width: 90, height: 26, borderRadius: '50%', background: '#F2E0CB' }} />
      <div style={{ position: 'absolute', right: 16, top: 18, color: '#E7B889', fontSize: 18 }}>✦</div>
      <div style={{ position: 'absolute', right: 34, top: 40, color: '#E7B889', fontSize: 14 }}>✦</div>
      <div style={{
        position: 'absolute', left: 54, bottom: 8, width: 60, height: 26,
        border: '2px solid #8D7A68', borderRadius: 4, background: '#FFFDF9'
      }} />
    </div>
  );

  const Page = ({ children }) => (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      display: 'flex',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        padding: '28px 22px 110px',
        boxSizing: 'border-box',
      }}>
        {children}
      </div>
    </div>
  );

  const Home = () => (
    <Page>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 26,
      }}>
        <div>
          <div style={{ color: colors.accentDeep, fontSize: 18, fontWeight: 650, marginBottom: 12 }}>
            Daily Kids
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 38,
            letterSpacing: '-1.5px',
            lineHeight: 1.12,
            color: colors.text,
            fontWeight: 850,
          }}>
            오늘 뭐 해볼까?
          </h1>
        </div>

        <div style={{
          position: 'relative',
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          marginTop: 8,
        }}>
          ♡
          <div style={{
            position: 'absolute',
            right: -2,
            top: 0,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#E27755',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 800,
          }}>
            3
          </div>
        </div>
      </div>

      <section style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 30,
        padding: 24,
        boxShadow: colors.shadow,
        marginBottom: 18,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: colors.accentDeep,
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 14,
        }}>
          <span>오늘의 목표 ✦</span>
          <span style={{ color: '#C8BDB4' }}>•••</span>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Tori />
          <div style={{ flex: 1 }}>
            <h2 style={{
              margin: '0 0 14px',
              fontSize: 30,
              color: colors.text,
              letterSpacing: '-.5px',
            }}>
              숙제하기
            </h2>
            <div style={{ color: colors.sub, fontSize: 17, marginBottom: 22 }}>
              ◷ 15:00
            </div>
            <button style={{
              width: '100%',
              border: 'none',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #E99673, #DF704B)',
              color: '#fff',
              padding: '17px 0',
              fontSize: 20,
              fontWeight: 800,
              boxShadow: '0 10px 24px rgba(211,119,83,.25)',
              cursor: 'pointer',
            }}>
              시작
            </button>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <button onClick={() => setTab('plan')} style={subCard(colors)}>
          <div style={iconWrap('#F9E4D8', '#D97750')}>▤</div>
          <div>
            <div style={subTitle(colors)}>계획</div>
            <div style={subDesc(colors)}>할 일 보기</div>
          </div>
          <div style={{ marginLeft: 'auto', color: '#A7988E', fontSize: 28 }}>›</div>
        </button>

        <button onClick={() => setTab('tori')} style={subCard(colors)}>
          <div style={iconWrap('#F8EACB', '#D89E26')}>☆</div>
          <div>
            <div style={subTitle(colors)}>토리</div>
            <div style={subDesc(colors)}>별 2개</div>
          </div>
          <div style={{ marginLeft: 'auto', color: '#A7988E', fontSize: 28 }}>›</div>
        </button>
      </div>

      <h3 style={sectionTitle(colors)}>오늘의 마음</h3>
      <p style={sectionHelp(colors)}>하나만 골라봐요.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 32 }}>
        {moods.map((mood) => {
          const active = emotion === mood.key;
          return (
            <button
              key={mood.key}
              onClick={() => setEmotion(mood.key)}
              style={{
                position: 'relative',
                height: 94,
                borderRadius: 22,
                border: active ? `1.5px solid ${colors.accent}` : `1px solid ${colors.border}`,
                background: active ? colors.accentSoft : colors.card,
                boxShadow: active ? '0 10px 22px rgba(210,138,106,.14)' : '0 8px 20px rgba(80,60,40,.05)',
                cursor: 'pointer',
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute',
                  right: -5,
                  top: -8,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}>
                  ✓
                </div>
              )}
              <div style={{
                width: 42,
                height: 42,
                margin: '0 auto 8px',
                borderRadius: '50%',
                background: active ? '#E88E6E' : mood.key === 'normal' ? '#E8D6BA' : mood.key === 'sad' ? '#BFD1DF' : '#D4CEE1',
                color: active ? '#fff' : '#64717D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
              }}>
                {mood.icon}
              </div>
              <div style={{ color: colors.text, fontSize: 17, fontWeight: 750 }}>{mood.label}</div>
            </button>
          );
        })}
      </div>

      <h3 style={sectionTitle(colors)}>짧은 일기</h3>
      <div style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 24,
        padding: 18,
        minHeight: 112,
        boxShadow: '0 8px 22px rgba(80,60,40,.05)',
      }}>
        <textarea
          value={diary}
          onChange={(e) => setDiary(e.target.value)}
          maxLength={120}
          placeholder="오늘 좋았던 일을 한 줄만 적어봐요."
          style={{
            width: '100%',
            minHeight: 70,
            border: 'none',
            outline: 'none',
            resize: 'none',
            background: 'transparent',
            fontSize: 17,
            color: colors.text,
            lineHeight: 1.6,
            fontFamily: 'inherit',
          }}
        />
        <div style={{
          textAlign: 'right',
          color: colors.sub,
          fontSize: 16,
          fontWeight: 600,
        }}>
          {diary.length}/120자
        </div>
      </div>

      <button style={{
        width: '100%',
        marginTop: 18,
        border: 'none',
        borderRadius: 18,
        background: 'linear-gradient(135deg, #E99673, #DF704B)',
        color: '#fff',
        padding: '18px 0',
        fontSize: 21,
        fontWeight: 850,
        boxShadow: '0 10px 24px rgba(211,119,83,.25)',
      }}>
        저장
      </button>

      <BottomNav tab={tab} setTab={setTab} colors={colors} />
    </Page>
  );

  const SimplePage = ({ title }) => (
    <Page>
      <Header title={title} colors={colors} />
      <div style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 30,
        padding: 28,
        boxShadow: colors.shadow,
        textAlign: 'center',
        color: colors.sub,
      }}>
        준비 중인 화면이에요.
      </div>
      <BottomNav tab={tab} setTab={setTab} colors={colors} />
    </Page>
  );

  if (tab === 'plan') return <SimplePage title="생활계획표" />;
  if (tab === 'tori') return <SimplePage title="토리 성장방" />;
  return <Home />;
}

function Header({ title, colors }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ color: colors.accentDeep, fontSize: 18, fontWeight: 650, marginBottom: 10 }}>
        Daily Kids
      </div>
      <h1 style={{
        margin: 0,
        fontSize: 34,
        color: colors.text,
        letterSpacing: '-1px',
      }}>
        {title}
      </h1>
    </div>
  );
}

function subCard(colors) {
  return {
    border: `1px solid ${colors.border}`,
    background: colors.card,
    borderRadius: 24,
    padding: 16,
    height: 84,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 8px 22px rgba(80,60,40,.06)',
    cursor: 'pointer',
    textAlign: 'left',
  };
}

function iconWrap(bg, color) {
  return {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: bg,
    color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 800,
    flexShrink: 0,
  };
}

function subTitle(colors) {
  return {
    color: colors.text,
    fontSize: 18,
    fontWeight: 850,
    marginBottom: 4,
  };
}

function subDesc(colors) {
  return {
    color: colors.sub,
    fontSize: 15,
    fontWeight: 550,
  };
}

function sectionTitle(colors) {
  return {
    margin: '0 0 8px',
    color: colors.text,
    fontSize: 23,
    fontWeight: 850,
    letterSpacing: '-.3px',
  };
}

function sectionHelp(colors) {
  return {
    margin: '0 0 14px',
    color: colors.sub,
    fontSize: 16,
  };
}

function BottomNav({ tab, setTab, colors }) {
  const items = [
    { key: 'home', label: '홈', icon: '⌂' },
    { key: 'plan', label: '계획', icon: '▢' },
    { key: 'tori', label: '토리', icon: '♧' },
  ];

  return (
    <div style={{
      position: 'fixed',
      left: '50%',
      bottom: 18,
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: 390,
      height: 78,
      borderRadius: 40,
      background: 'rgba(255,253,249,.96)',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 14px 34px rgba(80,60,40,.13)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      alignItems: 'center',
      padding: '0 10px',
      boxSizing: 'border-box',
      backdropFilter: 'blur(14px)',
    }}>
      {items.map((item) => {
        const active = tab === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            style={{
              position: 'relative',
              border: 'none',
              background: 'transparent',
              color: active ? colors.accentDeep : colors.sub,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 27, marginBottom: 2 }}>{item.icon}</div>
            <div>{item.label}</div>
            {active && (
              <div style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: colors.accent,
                margin: '5px auto 0',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
