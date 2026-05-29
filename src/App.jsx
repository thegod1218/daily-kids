import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [userType, setUserType] = useState(null);
  const [tab, setTab] = useState('home');
  const [emotion, setEmotion] = useState('happy');
  const [missionStatus, setMissionStatus] = useState({
    '숙제하기': 'ready',
    '태권도 가기': 'ready',
    '독서 10분': 'ready'
  });

  const colors = {
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    soft: '#F8F2EA',
    primary: '#D98C5F',
    primarySoft: '#F4DFD0',
    text: '#232323',
    sub: '#7A756F',
    line: '#E8DED2',
    green: '#9BAF92',
    blue: '#C8D9E6'
  };

  const emotionMap = {
    happy: ['😊', '행복', '오늘 기분이 좋아 보여요. 가족과 좋았던 순간을 기록해보세요.'],
    calm: ['😐', '보통', '평온한 하루예요. 조용한 독서나 산책이 잘 맞아요.'],
    sad: ['😢', '속상', '속상한 마음이 있었나 봐요. 먼저 충분히 들어주는 시간이 필요해요.'],
    tired: ['😴', '피곤', '피곤함이 보여요. 오늘은 루틴을 줄이고 일찍 쉬는 걸 추천해요.']
  };

  const schedule = [
    { group: '아침', icon: '☀️', items: [
      { time: '07:30', title: '기상하기', done: true },
      { time: '07:40', title: '양치하기', done: true },
      { time: '08:20', title: '가방 챙기기', done: false }
    ]},
    { group: '오후', icon: '🏫', items: [
      { time: '15:00', title: '숙제하기', done: false },
      { time: '16:00', title: '태권도 가기', done: false }
    ]},
    { group: '저녁', icon: '🌙', items: [
      { time: '20:00', title: '독서 10분', done: false },
      { time: '21:00', title: '잠자리 준비', done: false }
    ]}
  ];

  const checkins = [
    { place: '학교', time: '08:34', status: '도착 확인' },
    { place: '태권도장', time: '16:02', status: '도착 확인' },
    { place: '집', time: '17:21', status: '도착 예정' }
  ];

  const pendingMissions = Object.entries(missionStatus).filter(([_, status]) => status === 'pending');

  const Tori = () => (
    <div style={{ width: 96, height: 96, margin: '0 auto', borderRadius: '50%', background: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
      🐘
    </div>
  );

  const Shell = ({ children, center = false }) => (
    <div style={{
      minHeight: '100vh', background: colors.bg, display: 'flex',
      justifyContent: 'center', alignItems: center ? 'center' : 'flex-start',
      padding: 20, boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        width: '100%', maxWidth: 430, paddingBottom: center ? 0 : 90,
        background: center ? colors.surface : 'transparent',
        borderRadius: center ? 32 : 0, padding: center ? 30 : 0,
        boxShadow: center ? '0 20px 60px rgba(90,70,45,.12)' : 'none',
        border: center ? `1px solid ${colors.line}` : 'none',
        textAlign: center ? 'center' : 'left'
      }}>
        {children}
      </div>
    </div>
  );

  const Panel = ({ children, style = {} }) => (
    <div style={{
      background: colors.surface, border: `1px solid ${colors.line}`,
      borderRadius: 26, padding: 18, marginBottom: 14,
      boxShadow: '0 12px 32px rgba(90,70,45,.06)', ...style
    }}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, secondary = false }) => (
    <button onClick={onClick} style={{
      width: '100%', padding: 15, borderRadius: 17, marginTop: 10,
      border: secondary ? `1px solid ${colors.line}` : 'none',
      background: secondary ? colors.surface : colors.primary,
      color: secondary ? colors.text : '#fff',
      fontWeight: 850, fontSize: 15, cursor: 'pointer'
    }}>
      {children}
    </button>
  );

  const Input = ({ placeholder, type = 'text' }) => (
    <input type={type} placeholder={placeholder} style={{
      width: '100%', padding: 15, borderRadius: 17,
      border: `1px solid ${colors.line}`, marginBottom: 10,
      boxSizing: 'border-box', background: '#FFFCF8'
    }} />
  );

  const Header = ({ title, sub }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 13, color: colors.sub, fontWeight: 800 }}>{sub}</div>
        <h2 style={{ margin: '4px 0 0', color: colors.text }}>{title}</h2>
      </div>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.line}` }}>🔔</div>
    </div>
  );

  const changeMission = (title, next) => {
    setMissionStatus(prev => ({ ...prev, [title]: next }));
  };

  const getMissionButton = (title) => {
    const status = missionStatus[title] || 'none';

    if (status === 'ready') {
      return <button onClick={() => changeMission(title, 'doing')} style={pill(false)}>하기</button>;
    }

    if (status === 'doing') {
      return <button onClick={() => changeMission(title, 'pending')} style={pill(false)}>완료했어요</button>;
    }

    if (status === 'pending') {
      return <span style={pill(true)}>부모님 확인 중</span>;
    }

    if (status === 'approved') {
      return <span style={pill(true)}>승인 완료</span>;
    }

    return <button style={pill(false)}>하기</button>;
  };

  const pill = (done) => ({
    border: 'none', borderRadius: 999, padding: '8px 12px',
    background: done ? '#EEF3EA' : colors.primarySoft,
    color: done ? colors.green : colors.primary,
    fontWeight: 850, fontSize: 12, cursor: done ? 'default' : 'pointer'
  });

  if (screen === 'start') return (
    <Shell center>
      <Tori />
      <h1 style={{ fontSize: 38, marginBottom: 8 }}>Daily Kids</h1>
      <p style={{ color: colors.sub, lineHeight: 1.6 }}>아이의 하루와 마음을<br />성장 데이터로 기록해요.</p>
      <Button onClick={() => setScreen('select')}>시작하기</Button>
    </Shell>
  );

  if (screen === 'select') return (
    <Shell center>
      <Tori />
      <h2>누가 접속하나요?</h2>
      <Button onClick={() => { setUserType('parent'); setScreen('login'); }}>부모님으로 시작하기</Button>
      <Button secondary onClick={() => { setUserType('child'); setScreen('childLogin'); }}>아이로 시작하기</Button>
    </Shell>
  );

  if (screen === 'login') return (
    <Shell center>
      <Tori />
      <h2>부모님 로그인</h2>
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호" type="password" />
      <Button onClick={() => setScreen('app')}>로그인</Button>
    </Shell>
  );

  if (screen === 'childLogin') return (
    <Shell center>
      <Tori />
      <h2>아이 접속</h2>
      <Input placeholder="가족 코드" />
      <Input placeholder="아이 PIN 4자리" type="password" />
      <Button onClick={() => setScreen('app')}>아이 화면으로 들어가기</Button>
    </Shell>
  );

  const ChildHome = () => (
    <>
      <Header title="좋은 아침, 도윤아" sub="Daily Kids" />
      <Panel>
        <Tori />
        <h2 style={{ textAlign: 'center', marginBottom: 4 }}>토리 Lv.4</h2>
        <p style={{ textAlign: 'center', color: colors.sub }}>미션을 완료하면 토리가 자라요.</p>
      </Panel>

      <Panel>
        <h3>오늘의 마음</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {Object.entries(emotionMap).map(([key, value]) => (
            <button key={key} onClick={() => setEmotion(key)} style={{
              border: emotion === key ? `1.5px solid ${colors.primary}` : `1px solid ${colors.line}`,
              background: emotion === key ? colors.primarySoft : colors.surface,
              borderRadius: 16, padding: 10, cursor: 'pointer'
            }}>
              <div style={{ fontSize: 22 }}>{value[0]}</div>
              <div style={{ fontSize: 11, color: colors.sub, fontWeight: 800 }}>{value[1]}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, background: colors.soft, padding: 14, borderRadius: 18 }}>
          <b style={{ color: colors.primary }}>AI 추천</b>
          <p style={{ marginBottom: 0, lineHeight: 1.6 }}>{emotionMap[emotion][2]}</p>
        </div>
      </Panel>

      <Panel>
        <h3>맞춤 콘텐츠</h3>
        {['토리와 3번 숨쉬기', '좋았던 일 3가지 말하기', '잠들기 전 가족 대화'].map(item => (
          <button key={item} onClick={() => alert(`${item}을 시작합니다.`)} style={{
            width: '100%', textAlign: 'left', marginTop: 8, padding: 13,
            border: `1px solid ${colors.line}`, borderRadius: 16,
            background: '#FFFCF8', fontWeight: 800
          }}>
            {item}
          </button>
        ))}
      </Panel>
    </>
  );

  const ChildPlan = () => (
    <>
      <Header title="오늘의 생활계획표" sub="아이 화면" />
      {schedule.map(block => (
        <Panel key={block.group}>
          <h3>{block.icon} {block.group}</h3>
          {block.items.map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', borderTop: `1px solid ${colors.line}`, padding: '12px 0' }}>
              <div style={{ flex: 1 }}>
                <b>{item.title}</b>
                <div style={{ color: colors.sub, fontSize: 13 }}>{item.time}</div>
              </div>
              {item.done ? <span style={pill(true)}>완료</span> : getMissionButton(item.title)}
            </div>
          ))}
        </Panel>
      ))}

      <Panel>
        <h3>안심 체크인</h3>
        <p style={{ color: colors.sub, lineHeight: 1.5 }}>학교·학원·집 등 지정 장소에 도착하면 부모님께 알림이 가요.</p>
        <Button onClick={() => alert('현재 위치 기반 체크인은 실제 앱 단계에서 권한 동의 후 연결됩니다.')}>현재 위치 체크인</Button>
      </Panel>
    </>
  );

  const ParentHome = () => (
    <>
      <Header title="도윤이 오늘 요약" sub="Parent Dashboard" />
      <Panel>
        <h3>오늘 상태</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={miniCard}>미션 성공률<br /><b>68%</b></div>
          <div style={miniCard}>오늘 감정<br /><b>{emotionMap[emotion][0]} {emotionMap[emotion][1]}</b></div>
        </div>
      </Panel>

      <Panel>
        <h3>오늘의 추천</h3>
        <p style={{ lineHeight: 1.6, color: colors.text }}>
          도윤이의 오늘 감정은 <b>{emotionMap[emotion][1]}</b> 상태예요.  
          오늘은 무리한 루틴보다 짧은 대화와 가벼운 활동을 추천해요.
        </p>
      </Panel>

      <Panel>
        <h3>안심 체크인</h3>
        {checkins.map(item => (
          <div key={item.place} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.line}`, padding: '12px 0' }}>
            <div><b>{item.place}</b><div style={{ color: colors.sub, fontSize: 13 }}>{item.status}</div></div>
            <b>{item.time}</b>
          </div>
        ))}
      </Panel>
    </>
  );

  const ParentReport = () => (
    <>
      <Header title="주간 리포트" sub="Parent Dashboard" />
      <Panel>
        <h3>미션 성공 그래프</h3>
        {['월','화','수','목','금','토','일'].map((d, i) => (
          <div key={d} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{d}</span><b>{55 + i * 6}%</b></div>
            <div style={{ height: 9, background: colors.soft, borderRadius: 999 }}>
              <div style={{ width: `${55 + i * 6}%`, height: '100%', background: colors.primary, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </Panel>

      <Panel>
        <h3>AI 패턴 코멘트</h3>
        <p style={{ lineHeight: 1.6 }}>최근 오후 루틴 완료율이 낮아요. 학원 이후 피로도가 높을 수 있어 저녁 루틴을 1개 줄이는 것을 추천해요.</p>
      </Panel>
    </>
  );

  const ParentApprove = () => (
    <>
      <Header title="승인 대기" sub="Parent Dashboard" />
      <Panel>
        <h3>미션 완료 요청</h3>
        {pendingMissions.length === 0 && <p style={{ color: colors.sub }}>현재 승인 대기 중인 미션이 없어요.</p>}
        {pendingMissions.map(([title]) => (
          <div key={title} style={{ borderTop: `1px solid ${colors.line}`, padding: '14px 0' }}>
            <b>{title}</b>
            <p style={{ color: colors.sub, fontSize: 13 }}>도윤이가 완료했다고 요청했어요.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => changeMission(title, 'approved')} style={{ ...pill(false), background: colors.primary, color: '#fff' }}>승인</button>
              <button onClick={() => changeMission(title, 'ready')} style={pill(false)}>반려</button>
            </div>
          </div>
        ))}
      </Panel>
    </>
  );

  const ParentGift = () => (
    <>
      <Header title="선물" sub="Parent Dashboard" />
      <Panel>
        <h3>보상 추천</h3>
        {['편의점 아이스크림 쿠폰', '어린이 도서 쿠폰', '문구 세트'].map(item => (
          <button key={item} onClick={() => alert(`${item} 선물 기능은 추후 쇼핑몰/e쿠폰 연동 예정입니다.`)} style={{
            width: '100%', textAlign: 'left', padding: 14, borderRadius: 18,
            border: `1px solid ${colors.line}`, background: '#FFFCF8', marginTop: 10, fontWeight: 850
          }}>
            🎁 {item}
          </button>
        ))}
      </Panel>
    </>
  );

  const miniCard = {
    background: colors.soft, borderRadius: 18, padding: 14,
    color: colors.sub, lineHeight: 1.7
  };

  const Placeholder = ({ title }) => (
    <>
      <Header title={title} sub={userType === 'parent' ? 'Parent Dashboard' : 'Daily Kids'} />
      <Panel><Tori /><p style={{ textAlign: 'center', color: colors.sub }}>준비 중인 화면이에요.</p></Panel>
    </>
  );

  const navs = userType === 'parent'
    ? [
      ['home', '홈'], ['report', '리포트'], ['approve', '승인'], ['gift', '선물'], ['setting', '설정']
    ]
    : [
      ['home', '홈'], ['plan', '계획'], ['money', '용돈'], ['book', '독서'], ['tori', '토리']
    ];

  const BottomNav = () => (
    <div style={{
      position: 'fixed', left: '50%', bottom: 14, transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)', maxWidth: 430,
      background: 'rgba(255,255,255,.94)', border: `1px solid ${colors.line}`,
      borderRadius: 24, padding: 8, display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)', boxShadow: '0 16px 45px rgba(90,70,45,.16)'
    }}>
      {navs.map(([key, label]) => (
        <button key={key} onClick={() => setTab(key)} style={{
          border: 'none', borderRadius: 17, padding: '10px 0',
          background: tab === key ? colors.primarySoft : 'transparent',
          color: tab === key ? colors.primary : colors.sub,
          fontWeight: 900, cursor: 'pointer'
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
      {userType === 'child' && tab !== 'home' && tab !== 'plan' && <Placeholder title={navs.find(n => n[0] === tab)?.[1]} />}

      {userType === 'parent' && tab === 'home' && <ParentHome />}
      {userType === 'parent' && tab === 'report' && <ParentReport />}
      {userType === 'parent' && tab === 'approve' && <ParentApprove />}
      {userType === 'parent' && tab === 'gift' && <ParentGift />}
      {userType === 'parent' && tab === 'setting' && <Placeholder title="설정" />}

      <BottomNav />
    </Shell>
  );
}
